#!/usr/bin/env bash

set -e
# this is the script vagrant will use to provision the box
mkdir -p /opt/bin
curl https://storage.googleapis.com/kubernetes-release/release/v1.1.1/bin/linux/amd64/kubectl --silent --output /opt/bin/kubectl
chmod a+x /opt/bin/kubectl
ln -s /home/core/share/scripts/jencactl /opt/bin/jencactl