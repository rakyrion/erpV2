import { compare } from 'bcryptjs'
import { IAuthenticable } from '../interfaces/authenticable'
import { IAuthenticableRepository } from '../interfaces/repositories/authenticable'
import { IAuthOptions } from '../interfaces/authOptions'
import { ITokens } from '../interfaces/tokens'
import { DatabaseTransaction } from '../../database/models/transaction'
import { createJwtTokens } from '../utils/createJwtTokens'
import { LoginError } from '../errors/login'

export const changeEmailService = async <T extends IAuthenticable>(
	repo: IAuthenticableRepository<T>,
	user: T,
	newEmail: string,
	options: IAuthOptions,
	eventName?: string,
	currentPassword?: string
): Promise<ITokens> => {
	// Check current password
	if (currentPassword) {
		if (!user.passwordHash || !await compare(currentPassword, user.passwordHash)) throw new LoginError()
	}

	const transaction = new DatabaseTransaction()
	await transaction.start()

	try {
		// We substract a second so JWT expiration is valid
		const credentialsChangedAt = new Date(Date.now() - 1000)

		// Save user
		const { email } = user
		const updatedUser = await repo.update(user.id!, {
			email: newEmail,
			credentialsChangedAt,
			$unset: { emailChangeToken: 1, emailChangeExpires: 1, emailChangeRequested: 1 }
		}, { transaction })

		if (eventName) await events.publish(eventName, updatedUser, transaction, email, newEmail)

		const tokens = createJwtTokens(updatedUser.id!, options)

		await transaction.commit()

		return tokens
	} catch (err) {
		await transaction.abort()
		throw err as Error
	}
}
