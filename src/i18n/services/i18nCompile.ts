import path from 'path'
import fs from 'fs/promises'
import { glob } from 'glob'
import { ITranslation } from '../interfaces/translation'

export const i18nCompileService = async (locale: string): Promise<void> => {
	// Folders
	const srcPath = path.join(__dirname, '../../../src')
	const i18nPath = path.join(__dirname, '../../../i18n')

	// Translation object
	const translation: ITranslation = {}

	const files = await glob(`*/i18n/**/${locale}.json`, { cwd: srcPath })
	const promises = files.map(async file => fs.readFile(`${srcPath}/${file}`, 'utf8'))
	const fileContents = await Promise.all(promises)
	fileContents.forEach(contents => {
		const jsonContents = JSON.parse(contents) as ITranslation
		Object.assign(translation, jsonContents)
	})

	const i18nContents = JSON.stringify(translation, undefined, 2)
	await fs.writeFile(`${i18nPath}/${locale}-${Date.now()}.json`, i18nContents, 'utf8')
}
