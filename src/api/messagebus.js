var Transport = require('./messagetransport')

module.exports = function(type, opts){

  if(!type) type = 'memory'
    
  var transport = Transport(type, opts)

  function publish(channel, data, done){
    transport.publish(channel, data, done)
  }

  function subscribe(channel, handler, done){
    transport.subscribe(channel, handler, done)
  }

  return {
    publish:publish,
    subscribe:subscribe
  }
}