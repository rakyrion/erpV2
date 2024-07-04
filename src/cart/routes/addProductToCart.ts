import { body } from 'express-validator'
import { userAuthenticate } from '../../user/middlewares/authenticate'
import { addProductToCartController } from '../controllers/addProductToCart'
import { validateFields } from '../../app/middlewares/validateFields'

export const addProductToCartRoute = () => [
	userAuthenticate,
	body('priceId').isString(),
	body('qty').optional().isInt({ min: 1, max: 999 }),
	validateFields,
	addProductToCartController
]
