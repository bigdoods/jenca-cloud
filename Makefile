.PHONY: test apitest build apishell run

build:
	@docker build -t jencacloud/api:1.0.0 src/api

# first run `make apishell` -> `npm install`
# then the apitest will run fast :-)
apitest:
	@docker run -ti --rm \
		--entrypoint "npm" \
		-v $(PWD)/src/api:/srv/app \
		jencacloud/api:1.0.0 \
		test

apishell:
	@docker run -ti --rm \
		--entrypoint "bash" \
		-v $(PWD)/src/api:/srv/app \
		jencacloud/api:1.0.0

test: apitest

run: build
	docker-compose up

# this runs the docker-compose but mounts the web folder for
# instant changes
devrun: build
	docker-compose -f development.yml up