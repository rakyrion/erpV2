export const i18nConfigSchema = {
	locales: {
		doc: 'Available locales.',
		format: Array,
		default: ['en_US']
	},
	defaultLocale: {
		doc: 'The default locale, en_US if not specified.',
		format: String,
		default: 'en_US'
	},
	fillWithDefault: {
		doc: 'Wether to fill locale missing entries with default locale ones or not.',
		format: Boolean,
		default: true
	}
}
