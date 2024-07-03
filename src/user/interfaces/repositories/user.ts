import { IAuthenticableRepository } from '../../../auth/interfaces/repositories/authenticable'
import { IUser } from '../user'

export interface IUserRepository extends IAuthenticableRepository<IUser> {}
