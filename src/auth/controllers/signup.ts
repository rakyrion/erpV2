import { IAuthenticable } from '../interfaces/authenticable'
import { IAuthenticableRepository } from '../interfaces/repositories/authenticable'
import { IAuthOptions } from '../interfaces/authOptions'
import { AuthenticableDTO } from '../interfaces/dto/res/authenticable'
import { TokensDTO } from '../interfaces/dto/res/tokens'
import { EJsendStatus } from '../../app/models/enumerations/jsendStatus'
import { sendWelcomeEmailService } from '../services/sendWelcomeEmail'
import { signupService } from '../services/signup'

export const getSignupController = <T extends IAuthenticable, DTO extends Omit<AuthenticableDTO, 'id'> = T>(
	name: string,
	repo: IAuthenticableRepository<T>,
	options: IAuthOptions,
	fromDTO: (dto: DTO) => T = (dto: DTO): T => dto as unknown as T
) => {
	if (options.signup.sendWelcomeEmail) {
		events.subscribe(name, async user => sendWelcomeEmailService(user as T, options))
	}

	return reqCatch(async (req, res, next) => {
		const userDTO = req.body as DTO

		const user = fromDTO(userDTO)

		const tokens: TokensDTO = await signupService(repo, user, options, name)

		return res.status(200).json({
			status: EJsendStatus.SUCCESS,
			data: tokens
		})
	})
}
