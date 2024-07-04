import { IEntity } from '../../core/interfaces/entity'
import { IUser } from '../../user/interfaces/user'
import { EPaymentMethod } from '../models/enumerations/paymentMethod'
import { ESubscriptionType } from '../models/enumerations/subscriptionType'


export interface ISubscription extends IEntity {
	user: IUser,
	subscribedSince: Date,
	totalSubscribedMonths: number,
	lastPayment: Date,
	validUntil: Date,
	subscriptionType: ESubscriptionType,
	paymentMethod: EPaymentMethod,
	autoRenew: boolean,
	cancelledAt?: Date
}
