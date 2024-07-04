import { Schema } from 'convict'
import { IConfigSchema } from '../../config/interfaces/configSchema'

const merge = (configSchema: Schema<IConfigSchema>) => {
	configSchema.stripe = {
		version: {
			doc: 'The API version for the checkout module.',
			format: String,
			default: 'v1'
		},
		publishableKey: {
			doc: 'Stripe API Publishable key',
			format: String,
			default: '',
			env: 'STRIPE_PUBLIC_KEY'
		},
		secretKey: {
			doc: 'Stripe API Secret key',
			format: String,
			default: '',
			env: 'STRIPE_SECRET_KEY'
		},
		successUrl: {
			doc: 'Stripe Success URL',
			format: String,
			default: '',
			env: 'STRIPE_SUCCESS_URL'
		},
		cancelUrl: {
			doc: 'Stripe Cancel URL',
			format: String,
			default: '',
			env: 'STRIPE_CANCEL_URL'
		},
		webhookSecret: {
			doc: 'Stripe Webhook secret',
			format: String,
			default: ''
		}
	}
}

events.subscribe('configSchemaMerging', configSchema => merge(configSchema as Schema<IConfigSchema>))
