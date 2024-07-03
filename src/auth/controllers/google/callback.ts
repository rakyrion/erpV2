import passport from 'passport'
import { IAuthOptions } from '../../interfaces/authOptions'
import { createJwtTokens } from '../../utils/createJwtTokens'
import { LoginError } from '../../errors/login'

export const getGoogleCallbackController = (
	name: string,
	options: IAuthOptions
) => reqCatch((req, res, next) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	passport.authenticate(
		name,
		{ session: false, failureRedirect: options.google.failureRedirectUrl },
		(err: unknown, user: Express.User | false | null) => {
			if (err || !user || !user.id) return next(new LoginError())

			const tokens = createJwtTokens(user.id, options)

			const url = options.google.successRedirectUrl
				.replaceAll(':accessToken', tokens.accessToken)
				.replaceAll(':refreshToken', tokens.refreshToken)

			return res.status(302).redirect(url)
		}
	)(req, res, next)
})
