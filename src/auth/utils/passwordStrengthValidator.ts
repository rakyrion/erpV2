import validator from 'validator'
import { IAuthOptions } from '../interfaces/authOptions'

export const passwordStrengthValidator = (val: string, options: IAuthOptions): boolean => {
	// Password is valid
	const valid = validator.isStrongPassword(val, { ...options.password.options, returnScore: false })
	if (!valid) return false

	// Password is strong
	const { minScore } = options.password.options
	if (minScore) {
		const strength = validator.isStrongPassword(val, { ...options.password.options, returnScore: true })
		if (strength < minScore) return false
	}

	return true
}
