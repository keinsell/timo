import test from 'ava'
import { returnX } from 'index'

test.serial('This should pass', async function (t) {
	t.is('x', 'x')
})

test.serial('ReturnX should return "x"', async function (t) {
	t.is(returnX(), 'x')
})

test.serial('This should not pass', async function (t) {
	t.is('x', 'y')
})
