var http = require('http')
var args = require('minimist')(process.argv, {
  alias:{
    p:'port',
    d:'datafile'
  },
  default:{
    port:80,
    datafile:process.env.DATA_FILE || '/data/file.json'
  }
})

var Server = require('./server')
var server = http.createServer(Server(args))

server.listen(args.port, function(){
  console.log('server listening on port: ' + args.port)
})