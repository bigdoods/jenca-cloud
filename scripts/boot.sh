#!/usr/bin/env bash

set -e

export K8S_VERSION=${K8S_VERSION:="1.2.0-alpha.8"}
export BOX_NAME=${BOX_NAME:="jenca-devbox"}

kmachine create -d virtualbox ${BOX_NAME}
eval "$(kmachine env ${BOX_NAME})"
