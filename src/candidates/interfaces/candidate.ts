import { IEntity } from '../../core/interfaces/entity'


export interface ICandidate extends IEntity {
	fullname: string,
	skills: string[],
	softSkills: string[],
	technologies: string[],
	gender?: string,
	embedding?: number[]

}
