BABEL=./node_modules/.bin/babel
JASMINE=./node_modules/.bin/jasmine

SRC_FILES=$(wildcard src/*.js)
TARGET_FILES=$(patsubst src/%.js, build/%.js, $(SRC_FILES))

all: node_modules build $(TARGET_FILES)

test: all
	@$(JASMINE)

node_modules:
	npm install

build:
	@mkdir build

build/%.js:: src/%.js
	$(BABEL) -o $@ $<

clean:
	@rm -r node_modules build

.PHONY: all test clean