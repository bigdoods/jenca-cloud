var drivers = {
  jsonfile:require('./storage-drivers/jsonfile')
}

module.exports = function(type, opts){
  var Driver = drivers[type]
  var driver = Driver(opts)
  return driver
}