import express from 'express'

export class HelloController {
	public async sayHello(rq: express.Request, rs: express.Response) {
		rs.json({ message: 'hello' })
	}
}

export class HelloService {
	public router: express.Router
	private controller: HelloController = new HelloController()

	constructor() {
		this.router = express.Router()
		this.routes()
	}

	private routes() {
		this.router.get('/', this.controller.sayHello)
	}
}