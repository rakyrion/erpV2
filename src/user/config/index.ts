import { Schema } from 'convict'
import { IConfigSchema } from '../../config/interfaces/configSchema'
import { getAuthConfigSchema } from '../../auth/config/schema'

const merge = (configSchema: Schema<IConfigSchema>) => {
	configSchema.user = {
		auth: getAuthConfigSchema('user')
	}
}

events.subscribe('configSchemaMerging', configSchema => merge(configSchema as Schema<IConfigSchema>))
