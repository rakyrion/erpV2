import { Model, FilterQuery, UpdateQuery } from 'mongoose'
import { ParsedQs } from 'qs'
import { IBaseRepository } from '../interfaces/repositories/base'
import { IEntity } from '../../core/interfaces/entity'
import { IPersistenceMapper } from '../../core/interfaces/persistenceMapper'
import { RepositoryOptions } from '../interfaces/repositoryOptions'
import { buildPopulations } from '../utils/buildPopulations'
import { repositoryQuery } from '../utils/repositoryQuery'
import { NotFoundError } from '../../app/errors/notFound'

export abstract class BaseRepository<T extends IEntity> implements IBaseRepository<T> {
	protected readonly model: Model<T>
	protected readonly mapper: IPersistenceMapper<T>
	protected readonly activable: boolean

	protected constructor(model: Model<T>, mapper: IPersistenceMapper<T>, activable: boolean = false) {
		this.model = model
		this.mapper = mapper
		this.activable = activable
	}

	protected manageQueryString(queryString: ParsedQs, options: RepositoryOptions): void {
		if (queryString.id) {
			queryString._id = queryString.id
			queryString.id = undefined
		}

		if (this.activable) {
			const { inactive } = options
			if (!inactive || inactive === 'exclude') queryString.active = 'true'
			if (inactive === 'only') queryString.active = 'false'
		}
	}

	public async save(entity: T, options: RepositoryOptions = {}): Promise<T> {
		if (entity.id) return this.replace(entity.id, entity, options)
		return this.create(entity, options)
	}

	public async create(entity: T, options: RepositoryOptions = {}): Promise<T> {
		const session = options.transaction?.getSession()
		const result = await this.model.create([this.mapper.toDB(entity)], { session, validateBeforeSave: true })
		if (result[0] === undefined) throw new Error(`${this.model.modelName} not created.`)
		if (options.populate) await this.model.populate(result[0], buildPopulations(options.populate))
		return options.skipMapping ? result[0] : this.mapper.fromDB(result[0])
	}

	public async replace(id: string, entity: T, options: RepositoryOptions = {}): Promise<T> {
		const dbEntity = this.mapper.toDB(entity) as T
		return this.update(id, dbEntity, options)
	}

	public async update(id: string, entity: UpdateQuery<T>, options: RepositoryOptions = {}): Promise<T> {
		const query = this.model.findByIdAndUpdate(id, entity, { new: true, runValidators: true })
		const result = await repositoryQuery(query, options)
		if (!result) throw new NotFoundError(`${this.model.modelName} not found.`)
		return options.skipMapping ? result : this.mapper.fromDB(result)
	}

	public async multiUpdate(
		filter: FilterQuery<T>,
		update: UpdateQuery<T>,
		options: RepositoryOptions = {}
	): Promise<number> {
		const session = options.transaction?.getSession()
		const query = await this.model.updateMany(filter, update, { session, runValidators: true })
		return query.matchedCount
	}

	public async exists(entity: T, options: RepositoryOptions = {}): Promise<boolean> {
		try {
			if (!entity.id) return false
			await this.findById(entity.id, options)
			return true
		} catch (err) {
			return false
		}
	}

	public async findById(id: string, options: RepositoryOptions = {}): Promise<T> {
		const result = await repositoryQuery(this.model.findById(id), options)
		if (!result) throw new NotFoundError(`${this.model.modelName} not found.`)

		if (this.activable) {
			const { inactive } = options

			if ((!inactive || inactive === 'exclude') && !result.active) {
				throw new NotFoundError(`${this.model.modelName} not found.`)
			}

			if (inactive === 'only' && result.active) {
				throw new NotFoundError(`${this.model.modelName} not found.`)
			}
		}

		return options.skipMapping ? result : this.mapper.fromDB(result)
	}

	public async find(queryString: ParsedQs = {}, options: RepositoryOptions = {}): Promise<T[]> {
		this.manageQueryString(queryString, options)
		const query = repositoryQuery(this.model.find(), options, queryString)
		const documents = await query
		return options.skipMapping ? documents : documents.map(doc => this.mapper.fromDB(doc))
	}

	public async findOne(queryString: ParsedQs = {}, options: RepositoryOptions = {}): Promise<T> {
		this.manageQueryString(queryString, options)
		const query = repositoryQuery(this.model.findOne(), options, queryString)
		const document = await query
		if (!document) throw new NotFoundError(`${this.model.modelName} not found.`)
		return options.skipMapping ? document : this.mapper.fromDB(document)
	}

	public async countDocuments(queryString: ParsedQs = {}, options: RepositoryOptions = {}): Promise<number> {
		this.manageQueryString(queryString, options)
		const query = repositoryQuery(this.model.count(), { ...options, skipPagination: true }, queryString)
		const countDocuments = await query
		return countDocuments
	}

	public async delete(entity: T, options: RepositoryOptions = {}): Promise<void> {
		if (!entity.id) throw new NotFoundError(`${this.model.modelName} not found.`)
		return this.deleteById(entity.id, options)
	}

	public async deleteById(id: string, options: RepositoryOptions = {}): Promise<void> {
		const session = options.transaction?.getSession()
		await this.model.findByIdAndDelete(id, { session })
	}

	public async deleteAll(options: RepositoryOptions = {}): Promise<void> {
		const session = options.transaction?.getSession()
		await this.model.deleteMany({}, { session })
	}
}
