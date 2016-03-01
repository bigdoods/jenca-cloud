#!/bin/bash -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

usage() {
cat <<EOF
Usage:
images.sh build
images.sh help
EOF
	exit 1
}

cmd-build-image() {
	local repo=$1;
	cd ${DIR}/../repos/${repo} && make images
}

cmd-build-images() {
	cmd-build-image jenca-authentication
	cmd-build-image jenca-authorization
	cmd-build-image jenca-projects
	cmd-build-image jenca-router
	cmd-build-image jenca-gui
	cmd-build-image jenca-level-storage
	cmd-build-image jenca-library
}

main() {
	case "$1" in
	build)					      shift; cmd-build-images; $@;;
	*)                    usage $@;;
	esac
}

main "$@"
