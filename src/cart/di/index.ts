import { UserQuoteRepository } from '../repositories/userQuote'
import { LineItemRepository } from '../repositories/lineItem'

const diMerge = () => {
	di.cart = {
		repos: {
			userQuote: new UserQuoteRepository(),
			lineItem: new LineItemRepository()
		}
	}
}

events.subscribe('diSetup', diMerge)
