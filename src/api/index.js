var utils = require('./utils')
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

utils.bind_server(args, function(error, server){
  console.log('server listening on port: ' + args.port)
}))