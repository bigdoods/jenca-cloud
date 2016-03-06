## installing the docker machine dev VM

NOTE: if you are on OSX - you must have VirtualBox 4.3 or earlier
Virtualbox 5 will not work with docker-machine on OSX

```bash
$ curl -L https://github.com/docker/machine/releases/download/v0.6.0/docker-machine-`uname -s`-`uname -m` > /usr/local/bin/docker-machine
$ chmod +x /usr/local/bin/docker-machine
$ docker-machine create --driver virtualbox jenca-dev
```