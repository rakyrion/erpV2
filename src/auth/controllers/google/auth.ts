import passport from 'passport'

export const getGoogleAuthController = (
	name: string
) => reqCatch((req, res, next) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	passport.authenticate(name, { session: false, scope: [ 'email', 'profile' ] })(req, res, next)
})
