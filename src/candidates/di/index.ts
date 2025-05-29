import { CandidateRepository } from '../repositories/candidate'

const diMerge = () => {
	di.candidate = {
		repos: {
			candidate: new CandidateRepository()
		}
	}
}

events.subscribe('diSetup', diMerge)
