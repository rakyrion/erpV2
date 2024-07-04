import '../../core/interfaces/dependencyInjector'
import { ISubscriptionRepository } from '../interfaces/repositories/subscription'

declare module '../../core/interfaces/dependencyInjector' {
	export interface IDependencyInjector {
		subscription?: {
			repos: {
				subscription: ISubscriptionRepository
			}
		}
	}
}
