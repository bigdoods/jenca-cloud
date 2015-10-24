var drivers = {
  jsonfile:require('./library-drivers/jsonfile')
}

module.exports = function(type, opts){
  var Driver = drivers[type]
  var driver = Driver(opts)
  return driver
}