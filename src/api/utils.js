var http = require('http')
var hyperquest = require('hyperquest')
var concat = require('concat-stream');
var Server = require('./server')


function build_server(args){
  var server = Server(args)
  server.http = http.createServer(server)
  return server
}

function bind_server(args, done){
  if(arguments.length<=1) done = args
  var server = build_server(args)
  server.http.listen(args.port || 80, function(){
    done && done(null, server)
  })
}

function get_request(url, done){
  hyperquest(url).pipe(concat(function(result){
    done(null, result.toString())
  }))
}

function json_get_request(url, done){
  get_request(url, function(err, result){
    if(err) return done(err)
    done(null, JSON.parse(result))
  })
}

function post_request(url, data, done){
  var req = hyperquest.post(url)
  req.pipe(concat(function(result){
    done(null, result.toString())
  }))
  req.end(data)
}

function json_post_request(url, data, done){
  post_request(url, data, function(err, result){
    if(err) return done(err)
    done(null, JSON.parse(result))
  })
}

module.exports = {
  build_server:build_server,
  bind_server:bind_server,
  request:{
    get:get_request,
    post:post_request,
    json_get:json_get_request,
    json_post:json_post_request
  }
}