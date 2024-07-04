import { BaseDtoMapper } from '../../../../core/mappers/dto/base'
import { UserDtoMap } from '../../../../user/mappers/dto/user'
import { LineItemDTO } from '../../../interfaces/dto/lineItem'
import { UserQuoteResDTO } from '../../../interfaces/dto/res/userQuote'
import { IUserQuote } from '../../../interfaces/userQuote'
import { LineItemDtopMap } from './lineItem'

class UserQuoteDtoMapper extends BaseDtoMapper<IUserQuote, UserQuoteResDTO> {
	protected _toDTO(entity: IUserQuote): UserQuoteResDTO | undefined {
		if (typeof entity.id !== 'string') return undefined

		return {
			user: UserDtoMap.toDTO(entity.user),
			status: entity.status,
			lineItems: entity.lineItems
				.map(lineItem => LineItemDtopMap.toDTO(lineItem))
				.filter(lineItem => lineItem !== undefined) as LineItemDTO[],
			couponCode: entity.couponCode,
			subtotal: entity.subtotal,
			discountAmount: entity.discountAmount,
			grandTotal: entity.grandTotal
		}
	}
}

export const UserQuoteDtoMap = new UserQuoteDtoMapper()
