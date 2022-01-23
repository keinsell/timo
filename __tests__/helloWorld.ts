import test from 'ava'

test.serial('This should pass', async function (t) {
	t.is('x', 'x')
})

test.serial('This should not pass', async function (t) {
	t.is('x', 'y')
})
