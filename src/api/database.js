var Storage = require('./databasestorage')
var MessageBus = require('./messagebus')
var Messages = require('./messages')
var async = require('async');

module.exports = function(type, bus, opts){

  if(!type) type = 'jsonfile'
    
  var storage = Storage(type, opts)
  var messages = Messages(bus)

  function create_project(userid, data, done){

    var project = null
    async.waterfall([
      function(next){
        storage.create_project(userid, data, next)
      },
      function(projectdata, next){
        project = projectdata
        messages.create_project(userid, project, next)
      }
    ], function(err){
      if(err) return done(err)
      done(null, project)
    })
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