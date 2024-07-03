import { IAuthenticable } from '../interfaces/authenticable'
import { IAuthOptions } from '../interfaces/authOptions'
import { sendEmailService } from '../../email/services/sendEmail'

export const sendWelcomeEmailService = async <T extends IAuthenticable>(
	user: T,
	options: IAuthOptions
): Promise<void> => {
	const { emailSubject: subject, emailTemplate, useFallbackTemplate } = options.signup
	const templates = [emailTemplate]
	if (useFallbackTemplate) templates.push('/auth/assets/templates/email/signup')
	await sendEmailService({ to: user.email, subject }, templates, { user })
}
