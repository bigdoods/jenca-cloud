[![Build Status](https://travis-ci.org/jenca-cloud/jenca-cloud.svg?branch=master)](https://travis-ci.org/jenca-cloud/jenca-cloud)

# jenca cloud

Kubernetes based SaaS platform.

## Development

To develop Jenca cloud - you need as OSX or Linux machine.

#### install
First you need to install:

 * [VirtualBox version <=4.3](https://www.virtualbox.org/wiki/Download_Old_Builds_4_3)
 * [Vagrant](https://www.vagrantup.com/docs/installation/)

Pull the repo

```bash
$ git pull
```

#### Boot VM
To start the jenca development environment:

```bash
$ vagrant up
$ vagrant ssh
$ cd /vagrant
```

After doing a vagrant up - check it's installed by doing 
```bash
$ docker info
```

If it is not, exit from the VM and do
```bash
$ vagrant halt
$ vagrant up --provision
```

## Repos

Each service in jenca cloud uses it's own repository under the `jenca-cloud/` namespace.  This repo is the `glue` between all of these service repos.  In order to enable the repos to appear inside the development environment, you need to `git clone` the various repos inside the `repos` folder (which is git ignored).

```bash
$ make update
```

This allows the development VM to see the various service repos and for the developer to still use their git credentials on the host to git commit/git push.

#### Images

Each service will have a Makefile inside the repo that will have an `images` make step.  This will use `docker build` to create the jenca images from the various repos.  The `version` of these images is controlled by the VERSION variable at the top of each Makefile.

Then you need to build to code into the Docker images:

```bash
$ make images
```

#### run tests
Once the images are built - you can run the tests:

```bash
$ make test
```

## Start and stop the cluster and stack

#### start/stop cluster
To start the Kubernetes cluster:

```bash
$ make k8s.start
```

To stop the Kubernetes cluster:

```bash
$ make k8s.stop
```

#### start/stop stack
To start the jenca containers on k8s:

```bash
$ make jenca.start
$ make jenca.stop
```
## Check that everythings up

```bash
$ kubectl get pods
$ docker ps
```

## Expose a single pod to test

```bash
$ kubectl expose pod <podname> --port=<port> --target-port=<port> --name=<name> --type=NodePort
$ kubectl get svc <servicename> -o json
```

then look for:

```json
ports": [
            {
                "protocol": "TCP",
                "port": <port>,
                "targetPort": <targetPort>,
                "nodePort": <nodePort>
            }
        ],
```

connect to `IP:<nodePort>` on your laptop, where `IP` is in the `Vagrantfile` (btw - we have mapped the current IP to dev.jenca.org)