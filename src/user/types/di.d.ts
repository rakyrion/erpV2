import '../../core/interfaces/dependencyInjector'
import { IUserRepository } from '../interfaces/repositories/user'

declare module '../../core/interfaces/dependencyInjector' {
	export interface IDependencyInjector {
		user?: {
			repos: {
				user: IUserRepository
			}
		}
	}
}
