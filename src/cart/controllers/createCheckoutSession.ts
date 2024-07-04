import { EJsendStatus } from '../../app/models/enumerations/jsendStatus'
import { IUser } from '../../user/interfaces/user'
import { createCheckoutSessionService } from '../services/createCheckoutSession'

export const createCheckoutSessionController = reqCatch(async (req, res) => {
	const session = await createCheckoutSessionService(req.user as IUser)

	res.status(200).json({
		status: EJsendStatus.SUCCESS,
		data: { url: session.url }
	})
})
