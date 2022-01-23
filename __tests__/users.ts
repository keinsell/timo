import got from 'got'
import ava from 'ava'
import http from 'http'
import casual from 'casual'
import mongoose from 'mongoose'
import listen from 'test-listen'

import { TestFn } from 'ava'

import { MongoMemoryServer as mongod } from 'mongodb-memory-server'

import { HttpInterface } from '_core/httpInterface'
import { User } from 'users/model'

const test = ava as TestFn<{ server: http.Server; url: string; mongod: any; port: number }>
const app = new HttpInterface().app

/* Technical setup of test workflow */

test.before(async (t) => {
	t.context.server = http.createServer(app)
	t.context.url = await listen(t.context.server)
	t.context.mongod = await mongod.create()
	await mongoose.connect(t.context.mongod.getUri())
})

test.after.always(async (t) => {
	t.context.server.close()
	await mongoose.connection.dropDatabase()
	await mongoose.disconnect()
	await t.context.mongod.stop()
})

/* Mockup setup of workflow */

const username = casual.username

test.beforeEach(async () => {
	await new User({
		username: username,
	}).save()
})

test.afterEach(async () => {
	await User.deleteMany()
})

/* Serial tests */

test.serial('GET /u should return array with usernames', async (t) => {
	interface response {
		data: [string]
	}

	// Request to get data from database
	const body: response = await got('u', { prefixUrl: t.context.url }).json()
	t.deepEqual(body.data, [username])
	t.is(body.data.length, 1)
})

// ava.todo('GET /u should return array with usernames')
ava.todo('POST /u should create new user')
ava.todo('PUT /u should update user')
ava.todo('DELETE /u should delete user')
