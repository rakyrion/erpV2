import { Schema, model } from 'mongoose'
import { ISubscription } from '../interfaces/subscription'
import { EPaymentMethod } from './enumerations/paymentMethod'


const subscriptionSchema = new Schema<ISubscription>({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	subscribedSince: {
		type: Date,
		required: true
	},
	totalSubscribedMonths: {
		type: Number,
		required: true
	},
	lastPayment: {
		type: Date,
		required: true
	},
	validUntil: {
		type: Date,
		required: true
	},
	subscriptionType: {
		type: String,
		enum: EPaymentMethod,
		required: true
	},
	paymentMethod: {
		type: String,
		enum: EPaymentMethod,
		required: true
	},
	autoRenew: {
		type: Boolean,
		required: true
	},
	cancelledAt: {
		type: Date
	}

})

export const SubscriptionModel = model<ISubscription>('Subscription', subscriptionSchema)
