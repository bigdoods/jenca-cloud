[![Build Status](https://travis-ci.org/jenca-cloud/jenca-cloud.svg?branch=master)](https://travis-ci.org/jenca-cloud/jenca-cloud)

# jenca cloud

Kubernetes based SaaS platform.

## Development

To develop Jenca cloud - you need to install VirtualBox ([version ≥5.0.6](https://www.virtualbox.org/ticket/14563)) and Vagrant.

Then you can use:

```bash
$ vagrant up
$ vagrant ssh
```

You are now on the Vagrant VM:

```bash
$ docker info
$ jencactl images
$ jencactl start
```

Kubernetes is now running.  To run the tests:

```bash
$ jencactl test
```

## Repos

Each service in jenca cloud uses it's own repository under the `jenca-cloud/` namespace.  This repo is the `glue` between all of these service repos.  In order to enable the repos to appear inside the development environment, the provisioning script will `git clone` the various repos inside the `repos` folder (which is git ignored).

This allows the development VM to see the various service repos and for the developer to still use their git credentials on the host to git commit/git push.

## Images

Each service will have a Makefile inside the repo that will have an `images` make step.  This will use `docker build` to create the jenca images from the various repos.  The `version` of these images is controlled by the VERSION variable at the top of each Makefile.


