import express, { Request, Response, Router } from 'express'
import { UserFn, User } from 'users/model'
import { Timeblock, TimeblockInterface } from 'timeblocks/model'

import ms from 'ms'
import got from 'got'
import datefns from 'date-fns'
import { PROTOCOL, HOST, PORT } from 'utils'

class TimetrackingController {
	/** Returns information about current Timeblock. */
	async GET(req: Request, res: Response) {
		const { username } = req.params

		const doUserExist = await UserFn.doUserExistInDatabase(username)
		if (!doUserExist) return res.status(404).json({ status: 'User not found' })

		// Get current timeblock related to user
		const timeblock = await Timeblock.findOne({ isTracking: true, username: username })
		const timeblocks = await Timeblock.find({ username: username, isTracking: false }).sort({ createdAt: 'desc' })

		if (!timeblock) return res.status(200).json({ status: 'No active timeblock found', archive: timeblocks })

		return res.status(200).json({ timeblock: timeblock, archive: timeblocks })
	}

	/** Creates a new timeblock starting from actual date. */
	async POST(req: Request, res: Response) {
		const { username } = req.params

		// Check if user exists in database
		const doUserExist = await UserFn.doUserExistInDatabase(username)
		if (!doUserExist) return res.status(404).json({ status: 'User not found' })

		// If Return error when timeblock is already running
		const runningTimeblock = await Timeblock.findOne({ isTracking: true, username: username })
		if (runningTimeblock) return res.status(409).json({ status: 'Timeblock is actually running' })

		// If endedAt is earlier than createdAt throw error
		if (req.body.createdAt && req.body.endedAt) {
			if (req.body.createdAt > req.body.endedAt || req.body.createdAt == req.body.endedAt) {
				return res.status(500).json({ status: 'Wrong dates' })
			}
		}

		// Create new timeblock related to user (from actual Date)
		const timeblock = await Timeblock.create({
			user: username,
			createdAt: new Date(),
			isTracking: true,
			...req.body,
		})

		res.status(201).json(timeblock)
	}

	async PATCH(req: Request, res: Response) {
		const { username } = req.params

		const doUserExist = await UserFn.doUserExistInDatabase(username)
		if (!doUserExist) return res.status(404).json({ status: 'User not found' })

		// Find actual timeblock
		const runningTimeblock = await Timeblock.findOne({ isTracking: true })
		const updatedTimeblock = await Timeblock.findByIdAndUpdate(runningTimeblock._id, { ...req.body })

		res.status(200).json({ timeblock: updatedTimeblock })
	}

	/** Discards timeblock */
	async DELETE(req: Request, res: Response) {
		const { username } = req.params

		const doUserExist = await UserFn.doUserExistInDatabase(username)
		if (!doUserExist) return res.status(404).json({ status: 'User not found' })

		// Find actual timeblock
		const runningTimeblock = await Timeblock.findOne({ isTracking: true })
		await Timeblock.findByIdAndDelete(runningTimeblock._id)

		res.status(200).json({ status: 'Deleted' })
	}
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
		this.router.patch('/:username', this.controller.PATCH)
		this.router.delete('/:username', this.controller.DELETE)
	}
}
