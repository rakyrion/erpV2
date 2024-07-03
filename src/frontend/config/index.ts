import { Schema } from 'convict'
import { IConfigSchema } from '../../config/interfaces/configSchema'
import { frontendConfigSchema } from './schema'

const merge = (configSchema: Schema<IConfigSchema>) => {
	configSchema.frontend = frontendConfigSchema
}

events.subscribe('configSchemaMerging', configSchema => merge(configSchema as Schema<IConfigSchema>))
