#!/bin/bash

apt-get install -y make curl

# install docker
curl -sSL https://get.docker.com/ | sh
usermod -aG docker vagrant

# install docker compose
curl -L \
    https://github.com/docker/compose/releases/download/1.5.0rc1/docker-compose-`uname -s`-`uname -m` \
    > /usr/local/bin/docker-compose
chmod a+x /usr/local/bin/docker-compose