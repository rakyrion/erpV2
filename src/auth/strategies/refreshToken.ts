import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from 'jsonwebtoken'
import { IAuthOptions } from '../interfaces/authOptions'
import { LoginError } from '../errors/login'

export const addRefreshTokenStrategy = (
	name: string,
	options: IAuthOptions
) => {
	passport.use(name, new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
			secretOrKey: options.jwt.secret
		},
		async (payload: JwtPayload, done) => {
			try {
				if (!payload.body || !payload.body.isRefreshToken) {
					return done(new LoginError('', undefined, { token: 'invalid' }))
				}

				await events.publish(name, payload.body.userId)

				return done(null, { id: payload.body.userId })
			} catch (err) {
				return done(new LoginError('', undefined, { token: 'invalid' }))
			}
		}
	))
}
