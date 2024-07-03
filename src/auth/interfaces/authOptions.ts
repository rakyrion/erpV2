export interface IAuthOptions {
	email: {
		changeToken: {
			length: number,
			expiration: number
		}
	},
	password: {
		options: {
			minLength: number,
			minLowercase: number,
			minUppercase: number,
			minNumbers: number,
			minSymbols: number,
			minScore: number,
			pointsPerUnique: number,
			pointsPerRepeat: number,
			pointsForContainingLower: number,
			pointsForContainingUpper: number,
			pointsForContainingNumber: number,
			pointsForContainingSymbol: number
		},
		saltLength: number,
		resetToken: {
			length: number,
			expiration: number
		}
	},
	jwt: {
		secret: string,
		accessTokenExpiration: number,
		refreshTokenExpiration: number
	},
	signup: {
		activeByDefault: boolean,
		sendWelcomeEmail: boolean,
		emailSubject: string,
		emailTemplate: string,
		useFallbackTemplate: boolean
	},
	login: {
		rateLimit: {
			enable: boolean,
			windowMs: number,
			max: number,
			message: {
				status: string,
				message: string
			},
			statusCode: number,
			legacyHeaders: boolean,
			standardHeaders: boolean,
			skipSuccessfulRequests: boolean
		}
	},
	resetPassword: {
		frontendUri: string,
		emailSubject: string,
		emailTemplate: string,
		useFallbackTemplate: boolean
	},
	changeEmail: {
		request: {
			enable: boolean,
			frontendUri: string,
			emailSubject: string,
			emailTemplate: string,
			useFallbackTemplate: boolean
		},
		notification: {
			enable: boolean,
			emailSubject: string,
			emailTemplate: string,
			useFallbackTemplate: boolean
		}
	},
	google: {
		enable: boolean,
		randomPasswordLength: number,
		successRedirectUrl: string,
		failureRedirectUrl: string,
		options: {
			clientID: string,
			clientSecret: string,
			callbackURL: string
		}
	}
}
