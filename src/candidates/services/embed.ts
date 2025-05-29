/* eslint-disable */
import * as tf from '@tensorflow/tfjs'
import * as use from '@tensorflow-models/universal-sentence-encoder'

export const embedSentences = async (data: { id: string, sentence: string }[]) => {
	const model = await use.load()

	const result: { id: string, embeddings: number[][] }[] = []
	for (const item of data) {
		const embeddings = await model.embed(item.sentence)
		const embedArray = embeddings.arraySync()
		result.push({ id: item.id, embeddings: embedArray })
	}
	
	return result
}

export const processCandidates = async () => {
	try {
		await tf.ready()
		console.log('TensorFlow ready')
		const candidates = await di.candidate!.repos.candidate.find({}, { skipPagination: true })
		const test: { id: string, sentence: string }[] = []
		for (const candidate of candidates) {
			const technologies = candidate.technologies.flatMap((technology: string) => technology.split(','))

			const sentence = [
				candidate.fullname,
				candidate.gender,
				...candidate.skills,
				...candidate.softSkills,
				...technologies
			].filter(sentence => sentence !== undefined).join('. ')

			test.push({ id: candidate.id!, sentence })
		}

		const embeds = await embedSentences(test)

		for (const item of embeds) {
			const candidate = await di.candidate!.repos.candidate.findById(item.id)
			if (candidate) {
				candidate.embedding = item.embeddings[0]
				const saved = await di.candidate!.repos.candidate.save(candidate)
				console.log('saved', saved)
			}
		}

		console.log('Finished processing candidates')
	} catch (error) {
		console.error('Error processing candidates:', error)
	}
}
