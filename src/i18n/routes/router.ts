import express, { Router } from 'express'
import { getTranslationsForLocaleRoute } from './getTranslationsForLocale'

const mount = (appRouter: Router) => {
	const router = express.Router()

	router.get('/', ...getTranslationsForLocaleRoute())

	appRouter.use('/i18n', router)
}

events.subscribe('expressRoutes', appRouter => mount(appRouter as Router))
