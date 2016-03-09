#!/bin/bash -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

usage() {
cat <<EOF
Usage:
images.sh build
images.sh system
images.sh help
EOF
	exit 1
}

cmd-build-system-images() {
  docker build -t jenca/testtools ${DIR}/../test/acceptance
}

cmd-build-image() {
	local repo=$1;
	cd ${DIR}/../repos/${repo} && make images
}

cmd-build-images() {
	local repodir="${DIR}/../repos/*"
  local service="$1"

  if [[ -n "$service" ]]; then
    cmd-build-image "jenca-${service}"
  else
    for dir in $(ls -d $repodir); 
    do
      if [[ -d $dir ]]; then
        cmd-build-image `basename $dir`
      fi
    done
  fi

  cmd-build-system-images
}

main() {
	case "$1" in
	build)					      shift; cmd-build-images $@;;
  system)               shift; cmd-build-system-images $@;;
	*)                    usage $@;;
	esac
}

main "$@"
