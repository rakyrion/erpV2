import { IAuthenticable } from '../interfaces/authenticable'
import { IAuthenticableRepository } from '../interfaces/repositories/authenticable'
import { IAuthOptions } from '../interfaces/authOptions'
import { ForgotPasswordDTO } from '../interfaces/dto/req/forgotPassword'
import { EJsendStatus } from '../../app/models/enumerations/jsendStatus'
import { forgotPasswordService } from '../services/forgotPassword'

export const getForgotPasswordController = <T extends IAuthenticable>(
	name: string,
	repo: IAuthenticableRepository<T>,
	options: IAuthOptions
) => reqCatch(async (req, res, next) => {
	const { email } = req.body as ForgotPasswordDTO

	await forgotPasswordService(repo, email, options, name)

	return res.status(200).json({
		status: EJsendStatus.SUCCESS,
		data: null
	})
})
