import { Schema, model } from 'mongoose'
import { ICandidate } from '../interfaces/candidate'

const candidateSchema = new Schema<ICandidate>(
	{
		fullname: {
			type: String,
			required: true
		},
		skills: [{
			type: String
		}],
		softSkills: [{
			type: String
		}],
		technologies: [{
			type: String
		}],
		gender: {
			type: String
		},
		embedding: {
			type: Array
		}

	},
	{ collection: 'candidates' }
)

export const CandidateModel = model<ICandidate>('Candidate', candidateSchema)
