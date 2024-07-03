import passport from 'passport'
import { LoginError } from '../errors/login'

export const getAuthenticate = (name: string) => reqCatch((req, res, next) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	passport.authenticate(
		name,
		{ session: false },
		(err: unknown, user: Express.User | false | null) => {
			if (err instanceof LoginError) return next(err)
			if (err || !user || !user.id) return next(new LoginError('', undefined, { token: 'invalid' }))
			req.user = user
			return next()
		}
	)(req, res, next)
})
