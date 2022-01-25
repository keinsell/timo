import { Schema, model, Document } from 'mongoose'

export interface TimeblockInterface extends Document {
	user: string
	isTracking: boolean
	createdAt: Date
	endedAt?: Date
	description?: string
}

export const Timeblock = model<TimeblockInterface>(
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
	})
)
