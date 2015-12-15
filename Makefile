.PHONY: test apitest build apishell run devinstall windowsinstall

# build the docker image for each service that requires one
# each service has it's own folder inside 'src'
# the Dockerfile describing the image should be in the folder 'src/<servicename>'
build:
	@docker build -t jencacloud/api:1.0.0 src/api

# first run `make apishell` -> `npm install`
# then the apitest will run fast :-)

# run the tests of the api server
# we are mounting the source-code folder because if we don't, Docker will
# do a fresh `npm install` each time we run tests (which takes time)
# this is because we are adding code (which might have changed) and Docker
# invalidates the layer cache
# so - we are mounting a volume from the host - it points at the source code
# the idea is we run 'npm install' once - from inside a container
# this installs the node modules on the host (because volume)
# and then every other time we run the tests - the node_nodules are already installed
# (which makes npm install finish right away)
apitest:
	@docker run -ti --rm \
		--entrypoint "npm" \
		-v $(PWD)/src/api:/srv/app \
		jencacloud/api:1.0.0 \
		test

# get an interactive shell for the api container with a volume mounted to the 
# source code on the host
# this is useful for doing an 'npm install' the install the node_modules on the host
# (for quick test runs)
apishell:
	@docker run -ti --rm \
		--entrypoint "bash" \
		-v $(PWD)/src/api:/srv/app \
		jencacloud/api:1.0.0

# build up all the tests here
test: apitest

# build the images then bring up the stack interactive mode with docker-compose up
run: build
	docker-compose up

# install nodejs on the host system - useful for running any node stuff in development
nodejs:
	apt-get install -y python-software-properties make python
	wget -qO /usr/local/bin/nave https://raw.github.com/isaacs/nave/master/nave.sh
	chmod a+x /usr/local/bin/nave
	nave usemain 0.11.13

# this automates the installation of the node_modules folder on the host
developer: build
	@docker run -ti --rm \
		--entrypoint "bash" \
		-v $(PWD)/src/api:/srv/app \
		jencacloud/api:1.0.0 -c "cd /srv/app && npm install"

# this runs the docker-compose but mounts the web folder for
# instant changes - useful when editing the front-end and reloading without
# restarting the container
devrun: build
	docker-compose -f development.yml up

# this runs the docker-compose but with no volumes mounted as though the
# images are immutable and living in a registry somewhere
prodrun: build
	docker-compose -f production.yml up -d

# an admin script to POST a project into the api for manual testing
# (XXX: this does not live here)
devcreate:
	bash scripts/createproject.sh