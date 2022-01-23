import test from 'ava'
import { returnX } from 'hello/service'

test.serial('ReturnX should return "x"', async function (t) {
	t.is(returnX(), 'x')
})