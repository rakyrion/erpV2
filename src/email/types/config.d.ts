import '../../config/interfaces/configSchema'
import { Schema } from 'convict'

declare module '../../config/interfaces/configSchema' {
	export interface IConfigSchema {
		email: {
			sender: {
				name: Schema<string>,
				email: Schema<string>
			},
			smtp: {
				host: Schema<string>,
				port: Schema<number>,
				authMethod: Schema<string>,
				auth: {
					user: Schema<string>,
					pass: Schema<string>
				},
				secure: Schema<boolean>,
				connectionTimeout: Schema<number>
			}
		}
	}
}
