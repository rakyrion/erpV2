import { HydratedDocument } from 'mongoose'
import { IAuthenticable } from '../../interfaces/authenticable'
import { BasePersistenceMapper } from '../../../core/mappers/persistence/base'

export abstract class AuthenticablePersistenceMapper<T extends IAuthenticable> extends BasePersistenceMapper<T> {
	protected _authenticableFromDB(entity: T & { _id?: string } | HydratedDocument<T>): IAuthenticable {
		return {
			id: entity.id ? entity.id as string : entity._id!.toString(),
			email: entity.email,
			passwordHash: entity.passwordHash,
			credentialsChangedAt: entity.credentialsChangedAt,
			passwordResetToken: entity.passwordResetToken,
			passwordResetExpires: entity.passwordResetExpires,
			emailChangeToken: entity.emailChangeToken,
			emailChangeExpires: entity.emailChangeExpires,
			emailChangeRequested: entity.emailChangeRequested
		}
	}

	protected _authenticableToDB(entity: Partial<T>): Partial<IAuthenticable> {
		return {
			...entity,
			...entity.id && { _id: entity.id },
			id: undefined,
			password: undefined
		}
	}
}
