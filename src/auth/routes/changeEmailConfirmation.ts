import { body } from 'express-validator'
import { IRequestHandler } from '../../app/interfaces/requestHandler'
import { validateFields } from '../../app/middlewares/validateFields'

export const changeEmailConfirmationRoute = (changeEmailConfirmationController: IRequestHandler) => [
	body('changeToken', 'Change token is required.').isString(),
	validateFields,
	changeEmailConfirmationController
]
