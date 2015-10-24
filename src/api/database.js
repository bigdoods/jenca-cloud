var Storage = require('./databasestorage')

module.exports = function(type, opts){

  if(!type) type = 'jsonfile'
    
  var storage = Storage(type, opts)

  function create_project(userid, data, done){
    storage.create_project(userid, data, done)
  }

  function get_project(userid, projectid, done){
    storage.get_project(userid, projectid, done)
  }

  function list_projects(userid, done){
    storage.list_projects(userid, done)
  }

  function delete_project(userid, projectid, done){
    storage.delete_project(userid, projectid, done)
  }

  function save_project(userid, projectid, data, done){
    storage.save_project(userid, projectid, data, done)
  }

  return {
    create_project:create_project,
    get_project:get_project,
    list_projects:list_projects,
    delete_project:delete_project,
    save_project:save_project
  }
}