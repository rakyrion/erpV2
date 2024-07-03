import { IAuthenticable } from '../interfaces/authenticable'
import { IAuthenticableRepository } from '../interfaces/repositories/authenticable'
import { IAuthOptions } from '../interfaces/authOptions'
import { ChangePasswordDTO } from '../interfaces/dto/req/changePassword'
import { TokensDTO } from '../interfaces/dto/res/tokens'
import { EJsendStatus } from '../../app/models/enumerations/jsendStatus'
import { changePasswordService } from '../services/changePassword'

export const getChangePasswordController = <T extends IAuthenticable>(
	name: string,
	repo: IAuthenticableRepository<T>,
	options: IAuthOptions
) => reqCatch(async (req, res, next) => {
	const user = req.user as T
	const { currentPassword, newPassword } = req.body as ChangePasswordDTO

	const tokens: TokensDTO = await changePasswordService(repo, user, newPassword, options, name, currentPassword)
	
	return res.status(200).json({
		status: EJsendStatus.SUCCESS,
		data: tokens
	})
})
