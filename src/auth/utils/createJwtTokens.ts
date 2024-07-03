import jsonwebtoken from 'jsonwebtoken'
import { IAuthOptions } from '../interfaces/authOptions'
import { ITokens } from '../interfaces/tokens'
import { IJwtBody } from '../interfaces/jwtBody'

export const createJwtTokens = (userId: string, options: IAuthOptions): ITokens => {
	const { secret, accessTokenExpiration, refreshTokenExpiration } = options.jwt

	const body: IJwtBody = { userId }
	const accessToken = jsonwebtoken.sign({ body }, secret, { expiresIn: accessTokenExpiration })

	body.isRefreshToken = true
	const refreshToken = jsonwebtoken.sign({ body }, secret, { expiresIn: refreshTokenExpiration })

	return { accessToken, refreshToken }
}
