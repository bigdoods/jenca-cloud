## getting vagrant to mount shared folders

sometimes there is an issue with shared folders if your guest additions are out of date.

The easy way to fix this:

```bash
$ vagrant plugin install vagrant-vbguest
```

Otherwise it's the [hard way](https://gist.github.com/fernandoaleman/5083680)