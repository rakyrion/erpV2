import { Query, FilterQuery, SortOrder } from 'mongoose'
import { ParsedQs } from 'qs'
import { RepositoryOptions } from '../interfaces/repositoryOptions'
import { buildPopulations } from './buildPopulations'

export const repositoryQuery = <Result, IEntity>(
	query: Query<Result, IEntity>,
	options: RepositoryOptions,
	queryString?: ParsedQs
): Query<Result, IEntity> => {
	// Transaction session
	const session = options.transaction?.getSession()
	if (session) void query.session(session)

	// Population paths
	if (options.populate) {
		const populations = buildPopulations(options.populate)
		if (populations.length) void query.populate(populations)
	}

	// Apply query string
	if (typeof queryString !== 'undefined') {
		filter(query, queryString)
		sort(query, queryString)
		project(query, queryString)
		if (!options.skipPagination) paginate(query, queryString)
	}

	// Leaning
	void query.lean()

	return query
}

const filter = <Result, IEntity>(query: Query<Result, IEntity>, queryString: ParsedQs): void => {
	// Exclude other operations fields
	const queryObject = { ...queryString }
	const operationFields = [ 'page', 'sort', 'limit', 'fields' ]
	operationFields.forEach(field => delete queryObject[field])

	// TODO: Special operators
	for (const [ key, content ] of Object.entries(queryObject)) {
		// Database "like" operator replacement
		if (typeof content === 'object') {
			// Case-sensitive
			if ('like' in content) {
				const variable = content.like as string
				content.$regex = `^${variable}$`
				delete (queryObject[key] as { like: unknown, [key: string]: unknown }).like
			}

			// Case-insensitive
			if ('ilike' in content) {
				const variable = content.ilike as string
				content.$regex = `^${variable}$`
				content.$options = 'i'
				delete (queryObject[key] as { ilike: unknown, [key: string]: unknown }).ilike
			}
		}

		// TODO: ¿necesario? Database "in" operator replacement
		if (key.slice(-4).toLocaleLowerCase() === '[in]') {
			queryObject[key.slice(0, -4)] = {
				$in: Array.isArray(content) ?
					content :
					typeof content === 'string' ?
						content.split(',') :
						content || []
			}
			delete queryObject[key]
		}
	}

	// TODO: Database operators replacement (pillarlo bien para que no rompa cuando la query no viene del query param)
	const filteredQuery = JSON.stringify(queryObject)
		.replace(/\[(gt|gte|lt|lte)\]/g, match => `[$${match.slice(1, -1)}]`)
		.replace(/"(gt|gte|lt|lte)"/g, match => `"$${match.slice(1, -1)}"`)

	// Query filtering
	const filterQuery = JSON.parse(filteredQuery) as FilterQuery<IEntity>
	void query.and([filterQuery])
}

const sort = <Result, IEntity>(query: Query<Result, IEntity>, queryString: ParsedQs): void => {
	if (typeof queryString.sort === 'string' && queryString.sort) {
		const sortObject: Record<string, SortOrder> = {}
		queryString.sort.split(',').forEach(attribute => {
			if (attribute.startsWith('-')) {
				sortObject[attribute.slice(1)] = -1
				return
			}
			sortObject[attribute] = 1
		})
		void query.sort(sortObject)
	}
}

const project = <Result, IEntity>(query: Query<Result, IEntity>, queryString: ParsedQs): void => {
	if (typeof queryString.fields === 'string' && queryString.fields) {
		void query.select(queryString.fields.replaceAll(',', ' '))
	}
}

const paginate = <Result, IEntity>(query: Query<Result, IEntity>, queryString: ParsedQs): void => {
	const page = +(queryString.page as string) || 1
	const defaultLimit = config.get('database.defaultPageSize')
	const limit = +(queryString.limit as string) || defaultLimit
	const skip = (page - 1) * limit

	void query.limit(limit).skip(skip)
}
