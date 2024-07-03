import { ValidationChain, body } from 'express-validator'
import { IRequestHandler } from '../../app/interfaces/requestHandler'
import { validateFields } from '../../app/middlewares/validateFields'

export const signupRoute = (signupController: IRequestHandler, extraValidations: ValidationChain[] = []) => [
	body('email', 'Email is required.').isEmail(),
	body('password', 'Password is required.').isString(),
	...extraValidations,
	validateFields,
	signupController
]
