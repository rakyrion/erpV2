import { IBaseRepository } from '../../../database/interfaces/repositories/base'
import { RepositoryOptions } from '../../../database/interfaces/repositoryOptions'
import { EUserQuotestatus } from '../../models/enumerations/userQuoteStatus'
import { IUserQuote } from '../userQuote'

export interface IUserQuoteRepository extends IBaseRepository<IUserQuote> {
	getActiveByUserIdAndStatus(
		userId: string,
		status: EUserQuotestatus,
		options?: RepositoryOptions
	): Promise<IUserQuote>
}
