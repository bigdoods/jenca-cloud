## jenca cloud

An easy way to run BIM applications in the cloud.

## development

To develop Jenca cloud - you need to install Virtualbox and Vagrant.

Then you can use:

```bash
$ vagrant up
$ vagrant ssh
vagrant$ cd /vagrant
vagrant$ make developer
```

To start the development environment

## Production

Spin up new server.
Install docker (see install.sh)
Install docker compose (see install.sh)
Change IP in production.yml
Install make if needed

```bash
$ apt-get -y install make
```

then whilst SSH'd

```bash
$ make build
$ make prodrun
```