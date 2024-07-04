import { IEntity } from '../../../core/interfaces/entity'
import { UserDTO } from '../../../user/interfaces/dto/res/user'

export interface LineItemDTO extends IEntity {
	user?: UserDTO,
	productId: string,
	productSku: string,
	productName: string,
	productDescription?: string,
	productPrice: number,
	qty: number,
	rowTotal: number
}
