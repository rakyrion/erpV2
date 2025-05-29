import { Command } from 'commander'
import { loadCandidatesCommand } from './loadCandidates'
import { embedCandidatesCommand } from './embedCandidates'
import { searchCandidatesCommand } from './searchCandidates'

const commands = (program: Command) => {
	const candidateCommands = new Command()
		.command('candidate')
		.description('Candidate module commands')
		.version('0.0.1')

	candidateCommands.addCommand(loadCandidatesCommand)
	candidateCommands.addCommand(embedCandidatesCommand)
	candidateCommands.addCommand(searchCandidatesCommand)

	program.addCommand(candidateCommands)
}

events.subscribe('binCommands', program => commands(program as Command))
