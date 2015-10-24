var drivers = {
  memory:require('./message-drivers/memory')
}

module.exports = function(type, opts){
  var Driver = drivers[type]
  var driver = Driver(opts)
  return driver
}