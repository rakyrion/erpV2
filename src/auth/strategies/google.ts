import passport from 'passport'
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20'
import { IAuthenticable } from '../interfaces/authenticable'
import { IAuthenticableRepository } from '../interfaces/repositories/authenticable'
import { IAuthOptions } from '../interfaces/authOptions'
import { DatabaseTransaction } from '../../database/models/transaction'
import { LoginError } from '../errors/login'

export const addGoogleStrategy = <T extends IAuthenticable>(
	name: string,
	repo: IAuthenticableRepository<T>,
	options: IAuthOptions,
	fromProfile: (profile: Profile) => T | Promise<T>
) => {
	passport.use(name, new GoogleStrategy(
		options.google.options,
		async (accessToken, refreshToken, profile, done) => {
			if (!profile._json.email) return done(new LoginError())

			const transaction = new DatabaseTransaction()
			await transaction.start()

			try {
				// Get or create the user
				let user: T
				try {
					user = await repo.getByEmail(profile._json.email, { transaction })
				} catch (err) {
					const profileUser = fromProfile(profile)
					const userData = profileUser instanceof Promise ? await profileUser : profileUser
					user = await repo.create(userData, { transaction })
					await events.publish(`${name}-signup`, user, transaction)
				}

				await transaction.commit()
				return done(null, user)
			} catch (err) {
				await transaction.abort()
				return done(new LoginError())
			}
		}
	))
}
