var Transport = require('./messagetransport')

module.exports = function(type, opts){

  if(!type) type = 'memory'
    
  var transport = Transport(type, opts)

  function publish(channel, data, done){
    done = done || function(){}
    transport.publish(channel, data, done)
  }

  function json_publish(channel, data, done){
    if(typeof(data)!='string'){
      data = JSON.stringify(data)
    }
    publish(channel, data, done)
  }

  function subscribe(channel, handler, done){
    done = done || function(){}
    transport.subscribe(channel, handler, done)
  }

  function json_subscribe(channel, handler, done){
    done = done || function(){}
    transport.subscribe(channel, function(data){
      handler(JSON.parse(data))
    }, done)
  }

  return {
    json_publish:json_publish,
    json_subscribe:json_subscribe,
    publish:publish,
    subscribe:subscribe
  }
}