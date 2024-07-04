import { RepositoryOptions } from '../../database/interfaces/repositoryOptions'
import { IUser } from '../../user/interfaces/user'
import { IUserQuote } from '../interfaces/userQuote'
import { EUserQuotestatus } from '../models/enumerations/userQuoteStatus'

export const getOrCreateCartIfnotexistsService = async (
	user: IUser,
	options?: RepositoryOptions
): Promise<IUserQuote> => {
	const userQuoteRepo = di.cart!.repos.userQuote
	try {
		return await userQuoteRepo.getActiveByUserIdAndStatus(
			user.id!,
			EUserQuotestatus.NEW,
			options
		)
	} catch (error) {
		// If we get an error it menas there is not a userQuote valid
		// so we will create it
		return await userQuoteRepo.create({
			user,
			status: EUserQuotestatus.NEW,
			lineItems: [],
			subtotal: 0,
			discountAmount: 0,
			grandTotal: 0,
			active: true
		}, options)
	}
}
