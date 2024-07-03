import { EJsendStatus } from '../../app/models/enumerations/jsendStatus'
import { LocaleError } from '../errors/locale'

export const getTranslationsForLocaleController = reqCatch((req, res, next) => {
	const { locale } = req.headers
	if (typeof locale !== 'string') throw new LocaleError()

	return res.status(200).json({
		status: EJsendStatus.SUCCESS,
		data: translations[locale]
	})
})
