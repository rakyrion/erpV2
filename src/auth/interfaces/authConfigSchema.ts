import { Schema } from 'convict'

export interface IAuthConfigSchema {
	email: {
		changeToken: {
			length: Schema<number>,
			expiration: Schema<number>
		}
	},
	password: {
		options: {
			minLength: Schema<number>,
			minLowercase: Schema<number>,
			minUppercase: Schema<number>,
			minNumbers: Schema<number>,
			minSymbols: Schema<number>,
			minScore: Schema<number>,
			pointsPerUnique: Schema<number>,
			pointsPerRepeat: Schema<number>,
			pointsForContainingLower: Schema<number>,
			pointsForContainingUpper: Schema<number>,
			pointsForContainingNumber: Schema<number>,
			pointsForContainingSymbol: Schema<number>
		},
		saltLength: Schema<number>,
		resetToken: {
			length: Schema<number>,
			expiration: Schema<number>
		}
	},
	jwt: {
		secret: Schema<string>,
		accessTokenExpiration: Schema<number>,
		refreshTokenExpiration: Schema<number>
	},
	signup: {
		activeByDefault: Schema<boolean>,
		sendWelcomeEmail: Schema<boolean>,
		emailSubject: Schema<string>,
		emailTemplate: Schema<string>,
		useFallbackTemplate: Schema<boolean>
	},
	login: {
		rateLimit: {
			enable: Schema<boolean>,
			windowMs: Schema<number>,
			max: Schema<number>,
			message: {
				status: Schema<string>,
				message: Schema<string>
			},
			statusCode: Schema<number>,
			legacyHeaders: Schema<boolean>,
			standardHeaders: Schema<boolean>,
			skipSuccessfulRequests: Schema<boolean>
		}
	},
	resetPassword: {
		frontendUri: Schema<string>,
		emailSubject: Schema<string>,
		emailTemplate: Schema<string>,
		useFallbackTemplate: Schema<boolean>
	},
	changeEmail: {
		request: {
			enable: Schema<boolean>,
			frontendUri: Schema<string>,
			emailSubject: Schema<string>,
			emailTemplate: Schema<string>,
			useFallbackTemplate: Schema<boolean>
		},
		notification: {
			enable: Schema<boolean>,
			emailSubject: Schema<string>,
			emailTemplate: Schema<string>,
			useFallbackTemplate: Schema<boolean>
		}
	},
	google: {
		enable: Schema<boolean>,
		randomPasswordLength: Schema<number>,
		successRedirectUrl: Schema<string>,
		failureRedirectUrl: Schema<string>,
		options: {
			clientID: Schema<string>,
			clientSecret: Schema<string>,
			callbackURL: Schema<string>
		}
	}
}
