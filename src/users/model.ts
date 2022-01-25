import { Schema, model, Document } from 'mongoose'
import { Request, Response } from 'express'

export interface UserInterface extends Document {
	username: string
	// password: string
}

export const User = model<UserInterface>(
	'User',
	new Schema({
		username: {
			type: String,
			unique: true,
		},
		// password: String,
	})
)

export const UserFn = {
	doUserExistInDatabase: async (username: string) => {
		const users = await User.findOne({ username: username })
		if (!users) {
			return false
		} else {
			return true
		}
	},
}
