import { Schema } from 'convict'
import { IConfigSchema } from '../../config/interfaces/configSchema'
import { i18nConfigSchema } from './schema'

const merge = (configSchema: Schema<IConfigSchema>) => {
	configSchema.i18n = i18nConfigSchema
}

events.subscribe('configSchemaMerging', configSchema => merge(configSchema as Schema<IConfigSchema>))
