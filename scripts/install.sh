#!/usr/bin/env bash

K8S_VERSION=1.1.1

set -e
# this is the script vagrant will use to provision the box

# /opt is writable is coreos and /opt/bin is in the $PATH
mkdir -p /opt/bin

# download kubectl so we have easy access to k8s
echo "downloading kubectl..."
curl https://storage.googleapis.com/kubernetes-release/release/v${K8S_VERSION}/bin/linux/amd64/kubectl --silent --output /opt/bin/kubectl
chmod a+x /opt/bin/kubectl

# link jencactl so it's in the $PATH
ln -s /home/core/share/scripts/jencactl /opt/bin/jencactl

# get the code dependencies like the authentication for example
mkdir -p /home/core/code
cd /home/core/code && git clone https://github.com/jenca-cloud/jenca-authentication.git
chown -R core:core /home/core/code

# use jencactl to build the images
jencactl images
jencactl start