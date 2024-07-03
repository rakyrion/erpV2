import { IAuthenticable } from '../../interfaces/authenticable'
import { AuthenticableDTO } from '../../interfaces/dto/res/authenticable'
import { BaseDtoMapper } from '../../../core/mappers/dto/base'

export abstract class AuthenticableDtoMapper<T extends IAuthenticable, DTO extends AuthenticableDTO>
	extends BaseDtoMapper<T, DTO> {
	protected _authenticableToDTO(entity: T): DTO | undefined {
		if (typeof entity.id !== 'string') return undefined

		return {
			id: entity.id,
			email: entity.email
		} as DTO
	}
}
