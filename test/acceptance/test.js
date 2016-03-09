var tape = require('tape')
var async = require('async')
var hyperrequest = require('hyperrequest')

var routerPort = null

function get(host, url, done){
  hyperrequest({
    url:host + url,
    method:'GET',
  }, done)
}

function k8sget(url, done){
  return get('http://127.0.0.1:8080', url, done)
}

function routerget(url, done){
  return get('http://127.0.0.1:' + routerPort, url, done)
}

tape('can connect to the k8s api', function (t) {
  
  k8sget('/version', function(err, res){
    if(err){
      t.error(err)
      return t.end()
    }
    t.equal(res.body.major, "1", "the major version is equal")
    t.end()
  })
 

})

tape('can read the exposed port for the route', function (t) {

  k8sget('/api/v1/namespaces/default/services/jenca-router-public', function(err, res){
    if(err){
      t.error(err)
      return t.end()
    }

    t.equal(typeof(res.body.spec.ports[0].nodePort), 'number', 'the node port is a number')
    
    routerPort = res.body.spec.ports[0].nodePort

    t.end()
  })

})

tape('can read /v1/projects/version', function (t) {
  routerget('/v1/projects/version', function(err, res){
    if(err){
      t.error(err)
      return t.end()
    }

    t.equal(res.body.match(/^\d+\.\d+\.\d+$/) ? true : false, true, 'the version is a semver')

    t.end()
  })
})