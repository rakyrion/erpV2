import { body } from 'express-validator'
import { IRequestHandler } from '../../app/interfaces/requestHandler'
import { validateFields } from '../../app/middlewares/validateFields'

export const changeEmailRoute = (authenticate: IRequestHandler, changeEmailController: IRequestHandler) => [
	authenticate,
	body('currentPassword', 'Current password is required.').isString(),
	body('newEmail', 'New email is required.').isEmail(),
	validateFields,
	changeEmailController
]
