import express, { Router } from 'express'
import { addProductToCartRoute } from './addProductToCart'
import { getMyCartRoute } from './getMyCart'
import { createCheckoutSessionRoute } from './createCheckoutSession'
import { deleteLineFromCartRoute } from './deleteLineFromCart'


const mount = (appRouter: Router) => {
	const router = express.Router()

	router.get('/', ...getMyCartRoute())
	router.post('/', ...addProductToCartRoute())

	router.post('/checkout', ...createCheckoutSessionRoute())

	router.patch('/removeLineItem/:lineItemId', ...deleteLineFromCartRoute())
	
	appRouter.use('/cart', router)
}

events.subscribe('expressRoutes', appRouter => mount(appRouter as Router))
