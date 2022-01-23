import express from 'express'
import mongoose from 'mongoose'

import { HelloService } from 'hello/service'
import { UserService } from 'users/service'

import { HOST, MONGODB_URL, PORT } from 'utils'

export function returnX() {
	return 'x'
}

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
	}
	private security() {}

	private routes() {
		this.app.use('/', new HelloService().router)
		this.app.use('/u', new UserService().router)
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

new HttpInterface().startup()