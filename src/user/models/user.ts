import { Schema, model } from 'mongoose'
import { IUser } from '../interfaces/user'
import validator from 'validator'

const userSchema = new Schema<IUser>(
	{
		email: {
			type: String,
			required: [ true, 'Field "email" is required.' ],
			unique: true,
			lowercase: true,
			trim: true,
			validate: [
				validator.isEmail,
				'"{VALUE}" is not a valid email address.'
			]
		},
		passwordHash: {
			type: String,
			required: [ true, 'Field "passwordHash" is required.' ]
		},
		credentialsChangedAt: Date,
		passwordResetToken: {
			type: String,
			unique: true,
			sparse: true
		},
		passwordResetExpires: Date,
		emailChangeToken: {
			type: String,
			unique: true,
			sparse: true
		},
		emailChangeExpires: Date,
		emailChangeRequested: {
			type: String,
			lowercase: true,
			trim: true,
			validate: [
				validator.isEmail,
				'"{VALUE}" is not a valid email address.'
			]
		},
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
