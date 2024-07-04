import { UserDTO } from '../../../../user/interfaces/dto/res/user'
import { LineItemDTO } from '../lineItem'


export interface UserQuoteResDTO {
	user?: UserDTO,
	status: string,
	lineItems: LineItemDTO[],
	couponCode?: string,
	subtotal: number,
	discountAmount: number,
	grandTotal: number
}
