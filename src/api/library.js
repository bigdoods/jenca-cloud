var Storage = require('./librarystorage')

module.exports = function(type, opts){

  if(!type) type = 'jsonfile'
    
  var storage = Storage(type, opts)

  function list_applications(done){
    storage.list_applications(done)
  }

  return {
    list_applications:list_applications
  }
}