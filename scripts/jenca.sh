#!/bin/bash -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

usage() {
cat <<EOF
Usage:
jenca.sh start
jenca.sh stop
jenca.sh replace
jenca.sh restart
jenca.sh expose
jenca.sh info
jenca.sh hide
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
      echo "k8s disabled: $servicename ($resourcename)"
      return
    fi
    echo "k8s $action: $servicename ($resourcename)"
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

  echo "${action} ${service} ${resource}"

  local manifestdir="${DIR}/../stack/manifests/core"
  
  if [[ "$service" == "*" ]]; then
    service=""
  fi

  # you can pass a single service - k8s start jenca-router
  if [[ -n "$service" && ! -f "${dir}/disable" ]]; then

    # you can pass a single resources - k8s start jenca-router controller
    if [[ "$resource" == "service" ]]; then
      cmd-k8s $action "${manifestdir}/${service}/service.yml"
    elif [[ "$resource" == "controller" ]]; then
      cmd-k8s $action "${manifestdir}/${service}/controller.yml"
    else
      cmd-k8s $action "${manifestdir}/${service}/service.yml"
      cmd-k8s $action "${manifestdir}/${service}/controller.yml"
    fi

  else
    for dir in $(ls -d $manifestdir/*); 
    do
      if [[ -d "${dir}" && ! -f "${dir}/disable" ]]; then
        if [[ -z "$resource" || "$resource"=="service" ]]; then
          cmd-k8s $action "${dir}/service.yml"
        fi
      fi
    done
    
    for dir in $(ls -d $manifestdir/*); 
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

cmd-restart() {
  local service="$1"
  cmd-k8s-loop delete $service controller
  cmd-k8s-loop create $service controller
}

cmd-info() {
  kubectl get svc jenca-router-public -o json 
}

cmd-expose() {
  # expose the router service as a node port on the host
  kubectl expose rc router \
    --port=80 \
    --target-port=80 \
    --name=jenca-router-public \
    --type=NodePort
  cmd-info
}

cmd-hide() {
  kubectl delete svc jenca-router-public
}

main() {
	case "$1" in
	start)					      shift; cmd-start $@;;
	stop)					        shift; cmd-stop $@;;
  replace)              shift; cmd-replace $@;;
  restart)              shift; cmd-restart $@;;
  expose)               shift; cmd-expose $@;;
  info)                 shift; cmd-info $@;;
  hide)                 shift; cmd-hide $@;;
	*)                    usage $@;;
	esac
}

main "$@"
