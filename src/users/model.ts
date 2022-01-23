import { Schema, model, Document } from 'mongoose'

export interface UserInterface extends Document {
	username: string
	// password: string
}

export const User = model(
	'User',
	new Schema({
		nickname: {
			type: String,
			unique: true,
		},
		// password: String,
	})
)
