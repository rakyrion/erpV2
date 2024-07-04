import '../../core/interfaces/dependencyInjector'
import { Stripe } from 'stripe'

declare module '../../core/interfaces/dependencyInjector' {
	export interface IDependencyInjector {
		stripe?: {
			client: Stripe
		}
	}
}
