import path from 'path'
import fs from 'fs/promises'
import { ITranslation } from './interfaces/translation'

global.translations = {}

const i18nPath = path.join(__dirname, '../../i18n')

const i18nImport = async (locale: string): Promise<ITranslation> => {
	try {
		const fileContents = await fs.readFile(`${i18nPath}/${locale}.json`, 'utf8')
		return JSON.parse(fileContents) as ITranslation
	} catch (err) {
		return {}
	}
}

events.subscribe('configLoaded', async () => {
	const { defaultLocale, locales, fillWithDefault } = config.get('i18n')

	// Generate default locale
	translations[defaultLocale] = await i18nImport(defaultLocale)

	// Other locales
	const promises = [...new Set(locales)]
		.filter(locale => locale !== defaultLocale)
		.map(async locale => {
			translations[locale] = {}
			if (fillWithDefault) Object.assign(translations[locale], translations[defaultLocale])
			Object.assign(translations[locale], await i18nImport(locale))
		})
	
	await Promise.all(promises)

	void events.publish('i18nLoaded')
})
