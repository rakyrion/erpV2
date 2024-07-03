import { IUser } from '../../interfaces/user'
import { UserDTO } from '../../interfaces/dto/res/user'
import { AuthenticableDtoMapper } from '../../../auth/mappers/dto/authenticable'

class UserDtoMapper extends AuthenticableDtoMapper<IUser, UserDTO> {
	protected _toDTO(entity: IUser): UserDTO | undefined {
		if (typeof entity.id !== 'string') return undefined

		return {
			...this._authenticableToDTO(entity),
			username: entity.username,
			firstname: entity.firstname,
			lastname: entity.lastname
		} as UserDTO
	}

	public fromSignupDTO(this: void, entity: UserDTO & { password: string }): IUser {
		return {
			email: entity.email,
			password: entity.password,
			username: entity.username,
			firstname: entity.firstname,
			lastname: entity.lastname,
			active: config.get('user.auth.signup.activeByDefault')
		}
	}
}

export const UserDtoMap = new UserDtoMapper()
