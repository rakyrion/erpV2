import { DatabaseTransaction } from '../../database/models/transaction'
import { IUser } from '../../user/interfaces/user'
import { AddProductToCartReqDTO } from '../interfaces/dto/req/addProductToCart'
import { ILineItem } from '../interfaces/lineItem'
import { getOrCreateCartIfnotexistsService } from './getOrCreateCartIfNotExistsService'

export const addProductToCartService = async (
	user: IUser,
	productData: AddProductToCartReqDTO
) => {
	const userQuoteRepo = di.cart!.repos.userQuote
	const lineItemRepo = di.cart!.repos.lineItem

	const transaction = new DatabaseTransaction()
	await transaction.start()

	try {
		const userQuote = await getOrCreateCartIfnotexistsService(user, { transaction })

		// Get product from stripe by priceId
		const stripePrice = await di.stripe!.client.prices.retrieve(productData.priceId)
		const stripeProduct = await di.stripe!.client.products.retrieve(stripePrice.product as string)

		let quantity: number | undefined

		// Create lineItem
		const lineItemBody: ILineItem = {
			user,
			priceId: productData.priceId,
			productId: stripeProduct.id,
			productSku: stripeProduct.metadata.sku || 'none',
			productName: stripeProduct.name,
			productDescription: stripeProduct.description !== null ? stripeProduct.description : undefined,
			productPrice: stripePrice.unit_amount!,
			qty: quantity !== undefined ? quantity : productData.qty!,
			rowTotal: quantity ? quantity * stripePrice.unit_amount! : productData.qty! * stripePrice.unit_amount!
		}

		const lineItem = await lineItemRepo.create(lineItemBody, { transaction })
		
		// Push lineItem to quote
		const subtotal = userQuote.subtotal + lineItem.rowTotal
		const grandTotal = subtotal - userQuote.discountAmount
		const userQuoteUpdated = await userQuoteRepo.update(userQuote.id!, {
			$push: { lineItems: lineItem.id },
			subtotal,
			grandTotal
		}, {
			populate: ['lineItems'],
			transaction
		})

		await transaction.commit()
		return userQuoteUpdated
	} catch (error) {
		await transaction.abort()
		throw error instanceof Error ? error : new Error('Could not add product to cart')
	}
}
