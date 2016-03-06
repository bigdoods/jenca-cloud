#!/bin/bash -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

usage() {
cat <<EOF
Usage:
jenca.sh start
jenca.sh stop
jenca.sh replace
jenca.sh help
EOF
	exit 1
}

cmd-k8s-service() {
  local action="$1"
  local dir="$2"
  local servicename=`basename $dir`
  echo "starting service: $servicename"
  kubectl create -f ${dir}/service.yml
}

cmd-k8s-controller() {
  local action="$1"
  local dir="$2"
  local servicename=`basename $dir`
  echo "starting controller: $servicename"
  kubectl create -f ${dir}/controller.yml
}

cmd-k8s-loop() {
  local action="$1"
  local manifestdir="${DIR}/../stack/manifests/core/*"
  for dir in $(ls -d $manifestdir); 
  do
    if [[ -d $dir ]]; then
      cmd-k8s-service $action $dir
    fi
  done
  local manifestdir="${DIR}/../stack/manifests/core/*"
  for dir in $(ls -d $manifestdir); 
  do
    if [[ -d $dir ]]; then
      cmd-k8s-controller $action $dir
    fi
  done
}

cmd-start() {
  cmd-k8s-loop create
}

cmd-replace() {
  cmd-k8s-loop replace
}

cmd-stop() {
  cmd-k8s-loop delete
}

main() {
	case "$1" in
	start)					      shift; cmd-start; $@;;
	stop)					        shift; cmd-stop; $@;;
  replace)              shift; cmd-replace; $@;;
	*)                    usage $@;;
	esac
}

main "$@"
