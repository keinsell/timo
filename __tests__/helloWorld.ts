import test from 'ava'
import { returnX } from 'index'

test.serial('ReturnX should return "x"', async function (t) {
	t.is(returnX(), 'x')
})