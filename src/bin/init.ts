import { Command } from 'commander'

events.subscribe('diReady', async () => {
	const program = new Command()

	program
		.name('command')
		.description('Centralized command entrypoint.')
		.version('0.0.1')

	await events.publish('binCommands', program)

	program.parse()
})

void events.publish('applicationStart')
