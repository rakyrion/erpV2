import { body } from 'express-validator'
import { IRequestHandler } from '../../app/interfaces/requestHandler'
import { validateFields } from '../../app/middlewares/validateFields'

export const changePasswordRoute = (authenticate: IRequestHandler, changePasswordController: IRequestHandler) => [
	authenticate,
	body('currentPassword', 'Current password is required.').isString(),
	body('newPassword', 'New password is required.').isString(),
	validateFields,
	changePasswordController
]
