import Stripe from 'stripe'

const diMerge = () => {
	di.stripe = {
		client: new Stripe(config.get('stripe.secretKey'), { apiVersion: '2024-06-20' })
	}
}

events.subscribe('diSetup', diMerge)
