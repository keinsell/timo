module.exports = {
	extensions: ['ts'],
	require: ['esbuild-register', 'tsconfig-paths/register'],
	failFast: false,
	failWithoutAssertions: false,
	verbose: false,
	tap: false,
	concurrency: 1,
	cache: false,
	timeout: '2m',
	files: ['__tests__/**/*'],
	environmentVariables: {
		NODE_ENV: 'CI',
	},
}
