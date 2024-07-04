import { BaseDtoMapper } from '../../../core/mappers/dto/base'
import { ISubscription } from '../../interfaces/subscription'
import { SubscriptionDTO } from '../../interfaces/dto/res/subscription'
import { UserDtoMap } from '../../../user/mappers/dto/user'

class SubscriptionDtoMapper extends BaseDtoMapper<ISubscription, SubscriptionDTO> {
	protected _toDTO(entity: ISubscription): SubscriptionDTO | undefined {
		if (typeof entity.id !== 'string') return undefined

		return {
			user: UserDtoMap.toDTO(entity.user)!,
			subscribedSince: entity.subscribedSince,
			totalSubscribedMonths: entity.totalSubscribedMonths,
			lastPayment: entity.lastPayment,
			validUntil: entity.validUntil,
			subscriptionType: entity.subscriptionType,
			paymentMethod: entity.paymentMethod,
			autoRenew: entity.autoRenew,
			cancelledAt: entity.cancelledAt

		}
	}
}

export const SubscriptionDtoMap = new SubscriptionDtoMapper()
