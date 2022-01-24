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
	timeblockId: string
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
	// Prepare sample user
	await new User({
		username: t.context.username,
	}).save()

	// Preapre sample Timeblock
	const timeblock = await new Timeblock({
		user: t.context.username,
		description: t.context.taskNote,
		createdAt: new Date(),
		// endedAt: add(new Date(), { minutes: 5 }),
		isTracking: true,
	}).save()

	t.context.timeblockId = timeblock._id.toString()
})

test.afterEach(async () => {
	await User.deleteMany()
	await Timeblock.deleteMany()
})

/* Serial tests */

test.serial('GET /blocks/:timeblock should return info about timeblock', async (t) => {
	// Get Timeblock from database

	let { body, statusCode } = await got<any>(`blocks/${t.context.timeblockId}`, {
		prefixUrl: t.context.url,
	})

	t.is(statusCode, 200)

	// Delete Timeblocks from database

	await Timeblock.findByIdAndDelete(t.context.timeblockId)

	// Request to get data from database

	let nonExistingEntryStatusCode: number

	try {
		await got<any>(`blocks/${t.context.timeblockId}`, { prefixUrl: t.context.url })
	} catch (error) {
		nonExistingEntryStatusCode = error.response.statusCode
	}

	t.is(nonExistingEntryStatusCode, 404, "Shouldn't be able to get unexisting timeblock")
})

test.serial('PATCH /blocks/:timeblock should update timeblock', async (t) => {
	// Request to update Timeblock
	const requestOpts: OptionsOfJSONResponseBody = {
		prefixUrl: t.context.url,
		method: 'PUT',
		json: {
			description: 'Updated description',
			endedAt: add(new Date(), { minutes: 5 }),
			isTracking: false,
		},
	}

	let { body, statusCode } = await got<any>(`blocks/${t.context.timeblockId}`, requestOpts)

	body = JSON.parse(body)

	t.is(statusCode, 200)
	t.is(body.data.description, 'Updated description')

	// Delete Timeblocks from database

	await Timeblock.findByIdAndDelete(t.context.timeblockId)

	let nonExistingEntryStatusCode: number

	try {
		await got<any>(`blocks/${t.context.timeblockId}`, requestOpts)
	} catch (error) {
		nonExistingEntryStatusCode = error.response.statusCode
	}

	t.is(nonExistingEntryStatusCode, 404, "Shouldn't be able to get unexisting timeblock")
})


ava.todo('DELETE /blocks/:timeblock should delete timeblock')
