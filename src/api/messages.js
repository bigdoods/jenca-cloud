var async = require('async')

module.exports = function(bus){

  // a map of the containers waiting to be run
  // we do a generic listen to 'container.started'
  // and run the functions in here based on container.id
  var pending_containers = {}

  bus.json_subscribe('container.started', function(data){
    console.log('-------------------------------------------');
    console.log('-------------------------------------------');
    console.log(JSON.stringify(data, null, 4))
    var fn = pending_containers[data.container.id]
    if(!fn) return
    fn(data)
    delete(pending_containers[data.container.id])
  })

  function create_project(userid, project, done){
    var array_of_functions = project.containers.map(function(container){

      return function(publish_done){

        pending_containers[container.id] = function(data){
          Object.keys(data.container || {}).forEach(function(key){
            container[key] = data.container[key]
          })
          publish_done()
        }

        bus.json_publish('container.start', {
          user:userid,
          project:project,
          container:container
        }, function(){
          // this is a dead end because we are listening to the message bus now
        })
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