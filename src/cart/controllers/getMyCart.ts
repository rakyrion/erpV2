import { EJsendStatus } from '../../app/models/enumerations/jsendStatus'
import { IUser } from '../../user/interfaces/user'
import { UserQuoteDtoMap } from '../mappers/dto/res/userQuote'
import { getMyCartService } from '../services/getMyCart'

export const getMyCartController = reqCatch(async (req, res) => {
	const userQuote = await getMyCartService(req.user as IUser)

	res.status(200).json({
		status: EJsendStatus.SUCCESS,
		data: { ...UserQuoteDtoMap.toDTO(userQuote) }
	})
})
