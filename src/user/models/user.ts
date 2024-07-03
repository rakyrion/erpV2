import { Schema, model } from 'mongoose'
import { IUser } from '../interfaces/user'
import { authenticableSchema } from '../../auth/models/schemas/authenticable'

const userSchema = new Schema<IUser>(
	{
		...authenticableSchema,
		username: {
			type: String,
			unique: true,
			sparse: true,
			trim: true
		},
		firstname: {
			type: String,
			required: true
		},
		lastname: {
			type: String,
			required: true
		},
		active: {
			type: Boolean,
			required: true,
			default: true
		}
	},
	{ collection: 'users' }
)

export const UserModel = model<IUser>('User', userSchema)
