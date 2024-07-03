import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from 'jsonwebtoken'
import { IAuthenticable } from '../interfaces/authenticable'
import { IAuthenticableRepository } from '../interfaces/repositories/authenticable'
import { IAuthOptions } from '../interfaces/authOptions'
import { LoginError } from '../errors/login'

export const addAuthenticateStrategy = <T extends IAuthenticable>(
	name: string,
	repo: IAuthenticableRepository<T>,
	options: IAuthOptions
) => {
	passport.use(name, new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: options.jwt.secret
		},
		async (payload: JwtPayload, done) => {
			try {
				if (!payload.body || !payload.iat || payload.body.isRefreshToken) {
					return done(new LoginError('', undefined, { token: 'invalid' }))
				}

				const user = await repo.findById(payload.body.userId)

				// Check if credentials changed after JWT was issued
				if (user.credentialsChangedAt) {
					const iat = new Date(payload.iat * 1000)
					const time = iat ? iat.getTime() : new Date().getTime()
					if (time < user.credentialsChangedAt.getTime()) {
						return done(new LoginError('', undefined, { user: 'password changed recently' }))
					}
				}

				await events.publish(name, user)
				
				return done(null, user)
			} catch (err) {
				return done(new LoginError('', undefined, { authentication: 'invalid' }))
			}
		}
	))
}
