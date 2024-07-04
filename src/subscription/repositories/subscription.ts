import { BaseRepository } from '../../database/repositories/base'
import { ISubscriptionRepository } from '../interfaces/repositories/subscription'
import { ISubscription } from '../interfaces/subscription'
import { SubscriptionPersistenceMap } from '../mappers/persistence/subscription'
import { SubscriptionModel } from '../models/subscription'

export class SubscriptionRepository extends BaseRepository<ISubscription> implements ISubscriptionRepository {
	constructor() {
		super(SubscriptionModel, SubscriptionPersistenceMap)
	}
}
