var utils = require('./server-utils')
var path = require('path')

var DEFAULT_LIBRARY_FILE = path.resolve(path.join(__dirname, 'data', 'library.json'))
var DEFAULT_DATA_FILE = '/data/file.json'

var args = require('minimist')(process.argv, {
  alias:{
    p:'port',
    s:'storage',
    l:'library',
    m:'messagebus',
    d:'datafile',
    f:'libraryfile',
    c:'containerizer'
  },
  default:{
    port:80,
    storage:process.env.STORAGE || 'jsonfile',
    library:process.env.LIBRARY || 'jsonfile',
    messagebus:process.env.MESSAGE_BUS || 'memory',
    datafile:process.env.DATA_FILE || DEFAULT_DATA_FILE,
    libraryfile:process.env.LIBRARY_FILE || DEFAULT_LIBRARY_FILE,
    containerizer:process.env.CONTAINERIZER || 'localdocker'
  }
})

utils.bind_server(args, function(error, server){
  console.log('server listening on port: ' + args.port)
})