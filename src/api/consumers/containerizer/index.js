var drivers = {
  localdocker:require('./drivers/localdocker'),
  test:require('./drivers/test')
}

module.exports = function(type, opts){
  var Driver = drivers[type]
  var driver = Driver(opts)

  driver.listen = function(bus){
    bus.json_subscribe('container.start', function(data){
      driver.start_container(data, function(err, result){
        if(err){
          console.log('-------------------------------------------');
          console.log(err)
          return
        }
        bus.json_publish('container.started', result || {})
      })
    })
  }

  return driver
}