import { coreConfig } from './static'

process.env.TZ = coreConfig.get('core.timezone')
