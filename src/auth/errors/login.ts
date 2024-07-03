import { AppError } from '../../app/errors/app'

export class LoginError extends AppError {
	constructor(
		message: string = '',
		errorCode?: number,
		data?: Record<string, string | string[]>
	) {
		super(message, 401, errorCode, data || { credentials: 'invalid' })
	}
}
