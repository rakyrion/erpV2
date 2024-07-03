import { addRefreshTokenStrategy } from '../../../auth/strategies/refreshToken'

events.subscribe('passportStrategies', () => {
	addRefreshTokenStrategy('userRefreshToken', config.get('user.auth'))
})
