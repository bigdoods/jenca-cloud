var utils = require('./server-utils')
var args = require('minimist')(process.argv, {
  alias:{
    p:'port',
    d:'datafile',
    s:'storage'
  },
  default:{
    port:80,
    storage:process.env.STORAGE || 'jsonfile',
    datafile:process.env.DATA_FILE || '/data/file.json'
  }
})

utils.bind_server(args, function(error, server){
  console.log('server listening on port: ' + args.port)
})