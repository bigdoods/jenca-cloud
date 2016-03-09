var tape = require('tape')
var async = require('async')
var hyperrequest = require('hyperrequest')

function get(url, done){
  hyperrequest({
    url:'http://127.0.0.1:8080' + url,
    method:'GET',
  }, done)
}

tape('can connect to the k8s api', function (t) {
  
  
  get('/version', function(err, res){
    if(err){
      t.error(err)
      return t.end()
    }
    t.equal(res.body.major, "1", "the major version is equal")
    t.end()
  })
 

})