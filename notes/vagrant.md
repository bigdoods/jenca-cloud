## getting vagrant to mount shared folders

sometimes there is an issue with shared folders if your guest additions are out of date.

The easy way to fix this:

```bash
$ vagrant plugin install vagrant-vbguest
```

If for some reason this command fails - try installing the latest [version of Vagrant](https://www.vagrantup.com/downloads.html):

Here is what to do for an Ubuntu/Debian system:

```
$ cd ~/Downloads
$ wget https://releases.hashicorp.com/vagrant/1.8.1/vagrant_1.8.1_x86_64.deb
$ sudo dpkg -i vagrant_1.8.1_x86_64.deb
```

Otherwise it's the [hard way](https://gist.github.com/fernandoaleman/5083680)