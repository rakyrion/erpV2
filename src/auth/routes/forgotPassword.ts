import { body } from 'express-validator'
import { IRequestHandler } from '../../app/interfaces/requestHandler'
import { validateFields } from '../../app/middlewares/validateFields'

export const forgotPasswordRoute = (forgotPasswordController: IRequestHandler) => [
	body('email', 'Email is required.').isEmail(),
	validateFields,
	forgotPasswordController
]
