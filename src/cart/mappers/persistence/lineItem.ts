import { HydratedDocument } from 'mongoose'
import { BasePersistenceMapper } from '../../../core/mappers/persistence/base'
import { ILineItem } from '../../interfaces/lineItem'
import { LineItemModel } from '../../models/lineItem'
import { UserPersistenceMap } from '../../../user/mappers/persistence/user'

class LineItemPersistenceMapper extends BasePersistenceMapper<ILineItem> {
	protected _fromDB(entity: (ILineItem & { _id?: string }) | HydratedDocument<ILineItem>): ILineItem {
		return {
			id: entity.id ? entity.id as string : entity._id!.toString(),
			user: UserPersistenceMap.fromDB(entity.user),
			priceId: entity.priceId,
			productId: entity.productId,
			productSku: entity.productSku,
			productName: entity.productName,
			productDescription: entity.productDescription,
			productPrice: entity.productPrice,
			qty: entity.qty,
			rowTotal: entity.qty * entity.productPrice
		}
	}

	protected _toDB(entity: Partial<ILineItem>): HydratedDocument<ILineItem> {
		return new LineItemModel({
			...entity,
			...entity.id && { _id: entity.id },
			id: undefined,
			user: entity.user ? UserPersistenceMap.toDB(entity.user) : undefined
		})
	}
}

export const LineItemPersistenceMap = new LineItemPersistenceMapper()
