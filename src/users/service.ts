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

	/** Returns array filled with User's usernames as strings */
	public async GET(rq: Request, rs: Response) {
		// Get all users from database and parse their usernames to array
		const users = await User.find()
		let usernames = []
		users.map((user) => usernames.push(user.username))
		// Return array with usernames with startus 200
		rs.status(200).json(usernames)
		rs.status(200).json({ data: usernames })
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
		this.router.post('/', this.controller.POST)
		this.router.get('/', this.controller.GET)
	}
}
