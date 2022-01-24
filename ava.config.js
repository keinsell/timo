module.exports = {
	extensions: ['ts'],
	require: ['esbuild-register', 'tsconfig-paths/register'],
	failFast: true,
	failWithoutAssertions: true,
	verbose: true,
	tap: false,
	cache: true,
	timeout: '60s',
	files: ['__tests__/**/*'],
	environmentVariables: {
		NODE_ENV: 'CI',
	},
}
