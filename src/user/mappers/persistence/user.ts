import { HydratedDocument } from 'mongoose'
import { IUser } from '../../interfaces/user'
import { UserModel } from '../../models/user'
import { AuthenticablePersistenceMapper } from '../../../auth/mappers/persistence/authenticable'

class UserPersistenceMapper extends AuthenticablePersistenceMapper<IUser> {
	protected _fromDB(entity: IUser & { _id?: string } | HydratedDocument<IUser>): IUser {
		return {
			...this._authenticableFromDB(entity),
			username: entity.username,
			firstname: entity.firstname,
			lastname: entity.lastname,
			active: entity.active
		}
	}

	protected _toDB(entity: Partial<IUser>): HydratedDocument<IUser> {
		return new UserModel({
			...this._authenticableToDB(entity)
		})
	}
}

export const UserPersistenceMap = new UserPersistenceMapper()
