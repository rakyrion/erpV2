import { Command } from 'commander'
import { processCandidates } from '../services/embed'

const action = async () => {
	await processCandidates()
	process.exit()
}

export const embedCandidatesCommand = new Command()
	.command('embedCandidates')
	.description('Embed candidates on DDBB')
	.version('0.0.1')
	.showHelpAfterError('(add --help for additional information)')
	.showSuggestionAfterError()
	.action(action)
