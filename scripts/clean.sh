#!/bin/bash -e

container_ids=`docker ps -q -f status=exited`

if [[ -n "$container_ids" ]]; then
	docker rm -f $container_ids
fi
