import { raw } from 'express'
import { stripeWebhookController } from '../controllers/stripeWebhook'

export const stripeWebhookRoute = () => [
	raw({ type: 'application/json' }),
	stripeWebhookController
]
