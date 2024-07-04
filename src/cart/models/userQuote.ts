import { Schema, model } from 'mongoose'
import { IUserQuote } from '../interfaces/userQuote'
import { EUserQuotestatus } from './enumerations/userQuoteStatus'

const userQuoteSchema = new Schema<IUserQuote>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		status: {
			type: String,
			required: true
		},
		couponCode: {
			type: String,
			required: false
		},
		subtotal: {
			type: Number,
			required: true
		},
		discountAmount: {
			type: Number,
			required: true
		},
		grandTotal: {
			type: Number,
			required: true
		},
		active: {
			type: Boolean
		},
		lineItems: [{
			type: Schema.Types.ObjectId,
			ref: 'LineItem'
		}]
	},
	{ collection: 'userQuotes' }
)

userQuoteSchema.index(
	{ user: 1, status: 1 },
	{ unique: true, partialFilterExpression: { status: EUserQuotestatus.NEW } }
)

export const UserQuoteModel = model<IUserQuote>('UserQuote', userQuoteSchema)
