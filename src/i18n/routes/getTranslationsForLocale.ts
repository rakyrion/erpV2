import { header } from 'express-validator'
import { validateFields } from '../../app/middlewares/validateFields'
import { getTranslationsForLocaleController } from '../controllers/getTranslationsForLocale'

export const getTranslationsForLocaleRoute = () => [
	header('locale', 'Missing or wrong locale.').custom((val: string) => config.get('i18n.locales').includes(val)),
	validateFields,
	getTranslationsForLocaleController
]
