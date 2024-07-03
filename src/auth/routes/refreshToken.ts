import { body } from 'express-validator'
import { IRequestHandler } from '../../app/interfaces/requestHandler'
import { validateFields } from '../../app/middlewares/validateFields'

export const refreshTokenRoute = (refreshTokenController: IRequestHandler) => [
	body('refreshToken', 'JWT formatted token is required.').isJWT(),
	validateFields,
	refreshTokenController
]
