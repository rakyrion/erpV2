import { Command } from 'commander'
import { i18nCompileCommand } from './i18nCompile'

const commands = (program: Command) => {
	const i18nCommands = new Command()
		.command('i18n')
		.description('i18n module commands')
		.version('0.0.1')

	i18nCommands.addCommand(i18nCompileCommand)

	program.addCommand(i18nCommands)
}

events.subscribe('binCommands', program => commands(program as Command))
