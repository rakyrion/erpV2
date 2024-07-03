import { FilterQuery, UpdateQuery } from 'mongoose'
import { ParsedQs } from 'qs'
import { IEntity } from '../../../core/interfaces/entity'
import { RepositoryOptions } from '../repositoryOptions'

export interface IBaseRepository<T extends IEntity> {
	save(entity: T, options?: RepositoryOptions): Promise<T>,
	create(entity: T, options?: RepositoryOptions): Promise<T>,
	replace(id: string, entity: T, options?: RepositoryOptions): Promise<T>,
	update(id: string, entity: UpdateQuery<T>, options?: RepositoryOptions): Promise<T>,
	multiUpdate(filter: FilterQuery<T>, update: UpdateQuery<T>, options?: RepositoryOptions): Promise<number>,
	exists(entity: T, options?: RepositoryOptions): Promise<boolean>,
	findById(id: string, options?: RepositoryOptions): Promise<T>,
	find(queryString?: ParsedQs, options?: RepositoryOptions): Promise<T[]>,
	findOne(queryString?: ParsedQs, options?: RepositoryOptions): Promise<T>,
	countDocuments(queryString?: ParsedQs, options?: RepositoryOptions): Promise<number>,
	delete(entity: T, options?: RepositoryOptions): Promise<void>,
	deleteById(id: string, options?: RepositoryOptions): Promise<void>,
	deleteAll(options?: RepositoryOptions): Promise<void>
}
