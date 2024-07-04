import { IUser } from '../../user/interfaces/user'
import { IUserQuote } from '../interfaces/userQuote'
import { EUserQuotestatus } from '../models/enumerations/userQuoteStatus'


export const deleteLineFromCartService = async (
	user: IUser,
	lineItemId: string
): Promise<IUserQuote> => {
	const userRepo = di.cart!.repos.userQuote

	const myQuote = await userRepo.getActiveByUserIdAndStatus(
		user.id!,
		EUserQuotestatus.NEW,
		{ populate: ['lineItems'] }
	)

	myQuote.lineItems = myQuote.lineItems.filter(lineItem => {
		if (lineItem.id !== lineItemId) {
			myQuote.subtotal -= lineItem.rowTotal
			myQuote.grandTotal -= lineItem.rowTotal
			return false
		}
		return true
	})

	return await userRepo.save(myQuote, {
		populate: ['lineItems']
	})
}
