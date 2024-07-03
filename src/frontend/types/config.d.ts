import '../../config/interfaces/configSchema'
import { Schema } from 'convict'

declare module '../../config/interfaces/configSchema' {
	export interface IConfigSchema {
		frontend: {
			baseUrl: Schema<string>
		}
	}
}
