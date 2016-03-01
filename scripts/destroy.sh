#!/usr/bin/env bash

set -e

export BOX_NAME=${BOX_NAME:="jenca-devbox"}

kmachine kill ${BOX_NAME}
kmachime rm ${BOX_NAME}
