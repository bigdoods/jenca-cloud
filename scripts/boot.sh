#!/usr/bin/env bash

set -e

export BOX_NAME=${BOX_NAME:="jenca-devbox"}

kmachine create -d virtualbox ${BOX_NAME}
eval "$(kmachine env ${BOX_NAME})"
