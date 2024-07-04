import { IEntity } from '../../core/interfaces/entity'
import { IUser } from '../../user/interfaces/user'

export interface ILineItem extends IEntity {
	user: IUser,
	priceId: string,
	productId: string,
	productSku: string,
	productName: string,
	productDescription?: string,
	productPrice: number,
	qty: number,
	rowTotal: number
}
