import { BaseRepository } from '../../database/repositories/base'
import { ILineItem } from '../interfaces/lineItem'
import { ILineItemRepository } from '../interfaces/repositories/lineItem'
import { LineItemPersistenceMap } from '../mappers/persistence/lineItem'
import { LineItemModel } from '../models/lineItem'

export class LineItemRepository extends BaseRepository<ILineItem> implements ILineItemRepository {
	constructor() {
		super(LineItemModel, LineItemPersistenceMap)
	}
}
