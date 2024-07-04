import { IUser } from '../../user/interfaces/user'
import { deleteLineFromCartService } from '../services/deleteLineFromCart'
import { EJsendStatus } from '../../app/models/enumerations/jsendStatus'
import { UserQuoteDtoMap } from '../mappers/dto/res/userQuote'


export const deleteLineFromCartController = reqCatch(async (req, res, next) => {
	const user = req.user as IUser
	const { lineItemId } = req.params

	const cart = await deleteLineFromCartService(user, lineItemId)

	res.status(200).json({
		status: EJsendStatus.SUCCESS,
		data: UserQuoteDtoMap.toDTO(cart)
	})
})
