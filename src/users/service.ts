import express, { Request, Response } from 'express'
import { User } from './model'
import { Timeblock } from 'timeblocks/model'

export class UserController {
	/** Creates new user in database. */
	public async POST(rq: Request, rs: Response) {
		const desiredUsername = rq.body.username

		const users = await User.findOne({ username: desiredUsername }).count()

		if (users > 0) {
			return rs.status(409).json()
		} else {
			const newUser = await new User({ username: desiredUsername }).save()
			rs.status(201).json({ data: newUser })
		}
	}

	/** Returns array filled with User's usernames as strings */
	public async GET(rq: Request, rs: Response) {
		// Get all users from database and parse their usernames to array
		const users = await User.find()

		// let usernames = []
		// users.map((user) => usernames.push(user.username))

		// Return array with usernames with startus 200
		rs.status(200).json({ data: users })
	}

	public async DELETEbyUsernameParams(rq: Request, rs: Response) {
		const selectedUsername = rq.params.username
		const users = await User.findOne({ username: selectedUsername }).count()

		if (users > 0) {
			await User.deleteOne({ username: selectedUsername })
			await Timeblock.deleteMany({ user: selectedUsername })

			rs.status(200).json({ status: 'Deleted' })
		} else {
			rs.status(404).json({ status: 'User not found' })
		}
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
		this.router.delete('/:username', this.controller.DELETEbyUsernameParams)
	}
}
