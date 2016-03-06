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
	cmd-run-tests jenca-authentication
	cmd-run-tests jenca-authorization
	cmd-run-tests jenca-projects
	cmd-run-tests jenca-router
	cmd-run-tests jenca-gui
	cmd-run-tests jenca-level-storage
	cmd-run-tests jenca-library
	cmd-run-tests jenca-runtime
}

main() {
	case "$1" in
	run)					      	shift; cmd-run-tests; $@;;
	*)                    usage $@;;
	esac
}

main "$@"
