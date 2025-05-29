import { ICandidate } from '../interfaces/candidate'
import { CandidateModel } from '../models/candidate'
import { BaseRepository } from '../../database/repositories/base'
import { ICandidateRepository } from '../interfaces/repositories/candidate'
import { CandidatePersistenceMap } from '../mappers/persistence/candidate'

export class CandidateRepository extends BaseRepository<ICandidate> implements ICandidateRepository {
	constructor() {
		super(CandidateModel, CandidatePersistenceMap)
	}

	public async vectorSearch(vectorQuery: number[][]): Promise<any> {
		const documents = await this.model.aggregate([
			{
				$vectorSearch: {
					index: 'vector_index',
					queryVector: vectorQuery[0],
					path: 'embedding',
					limit: 10,
					numCandidates: 200
				}
			},
			{
				$project: {
					fullname: 1,
					technologies: 1,
					skills: 1,
					softSkills: 1,
					gender: 1,
					score: { $meta: 'vectorSearchScore' }
				}
			}
		]) as unknown as Array<(ICandidate & { score: number })>

		const result = documents.map(candidate => ({
			...CandidatePersistenceMap.fromDB(candidate),
			score: candidate.score
		}))

		return result
	}

	/* public async textSearch(textQuery: string): Promise<(ICandidate & { score: number })[]> {
		const documents = await this.model.aggregate([
			{
				$search: {
					index: 'default',
					text: {
						query: textQuery,
						path: {
							wildcard: '*'
						}
					}
				}
			},
			{
				$project: {
					fullname: 1,
					technologies: 1,
					skills: 1,
					softSkills: 1,
					gender: 1,
					score: { $meta: 'searchScore' }
				}
			}
		]) as unknown as Array<(ICandidate & { score: number })>

		const result = documents.map(candidate => ({
			...CandidatePersistenceMap.fromDB(candidate),
			score: candidate.score
		}))

		return result
	} */
}
