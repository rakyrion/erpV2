import { RecursivePartial } from '../../core/interfaces/recursivePartial'
import { IAuthOptions } from '../interfaces/authOptions'

export const getAuthConfigSchema = (entityName: string, defaults: RecursivePartial<IAuthOptions> = {}) => ({
	email: {
		changeToken: {
			length: {
				doc: `Email change token length for entity ${entityName}.`,
				format: Number,
				default: defaults.email?.changeToken?.length || 32
			},
			expiration: {
				doc: `Email change token expiration time in milliseconds for entity ${entityName}.`,
				format: Number,
				default: defaults.email?.changeToken?.expiration || 3600000
			}
		}
	},
	password: {
		options: {
			minLength: {
				doc: `The password minimum length for entity ${entityName}.`,
				format: Number,
				default: defaults.password?.options?.minLength || 8
			},
			minLowercase: {
				doc: `The password minimum number of lowercase characters for entity ${entityName}.`,
				format: Number,
				default: defaults.password?.options?.minLowercase || 0
			},
			minUppercase: {
				doc: `The password minimum number of uppercase characters for entity ${entityName}.`,
				format: Number,
				default: defaults.password?.options?.minUppercase || 0
			},
			minNumbers: {
				doc: `The password minimum number of numeric characters for entity ${entityName}.`,
				format: Number,
				default: defaults.password?.options?.minNumbers || 0
			},
			minSymbols: {
				doc: `The password minimum number of special characters for entity ${entityName}.`,
				format: Number,
				default: defaults.password?.options?.minSymbols || 0
			},
			minScore: {
				doc: `The password minimum security score for entity ${entityName}.`,
				format: Number,
				default: defaults.password?.options?.minScore || 3
			},
			pointsPerUnique: {
				doc: `Score points per unique character for entity ${entityName}.`,
				format: Number,
				default: defaults.password?.options?.pointsPerUnique || 0
			},
			pointsPerRepeat: {
				doc: `Score points per repeated character for entity ${entityName}.`,
				format: Number,
				default: defaults.password?.options?.pointsPerRepeat || 0
			},
			pointsForContainingLower: {
				doc: `Score points for containing lowercase characters for entity ${entityName}.`,
				format: Number,
				default: defaults.password?.options?.pointsForContainingLower || 1
			},
			pointsForContainingUpper: {
				doc: `Score points for containing uppercase characters for entity ${entityName}.`,
				format: Number,
				default: defaults.password?.options?.pointsForContainingUpper || 1
			},
			pointsForContainingNumber: {
				doc: `Score points for containing numeric characters for entity ${entityName}.`,
				format: Number,
				default: defaults.password?.options?.pointsForContainingNumber || 1
			},
			pointsForContainingSymbol: {
				doc: `Score points for containing special characters for entity ${entityName}.`,
				format: Number,
				default: defaults.password?.options?.pointsForContainingSymbol || 1
			}
		},
		saltLength: {
			doc: `Salt length to generate on password encryption for entity ${entityName}.`,
			format: Number,
			default: defaults.password?.saltLength || 12
		},
		resetToken: {
			length: {
				doc: `Password reset token length for entity ${entityName}.`,
				format: Number,
				default: defaults.password?.resetToken?.length || 32
			},
			expiration: {
				doc: `Password reset token expiration time in milliseconds for entity ${entityName}.`,
				format: Number,
				default: defaults.password?.resetToken?.expiration || 900000
			}
		}
	},
	jwt: {
		secret: {
			doc: `Secret to use with JSON Web Tokens for entity ${entityName}.`,
			format: 'required-string',
			default: defaults.jwt?.secret || ''
		},
		accessTokenExpiration: {
			doc: `Access JSON Web Token expiration time in seconds for entity ${entityName}.`,
			format: Number,
			default: defaults.jwt?.accessTokenExpiration || 600
		},
		refreshTokenExpiration: {
			doc: `Refresh JSON Web Token expiration time in seconds for entity ${entityName}.`,
			format: Number,
			default: defaults.jwt?.refreshTokenExpiration || 604800
		}
	},
	signup: {
		activeByDefault: {
			doc: `Whether new users from entity ${entityName} are signed up as active or not.`,
			format: Boolean,
			default: defaults.signup && typeof defaults.signup.activeByDefault !== undefined ?
				defaults.signup.activeByDefault! :
				true
		},
		sendWelcomeEmail: {
			doc: `Whether to send a welcome email to new users of entity ${entityName} or not.`,
			format: Boolean,
			default: defaults.signup &&
				typeof defaults.signup?.sendWelcomeEmail !== 'undefined' ?
				defaults.signup.sendWelcomeEmail :
				true
		},
		emailSubject: {
			doc: `Welcome email subject for entity ${entityName}.`,
			type: String,
			default: defaults.signup?.emailSubject || 'Welcome!'
		},
		emailTemplate: {
			doc: `Welcome email template path for entity ${entityName}.`,
			type: String,
			default: defaults.signup?.emailTemplate ||
				`${entityName}/assets/templates/email/signup`
		},
		useFallbackTemplate: {
			doc: `Whether to use fallback welcome template or not for entity ${entityName}.`,
			format: Boolean,
			default: defaults.signup &&
				typeof defaults.signup?.useFallbackTemplate !== 'undefined' ?
				defaults.signup.useFallbackTemplate :
				true
		}
	},
	login: {
		rateLimit: {
			enable: {
				doc: `Whether to enable rate limit (recommended) or not for entity ${entityName}.`,
				format: Boolean,
				default: defaults.login?.rateLimit && typeof defaults.login?.rateLimit?.enable !== 'undefined' ?
					defaults.login.rateLimit.enable :
					true
			},
			windowMs: {
				doc: `Time window in milliseconds to count unsuccessful login tries for entity ${entityName}.`,
				format: Number,
				default: defaults.login?.rateLimit?.windowMs || 3600000
			},
			max: {
				doc: `Maximum number of unsuccessful login tries for entity ${entityName}.`,
				format: Number,
				default: defaults.login?.rateLimit?.max || 5
			},
			message: {
				status: {
					doc: `Response status to send back on rate limit violation for entity ${entityName}.`,
					format: String,
					default: defaults.login?.rateLimit?.message?.status || 'fail'
				},
				message: {
					doc: `Response message to send back on rate limit violation for entity ${entityName}.`,
					format: String,
					default: defaults.login?.rateLimit?.message?.message ||
						'Too many login requests, please try again later.'
				}
			},
			statusCode: {
				doc: `HTTP status code to send back on rate limit violation for entity ${entityName}.`,
				format: Number,
				default: defaults.login?.rateLimit?.statusCode || 429
			},
			legacyHeaders: {
				doc: `Whether to send legacy headers (recommended) or not for entity ${entityName}.`,
				format: Boolean,
				default: defaults.login?.rateLimit && typeof defaults.login?.rateLimit?.legacyHeaders !== 'undefined' ?
					defaults.login.rateLimit.legacyHeaders :
					true
			},
			standardHeaders: {
				doc: `Whether to send standard headers (recommended) or not for entity ${entityName}.`,
				format: Boolean,
				default: defaults.login?.rateLimit &&
					typeof defaults.login?.rateLimit?.standardHeaders !== 'undefined' ?
					defaults.login.rateLimit.standardHeaders :
					true
			},
			skipSuccessfulRequests: {
				doc: `Whether to skip successful requests in rate limit count or not for entity ${entityName}.`,
				format: Boolean,
				default: defaults.login?.rateLimit &&
					typeof defaults.login?.rateLimit?.skipSuccessfulRequests !== 'undefined' ?
					defaults.login.rateLimit.skipSuccessfulRequests :
					true
			}
		}
	},
	resetPassword: {
		frontendUri: {
			doc: `Reset password frontend URI for entity ${entityName}.`,
			type: String,
			default: defaults.resetPassword?.frontendUri || `/${entityName}/reset-password/:resetToken`
		},
		emailSubject: {
			doc: `Reset password email subject for entity ${entityName}.`,
			type: String,
			default: defaults.resetPassword?.emailSubject || 'A password reset has been requested'
		},
		emailTemplate: {
			doc: `Reset password email template path for entity ${entityName}.`,
			type: String,
			default: defaults.resetPassword?.emailTemplate ||
				`${entityName}/assets/templates/email/resetPassword`
		},
		useFallbackTemplate: {
			doc: `Whether to use fallback reset password template or not for entity ${entityName}.`,
			format: Boolean,
			default: defaults.resetPassword &&
				typeof defaults.resetPassword?.useFallbackTemplate !== 'undefined' ?
				defaults.resetPassword.useFallbackTemplate :
				true
		}
	},
	changeEmail: {
		request: {
			enable: {
				doc: `Whether to request confirmation on email change (recommended) or not for entity ${entityName}.`,
				format: Boolean,
				default: defaults.changeEmail?.request?.enable &&
					typeof defaults.changeEmail?.request?.enable !== 'undefined' ?
					defaults.changeEmail.request.enable :
					true
			},
			frontendUri: {
				doc: `Change email frontend URI for entity ${entityName}.`,
				type: String,
				default: defaults.changeEmail?.request?.frontendUri || `/${entityName}/change-email/:changeToken`
			},
			emailSubject: {
				doc: `Change email request email subject for entity ${entityName}.`,
				type: String,
				default: defaults.changeEmail?.request?.emailSubject || 'An email address change has been requested'
			},
			emailTemplate: {
				doc: `Change email request email template path for entity ${entityName}.`,
				type: String,
				default: defaults.changeEmail?.request?.emailTemplate ||
					`${entityName}/assets/templates/email/changeEmailRequest`
			},
			useFallbackTemplate: {
				doc: `Whether to use fallback change email request template or not for entity ${entityName}.`,
				format: Boolean,
				default: defaults.changeEmail?.request &&
					typeof defaults.changeEmail.request.useFallbackTemplate !== 'undefined' ?
					defaults.changeEmail.request.useFallbackTemplate :
					true
			}
		},
		notification: {
			enable: {
				doc: `Whether to send a change email notification email (recommended) or not for entity ${entityName}.`,
				format: Boolean,
				default: defaults.changeEmail?.notification?.enable &&
					typeof defaults.changeEmail?.notification?.enable !== 'undefined' ?
					defaults.changeEmail.notification.enable :
					true
			},
			emailSubject: {
				doc: `Change email notification email subject for entity ${entityName}.`,
				type: String,
				default: defaults.changeEmail?.notification?.emailSubject ||
					'Your account email address has been changed'
			},
			emailTemplate: {
				doc: `Change email notification email template path for entity ${entityName}.`,
				type: String,
				default: defaults.changeEmail?.notification?.emailTemplate ||
					`${entityName}/assets/templates/email/changeEmailNotification`
			},
			useFallbackTemplate: {
				doc: `Whether to use fallback change email notification template or not for entity ${entityName}.`,
				format: Boolean,
				default: defaults.changeEmail?.notification &&
					typeof defaults.changeEmail.notification.useFallbackTemplate !== 'undefined' ?
					defaults.changeEmail.notification.useFallbackTemplate :
					true
			}
		}
	},
	google: {
		enable: {
			doc: `Whether to use Google as an identity provider (recommended) or not for entity ${entityName}.`,
			format: Boolean,
			default: defaults.google?.enable &&
				typeof defaults.google?.enable !== 'undefined' ?
				defaults.google.enable :
				true
		},
		randomPasswordLength: {
			doc: `Random password length when Google creates a new user for entity ${entityName}.`,
			format: Number,
			default: defaults.google?.randomPasswordLength || 32
		},
		successRedirectUrl: {
			doc: `Google success URL for entity ${entityName}, ":accessToken" and ":refreshToken" will be replaced.`,
			type: String,
			default: defaults.google?.successRedirectUrl || ''
		},
		failureRedirectUrl: {
			doc: `Google failure redirect URL for entity ${entityName}.`,
			type: String,
			default: defaults.google?.failureRedirectUrl || ''
		},
		options: {
			clientID: {
				doc: `Google client ID for entity ${entityName}.`,
				type: String,
				default: defaults.google?.options?.clientID || ''
			},
			clientSecret: {
				doc: `Google client secret for entity ${entityName}.`,
				type: String,
				default: defaults.google?.options?.clientSecret || ''
			},
			callbackURL: {
				doc: `Google callback URL for entity ${entityName}.`,
				type: String,
				default: defaults.google?.options?.callbackURL || ''
			}
		}
	}
})
