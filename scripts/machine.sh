#!/bin/bash -e

export BOX_NAME=${BOX_NAME:="jenca-devbox"}

usage() {
cat <<EOF
Usage:
machine.sh boot
machine.sh destroy
machine.sh env
machine.sh help
EOF
	exit 1
}

cmd-boot() {
	kmachine create -d virtualbox ${BOX_NAME}
	cmd-env
}

cmd-destroy() {
	kmachine kill ${BOX_NAME}
	kmachine rm ${BOX_NAME}
}

cmd-env() {
	echo
	echo "run this command to configure kubectl and docker:"
	echo "NOTE: it takes 30 seconds to boot the containers"
	echo
	echo "\$ eval \"\$(kmachine env ${BOX_NAME})\""
}

main() {
	case "$1" in
	boot)					        shift; cmd-boot; $@;;
	destroy)					  	shift; cmd-destroy; $@;;
	env)					  			shift; cmd-env; $@;;
	*)                    usage $@;;
	esac
}

main "$@"
