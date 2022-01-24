import express, { Request, Response, Router } from 'express'
import { Timeblock } from 'timeblocks/model'

class TimeblockController {
	async GETbyParams(req: Request, res: Response) {
		const id = req.params.timeblock
		const timeblock = await Timeblock.findById(id)
		if (!timeblock) return res.status(404).json({ status: 'Timeblock not found' })
		res.status(200).json({ data: timeblock })
	}

	async PATCHbyParams(req: Request, res: Response) {
		const id = req.params.timeblock
		const timeblock = await Timeblock.findById(id)
		if (!timeblock) return res.status(404).json({ status: 'Timeblock not found' })
		const updatedTimeblock = await Timeblock.findByIdAndUpdate(id, { ...req.body })
		res.status(200).json({ data: updatedTimeblock })
	}

	async DELETEbyParams(req: Request, res: Response) {
		const id = req.params.timeblock
		const timeblock = await Timeblock.findById(id)
		if (!timeblock) return res.status(404).json({ status: 'Timeblock not found' })
		await Timeblock.findByIdAndDelete(id)
		res.status(200).json({ status: 'Deleted' })
	}
}

export class TimeblockService {
	private controller: TimeblockController = new TimeblockController()
	public router: express.Router

	constructor() {
		this.router = Router()
		this.routes()
	}

	routes() {
		this.router.get('/:timeblock', this.controller.GETbyParams)
		this.router.patch('/:timeblock', this.controller.PATCHbyParams)
		this.router.delete('/:timeblock', this.controller.DELETEbyParams)
	}
}
