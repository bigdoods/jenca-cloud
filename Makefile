.PHONY: test apitest build

build:
	docker build -t jencacloud/api:1.0.0 src/api

apitest:
	@docker run --rm \
		--entrypoint "npm" \
		jencacloud/api:1.0.0 \
		test

test: apitest