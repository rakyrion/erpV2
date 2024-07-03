import { IAuthenticable } from '../interfaces/authenticable'
import { IAuthenticableRepository } from '../interfaces/repositories/authenticable'
import { IAuthOptions } from '../interfaces/authOptions'
import { ResetPasswordDTO } from '../interfaces/dto/req/resetPassword'
import { TokensDTO } from '../interfaces/dto/res/tokens'
import { EJsendStatus } from '../../app/models/enumerations/jsendStatus'
import { changePasswordService } from '../services/changePassword'

export const getResetPasswordController = <T extends IAuthenticable>(
	name: string,
	repo: IAuthenticableRepository<T>,
	options: IAuthOptions
) => reqCatch(async (req, res, next) => {
	const { resetToken, password } = req.body as ResetPasswordDTO

	// Get user based on token
	const user = await repo.getByPasswordResetToken(resetToken)

	// Reset password
	const tokens: TokensDTO = await changePasswordService(repo, user, password, options, name)

	return res.status(200).json({
		status: EJsendStatus.SUCCESS,
		data: tokens
	})
})
