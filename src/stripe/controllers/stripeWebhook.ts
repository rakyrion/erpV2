import { EJsendStatus } from '../../app/models/enumerations/jsendStatus'
import { processStripeEvent } from '../handlers/stripe/processEvent'
import { BadRequestError } from '../../app/errors/badRequest'

export const stripeWebhookController = reqCatch(async (req, res) => {
	try {
		const webhookSecret = config.get('stripe.webhookSecret')
		const signature = req.headers['stripe-signature']
		if (!signature) throw new BadRequestError('Stripe signature not found')

		const event = di.stripe!.client.webhooks.constructEvent(
			req.body as string | Buffer,
			signature,
			webhookSecret
		)
		
		await processStripeEvent(event)
	} catch (error) {
		log.warn(JSON.stringify(error), 'stripe', undefined, 'stripe.log')
		throw error instanceof Error ? error : new Error('Could not process webhook')
	}

	res.status(200).json({
		status: EJsendStatus.SUCCESS,
		data: null
	})
})
