import { IAuthenticable } from '../interfaces/authenticable'
import { IAuthenticableRepository } from '../interfaces/repositories/authenticable'
import { IAuthOptions } from '../interfaces/authOptions'
import { ChangeEmailDTO } from '../interfaces/dto/req/changeEmail'
import { TokensDTO } from '../interfaces/dto/res/tokens'
import { EJsendStatus } from '../../app/models/enumerations/jsendStatus'
import { changeEmailRequestService } from '../services/changeEmailRequest'
import { sendEmailChangeNotificationService } from '../services/sendEmailChangeNotification'
import { changeEmailService } from '../services/changeEmail'

export const getChangeEmailController = <T extends IAuthenticable>(
	name: string,
	repo: IAuthenticableRepository<T>,
	options: IAuthOptions
) => {
	if (!options.changeEmail.request.enable && options.changeEmail.notification.enable) {
		events.subscribe(name, async user => sendEmailChangeNotificationService(user as T, options))
	}

	return reqCatch(async (req, res, next) => {
		const user = req.user as T
		const { currentPassword, newEmail } = req.body as ChangeEmailDTO

		if (options.changeEmail.request.enable) {
			// Email change confirmation request via email is enabled, we send a confirmation request email
			await changeEmailRequestService(repo, user, newEmail, options, name, currentPassword)

			return res.status(200).json({
				status: EJsendStatus.SUCCESS,
				data: null
			})
		}

		// Email change confirmation request via email is disabled, we change the email
		const tokens: TokensDTO = await changeEmailService(repo, user, newEmail, options, name, currentPassword)

		return res.status(200).json({
			status: EJsendStatus.SUCCESS,
			data: tokens
		})
	})
}
