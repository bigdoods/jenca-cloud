#!/bin/bash -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

usage() {
cat <<EOF
Usage:
tests.sh run
tests.sh help
EOF
	exit 1
}

cmd-run-test() {
	local repo=$1;
	cd ${DIR}/../repos/${repo} && make test
}

cmd-run-tests() {
	cmd-run-test jenca-authentication
	cmd-run-test jenca-authorization
	cmd-run-test jenca-projects
	cmd-run-test jenca-router
	cmd-run-test jenca-gui
	cmd-run-test jenca-level-storage
	cmd-run-test jenca-library
	cmd-run-test jenca-runtime
}

main() {
	case "$1" in
	run)					      	shift; cmd-run-tests; $@;;
	*)                    usage $@;;
	esac
}

main "$@"
