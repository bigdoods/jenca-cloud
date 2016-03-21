clean:
	bash ./scripts/clean.sh

setup:
	bash ./scripts/setup.sh

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
	bash scripts/jenca.sh expose

jenca.restart:
	bash scripts/jenca.sh restart $(SERVICE)

jenca.stop:
	bash scripts/jenca.sh stop $(SERVICE)

jenca.refresh:
	make images
	bash scripts/jenca.sh restart $(SERVICE)

jenca.expose:
	bash scripts/jenca.sh expose

jenca.info:
	bash scripts/jenca.sh info

.PHONY: clean update images test k8s.start k8s.stop jenca.start jenca.stop jenca.expose
