



deps:
	npm install

release: deps
	node_modules/grunt-contrib/bin/grunt-contrib build-release

debug:
	node_modules/grunt-contrib/bin/grunt-contrib build-debug


