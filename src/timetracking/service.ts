import express, { Request, Response, Router } from 'express'
import { User } from 'users/model'
import { Timeblock } from 'timetracking/model'

import ms from 'ms'

class TimetrackingController {
	/** Returns information about current Timeblock. */
	async GET(req: Request, res: Response) {
		const { username } = req.params

		// Check if user exists in database
		const users = await User.findOne({ username: username }).count()
		if (!users) return res.status(404).json({ status: 'User not found' })

		// Get current timeblock related to user
		const timeblock = await Timeblock.findOne({ isTracking: true })
		if (!timeblock) return res.status(404).json({ status: 'No active timeblock found' })

		const createdAt = timeblock.createdAt.getTime()
		const actualDate = Date.now()
		const diff = actualDate - createdAt
		const duration = ms(diff)

		// await Timeblock.findByIdAndUpdate(timeblock._id, { ...duration })
		timeblock.duration = duration
		await timeblock.save()

		return res.status(200).json(timeblock)
	}

	/** Creates a new timeblock starting from actual date. */
	async POST(req: Request, res: Response) {
		const { username } = req.params

		// Check if user exists in database
		const users = await User.findOne({ username: username }).count()
		if (!users) return res.status(404).json({ status: 'User not found' })

		// If Return error when timeblock is already running
		const runningTimeblock = await Timeblock.findOne({ isTracking: true })
		if (runningTimeblock) return res.status(300).json({ status: 'Timeblock is actually running' })

		// Create new timeblock related to user (from actual Date)
		const timeblock = await Timeblock.create({
			user: username,
			createdAt: new Date(),
			isTracking: true,
		})

		if (req.body.description) {
			timeblock.description = req.body.description
			await timeblock.save()
		}

		res.status(201).json(timeblock)
	}

	/** Updates timeblock, this action generally stands for stopping timeblock or editing description of past timeblock. */
	async PUT() {}
	/** Discards timeblock */
	async DELETE() {}

	// TODO: Selection for actions on specified timeblock, mostly for moderating data purposes.
}

export class TimetracingService {
	public router: Router
	private controller: TimetrackingController = new TimetrackingController()

	constructor() {
		this.router = Router()
		this.routes()
	}

	private routes() {
		this.router.get('/:username', this.controller.GET)
		this.router.post('/:username', this.controller.POST)
	}
}
