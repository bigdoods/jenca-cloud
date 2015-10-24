var http = require('http')
var hyperquest = require('hyperquest')
var concat = require('concat-stream');
var Server = require('./server')


function build_server(args){
  return http.createServer(Server(args))
}

function bind_server(args, done){
  if(!args) done = args
  var server = build_server(args)
  server.listen(args.port || 80, function(){
    done && done(null, server)
  })
}

function get_request(url, done){
  hyperquest(url).pipe(concat(done))
}

function json_get_request(url, done){
  get_request(url, function(err, result){
    if(err) return done(err)
    done(null, JSON.parse(result))
  })
}

module.exports = {
  build_server:build_server,
  bind_server:bind_server,
  request:{
    get:get_request,
    json_get:json_get_request
  }
}