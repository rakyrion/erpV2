import { SubscriptionRepository } from '../repositories/subscription'

const diMerge = () => {
	di.subscription = {
		repos: {
			subscription: new SubscriptionRepository()
		}
	}
}

events.subscribe('diSetup', diMerge)
