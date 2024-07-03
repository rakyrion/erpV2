import express, { Router } from 'express'
import { body } from 'express-validator'
import { addAuthRoutes } from '../../auth/routes/router'
import { userAuthenticate } from '../middlewares/authenticate'
import { getSignupController } from '../../auth/controllers/signup'
import { getLoginController } from '../../auth/controllers/login'
import { getRefreshTokenController } from '../../auth/controllers/refreshToken'
import { getForgotPasswordController } from '../../auth/controllers/forgotPassword'
import { getResetPasswordController } from '../../auth/controllers/resetPassword'
import { getChangePasswordController } from '../../auth/controllers/changePassword'
import { getChangeEmailController } from '../../auth/controllers/changeEmail'
import { getChangeEmailConfirmationController } from '../../auth/controllers/changeEmailConfirmation'
import { getGoogleAuthController } from '../../auth/controllers/google/auth'
import { getGoogleCallbackController } from '../../auth/controllers/google/callback'
import { UserDtoMap } from '../mappers/dto/user'

// TODO: ejemplo
import { IUser } from '../interfaces/user'

const mount = (appRouter: Router) => {
	const router = express.Router()
	const repo = di.user!.repos.user
	const options = config.get('user.auth')

	addAuthRoutes(
		router,
		{
			authenticate: userAuthenticate,
			signup: getSignupController('userSignup', repo, options, UserDtoMap.fromSignupDTO),
			login: getLoginController('userLogin', options),
			refreshToken: getRefreshTokenController('userRefreshToken', options),
			forgotPassword: getForgotPasswordController('userForgotPassword', repo, options),
			resetPassword: getResetPasswordController('userResetPassword', repo, options),
			changePassword: getChangePasswordController('userChangePassword', repo, options),
			changeEmail: getChangeEmailController('userChangeEmail', repo, options),
			changeEmailConfirmation:
				getChangeEmailConfirmationController('userChangeEmailConfirmation', repo, options),
			google: {
				auth: getGoogleAuthController('userGoogleAuth'),
				callback: getGoogleCallbackController('userGoogleAuth', options)
			}
		},
		options,
		[
			body('username').optional().isString(),
			body('firstname').isString(),
			body('lastname').isString()
		]
	)

	// TODO: ejemplo
	router.get('/test', userAuthenticate, reqCatch((req, res, next) => {
		const { username, firstname, lastname } = req.user as IUser
		res.status(200).json({ username, firstname, lastname })
	}))

	appRouter.use('/users', router)
}

events.subscribe('expressRoutes', appRouter => mount(appRouter as Router))
