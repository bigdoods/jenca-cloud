var async = require('async')

module.exports = function(bus){

  function create_project(userid, project, done){
    var array_of_functions = project.containers.map(function(container){
      
      return function(publish_done){
        bus.json_publish('container.start', {
          user:userid,
          project:project,
          container:container
        }, publish_done)
      }

    })

    async.parallel(array_of_functions, function(err){
      if(err) return done(err)
      done()
    })
  }

  return {
    create_project:create_project
  }
}