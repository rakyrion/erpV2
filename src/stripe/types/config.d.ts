import '../../config/interfaces/configSchema'

declare module '../../config/interfaces/configSchema' {
	export interface IConfigSchema {
		stripe: {
			publishableKey: string,
			secretKey: string,
			successUrl: string,
			cancelUrl: string,
			webhookSecret: string
		}
	}
}
