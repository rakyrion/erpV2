export interface IDatabaseTransaction<Session> {
	start(): Promise<void>,
	commit(): Promise<void>,
	abort(): Promise<void>,
	getSession(): Session | undefined
}
