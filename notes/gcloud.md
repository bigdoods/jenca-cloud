## gcloud k8s cluster

https://cloud.google.com/container-engine/docs/before-you-begin

```bash
$ gcloud config set project jenca-cloud
$ gcloud config set compute/zone europe-west1-b
$ gcloud config set container/cluster test-cluster
$ gcloud container clusters get-credentials test-cluster
$ kubectl get nodes
```