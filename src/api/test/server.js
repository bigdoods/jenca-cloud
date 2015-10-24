var tape = require('tape')
var utils = require('../utils')
var packagejson = require('../package.json')

tape('server should GET /v1/version', function (t) {

  console.log('making a server')

  utils.bind_server(function(error, server){

    console.log('server made')

    utils.request.get('http://127.0.0.1:80/v1/version', function(error, result){
      if(error){
        t.error(error)
        t.end()
        return
      }

      t.equal(result, packagejson.version)
      t.end()
    })
 
  })
  
})
