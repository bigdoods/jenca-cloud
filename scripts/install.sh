#!/usr/bin/env bash

set -e
# this is the script vagrant will use to provision the box

# remove chef and puppet
apt-get -y autoremove chef puppet

# install Docker
curl https://get.docker.com/ | sh
usermod -aG docker vagrant

# download kubectl so we have easy access to k8s
echo "downloading kubectl..."
curl https://storage.googleapis.com/kubernetes-release/release/v${K8S_VERSION}/bin/linux/amd64/kubectl --silent --output /usr/local/bin/kubectl
chmod a+x /usr/local/bin/kubectl