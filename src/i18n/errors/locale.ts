import { AppError } from '../../app/errors/app'

export class LocaleError extends AppError {
	constructor(
		message: string = '',
		errorCode?: number,
		data?: Record<string, string | string[]>
	) {
		super(message, 412, errorCode, data || { locale: 'missing' })
	}
}
