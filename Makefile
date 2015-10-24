.PHONY: test apitest build apishell

build:
	docker build -t jencacloud/api:1.0.0 src/api

apitest:
	@docker run -ti --rm \
		--entrypoint "npm" \
		jencacloud/api:1.0.0 \
		test

apishell:
	@docker run -ti --rm \
		--entrypoint "bash" \
		jencacloud/api:1.0.0

test: build apitest