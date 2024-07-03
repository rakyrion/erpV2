import crypto from 'crypto'
import { compare } from 'bcryptjs'
import { IAuthenticable } from '../interfaces/authenticable'
import { IAuthenticableRepository } from '../interfaces/repositories/authenticable'
import { IAuthOptions } from '../interfaces/authOptions'
import { DatabaseTransaction } from '../../database/models/transaction'
import { sendEmailService } from '../../email/services/sendEmail'
import { buildUrl } from '../../core/utils/buildUrl'
import { LoginError } from '../errors/login'
import { BadRequestError } from '../../app/errors/badRequest'

export const changeEmailRequestService = async <T extends IAuthenticable>(
	repo: IAuthenticableRepository<T>,
	user: T,
	newEmail: string,
	options: IAuthOptions,
	eventName?: string,
	currentPassword?: string
): Promise<void> => {
	// Check current password
	if (currentPassword) {
		if (!user.passwordHash || !await compare(currentPassword, user.passwordHash)) throw new LoginError()
	}

	// Check there is no user with that email
	let userExists = false
	try {
		await repo.getByEmail(newEmail, { inactive: 'include' })
		userExists = true
	} catch { /* Silence */ }
	if (userExists) throw new BadRequestError('', undefined, { document: 'already exists' })

	const transaction = new DatabaseTransaction()
	await transaction.start()

	try {
		// Generate email change token
		const { length, expiration } = options.email.changeToken
		const changeToken = crypto.randomBytes(length).toString('hex')
		user.emailChangeToken = crypto.createHash('sha256').update(changeToken).digest('hex')
		user.emailChangeExpires = new Date(Date.now() + expiration)
		user.emailChangeRequested = newEmail
		await repo.save(user, { transaction })
		if (eventName) await events.publish(eventName, user, transaction, user.email, newEmail, changeToken)

		// Send email change URL by email
		const { baseUrl } = config.get('frontend')
		const { frontendUri, emailSubject, emailTemplate, useFallbackTemplate } = options.changeEmail.request
		const url = buildUrl(`${baseUrl}${frontendUri}`, { changeToken })
		const templates = [emailTemplate]
		if (useFallbackTemplate) templates.push('/auth/assets/templates/email/changeEmailRequest')
		await sendEmailService({ to: newEmail, subject: emailSubject }, templates, { url, user })

		await transaction.commit()
	} catch (err) {
		await transaction.abort()
		throw err as Error
	}
}
