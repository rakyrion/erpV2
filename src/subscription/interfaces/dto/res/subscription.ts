import { UserDTO } from '../../../../user/interfaces/dto/res/user'


export interface SubscriptionDTO {
	user: UserDTO,
	subscribedSince: Date,
	totalSubscribedMonths: number,
	lastPayment: Date,
	validUntil: Date,
	subscriptionType: string,
	paymentMethod: string,
	autoRenew: boolean,
	cancelledAt?: Date
}
