import { connect, connection, ConnectOptions, plugin, Schema } from 'mongoose'
import { EEnv } from '../core/models/enumerations/env'
import { coreConfig } from '../core/config/static'
import { databaseConfig } from './config/static'

const options = databaseConfig.get('database')

// Connection string
const { connectionString, protocol, host, username, password, name } = options
if (!connectionString) {
	if (!protocol) throw new Error('Database connection data not valid: protocol missing.')
	if (!host) throw new Error('Database connection data not valid: host missing.')
	if (!username) throw new Error('Database connection data not valid: username missing.')
	if (!password) throw new Error('Database connection data not valid: password missing.')
	if (!name) throw new Error('Database connection data not valid: name missing.')
}
const dbUri = connectionString || `${protocol}://${username}:${password}@${host}/${name}`

// Connection parameters
const inProduction = coreConfig.get('core.env') === EEnv.PRODUCTION
const dbUpdate = !inProduction || options.updateProduction
const { family, ssl, sslValidate } = options.connection
const { min: minPoolSize, max: maxPoolSize } = options.connection.poolSize
const dbOptions: ConnectOptions = {
	retryWrites: true,
	w: 'majority',
	autoCreate: dbUpdate,
	autoIndex: dbUpdate,
	family,
	minPoolSize,
	maxPoolSize,
	ssl,
	sslValidate
}

// Global database plugins
plugin((schema: Schema): void => void schema.set('minimize', options.schema.minimize))
plugin((schema: Schema): void => void schema.set('timestamps', options.schema.timestamps))
plugin((schema: Schema): void => void schema.set('toJSON', options.schema.toJSON))
plugin((schema: Schema): void => void schema.set('toObject', options.schema.toObject))

// Database connection
void connect(dbUri, dbOptions)

log.verbose('Database connection successful', 'database')

// Disconnection handling
connection.on('disconnected', () => {
	log.verbose('Disconnected from database.', 'database')
})

// Connection error handling
connection.on('error', err => {
	if (err instanceof Error) throw err
})
