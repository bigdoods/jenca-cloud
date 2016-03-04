#!/bin/bash -e

export K8S_VERSION=${K8S_VERSION:="1.0.1"}
export ETCD_VERSION=${ETCD_VERSION:="2.0.12"}

usage() {
cat <<EOF
Usage:
k8s.sh etcd
k8s.sh proxy
k8s.sh hyperkube
k8s.sh start
k8s.sh stop
k8s.sh restart
k8s.sh download
k8s.sh help
EOF
	exit 1
}

# stop any container that the output of docker ps matches against the
# given grep pattern
grepstop-container() {
	local pattern=$1
	docker rm -f $(docker ps -a | grep $pattern | awk '{print $1}')
}

# start the etcd docker container
cmd-etcd() {
	docker run \
		--net=host \
		-d \
		gcr.io/google_containers/etcd:${ETCD_VERSION} /usr/local/bin/etcd \
			--addr=127.0.0.1:4001 \
			--bind-addr=0.0.0.0:4001 \
			--data-dir=/var/etcd/data
}

# start the various kubernetes containers via the kyperkube
cmd-hyperkube() {
	docker run \
    --volume=/:/rootfs:ro \
    --volume=/sys:/sys:ro \
    --volume=/dev:/dev \
    --volume=/var/lib/docker/:/var/lib/docker:ro \
    --volume=/var/lib/kubelet/:/var/lib/kubelet:rw \
    --volume=/var/run:/var/run:rw \
    --net=host \
    --pid=host \
    --privileged=true \
    -d \
    gcr.io/google_containers/hyperkube:v${K8S_VERSION} /hyperkube kubelet \
    	--containerized \
    	--hostname-override="127.0.0.1" \
    	--address="0.0.0.0" \
    	--api-servers=http://localhost:8080 \
    	--config=/etc/kubernetes/manifests
}

# start the kubernetes proxy (we are running the kubelet on this node)
cmd-proxy() {
	docker run -d \
		--net=host \
		--privileged \
		gcr.io/google_containers/hyperkube:v${K8S_VERSION} /hyperkube proxy \
			--master=http://127.0.0.1:8080 \
			--v=2
}

# wrapper to start the whole stack
cmd-start() {
	cmd-etcd
	cmd-hyperkube
	cmd-proxy
}

# logic to remove only the jenca/kubernetes containers
cmd-stop() {
	grepstop-container k8s_scheduler || true
	grepstop-container k8s_apiserver || true
	grepstop-container k8s_controller-manager || true
	grepstop-container k8s_controller-manager || true
	grepstop-container k8s_POD || true
	grepstop-container proxy || true
	grepstop-container kubelet || true
	grepstop-container etcd	|| true
}

cmd-restart() {
	cmd-stop
	cmd-start
}

cmd-download() {
	echo "downloading kubectl..."
	curl https://storage.googleapis.com/kubernetes-release/release/v${K8S_VERSION}/bin/linux/amd64/kubectl --silent --output /usr/local/bin/kubectl
	chmod a+x /usr/local/bin/kubectl
}

main() {
	case "$1" in
	etcd)					        shift; cmd-etcd; $@;;
	hyperkube)					  shift; cmd-hyperkube; $@;;
	download)             shift; cmd-download; $@;;
	proxy)					      shift; cmd-proxy; $@;;
	start)					      shift; cmd-start; $@;;
	stop)					        shift; cmd-stop; $@;;
	restart)					    shift; cmd-restart; $@;;
	*)                    usage $@;;
	esac
}

main "$@"
