/* eslint-disable */
import * as tf from '@tensorflow/tfjs'
import * as use from '@tensorflow-models/universal-sentence-encoder'


const embedSentences = async (query: string) => {
	const model = await use.load()
	const embeddings = await model.embed(query)
	return embeddings.arraySync()
}

export const searchCandidatesService = async (query: string) => {
	const candidatesRepo = di.candidate!.repos.candidate
	
	// VECTOR SEARCH
	await tf.ready()
	const queryEmbedding = await embedSentences(query)
	const documents = await candidatesRepo.vectorSearch(queryEmbedding)

	console.log('documents', documents)


	return documents
}
