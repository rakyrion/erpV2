import { IUser } from '../interfaces/user'
import { IUserRepository } from '../interfaces/repositories/user'
import { AuthenticableRepository } from '../../auth/repositories/authenticable'
import { UserModel } from '../models/user'
import { UserPersistenceMap } from '../mappers/persistence/user'

export class UserRepository extends AuthenticableRepository<IUser> implements IUserRepository {
	constructor() {
		super(UserModel, UserPersistenceMap)
	}
}
