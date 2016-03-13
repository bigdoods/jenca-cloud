#!/usr/bin/env bash

set -e
# this is the script vagrant will use to provision the box

# remove chef and puppet
apt-get -y autoremove chef puppet

# install Docker
curl https://get.docker.com/ | sh
usermod -aG docker vagrant

bash /vagrant/scripts/k8s.sh download

curl -sL https://deb.nodesource.com/setup_5.x | bash -
apt-get install -y nodejs