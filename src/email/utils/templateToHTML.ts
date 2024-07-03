import path from 'path'
import { access, readFile, constants } from 'fs/promises'
import { compile } from 'handlebars'
import { EmailError } from '../errors/email'

const templateFunctions = new Map<string, HandlebarsTemplateDelegate>()

export const templateToHTML = async (templates: string | string[], locals: object): Promise<string> => {
	if (!Array.isArray(templates)) templates = [templates]
	const [template] = templates

	let templateFunction = templateFunctions.get(template)

	if (!templateFunction) {
		const templatePromises = templates.map(async template => {
			const filePath = path.join(__dirname, `../../${template}.hbs`)

			try {
				await access(filePath, constants.F_OK)
				return { path: filePath, exists: true }
			} catch (err) {
				return { path: filePath, exists: false }
			}
		})

		const templateFiles = await Promise.all(templatePromises)
		const templateFile = templateFiles.find(file => file.exists)
		if (!templateFile) throw new EmailError('Email template does not exist.')

		const templateContents = await readFile(templateFile.path, 'utf8')
		templateFunction = compile(templateContents)
		templateFunctions.set(template, templateFunction)
	}
	
	return templateFunction(locals)
}
