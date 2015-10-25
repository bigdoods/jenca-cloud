var drivers = {
  localdocker:require('./drivers/localdocker')
}

module.exports = function(type, opts){
  var Driver = drivers[type]
  var driver = Driver(opts)

  driver.listen = function(bus){
    bus.json_subscribe('container.start', function(data){
      driver.start_container(data, function(err){
        
      })
    })
  }

  return driver
}