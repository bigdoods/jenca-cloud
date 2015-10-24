var EventEmitter2 = require('eventemitter2').EventEmitter2;

var GLOBAL_BUS = null

module.exports = function(opts){

  if(GLOBAL_BUS) return GLOBAL_BUS

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

  GLOBAL_BUS = bus

  return bus
}