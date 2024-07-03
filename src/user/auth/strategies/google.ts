import crypto from 'crypto'
import { hash } from 'bcryptjs'
import { Profile } from 'passport-google-oauth20'
import { IUser } from '../../interfaces/user'
import { addGoogleStrategy } from '../../../auth/strategies/google'

events.subscribe('passportStrategies', () => {
	const options = config.get('user.auth')

	addGoogleStrategy(
		'userGoogleAuth',
		di.user!.repos.user,
		options,
		async (profile: Profile): Promise<IUser> => {
			// Set password hash from random password
			const { randomPasswordLength } = options.google
			const randomPassword = crypto.randomBytes(randomPasswordLength).toString('utf8')
			const passwordHash = await hash(randomPassword, options.password.saltLength)

			// We substract a second so JWT expiration is valid
			const credentialsChangedAt = new Date(Date.now() - 1000)

			return {
				email: profile._json.email!,
				passwordHash,
				credentialsChangedAt,
				firstname: profile._json.given_name || '',
				lastname: profile._json.family_name || '',
				active: options.signup.activeByDefault
			}
		}
	)
})
