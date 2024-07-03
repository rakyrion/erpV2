import 'jsonwebtoken'
import { IJwtBody } from '../interfaces/jwtBody'

declare module 'jsonwebtoken' {
	export interface JwtPayload {
		body?: IJwtBody
	}
}
