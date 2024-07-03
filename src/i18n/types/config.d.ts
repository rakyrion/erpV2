import '../../config/interfaces/configSchema'
import { Schema } from 'convict'

declare module '../../config/interfaces/configSchema' {
	export interface IConfigSchema {
		i18n: {
			locales: Schema<string>[],
			defaultLocale: Schema<string>,
			fillWithDefault: Schema<boolean>
		}
	}
}
