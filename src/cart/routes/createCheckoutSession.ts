import { userAuthenticate } from '../../user/middlewares/authenticate'
import { createCheckoutSessionController } from '../controllers/createCheckoutSession'

export const createCheckoutSessionRoute = () => [
	userAuthenticate,
	createCheckoutSessionController
]
