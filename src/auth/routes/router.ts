import { Router } from 'express'
import { ValidationChain } from 'express-validator'
import { IRequestHandler } from '../../app/interfaces/requestHandler'
import { IAuthOptions } from '../interfaces/authOptions'
import { signupRoute } from './signup'
import { loginRoute } from './login'
import { refreshTokenRoute } from './refreshToken'
import { forgotPasswordRoute } from './forgotPassword'
import { resetPasswordRoute } from './resetPassword'
import { changePasswordRoute } from './changePassword'
import { changeEmailRoute } from './changeEmail'
import { changeEmailConfirmationRoute } from './changeEmailConfirmation'
import { googleAuthRoute } from './google/auth'
import { googleCallbackRoute } from './google/callback'

export const addAuthRoutes = (
	router: Router,
	routes: {
		authenticate?: IRequestHandler,
		signup?: IRequestHandler,
		login?: IRequestHandler,
		refreshToken?: IRequestHandler,
		forgotPassword?: IRequestHandler,
		resetPassword?: IRequestHandler,
		changePassword?: IRequestHandler,
		changeEmail?: IRequestHandler,
		changeEmailConfirmation?: IRequestHandler,
		google?: {
			auth?: IRequestHandler,
			callback?: IRequestHandler
		}
	},
	options: IAuthOptions,
	signupExtraValidations: ValidationChain[] = []
) => {
	// Signup
	if (routes.signup) router.post('/auth/signup', ...signupRoute(routes.signup, signupExtraValidations))

	// Login
	if (routes.login) router.post('/auth/login', ...loginRoute(routes.login, options.login.rateLimit))

	// Refresh token
	if (routes.refreshToken) router.post('/auth/refreshToken', ...refreshTokenRoute(routes.refreshToken))

	// Forgot password
	if (routes.forgotPassword) router.post('/auth/forgotPassword', ...forgotPasswordRoute(routes.forgotPassword))

	// Reset password
	if (routes.resetPassword) router.post('/auth/resetPassword', ...resetPasswordRoute(routes.resetPassword))

	// Authenticated routes
	if (routes.authenticate) {
		// Change password
		if (routes.changePassword) {
			router.post('/auth/changePassword', ...changePasswordRoute(routes.authenticate, routes.changePassword))
		}

		// Change email
		if (routes.changeEmail) {
			router.post('/auth/changeEmail', ...changeEmailRoute(routes.authenticate, routes.changeEmail))
		}
	}

	// Change email confirmation
	if (routes.changeEmailConfirmation) {
		router.post('/auth/changeEmailConfirmation', ...changeEmailConfirmationRoute(routes.changeEmailConfirmation))
	}

	// Google
	if (options.google.enable) {
		if (routes.google?.auth) router.get('/auth/google', ...googleAuthRoute(routes.google.auth))
		if (routes.google?.callback) router.get('/auth/google/callback', ...googleCallbackRoute(routes.google.callback))
	}
}
