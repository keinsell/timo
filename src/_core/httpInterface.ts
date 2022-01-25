import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'

import { HelloService } from 'hello/service'
import { UserService } from 'users/service'
import { TimetracingService } from 'timetracking/service'

import { HOST, MONGODB_URL, PORT } from 'utils'
import { TimeblockService } from 'timeblocks/service'

export class HttpInterface {
	public app: express.Application

	constructor() {
		this.app = express()
		this.utils()
		this.middleware()
		this.security()
		this.routes()
	}

	private utils() {
		this.app.disable('x-powered-by')
	}

	private middleware() {
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: false }))
		this.app.use(morgan('dev'))
	}
	private security() {}

	private routes() {
		this.app.use('/', new HelloService().router)
		this.app.use('/users', new UserService().router)
		this.app.use('/track', new TimetracingService().router)
		this.app.use('/blocks', new TimeblockService().router)
	}

	/** Method dedicated for database connection. */
	private database() {
		try {
			mongoose.connect(MONGODB_URL)
		} catch (e) {
			throw Error(e)
		}

		// TODO: Add `mongoose` error handling

		return mongoose
	}

	/** Method dedicated for running Express.js server. */
	public async startup() {
		// Ensure application connected to database before run.
		this.database()

		this.app.listen(PORT, () => {
			console.log(`Application is working on http://${HOST}:${PORT}`)
		})
	}
}
