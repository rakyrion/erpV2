import { RepositoryOptions } from '../../database/interfaces/repositoryOptions'
import { BaseRepository } from '../../database/repositories/base'
import { IUserQuoteRepository } from '../interfaces/repositories/userQuote'
import { IUserQuote } from '../interfaces/userQuote'
import { UserQuotePersistenceMap } from '../mappers/persistence/userQuote'
import { EUserQuotestatus } from '../models/enumerations/userQuoteStatus'
import { UserQuoteModel } from '../models/userQuote'

export class UserQuoteRepository
	extends BaseRepository<IUserQuote>
	implements IUserQuoteRepository {
	constructor() {
		super(UserQuoteModel, UserQuotePersistenceMap)
	}

	public async getActiveByUserIdAndStatus(
		userId: string,
		status: EUserQuotestatus,
		options: RepositoryOptions = {}
	): Promise<IUserQuote> {
		return await this.findOne({
			user: userId,
			status,
			active: 'true'
		}, options)
	}
}
