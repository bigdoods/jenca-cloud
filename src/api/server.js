var concat = require('concat-stream')
var Router = require('routes-router')
var ecstatic = require('ecstatic')
var fs = require('fs')
var packagejson = require('./package.json')

var APIVERSION = 'v1'

function get_route(route){
  return ['', APIVERSION, route].join('/')
}

module.exports = function(opts){

  var router = Router()

  router.addRoute(get_route('version'), {
    GET: function(req, res){
      res.end(packagejson.version)
    }
  })

  return router
}
