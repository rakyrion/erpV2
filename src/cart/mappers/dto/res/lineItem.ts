import { BaseDtoMapper } from '../../../../core/mappers/dto/base'
import { UserDtoMap } from '../../../../user/mappers/dto/user'
import { LineItemDTO } from '../../../interfaces/dto/lineItem'
import { ILineItem } from '../../../interfaces/lineItem'

class LineItemDtoMapper extends BaseDtoMapper<ILineItem, LineItemDTO> {
	protected _toDTO(entity: ILineItem): LineItemDTO | undefined {
		if (typeof entity.id !== 'string') return undefined
		
		return {
			id: entity.id,
			user: UserDtoMap.toDTO(entity.user),
			productId: entity.productId,
			productSku: entity.productSku,
			productName: entity.productName,
			productDescription: entity.productDescription,
			productPrice: entity.productPrice,
			qty: entity.qty,
			rowTotal: entity.productPrice * entity.qty
		}
	}
}

export const LineItemDtopMap = new LineItemDtoMapper()
