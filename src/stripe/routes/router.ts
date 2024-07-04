import express, { Application } from 'express'
import { stripeWebhookRoute } from './stripeWebhook'

const mountRawBody = (app: Application) => {
	const router = express.Router()

	// stripe webhook
	router.post('/hook', ...stripeWebhookRoute())

	app.use('/stripe', router)
}

events.subscribe('expressRoutesBeforeBodyParser', app => mountRawBody(app as Application))
