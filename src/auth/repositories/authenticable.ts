import crypto from 'crypto'
import { Model } from 'mongoose'
import { IAuthenticableRepository } from '../interfaces/repositories/authenticable'
import { IAuthenticable } from '../interfaces/authenticable'
import { IPersistenceMapper } from '../../core/interfaces/persistenceMapper'
import { RepositoryOptions } from '../../database/interfaces/repositoryOptions'
import { BaseRepository } from '../../database/repositories/base'

export abstract class AuthenticableRepository<T extends IAuthenticable>
	extends BaseRepository<T> implements IAuthenticableRepository<T> {
	constructor(model: Model<T>, persistenceMap: IPersistenceMapper<T>, activable: boolean = true) {
		super(model, persistenceMap, activable)
	}

	public async getByEmail(email: string, options: RepositoryOptions = {}): Promise<T> {
		return this.findOne({ email }, options)
	}

	public async getByPasswordResetToken(token: string, options: RepositoryOptions = {}): Promise<T> {
		const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

		return this.findOne({
			passwordResetToken: hashedToken,
			passwordResetExpires: { $gt: Date.now().toString() }
		}, options)
	}

	public async getByEmailChangeToken(token: string, options: RepositoryOptions = {}): Promise<T> {
		const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

		return this.findOne({
			emailChangeToken: hashedToken,
			emailChangeExpires: { $gt: Date.now().toString() }
		}, options)
	}
}
