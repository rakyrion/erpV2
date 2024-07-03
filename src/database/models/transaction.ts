import { ClientSession, connection } from 'mongoose'
import { IDatabaseTransaction } from '../interfaces/transaction'
import { TransactionError } from '../errors/transaction'

export class DatabaseTransaction implements IDatabaseTransaction<ClientSession> {
	protected session?: ClientSession

	public async start(): Promise<void> {
		if (typeof this.session !== 'undefined') throw new TransactionError('Transaction already started.')
		this.session = await connection.startSession()
		this.session.startTransaction()
	}

	public async commit(): Promise<void> {
		if (typeof this.session === 'undefined') throw new TransactionError('Transaction has not started.')
		await this.session.commitTransaction()
		await this.session.endSession()
		this.session = undefined
	}

	public async abort(): Promise<void> {
		if (typeof this.session === 'undefined') throw new TransactionError('Transaction has not started.')
		await this.session.abortTransaction()
		await this.session.endSession()
		this.session = undefined
	}

	public getSession(): ClientSession | undefined {
		return this.session
	}
}
