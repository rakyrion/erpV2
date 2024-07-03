import '../../app/interfaces/appConfig'

declare module '../../app/interfaces/appConfig' {
	export interface IAppConfig {
		frontend?: {
			baseUrl: string
		}
	}
}
