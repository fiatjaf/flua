all: lib/index.js example.bundle.js

lib/index.js: src/index.js
	./node_modules/babel-cli/bin/babel.js src --out-dir lib

example.bundle.js: lib/index.js
	./node_modules/.bin/browserify example.js -o example.bundle.js
