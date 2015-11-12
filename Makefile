.PHONY: test apitest build apishell run devinstall windowsinstall

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

nodejs:
	apt-get install -y python-software-properties make python
	wget -qO /usr/local/bin/nave https://raw.github.com/isaacs/nave/master/nave.sh
	chmod a+x /usr/local/bin/nave
	nave usemain 0.11.13

developer: build
	@docker run -ti --rm \
		--entrypoint "bash" \
		-v $(PWD)/src/api:/srv/app \
		jencacloud/api:1.0.0 -c "cd /srv/app && npm install"

# this runs the docker-compose but mounts the web folder for
# instant changes
devrun: build
	docker-compose -f development.yml up

prodrun: build
	docker-compose -f production.yml up -d

devcreate:
	bash scripts/createproject.sh