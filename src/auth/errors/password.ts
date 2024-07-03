import { AppError } from '../../app/errors/app'

export class PasswordError extends AppError {
	constructor(
		message: string = '',
		errorCode?: number,
		data?: Record<string, string | string[]>
	) {
		super(message, 400, errorCode, data || { password: 'invalid' })
	}
}
