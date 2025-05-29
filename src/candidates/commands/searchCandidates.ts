import { Command } from 'commander'
import { searchCandidatesService } from '../services/searchCandidates'

const action = async (options: { query: string }) => {
	await searchCandidatesService(options.query)
	process.exit()
}

export const searchCandidatesCommand = new Command()
	.command('searchCandidates')
	.description('Search fake candidates to DDBB')
	.version('0.0.1')
	.showHelpAfterError('(add --help for additional information)')
	.showSuggestionAfterError()
	.option('-q, --query <string>')
	.action(action)
