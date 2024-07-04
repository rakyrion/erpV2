import { param } from 'express-validator'
import { userAuthenticate } from '../../user/middlewares/authenticate'
import { validateFields } from '../../app/middlewares/validateFields'
import { deleteLineFromCartController } from '../controllers/deleteLineFromCart'


export const deleteLineFromCartRoute = () => [
	userAuthenticate,
	param('lineItemId').isMongoId(),
	validateFields,
	deleteLineFromCartController
]
