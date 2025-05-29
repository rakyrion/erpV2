import { HydratedDocument } from 'mongoose'
import { ICandidate } from '../../interfaces/candidate'
import { CandidateModel } from '../../models/candidate'
import { BasePersistenceMapper } from '../../../core/mappers/persistence/base'

class CandidatePersistenceMapper extends BasePersistenceMapper<ICandidate> {
	protected _fromDB(entity: ICandidate & { _id?: string } | HydratedDocument<ICandidate>): ICandidate {
		return {
			id: entity.id ? entity.id as string : entity._id!.toString(),
			fullname: entity.fullname,
			skills: entity.skills,
			softSkills: entity.softSkills,
			technologies: entity.technologies,
			gender: entity.gender
		}
	}

	protected _toDB(entity: Partial<ICandidate>): HydratedDocument<ICandidate> {
		return new CandidateModel({
			...entity,
			...entity.id && { _id: entity.id },
			id: undefined
		})
	}
}

export const CandidatePersistenceMap = new CandidatePersistenceMapper()
