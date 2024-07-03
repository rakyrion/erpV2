import { addLoginStrategy } from '../../../auth/strategies/login'

events.subscribe('passportStrategies', () => {
	addLoginStrategy('userLogin', di.user!.repos.user)
})
