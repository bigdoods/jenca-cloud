[![Build Status](https://travis-ci.org/jenca-cloud/jenca-cloud.svg?branch=master)](https://travis-ci.org/jenca-cloud/jenca-cloud)

# jenca cloud

Kubernetes based SaaS platform.

## Development

To develop Jenca cloud - you need as OSX or Linux machine.

First you need to install:

 * [VirtualBox version <=4.3](https://www.virtualbox.org/wiki/Download_Old_Builds_4_3)
 * [kmachine](https://github.com/skippbox/kmachine)
 * [local Docker client](https://docs.docker.com/engine/installation/mac/)
 * [local kubectl client](https://coreos.com/kubernetes/docs/latest/configure-kubectl.html)

Then to start the jenca development environment:

```bash
$ bash ./scripts/machine.sh boot
```

This will create a kmachine managed VM using virtualbox called `jenca-devbox`.

It will then auto-configure the local `kubectl` and `docker` clients so you can:

```bash
$ kubectl get nodes
$ docker info
```

## Repos

Each service in jenca cloud uses it's own repository under the `jenca-cloud/` namespace.  This repo is the `glue` between all of these service repos.  In order to enable the repos to appear inside the development environment, you need to `git clone` the various repos inside the `repos` folder (which is git ignored).

```bash
$ make updatecode
```

This allows the development VM to see the various service repos and for the developer to still use their git credentials on the host to git commit/git push.

## Images

Each service will have a Makefile inside the repo that will have an `images` make step.  This will use `docker build` to create the jenca images from the various repos.  The `version` of these images is controlled by the VERSION variable at the top of each Makefile.


