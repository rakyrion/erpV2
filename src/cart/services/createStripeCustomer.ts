import Stripe from 'stripe'
import { IUser } from '../../user/interfaces/user'
import { DatabaseTransaction } from '../../database/models/transaction'

export const createStripeCustomerService = async (
	user: IUser
) => {
	if (user.stripeId) throw new Error('The customer is already registered')
	const userRepo = di.user!.repos.user

	const transaction = new DatabaseTransaction()
	await transaction.start()

	try {
		// TODO: UPDATE STRIPE CUSTOMER IF WE ADD DATA TO USER ENTITY
		const stripeCustomer: Stripe.CustomerCreateParams = {
			address: undefined,
			description: undefined,
			email: user.email,
			name: `${user.firstname} ${user.lastname}`
		}

		const customer = await di.stripe!.client.customers.create(stripeCustomer)

		await userRepo.update(user.id!, {
			stripeId: customer.id
		}, { transaction })

		await transaction.commit()
		return customer
	} catch (error) {
		await transaction.abort()
		throw error instanceof Error ? error : new Error('Could not register customer')
	}
}
