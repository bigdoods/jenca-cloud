var concat = require('concat-stream')
var Router = require('routes-router')
var ecstatic = require('ecstatic')
var fs = require('fs')

var packagejson = require('./package.json')
var utils = require('./utils')

var Database = require('./database')
var Library = require('./library')
var MessageBus = require('./messagebus')
var ConsumerCollection = require('./consumercollection')

var APIVERSION = 'v1'
var USER_ID = 1

function get_route(route){
  return ['', APIVERSION, route].join('/')
}

module.exports = function(opts){

  var router = Router()

  var bus = MessageBus()
  var database = Database(opts.storage, bus, opts)
  var library = Library(opts.library, bus, opts)
  var fileServer = ecstatic({ root: __dirname + '/web' })
  var consumers = ConsumerCollection(opts)

  consumers.listen(bus, function(){
    console.log('consumers listening')
  })

  router.addRoute(get_route('version'), {
    GET: function(req, res){
      res.end(packagejson.version)
    }
  })

  router.addRoute(get_route('projects'), {
    GET: function(req, res){
      database.list_projects(USER_ID, function(err, projects){
        if(err){
            res.statusCode = 500
            res.end(err)
            return
          }
          res.setHeader('Content-type', 'application/json')
          res.end(JSON.stringify(projects))
      })
    },
    POST: function(req, res){
      utils.slurp_json(req, function(err, data){

        console.log('-------------------------------------------');
        console.log('-------------------------------------------');
        console.log('-------------------------------------------');
        console.dir(data)
        console.log(typeof(data))
        database.create_project(USER_ID, data, function(err, project){
          if(err){
            res.statusCode = 500
            res.end(err)
            return
          }
          res.setHeader('Content-type', 'application/json')
          res.end(JSON.stringify(project))
        })
      })
    }
  })

  router.addRoute(get_route('projects/:id'), {
    GET: function(req, res, opts){
      var projectid = opts.params.id
      database.get_project(USER_ID, projectid, function(err, project){
        if(err){
          res.statusCode = 500
          res.end(err)
          return
        }
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(project))
      })
    }
  })

  router.addRoute(get_route('applications'), {
    GET: function(req, res){
      library.list_applications(function(err, data){
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(data))
      })
    }
  })

  router.addRoute("/*", fileServer)

  return router
}
