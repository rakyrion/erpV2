import { addAuthenticateStrategy } from '../../../auth/strategies/authenticate'

events.subscribe('passportStrategies', () => {
	addAuthenticateStrategy('userAuthenticate', di.user!.repos.user, config.get('user.auth'))
})
