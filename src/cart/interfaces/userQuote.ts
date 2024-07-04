import { IEntity } from '../../core/interfaces/entity'
import { IUser } from '../../user/interfaces/user'
import { ILineItem } from './lineItem'

export interface IUserQuote extends IEntity {
	user: IUser,
	status: string,
	lineItems: ILineItem[],
	couponCode?: string,
	subtotal: number,
	discountAmount: number,
	grandTotal: number
}
