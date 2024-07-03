import { Schema } from 'convict'
import { IConfigSchema } from '../../config/interfaces/configSchema'
import { emailConfigSchema } from './schema'

const merge = (configSchema: Schema<IConfigSchema>) => {
	configSchema.email = emailConfigSchema
}

events.subscribe('configSchemaMerging', configSchema => merge(configSchema as Schema<IConfigSchema>))
