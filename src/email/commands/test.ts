import { Command } from 'commander'
import { sendEmailService } from '../services/sendEmail'
import { closeConnection } from '../../database/utils/closeConnection'

// TODO: email templates
const action = (to: string, options: { from?: string }) => {
	sendEmailService({ from: options.from, to, subject: 'Mail test' }, 'util/assets/templates/email/test')
		.catch(err => err instanceof Error && log.error(err.message, 'email', err))
		.finally(async () => {
			await closeConnection()
			process.exit()
		})
}

export const testCommand = new Command()
	.command('test')
	.description('Sends a test email.')
	.version('0.0.1')
	.showHelpAfterError('(add --help for additional information)')
	.showSuggestionAfterError()
	.argument('<to>', 'Recipient email.')
	.option('-f, --from <string>', 'Sender email (may include a display name).')
	.action(action)
