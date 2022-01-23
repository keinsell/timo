import express from 'express'

export class HelloController {
	public async sayHello(rq: express.Request, rs: express.Response) {
		rs.json('Hello')
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

	public async startup() {
		this.app.listen(process.env.PORT, () => {
			console.log(`Application is working on http://${process.env.HOST}:${process.env.PORT}`)
		})
	}
}

export function returnX() {
	return 'x'
}
