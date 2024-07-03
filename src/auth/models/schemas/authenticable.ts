import { Schema } from 'mongoose'
import validator from 'validator'
import { IAuthenticable } from '../../interfaces/authenticable'

export const authenticableSchema = new Schema<IAuthenticable>(
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
		}
	}
)
