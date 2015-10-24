var Containerizer = require('./consumers/containerizer')

module.exports = function(opts){
  var consumers = {
    containerizer:Containerizer(opts.containerizer || 'localdocker', opts)
  }

  return {
    listen:function(bus, done){
      Object.keys(consumers).forEach(function(consumer_name){
        var consumer = consumers[consumer_name]
        consumer.listen(bus)
      })
      done()
    }
  }
}