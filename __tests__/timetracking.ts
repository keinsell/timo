import got, { OptionsOfJSONResponseBody } from 'got'
import ava from 'ava'
import http from 'http'
import casual from 'casual'
import mongoose from 'mongoose'
import listen from 'test-listen'
import { add } from 'date-fns'

import { TestFn } from 'ava'
import { MongoMemoryServer as mongod } from 'mongodb-memory-server'

import { HttpInterface } from '_core/httpInterface'

import { User } from 'users/model'
import { Timeblock } from 'timeblocks/model'

/* Essential Workflow Elemnets */

interface ContextInterface {
	server: http.Server
	url: string
	mongod: any
	/* Test-specific */
	username: string
	taskNote: string
}

const test = ava as TestFn<ContextInterface>
const app = new HttpInterface().app

/* Technical setup of test workflow */

test.before(async (t) => {
	t.context.server = http.createServer(app)
	t.context.url = await listen(t.context.server)
	t.context.mongod = await mongod.create({ binary: { version: 'latest', downloadDir: 'node_modules/.cache/mongodb-memory-server/mongodb-binaries' } })
	await mongoose.connect(t.context.mongod.getUri())

	/* Context Variables */
	t.context.username = casual.username
	t.context.taskNote = casual.description
})

test.after(async (t) => {
	t.context.server.close()
	await mongoose.connection.dropDatabase()
	await mongoose.disconnect()
	await t.context.mongod.stop()
})

/* Mockup setup of workflow */

test.beforeEach(async (t) => {
	await new User({
		username: t.context.username,
	}).save()
})

test.afterEach(async () => {
	await User.deleteMany()
})

test.serial('GET /track/:username should return timeblocks', async (t) => {
	let { statusCode, body } = await got<any>(`track/${t.context.username}`, {
		prefixUrl: t.context.url,
	})

	body = JSON.parse(body)
	t.is(statusCode, 200)

	await User.deleteMany()

	let nonExistingEntryStatusCode: number

	try {
		await got<any>(`track/${t.context.username}`, { prefixUrl: t.context.url })
	} catch (error) {
		nonExistingEntryStatusCode = error.response.statusCode
	}

	t.is(nonExistingEntryStatusCode, 404, "Shouldn't be able to get unexisting user")
})

test.serial('POST /track/:username should create new timeblock', async (t) => {
	let { statusCode, body } = await got<any>(`track/${t.context.username}`, {
		method: 'POST',
		prefixUrl: t.context.url,
		json: {
			description: 'Designing some shit',
		},
	})

	body = JSON.parse(body)

	t.is(statusCode, 201)
	t.is(body.description, 'Designing some shit')

	let tryToTrackMultipleEntries

	try {
		await got<any>(`track/${t.context.username}`, {
			method: 'POST',
			prefixUrl: t.context.url,
			json: {
				description: 'Designing some shit',
			},
		})
	} catch (error) {
		tryToTrackMultipleEntries = error.response.statusCode
	}

	t.is(tryToTrackMultipleEntries, 409, "Shouldn't be able to track multiple entries")
})

ava.todo('PATCH /track/:username should update timeblock')
ava.todo('DELETE /track/:username should discard actual timeblock')
ava.todo('POST /track/:username/summary should return summary')
