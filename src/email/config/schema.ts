export const emailConfigSchema = {
	sender: {
		name: {
			doc: 'The default sender name.',
			format: String,
			default: '',
			env: 'SENDER_NAME',
			arg: 'senderName'
		},
		email: {
			doc: 'The default sender email.',
			format: 'email',
			default: '',
			env: 'SENDER_EMAIL',
			arg: 'senderEmail'
		}
	},
	smtp: {
		host: {
			doc: 'SMTP Host.',
			format: 'required-string',
			default: '',
			env: 'SMTP_HOST',
			arg: 'smtpHost'
		},
		port: {
			doc: 'SMTP Port.',
			format: 'port',
			default: 25,
			env: 'SMTP_PORT',
			arg: 'smtpPort'
		},
		authMethod: {
			doc: 'SMTP authentication method.',
			format: String,
			default: 'PLAIN',
			env: 'SMTP_AUTHMETHOD',
			arg: 'smtpAuthMethod'
		},
		auth: {
			user: {
				doc: 'SMTP User.',
				format: String,
				default: '',
				env: 'SMTP_USER',
				arg: 'smtpUser'
			},
			pass: {
				doc: 'SMTP Password.',
				format: String,
				default: '',
				env: 'SMTP_PASS',
				arg: 'smtpPass'
			}
		},
		secure: {
			doc: 'Whether SMTP has been secured with SSL or not.',
			format: Boolean,
			default: false,
			env: 'SMTP_SECURE',
			arg: 'smtpSecure'
		},
		connectionTimeout: {
			doc: 'SMTP server connection timeout, in milliseconds.',
			format: Number,
			default: 30000,
			env: 'SMTP_CONNECTION_TIMEOUT',
			arg: 'smtpConnectionTimeout'
		}
	}
}
