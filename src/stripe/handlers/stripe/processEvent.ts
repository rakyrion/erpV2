import { Stripe } from 'stripe'


export const processStripeEvent = async (stripeEvent: Stripe.Event) => {
	switch (stripeEvent.type) {
	case 'payment_intent.created': {
		// TODO: LOGIC ON STARTING PAYMENT TRY
		log.info('Payment intent created')
		break
	}
		

	case 'payment_intent.canceled':
	case 'payment_intent.payment_failed': {
		// TODO: LOGIC ON PAYMENT FAILURE
		log.info('Payment intent failed')
		break
	}

	case 'invoice.payment_succeeded': {
		// TODO: LOGIC ON PAYMENT SUCCEED (CREATE SUBSCRIPTION LINKED TO USER)
		log.info('Invoice paid')
		break
	}
	default:

		// Unexpected event type
	}

	// TODO: debug_
	log.info(JSON.stringify(stripeEvent))
}
