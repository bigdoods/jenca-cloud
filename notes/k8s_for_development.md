## some use k8s links

https://github.com/kubernetes/kubernetes/blob/master/docs/getting-started-guides/docker.md

 * [running k8s via docker](http://kubernetes.io/v1.1/docs/getting-started-guides/docker.html) - [github version](https://github.com/kubernetes/kubernetes/blob/master/docs/getting-started-guides/docker.md)

## setting the kubectl to point at a cluster

```
kubectl config set-cluster jenca-devbox --server=https://192.168.99.100:6443 --insecure-skip-tls-verify=false
kubectl config set-cluster jenca-devbox --server=https://192.168.99.100:6443 --certificate-authority=/Users/kai/.kube/machine/machines/jenca-devbox/ca.pem
kubectl config set-credentials jenca-devbox --token=6U3d7TO6DQfI0VDhd0sfB1kNFxQrdto4
kubectl config set-context jenca-devbox --user=jenca-devbox --cluster=jenca-devbox
kubectl config use-context jenca-devbox
```

## setting the docker client to point at a cluster

```
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.100:2376"
export DOCKER_CERT_PATH="/Users/kai/.kube/machine/machines/jenca-devbox"
export DOCKER_MACHINE_NAME="jenca-devbox"
```

## boot k8s using docker

etcd

```
docker run --net=host -d gcr.io/google_containers/etcd:2.0.12 /usr/local/bin/etcd --addr=127.0.0.1:4001 --bind-addr=0.0.0.0:4001 --data-dir=/var/etcd/data
```

master

```
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
    gcr.io/google_containers/hyperkube:v1.1.3 \
    /hyperkube kubelet --containerized --hostname-override="127.0.0.1" \
                       --address="0.0.0.0" --api-servers=http://localhost:8080 \
                       --config=/etc/kubernetes/manifests
```

service proxy

```
docker run -d --net=host --privileged gcr.io/google_containers/hyperkube:v1.1.3 /hyperkube proxy --master=http://127.0.0.1:8080 --v=2
```