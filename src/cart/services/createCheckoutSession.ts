import { BadRequestError } from '../../app/errors/badRequest'
import { IUser } from '../../user/interfaces/user'
import { EUserQuotestatus } from '../models/enumerations/userQuoteStatus'
import { createStripeCustomerService } from './createStripeCustomer'

export const createCheckoutSessionService = async (
	user: IUser
) => {
	const userQuoteRepo = di.cart!.repos.userQuote
	
	let customerId: string
	if (!user.stripeId) {
		const customer = await createStripeCustomerService(user)
		customerId = customer.id
	} else {
		customerId = user.stripeId
	}

	// Get cart and items
	const userQuote = await userQuoteRepo.getActiveByUserIdAndStatus(
		user.id!,
		EUserQuotestatus.NEW,
		{ populate: ['lineItems'] }
	)
	
	
	const line_items = userQuote.lineItems.map(lineItem => ({
		quantity: lineItem.qty,
		price: lineItem.priceId
	}))
	

	if (!line_items.length) throw new BadRequestError('Your cart is empty.')

	// Create session
	const session = await di.stripe!.client.checkout.sessions.create({
		success_url: config.get('stripe.successUrl'),
		cancel_url: config.get('stripe.cancelUrl'),
		line_items,
		customer: customerId,
		mode: 'subscription',
		payment_method_types: ['card'],
		payment_intent_data: {
			/* metadata: {
				// AQUÍ SE INCLUIRÍAN LOS METADATOS PARA EL INTENTO DE PAGO
			} */
		},
		allow_promotion_codes: true
	})

	// Deactivate company manager quote to create another
	await userQuoteRepo.update(userQuote.id!, {
		status: EUserQuotestatus.COMPLETED,
		active: false
	})

	return session
}
