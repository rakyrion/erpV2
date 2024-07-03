import { ClientSession } from 'mongoose'
import { IDatabaseTransaction } from './transaction'

export interface RepositoryOptions {
	transaction?: IDatabaseTransaction<ClientSession>,
	populate?: string[],
	skipPagination?: boolean,
	skipMapping?: boolean,
	inactive?: 'include' | 'exclude' | 'only'
}
