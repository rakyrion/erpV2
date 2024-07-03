import path from 'path'
import convict, { Schema } from 'convict'
import { IConfigSchema } from './interfaces/configSchema'

events.subscribe('applicationStart', async () => {
	// Custom formats
	await events.publish('configCustomFormatSetup')

	// Configuration schema
	const configSchema = {}
	await events.publish('configSchemaMerging', configSchema)
	global.config = convict(configSchema as Schema<IConfigSchema>)

	// Folder /config
	const configPath = path.join(__dirname, '../../config')
	
	// Load default configuration
	try {
		config.loadFile(`${configPath}/config.json`)
	} catch (err) { /* silence */ }
	
	// Load environment configuration
	try {
		config.loadFile(`${configPath}/config.${config.get('core.env')}.json`)
	} catch (err) { /* silence */ }

	// Validate loaded configuration
	config.validate()

	void events.publish('configLoaded')
})
