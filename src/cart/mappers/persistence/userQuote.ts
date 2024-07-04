import { HydratedDocument } from 'mongoose'
import { BasePersistenceMapper } from '../../../core/mappers/persistence/base'
import { IUserQuote } from '../../interfaces/userQuote'
import { LineItemPersistenceMap } from './lineItem'
import { UserPersistenceMap } from '../../../user/mappers/persistence/user'
import { UserQuoteModel } from '../../models/userQuote'

class UserQuotePersistenceMapper extends BasePersistenceMapper<IUserQuote> {
	protected _fromDB(
		entity: IUserQuote & { _id?: string } | HydratedDocument<IUserQuote>
	): IUserQuote {
		return {
			id: entity.id ? entity.id as string : entity._id!.toString(),
			user: UserPersistenceMap.fromDB(entity.user),
			status: entity.status,
			lineItems: entity.lineItems.map(lineItem => LineItemPersistenceMap.fromDB(lineItem)),
			couponCode: entity.couponCode,
			subtotal: entity.subtotal,
			discountAmount: entity.discountAmount,
			grandTotal: entity.grandTotal
		}
	}

	protected _toDB(entity: Partial<IUserQuote>): HydratedDocument<IUserQuote> {
		return new UserQuoteModel({
			...entity,
			...entity.id && { _id: entity.id },
			id: undefined,
			user: entity.user ? UserPersistenceMap.toDB(entity.user) : undefined,
			lineItems: entity.lineItems ?
				entity.lineItems.map(lineItem => LineItemPersistenceMap.toDB(lineItem)) :
				undefined
		})
	}
}

export const UserQuotePersistenceMap = new UserQuotePersistenceMapper()
