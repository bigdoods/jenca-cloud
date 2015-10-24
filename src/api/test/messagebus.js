var tape = require('tape')
var MessageBus = require('../messagebus')

function create_bus(){
  return MessageBus()
}

tape('subscribe and publish a message', function (t) {

  var bus = create_bus()

  var messages_received = []

  bus.subscribe('container-created', function(data){
    messages_received.push(data)
  }, function(){
    bus.publish('container-created', 'apples', function(){
      bus.publish('container-created', 'oranges', function(){
        t.equal(messages_received.length, 2)
        t.equal(messages_received[0], 'apples')
        t.equal(messages_received[1], 'oranges')
        t.end()
      })
    })
  })

})

tape('subscribe to all channels (*)', function (t) {

  var bus = create_bus()

  var messages_received = []

  bus.subscribe('*', function(data){
    messages_received.push(data)
  }, function(){
    bus.publish('apples', 'apples', function(){
      bus.publish('oranges', 'oranges', function(){
        t.equal(messages_received.length, 2)
        t.equal(messages_received[0], 'apples')
        t.equal(messages_received[1], 'oranges')
        t.end()
      })
    })
  })

})