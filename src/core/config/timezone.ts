import { coreConfig } from './static'
import dotenv from 'dotenv'
process.env.TZ = coreConfig.get('core.timezone')
dotenv.config()
