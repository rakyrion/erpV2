import crypto from 'crypto'
import { IAuthenticable } from '../interfaces/authenticable'
import { IAuthenticableRepository } from '../interfaces/repositories/authenticable'
import { IAuthOptions } from '../interfaces/authOptions'
import { DatabaseTransaction } from '../../database/models/transaction'
import { sendEmailService } from '../../email/services/sendEmail'
import { buildUrl } from '../../core/utils/buildUrl'

export const forgotPasswordService = async <T extends IAuthenticable>(
	repo: IAuthenticableRepository<T>,
	email: string,
	options: IAuthOptions,
	eventName?: string
): Promise<void> => {
	const transaction = new DatabaseTransaction()
	await transaction.start()

	try {
		// Generate password reset token
		const user = await repo.getByEmail(email, { transaction })
		const { length, expiration } = options.password.resetToken
		const resetToken = crypto.randomBytes(length).toString('hex')
		user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
		user.passwordResetExpires = new Date(Date.now() + expiration)
		await repo.save(user, { transaction })
		if (eventName) await events.publish(eventName, user, transaction, resetToken)

		// Send password reset URL by email
		const { baseUrl } = config.get('frontend')
		const { frontendUri, emailSubject: subject, emailTemplate, useFallbackTemplate } = options.resetPassword
		const url = buildUrl(`${baseUrl}${frontendUri}`, { resetToken })
		const templates = [emailTemplate]
		if (useFallbackTemplate) templates.push('/auth/assets/templates/email/resetPassword')
		await sendEmailService({ to: email, subject }, templates, { url, user })

		await transaction.commit()
	} catch (err) {
		await transaction.abort()
	}
}
