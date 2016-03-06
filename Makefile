clean:
	docker rm -f `docker ps -aq`

update:
	bash ./scripts/repos.sh update

images:
	bash ./scripts/images.sh build

test:
	bash ./scripts/tests.sh run

.PHONY: clean update images test