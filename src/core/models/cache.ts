import { ICache } from '../interfaces/cache'

export class Cache implements ICache {
	private storage: Record<string, unknown> = {}

	public save<T>(key: string, data: T): T {
		this.storage[key] = data
		return this.storage[key] as T
	}

	public load<T>(key: string): T | undefined {
		if (!this.storage[key]) return undefined
		return this.storage[key] as T
	}

	public wipe(key?: string | RegExp): void {
		// Full wipe
		if (!key) {
			Object.keys(this.storage).forEach(k => delete this.storage[k])
			return
		}

		// Single key wipe
		if (typeof key === 'string') {
			delete this.storage[key]
			return
		}

		// RegExp wipe
		Object.keys(this.storage).forEach(k => {
			if (key.test(k)) delete this.storage[k]
		})
	}
}
