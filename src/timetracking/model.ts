import { Schema, model, Document } from 'mongoose'

export interface TimeblockInterface extends Document {
	user: string
	isTracking: boolean
	startedAt: Date
	endedAt: Date
	description: string
	duration: string
}

export const Timeblock = model(
	'Timeblock',
	new Schema({
		user: {
			type: String,
			required: true,
		},
		isTracking: {
			type: Boolean,
			required: true,
		},
		createdAt: {
			type: Date,
			required: true,
		},
		endedAt: Date,
		description: String,
		duration: String,
	})
)
