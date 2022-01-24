module.exports = {
	extensions: ['ts'],
	require: ['esbuild-register', 'tsconfig-paths/register'],
	failFast: true,
	failWithoutAssertions: true,
	verbose: true,
	concurrency: 10,
	tap: false,
	cache: true,
	timeout: '60s',
	files: ['__tests__/**/*'],
	environmentVariables: {
		NODE_ENV: 'CI',
	},
}
