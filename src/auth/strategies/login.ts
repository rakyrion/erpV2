import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { compare } from 'bcryptjs'
import { IAuthenticable } from '../interfaces/authenticable'
import { IAuthenticableRepository } from '../interfaces/repositories/authenticable'
import { LoginError } from '../errors/login'

export const addLoginStrategy = <T extends IAuthenticable>(name: string, repo: IAuthenticableRepository<T>) => {
	passport.use(name, new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			session: false,
			passReqToCallback: false
		},
		async (email, password, done) => {
			try {
				const user = await repo.getByEmail(email)
				if (!user.passwordHash || !await compare(password, user.passwordHash)) throw new Error()

				await events.publish(name, user)

				return done(null, user)
			} catch (err) {
				return done(new LoginError())
			}
		}
	))
}
