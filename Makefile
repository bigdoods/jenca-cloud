clean:
	docker rm -f `docker ps -q -f status=exited`

update:
	bash ./scripts/repos.sh update

images:
	bash ./scripts/images.sh build $(SERVICE)

test:
	bash ./scripts/tests.sh run

k8s.start:
	bash scripts/k8s.sh start

k8s.stop:
	bash scripts/k8s.sh stop

jenca.start:
	bash scripts/jenca.sh start $(SERVICE)

jenca.stop:
	bash scripts/jenca.sh stop $(SERVICE)

jenca.expose:
	bash scripts/jenca.sh expose

.PHONY: clean update images test k8s.start k8s.stop jenca.start jenca.stop jenca.expose