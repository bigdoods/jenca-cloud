.PHONY: boot destroy update images test

boot:
	bash ./scripts/machine.sh boot

destroy:
	bash ./scripts/machine.sh destroy

update:
	bash ./scripts/repos.sh update

images:
	bash ./scripts/images.sh build

test:
	bash ./scripts/tests.sh run	