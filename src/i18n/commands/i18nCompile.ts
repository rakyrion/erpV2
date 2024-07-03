import { Command } from 'commander'
import { i18nCompileService } from '../services/i18nCompile'

const action = async (locale: string) => {
	await i18nCompileService(locale)
	process.exit()
}

export const i18nCompileCommand = new Command()
	.command('compile')
	.description('Compile translations for specified locale.')
	.version('0.0.1')
	.showHelpAfterError('(add --help for additional information)')
	.showSuggestionAfterError()
	.argument('[locale]', 'Locale to compile, defaults to en_US if not specified.', 'en_US')
	.action(action)
