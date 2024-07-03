import { IAuthenticable } from '../interfaces/authenticable'
import { IAuthenticableRepository } from '../interfaces/repositories/authenticable'
import { IAuthOptions } from '../interfaces/authOptions'
import { ChangeEmailConfirmationDTO } from '../interfaces/dto/req/changeEmailConfirmation'
import { TokensDTO } from '../interfaces/dto/res/tokens'
import { EJsendStatus } from '../../app/models/enumerations/jsendStatus'
import { sendEmailChangeNotificationService } from '../services/sendEmailChangeNotification'
import { changeEmailService } from '../services/changeEmail'

export const getChangeEmailConfirmationController = <T extends IAuthenticable>(
	name: string,
	repo: IAuthenticableRepository<T>,
	options: IAuthOptions
) => {
	if (options.changeEmail.notification.enable) {
		events.subscribe(name, async user => sendEmailChangeNotificationService(user as T, options))
	}

	return reqCatch(async (req, res, next) => {
		const { changeToken } = req.body as ChangeEmailConfirmationDTO

		// Get user based on token
		const user = await repo.getByEmailChangeToken(changeToken)

		// Change email
		const tokens: TokensDTO = await changeEmailService(repo, user, user.emailChangeRequested!, options, name)

		return res.status(200).json({
			status: EJsendStatus.SUCCESS,
			data: tokens
		})
	})
}
