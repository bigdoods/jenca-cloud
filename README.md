## jenca cloud

An easy way to run BIM applications in the cloud.

## Development

To develop Jenca cloud - you need to install VirtualBox ([version ≥5.0.6](https://www.virtualbox.org/ticket/14563)) and Vagrant.

Then you can use:

```bash
$ vagrant up
$ vagrant ssh
vagrant$ cd /vagrant
vagrant$ make developer
```

To start the development environment.

### Tests

To run the tests in the Vagrant development environment, run:


```bash
vagrant$ make tests
```

## Production

Spin up new server. See install.sh

Change IP in production.yml

then whilst SSH'd

```bash
$ make build
$ make prodrun
```