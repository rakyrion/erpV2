import { IUser } from '../../user/interfaces/user'
import { getOrCreateCartIfnotexistsService } from './getOrCreateCartIfNotExistsService'

export const getMyCartService = async (
	user: IUser
) => {
	const userQuote = getOrCreateCartIfnotexistsService(
		user,
		{
			populate: ['lineItems']
		}
	)

	return userQuote
}
