gendiff:
	node bin/gendiff.js
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage
install:
	npm ci
	npm link
