import { IEntity } from '../../core/interfaces/entity'

export interface IAuthenticable extends IEntity {
	email: string,
	password?: string,
	passwordHash?: string,
	credentialsChangedAt?: Date,
	passwordResetToken?: string,
	passwordResetExpires?: Date,
	emailChangeToken?: string,
	emailChangeExpires?: Date,
	emailChangeRequested?: string
}
