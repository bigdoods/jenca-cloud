var tape = require('tape')
var serverutils = require('../server-utils')
var utils = require('../utils')
var packagejson = require('../package.json')
var path = require('path')

function get_server(done){
  serverutils.bind_server({
    datafile:utils.tempfile(),
    containerizer:'test',
    libraryfile:path.join(__dirname, 'fixtures', 'library.json')
  }, function(err, server){
    setTimeout(function(){
      done(err, server)
    }, 1000)
  })
}

function end_test(t, server){
  server.http.close(function(){
    t.end()
  })
}

tape('server should run the test containerizer and collect the results', function (t) {

  var projectJSON = require('./fixtures/bimserverproject.json')

  get_server(function(err, server){
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
      t.equal(result.containers.length, 1)
      t.equal(result.containers[0].fruit, 'pears')
      end_test(t, server)
    })
  })
  
})