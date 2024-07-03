import { AuthenticableDTO } from '../../../../auth/interfaces/dto/res/authenticable'

export interface UserDTO extends AuthenticableDTO {
	username?: string,
	firstname: string,
	lastname: string
}
