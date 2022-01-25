import ava from 'ava'
import got from 'got'
import listen from 'test-listen'
import http from 'http'

import { TestFn } from 'ava'
import { HttpInterface } from '_core/httpInterface'

interface ContextInterface {
	server: http.Server
	url: string
}

const test = ava as TestFn<ContextInterface>
const app = new HttpInterface().app

/* Technical setup of test workflow */

test.before(async (t) => {
	t.context.server = http.createServer(app)
	t.context.url = await listen(t.context.server)
})

test.after(async (t) => {
	t.context.server.close()
})

/* Serial tests */

test.serial('GET / should return simple hello', async (t) => {
	// Request to get data from database
	let { body, statusCode } = await got<any>(t.context.url)
	body = JSON.parse(body)
	t.is(body.message, 'hello')
	t.is(statusCode, 200)
})
