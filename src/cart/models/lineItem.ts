import { Schema, model } from 'mongoose'
import { ILineItem } from '../interfaces/lineItem'

const lineItemSchema = new Schema<ILineItem>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		priceId: {
			type: String
		},
		productId: {
			type: String,
			required: true
		},
		productSku: {
			type: String,
			required: true
		},
		productName: {
			type: String,
			required: true
		},
		productDescription: {
			type: String,
			required: false
		},
		productPrice: {
			type: Number,
			required: true
		},
		qty: {
			type: Number,
			required: true,
			min: 1
		}
	}, { collection: 'lineItems' }
)

export const LineItemModel = model<ILineItem>('LineItem', lineItemSchema)
