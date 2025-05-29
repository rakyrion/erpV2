import { Command } from 'commander'
import { loadCandidatesService } from '../services/loadCandidates'

const action = async (options: { quantity?: string }) => {
	await loadCandidatesService(Number(options.quantity))
	process.exit()
}

export const loadCandidatesCommand = new Command()
	.command('loadCandidates')
	.description('Load fake candidates to DDBB')
	.version('0.0.1')
	.showHelpAfterError('(add --help for additional information)')
	.showSuggestionAfterError()
	.option('-q, --quantity <string>')
	.action(action)
