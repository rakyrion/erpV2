import { Client } from 'whatsapp-web.js'
import '../../core/interfaces/dependencyInjector'

declare module '../../core/interfaces/dependencyInjector' {
	export interface IDependencyInjector {
		whatsappBot?: {
			client: Client
		}
	}
}
