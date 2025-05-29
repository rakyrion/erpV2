import '../../core/interfaces/dependencyInjector'
import { ICandidateRepository } from '../interfaces/repositories/candidate'

declare module '../../core/interfaces/dependencyInjector' {
	export interface IDependencyInjector {
		candidate?: {
			repos: {
				candidate: ICandidateRepository
			}
		}
	}
}
