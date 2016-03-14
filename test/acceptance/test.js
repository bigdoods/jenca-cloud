var tape = require('tape')
var async = require('async')
var request = require('request')

request = request.defaults({jar: true})

var routerPort = null
var emailaddress = 'bob' + (new Date().getTime()) + '@bob.com'
var bimserver = null

function get(host, url, done){
  request(host + url, function (error, response, body) {
    if (!error) {
      done(null, body, response)
    }
    else{
      done(error)
    }
  })
}

function k8surl(path){
  return 'http://127.0.0.1:8080' + path
}

function routerurl(path){
  return 'http://127.0.0.1:' + routerPort + path
}

tape('can connect to the k8s api', function (t) {
  
  request({
    url:k8surl('/version'),
    method: 'GET',
    json: true
  }, function(err, res, body){
    if(err){
      t.error(err)
      return t.end()
    }
    t.equal(res.body.major, "1", "the major version is equal")
    t.end()
  })
 

})

tape('can read the exposed port for the route', function (t) {

  request({
    url:k8surl('/api/v1/namespaces/default/services/jenca-router-public'),
    method:'GET',
    json:true
  }, function(err, res){
    if(err){
      t.error(err)
      return t.end()
    }

    t.equal(typeof(res.body.spec.ports[0].nodePort), 'number', 'the node port is a number')
    
    routerPort = res.body.spec.ports[0].nodePort

    console.log('router port: ' + routerPort)

    t.end()
  })

})

tape('can read /v1/projects/version', function (t) {
  request({
    url:routerurl('/v1/projects/version'),
    method:'GET'
  }, function(err, res){
    if(err){
      t.error(err)
      return t.end()
    }

    console.log('-------------------------------------------');
    console.log(res.body)

    t.equal(res.body.match(/^\d+\.\d+\.\d+$/) ? true : false, true, 'the version is a semver')

    t.end()
  })
})

tape('can read /v1/projects/version via the k8s proxy', function (t) {
  request({
    url:k8surl('/api/v1/proxy/namespaces/default/services/projects/v1/projects/version'),
    method:'GET'
  }, function(err, res){
    if(err){
      t.error(err)
      return t.end()
    }

    t.equal(res.body.match(/^\d+\.\d+\.\d+$/) ? true : false, true, 'the version is a semver')

    t.end()
  })
})


tape('can signup to /v1/auth/signup', function (t) {

  request({
    url:routerurl('/v1/auth/signup'),
    method:'POST',
    json:true,
    body:{
      email:emailaddress,
      password:'apples'
    }
  }, function(err, res){
    if(err){
      t.error(err)
      return t.end()
    }

    console.log('-------------------------------------------');
    console.log(res.statusCode)
    console.dir(res.body)

    t.equal(res.statusCode, 201, 'the status code is 201')
    t.equal(res.body.email, emailaddress, 'the email is the same')
    t.equal(res.body.password, 'apples', 'the password is the same')

    //t.equal(res.body.match(/^\d+\.\d+\.\d+$/) ? true : false, true, 'the version is a semver')

    t.end()
  })
})


tape('can login to /v1/auth/login', function (t) {

  request({
    url:routerurl('/v1/auth/login'),
    method:'POST',
    json:true,
    body:{
      email:emailaddress,
      password:'apples'
    }
  }, function(err, res){
    if(err){
      t.error(err)
      return t.end()
    }

    console.log('-------------------------------------------');
    console.log(res.statusCode)
    console.dir(res.body)


    t.equal(res.statusCode, 200, 'the status code is 200')
    t.equal(res.body.email, emailaddress, 'the email is the same')
    t.equal(res.body.password, 'apples', 'the password is the same')

    //t.equal(res.body.match(/^\d+\.\d+\.\d+$/) ? true : false, true, 'the version is a semver')

    t.end()
  })
})

tape('the cookie works', function (t) {

  request({
    url:routerurl('/v1/auth/status'),
    method:'GET',
    headers:{
      'Content-type':'application/json'
    },
    json:true
  }, function(err, res){
    if(err){
      t.error(err)
      return t.end()
    }


    t.equal(res.statusCode, 200, 'the status code is 200')
    t.equal(res.body.email, emailaddress, 'the email is the same')
    t.equal(res.body.is_authenticated, true, 'the cookie is authenticated')

    console.log('-------------------------------------------');
    console.log(res.statusCode)
    console.dir(res.body)

    t.end()
  })
})

tape('can view the libary at /v1/library', function (t) {

  request({
    url:routerurl('/v1/library'),
    method:'GET'
  }, function(err, res){
    if(err){
      t.error(err)
      return t.end()
    }

    var data = JSON.parse(res.body)
    t.equal(res.statusCode, 200, 'the status code is 200')
    t.equal(data.bimserver.controller.kind, 'ReplicationController', 'the library has loaded the aps')
    
    bimserver = data.bimserver

    t.end()
  })
})


tape('can make a project', function (t) {

  request({
    url:routerurl('/v1/projects'),
    method:'POST',
    json:true,
    body:{
      name:'my test project',
      app:bimserver
    }
  }, function(err, res){
    if(err){
      t.error(err)
      return t.end()
    }

    console.log('-------------------------------------------');
    console.log(res.statusCode)
    console.dir(res.body)

    t.end()
  })
})


tape('can read projects', function (t) {

  request({
    url:routerurl('/v1/projects'),
    method:'GET'
  }, function(err, res){
    if(err){
      t.error(err)
      return t.end()
    }

    var body = JSON.parse(res.body)

    t.equal(body.length, 1, 'there is one project')
    t.equal(body[0].name, 'my test project', 'it is our project')

    console.log('-------------------------------------------');
    console.log(res.statusCode)
    console.dir(res.body)

    t.end()
  })
})


tape('can start our project', function (t) {

  request({
    url:routerurl('/v1/projects'),
    method:'GET'
  }, function(err, res){
    if(err){
      t.error(err)
      return t.end()
    }

    var body = JSON.parse(res.body)

    t.equal(body.length, 1, 'there is one project')
    t.equal(body[0].name, 'my test project', 'it is our project')

    console.log('-------------------------------------------');
    console.log(res.statusCode)
    console.dir(res.body)

    t.end()
  })
})
