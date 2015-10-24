var tape = require('tape')
var utils = require('../utils')
var packagejson = require('../package.json')

function end_test(t, server){
  server.http.close(function(){
    t.end()
  })
}

tape('server should GET /v1/version TEST', function (t) {

  console.log('making a server')

  utils.bind_server(function(error, server){

    console.log('server made')

    utils.request.get('http://127.0.0.1:80/v1/version', function(error, result){
      if(error){
        t.error(error)
        end_test(t, server)    
        return
      }
      t.equal(result, packagejson.version)
      end_test(t, server)
    })
 
  })
  
})
