var tape = require('tape')
var serverutils = require('../server-utils')
var utils = require('../utils')
var packagejson = require('../package.json')

function end_test(t, server){
  server.http.close(function(){
    t.end()
  })
}

tape('server should GET /v1/version', function (t) {

  serverutils.bind_server({
    datafile:utils.tempfile()
  }, function(err, server){
    if(err){
      t.error(err)
      end_test(t, server)    
      return
    }
    utils.request.get('http://127.0.0.1:80/v1/version', function(err, result){
      if(err){
        t.error(err)
        end_test(t, server)    
        return
      }
      t.equal(result, packagejson.version)
      end_test(t, server)
    })
 
  })
  
})

tape('server should POST a project and then GET it', function (t) {

  var projectJSON = require('./fixtures/project.json')

  function testProjectData(result){
    t.equal(typeof(result), 'object')
    t.equal(result.name, 'My First Project')
    t.equal(typeof(result.id), 'string')
    t.equal(result.id.length, 36)
    t.equal(result.containers.length, 1)
    t.equal(result.containers[0].name, 'Test')
    t.equal(result.containers[0].image, 'jenca/testimage:1.0.0')
    t.equal(result.containers[0].arguments, 'apples')
  }
  
  serverutils.bind_server({
    datafile:utils.tempfile()
  }, function(err, server){
    if(err){
      t.error(err)
      end_test(t, server)
      return
    }
    utils.request.json_post('http://127.0.0.1:80/v1/projects', projectJSON, function(err, result){
      if(err){
        t.error(err)
        end_test(t, server)
        return
      }
      testProjectData(result)
      utils.request.json_get('http://127.0.0.1:80/v1/projects/' + result.id, function(err, result){
        if(err){
          t.error(err)
          end_test(t, server)
          return
        }
        testProjectData(result)
        end_test(t, server)
      })

      
    })
  })
  
})