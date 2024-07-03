import { compare, hash } from 'bcryptjs'
import { IAuthenticable } from '../interfaces/authenticable'
import { IAuthenticableRepository } from '../interfaces/repositories/authenticable'
import { IAuthOptions } from '../interfaces/authOptions'
import { ITokens } from '../interfaces/tokens'
import { DatabaseTransaction } from '../../database/models/transaction'
import { passwordStrengthValidator } from '../utils/passwordStrengthValidator'
import { createJwtTokens } from '../utils/createJwtTokens'
import { LoginError } from '../errors/login'
import { PasswordError } from '../errors/password'

export const changePasswordService = async <T extends IAuthenticable>(
	repo: IAuthenticableRepository<T>,
	user: T,
	newPassword: string,
	options: IAuthOptions,
	eventName?: string,
	currentPassword?: string
): Promise<ITokens> => {
	// Check current password
	if (currentPassword) {
		if (!user.passwordHash || !await compare(currentPassword, user.passwordHash)) throw new LoginError()
	}

	// Check new password
	if (!passwordStrengthValidator(newPassword, options)) throw new PasswordError()

	const transaction = new DatabaseTransaction()
	await transaction.start()

	try {
		// Get password hash
		const passwordHash = await hash(newPassword, options.password.saltLength)

		// We substract a second so JWT expiration is valid
		const credentialsChangedAt = new Date(Date.now() - 1000)

		// Save user
		const updatedUser = await repo.update(user.id!, {
			passwordHash,
			credentialsChangedAt,
			$unset: { passwordResetToken: 1, passwordResetExpires: 1 }
		}, { transaction })

		if (eventName) await events.publish(eventName, updatedUser, transaction, newPassword)

		const tokens = createJwtTokens(updatedUser.id!, options)

		await transaction.commit()
		
		return tokens
	} catch (err) {
		await transaction.abort()
		throw err as Error
	}
}
