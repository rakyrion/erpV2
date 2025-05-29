import { IBaseRepository } from '../../../database/interfaces/repositories/base'
import { ICandidate } from '../candidate'

export interface ICandidateRepository extends IBaseRepository<ICandidate> {
	vectorSearch(vectorQuery: number[][]): Promise<(ICandidate & { score: number })[]>
}
