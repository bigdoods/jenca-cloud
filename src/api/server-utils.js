var http = require('http')
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

module.exports = {
  build_server:build_server,
  bind_server:bind_server
}