var drivers = {
  localdocker:require('./drivers/localdocker')
}

module.exports = function(type, opts){
  var Driver = drivers[type]
  var driver = Driver(opts)

  driver.listen = function(bus){
    console.log('-------------------------------------------');
    console.log('-------------------------------------------');
    console.log('CONTINERIZER LISTEN')
    bus.subscribe('container.start', function(data){
      console.log('-------------------------------------------');
      console.log('-------------------------------------------');
      console.log('message')
      driver.start_container(data, function(err){
        
      })
    })
  }

  return driver
}