export interface ICache {
	save<T>(key: string, data: T): T,
	load<T>(key: string): T | undefined,
	wipe(key?: string | RegExp): void
}
