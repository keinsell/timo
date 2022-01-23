import express from 'express'
import { HelloService } from 'hello/service'
import { HOST, PORT } from 'utils'

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
	}

	/** Method dedicated for database connection. */
	private database() {
		console.log('Database Connection should be implemented.')
	}

	/** Method dedicated for running Express.js server. */
	public async startup() {
		// Connect to database
		this.database()

		this.app.listen(PORT, () => {
			console.log(`Application is working on http://${HOST}:${PORT}`)
		})
	}
}

new HttpInterface().startup()