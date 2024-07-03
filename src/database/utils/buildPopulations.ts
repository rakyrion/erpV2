import { PopulateOptions } from 'mongoose'

type nestedObject = { [index: string]: nestedObject }

const buildPaths = (paths: nestedObject): PopulateOptions[] => {
	const result: PopulateOptions[] = []

	Object.entries(paths).forEach(([ path, subPaths ]) => {
		result.push({ path, ...Object.keys(subPaths).length && { populate: buildPaths(subPaths) } })
	})

	return result
}

export const buildPopulations = (
	populations: string[],
	populationSeparator: string = '.',
	objectSeparator: string = '+'
): PopulateOptions[] => {
	const paths: nestedObject = {}
	populations.forEach(population => {
		let currentPath: nestedObject = paths
		let remainingPath: string = ''
		population.split(populationSeparator).forEach(path => {
			const [ objectPath, ...objectRemainingPath ] = path.replaceAll(objectSeparator, '.').split('.')
			const currentLevelPath = remainingPath ? `${remainingPath}.${objectPath}` : objectPath
			remainingPath = objectRemainingPath.join('.')
			if (typeof currentPath[currentLevelPath] === 'undefined') currentPath[currentLevelPath] = {}
			currentPath = currentPath[currentLevelPath]
		})
	})

	return buildPaths(paths)
}
