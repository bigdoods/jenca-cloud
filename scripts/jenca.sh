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

cmd-k8s() {
  local action="$1"
  local file="$2"
  local servicename=$(basename `dirname $file`)
  local resourcename=$(basename $file)
  local dir=$(dirname $file)

  if [[ -f "$file" ]]; then
    if [[ -f "$dir/disable" ]]; then
      echo "service disabled: $servicename ($resourcename)"
      return
    fi
    echo "service $action: $servicename ($resourcename)"
    kubectl $action -f $file
  fi
}

# loop over the manifests directory and apply $action
# to each folder (service)
# each service can have:
#  * controller.yml
#  * service.yml
# this is optional per service
#
# to start the whole stack: k8s start
# to start one service: k8s start jenca-router
# to start one services resource: k8s start jenca-router controller
# to start a resource of all services: k8s start * controller
#
cmd-k8s-loop() {
  
  local action="$1"
  local service="$2"
  local resource="$3"

  local manifestdir="${DIR}/../stack/manifests/core"

  if [[ "$service" == "*" ]]; then
    service=""
  fi

  # you can pass a single service - k8s start jenca-router
  if [[ -n "$service" ]]; then

    # you can pass a single resources - k8s start jenca-router controller
    if [[ -z "$resource" || "$resource"=="service" ]]; then
      if [[ ! -f "${dir}/disable" ]]; then
        cmd-k8s $action "${manifestdir}/${service}/service.yml"
      fi
    fi

    if [[ -z "$resource" || "$resource"=="controller" ]]; then
      if [[ ! -f "${dir}/disable" ]]; then
        cmd-k8s $action "${manifestdir}/${service}/controller.yml"
      fi
    fi

  else
    for dir in $(ls -d "${manifestdir}/*"); 
    do
      if [[ -d "${dir}" && ! -f "${dir}/disable" ]]; then
        echo "here $dir"
        if [[ -z "$resource" || "$resource"=="service" ]]; then
          cmd-k8s $action "${dir}/service.yml"
        fi
      fi
    done
    
    for dir in $(ls -d "${manifestdir}/*"); 
    do
      if [[ -d $dir && ! -f "${dir}/disable" ]]; then
        if [[ -z "$resource" || "$resource"=="controller" ]]; then
          cmd-k8s $action "${dir}/controller.yml"
        fi
      fi
    done
  fi
}

cmd-start() {
  cmd-k8s-loop create $@
}

cmd-replace() {
  cmd-k8s-loop replace $@
}

cmd-stop() {
  cmd-k8s-loop delete $@
}

main() {
	case "$1" in
	start)					      shift; cmd-start $@;;
	stop)					        shift; cmd-stop $@;;
  replace)              shift; cmd-replace $@;;
	*)                    usage $@;;
	esac
}

main "$@"
