import express, { Request, Response } from 'express'
import { User } from './model'

export class UserController {
	/** Creates new user in database. */
	public async POST(rq: Request, rs: Response) {
		const desiredUsername = rq.body.username

		const users = await User.findOne({ username: desiredUsername }).count()

		if (users > 0) {
			rs.status(500).json({ status: 'User with follwoing username exist in database.' })
		}

		const newUser = await new User({ username: desiredUsername })
		rs.status(201).json({ data: newUser })
	}
}

export class UserService {
	public router: express.Router
	private controller: UserController = new UserController()

	constructor() {
		this.router = express.Router()
		this.routes()
	}

	private routes() {
		this.router.get('/', this.controller.GET)
	}
}
