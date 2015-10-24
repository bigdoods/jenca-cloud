var tape = require('tape')

var Server = require('../server')

tape('server should be a function', function (t) {

  t.equal(typeof(Server), 'function')
  t.end()
  
})
