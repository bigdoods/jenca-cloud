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

### Contributing

Jenca cloud uses [Travis-CI](https://travis-ci.org/jenca-cloud/jenca-cloud/) to run tests on each push of each branch.
We use [Trello](https://trello.com/b/clWQd0u9/jenca-cloud-development) to track progress on work.
To contribute to Jenca, create or find a Trello card, and create a branch with a name consisting of `issue-summary-<TRELLO-CARD-ID>`.
You can find the ID of a card by going to the card, choosing "Share and more..." and then selecting the final part of the link to the card.

When making changes
Make changes for a card 

## Production

Spin up new server. See install.sh

Change IP in production.yml

then whilst SSH'd

```bash
$ make build
$ make prodrun
```
