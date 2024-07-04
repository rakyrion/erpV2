import { userAuthenticate } from '../../user/middlewares/authenticate'
import { getMyCartController } from '../controllers/getMyCart'

export const getMyCartRoute = () => [
	userAuthenticate,
	getMyCartController
]
