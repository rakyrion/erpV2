import { IBaseRepository } from '../../../database/interfaces/repositories/base'
import { RepositoryOptions } from '../../../database/interfaces/repositoryOptions'
import { IAuthenticable } from '../authenticable'

export interface IAuthenticableRepository<T extends IAuthenticable> extends IBaseRepository<T> {
	getByEmail(email: string, options?: RepositoryOptions): Promise<T>,
	getByPasswordResetToken(token: string, options?: RepositoryOptions): Promise<T>,
	getByEmailChangeToken(token: string, options?: RepositoryOptions): Promise<T>
}
