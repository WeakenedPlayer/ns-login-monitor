const nexe = require('nexe');
const pkg = require('./package.json');

nexe.compile( {
		input: './dist/main.bundle.js',
		output: 'release/NS-LoginMonitor-' + pkg.version + '.exe',
		loglevel: 'verbose',
		build: true,
		ico: 'resource/icon.ico'
} );
