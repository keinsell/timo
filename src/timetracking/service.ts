import express, { Request, Response, Router } from 'express'
import { User } from 'users/model'
import { Timeblock } from 'timetracking/model'

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
		return res.status(200).json(timeblock)
	}

	/** Creates a new timeblock starting from actual date. */
	async POST() {}
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
	}
}
