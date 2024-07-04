import { HydratedDocument } from 'mongoose'
import { ISubscription } from '../../interfaces/subscription'
import { SubscriptionModel } from '../../models/subscription'
import { BasePersistenceMapper } from '../../../core/mappers/persistence/base'
import { UserPersistenceMap } from '../../../user/mappers/persistence/user'

class SubscriptionPersistenceMapper extends BasePersistenceMapper<ISubscription> {
	protected _fromDB(entity: ISubscription & { _id?: string } | HydratedDocument<ISubscription>): ISubscription {
		return {
			user: UserPersistenceMap.fromDB(entity.user),
			subscribedSince: entity.subscribedSince,
			totalSubscribedMonths: entity.totalSubscribedMonths,
			lastPayment: entity.lastPayment,
			validUntil: entity.validUntil,
			subscriptionType: entity.subscriptionType,
			paymentMethod: entity.paymentMethod,
			autoRenew: entity.autoRenew
		}
	}

	protected _toDB(entity: Partial<ISubscription>): HydratedDocument<ISubscription> {
		return new SubscriptionModel({
			...entity,
			...entity.id && { _id: entity.id },
			id: undefined,
			user: entity.user ? UserPersistenceMap.toDB(entity.user) : undefined

		})
	}
}

export const SubscriptionPersistenceMap = new SubscriptionPersistenceMapper()
