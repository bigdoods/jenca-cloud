var drivers = {
  jsonfile:require('./drivers/jsonfile')
}

module.exports = function(type, opts){
  var Driver = drivers[type]
  var driver = Driver(opts)
  return driver
}