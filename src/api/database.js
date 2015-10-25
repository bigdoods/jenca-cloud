var Storage = require('./databasestorage')
var MessageBus = require('./messagebus')
var Messages = require('./messages')
var async = require('async');

module.exports = function(type, bus, opts){

  if(!type) type = 'jsonfile'

  var PROJECT_HOST = opts.projecthost || 'localhost'
    
  var storage = Storage(type, opts)
  var messages = Messages(bus)

  function create_project(userid, data, done){

    var project = null
    async.waterfall([
      // initially save the project
      function(next){
        data.project_host = PROJECT_HOST
        storage.create_project(userid, data, next)
      },
      // run the containers
      function(projectdata, next){
        project = projectdata
        messages.create_project(userid, project, next)
      },
      // containers are running - save the project
      function(next){
        storage.project_running(userid, project, next)
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