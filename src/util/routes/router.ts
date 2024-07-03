import express, { Router } from 'express'

const mount = (appRouter: Router) => {
	const router = express.Router()

	router.get('/ip', (req, res, next) => res.send(req.ip))

	appRouter.use('/util', router)
}

events.subscribe('expressRoutes', appRouter => mount(appRouter as Router))
