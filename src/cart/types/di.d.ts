import '../../core/interfaces/dependencyInjector'
import { IUserQuoteRepository } from '../interfaces/repositories/userQuote'
import { ILineItemRepository } from '../interfaces/repositories/lineItem'

declare module '../../core/interfaces/dependencyInjector' {
	export interface IDependencyInjector {
		cart?: {
			repos: {
				userQuote: IUserQuoteRepository,
				lineItem: ILineItemRepository
			}
		}
	}
}
