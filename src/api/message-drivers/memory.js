var EventEmitter2 = require('eventemitter2').EventEmitter2;

module.exports = function(opts){
  var bus = new EventEmitter2({
    wildcard: true
  })

  bus.publish = function(channel, data, done){
    bus.emit(channel, data)
    done()
  }

  bus.subscribe = function(channel, handler, done){
    bus.on(channel, function(data){
      handler(data)
    })
    done()
  }

  return bus
}