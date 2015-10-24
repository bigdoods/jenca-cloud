var fs = require('fs')
var path = require('path')

/*

  [{
  "name":"Test",
  "image":"jenca/testimage:1.0.0",
  "arguments":"apples"
  },{
    "name":"BIMServer",
    "image":"jenca/bimserver:1.0.0",
    "arguments":"oranges"
  }]
  
*/

var DEFAULT_LIBRARY_FILE = path.resolve(path.join(__dirname, '..', 'data', 'library.json'))

module.exports = function(opts){

  var datafile = opts.libraryfile || DEFAULT_LIBRARY_FILE

  if(!fs.existsSync(datafile)){
    throw new Exception('error - library file: ' + datafile + ' does not exist')
  }

  var data = require(datafile)

  function list_applications(done){
    done(null, data)
  }
  
  return {
    list_applications:list_applications
  }
}