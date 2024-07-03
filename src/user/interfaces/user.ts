import { IEntity } from '../../core/interfaces/entity'
import { IAuthenticable } from '../../auth/interfaces/authenticable'

export interface IUser extends IEntity, IAuthenticable {
	username?: string,
	firstname: string,
	lastname: string,
	active: boolean
}
