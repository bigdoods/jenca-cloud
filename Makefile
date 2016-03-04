.PHONY: boot destroy update images test

update:
	bash ./scripts/repos.sh update

images:
	bash ./scripts/images.sh build

test:
	bash ./scripts/tests.sh run	