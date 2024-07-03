import { hash } from 'bcryptjs'
import { IAuthenticable } from '../interfaces/authenticable'
import { IAuthenticableRepository } from '../interfaces/repositories/authenticable'
import { IAuthOptions } from '../interfaces/authOptions'
import { ITokens } from '../interfaces/tokens'
import { DatabaseTransaction } from '../../database/models/transaction'
import { passwordStrengthValidator } from '../utils/passwordStrengthValidator'
import { createJwtTokens } from '../utils/createJwtTokens'
import { PasswordError } from '../errors/password'

export const signupService = async <T extends IAuthenticable>(
	repo: IAuthenticableRepository<T>,
	user: T,
	options: IAuthOptions,
	eventName?: string
): Promise<ITokens> => {
	if (!user.password || !passwordStrengthValidator(user.password, options)) throw new PasswordError()

	// Set password hash
	user.passwordHash = await hash(user.password, options.password.saltLength)

	// We substract a second so JWT expiration is valid
	user.credentialsChangedAt = new Date(Date.now() - 1000)

	// Create user
	const transaction = new DatabaseTransaction()
	await transaction.start()

	try {
		const newUser = await repo.create(user, { transaction })

		if (eventName) await events.publish(eventName, newUser, transaction)
		
		const tokens = createJwtTokens(newUser.id!, options)

		await transaction.commit()
		
		return tokens
	} catch (err) {
		await transaction.abort()
		throw err as Error
	}
}
