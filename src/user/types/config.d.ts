import '../../config/interfaces/configSchema'
import { IAuthConfigSchema } from '../../auth/interfaces/authConfigSchema'

declare module '../../config/interfaces/configSchema' {
	export interface IConfigSchema {
		user: {
			auth: IAuthConfigSchema
		}
	}
}
