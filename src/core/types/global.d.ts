/* eslint-disable no-var */

import { ILogger } from '../interfaces/logger'
import { IMessageBroker } from '../interfaces/messageBroker'
import { IDependencyInjector } from '../interfaces/dependencyInjector'
import { ICache } from '../interfaces/cache'

declare global {
	var log: ILogger
	var events: IMessageBroker
	var di: IDependencyInjector
	var cache: ICache
	var produceMessage: (queue: string, data: unknown) => Promise<void>
}
