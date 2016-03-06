clean:
	docker rm -f `docker ps -q -f status=exited`

update:
	bash ./scripts/repos.sh update

images:
	bash ./scripts/images.sh build

test:
	bash ./scripts/tests.sh run

k8s.start:
	bash scripts/k8s.sh start

k8s.stop:
	bash scripts/k8s.sh stop

.PHONY: clean update images test k8s.start k8s.stop