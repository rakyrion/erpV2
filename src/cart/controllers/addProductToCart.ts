import { EJsendStatus } from '../../app/models/enumerations/jsendStatus'
import { IUser } from '../../user/interfaces/user'
import { AddProductToCartReqDTO } from '../interfaces/dto/req/addProductToCart'
import { addProductToCartService } from '../services/addProductToCart'

export const addProductToCartController = reqCatch(async (req, res) => {
	const lineItem = req.body as AddProductToCartReqDTO

	const cart = await addProductToCartService(req.user as IUser, lineItem)

	res.status(200).json({
		status: EJsendStatus.SUCCESS,
		data: { ...cart }
	})
})
