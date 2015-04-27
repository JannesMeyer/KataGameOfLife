BABEL=./node_modules/.bin/babel
JASMINE=./node_modules/.bin/jasmine

js = build/Cell.js \
     build/World.js

all: node_modules build $(js)

test: all
	$(JASMINE)

node_modules:
	npm install

build:
	mkdir build

build/%.js:: src/%.js
	$(BABEL) -o $@ $<

clean:
	rm -r node_modules build

.PHONY: all test clean