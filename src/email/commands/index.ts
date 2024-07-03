import { Command } from 'commander'
import { testCommand } from './test'

const commands = (program: Command) => {
	const emailCommands = new Command()
		.command('email')
		.description('Email module commands')
		.version('0.0.1')

	emailCommands.addCommand(testCommand)

	program.addCommand(emailCommands)
}

events.subscribe('binCommands', program => commands(program as Command))
