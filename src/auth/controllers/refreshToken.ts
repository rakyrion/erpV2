import passport from 'passport'
import { IAuthOptions } from '../interfaces/authOptions'
import { TokensDTO } from '../interfaces/dto/res/tokens'
import { EJsendStatus } from '../../app/models/enumerations/jsendStatus'
import { createJwtTokens } from '../utils/createJwtTokens'
import { LoginError } from '../errors/login'

export const getRefreshTokenController = (
	name: string,
	options: IAuthOptions
) => reqCatch((req, res, next) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	passport.authenticate(
		name,
		{ session: false },
		(err: unknown, user: Express.User | false | null) => {
			if (err || !user || !user.id) return next(new LoginError('', undefined, { token: 'invalid' }))

			const tokens: TokensDTO = createJwtTokens(user.id, options)

			return res.status(200).json({
				status: EJsendStatus.SUCCESS,
				data: tokens
			})
		}
	)(req, res, next)
})
