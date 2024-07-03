import { body } from 'express-validator'
import { IRequestHandler } from '../../app/interfaces/requestHandler'
import { validateFields } from '../../app/middlewares/validateFields'

export const resetPasswordRoute = (resetPasswordController: IRequestHandler) => [
	body('resetToken', 'Password reset token is required.').isString(),
	body('password', 'Password is required.').isString(),
	validateFields,
	resetPasswordController
]
