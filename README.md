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

Spin up new server. See install.sh

Change IP in production.yml

then whilst SSH'd

```bash
$ make build
$ make prodrun
```