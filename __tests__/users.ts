import got, { Got, OptionsOfJSONResponseBody, Response } from 'got'
import ava from 'ava'
import http from 'http'
import casual from 'casual'
import mongoose from 'mongoose'
import listen from 'test-listen'

import { TestFn } from 'ava'

import { MongoMemoryServer as mongod } from 'mongodb-memory-server'

import { HttpInterface } from '_core/httpInterface'
import { User } from 'users/model'
import e from 'express'

const test = ava as TestFn<{ server: http.Server; url: string; mongod: any; port: number; username: string }>
const app = new HttpInterface().app

/* Technical setup of test workflow */

test.before(async (t) => {
	t.context.server = http.createServer(app)
	t.context.url = await listen(t.context.server)
	t.context.mongod = await mongod.create({ binary: { version: 'latest', downloadDir: 'node_modules/.cache/mongodb-memory-server/mongodb-binaries' } })
	await mongoose.connect(t.context.mongod.getUri())
	/* Context related to variables */
	t.context.username = casual.username
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

/* Serial tests */

test.serial('GET /users should return array with usernames', async (t) => {
	// Request to get data from database
	const body: any = await got('users', { prefixUrl: t.context.url }).json()
	t.is(body.data[0].username, t.context.username)
	t.is(body.data.length, 1)
})

test.serial('POST /users should create new user', async (t) => {
	const staticUsername = casual.username

	const requestOpts: OptionsOfJSONResponseBody = {
		prefixUrl: t.context.url,
		method: 'POST',
		json: {
			username: staticUsername,
		},
	}

	let { body, statusCode } = await got<any>('users', requestOpts)

	body = JSON.parse(body)

	t.is(body.data.username, staticUsername, 'Username should be the same as in request')
	t.is(statusCode, 201, 'Should create a new user')

	let duplicateUserStatusCode: number

	try {
		await got<any>('users', requestOpts)
	} catch (error) {
		duplicateUserStatusCode = error.response.statusCode
	}

	t.is(duplicateUserStatusCode, 409, "Shouldn't be able to create duplicate user")
})

test.serial('DELETE /u should delete user', async (t) => {
	const requestOpts: OptionsOfJSONResponseBody = {
		prefixUrl: t.context.url,
		method: 'DELETE',
	}

	let { statusCode } = await got<any>(`users/${t.context.username}`, requestOpts)
	t.is(statusCode, 200, 'Should delete selected user')

	let noUserStatusCode: number

	try {
		await got<any>('users', requestOpts)
	} catch (error) {
		noUserStatusCode = error.response.statusCode
	}

	t.is(noUserStatusCode, 404, "Shouldn't be able to delete user that doesn't exist")
})

ava.todo('PUT /u should update user')
