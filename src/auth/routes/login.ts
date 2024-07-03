import rateLimit, { Options } from 'express-rate-limit'
import { body } from 'express-validator'
import { IRequestHandler } from '../../app/interfaces/requestHandler'
import { validateFields } from '../../app/middlewares/validateFields'

export const loginRoute = (
	loginController: IRequestHandler,
	rateLimitOptions: Partial<Options> & { enable: boolean }
) => [
	...rateLimitOptions.enable ? [rateLimit(rateLimitOptions)] : [],
	body('email', 'Email is required.').isEmail(),
	body('password', 'Password is required.').isString(),
	validateFields,
	loginController
]
