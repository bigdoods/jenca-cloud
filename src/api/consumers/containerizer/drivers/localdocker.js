var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
var cp = require('child_process')

module.exports = function(opts){
  return {
    start_container:function(data, done){

      var env = Object.keys(data.container.env || {}).map(function(key){
        return key + '=' + data.container.env[key]
      })

      var containerName = 'jenca-' + data.container.id

      var createOpts = {
        'name':containerName,
        'Image':data.container.image,
        'Cmd':data.container.arguments,
        'HostConfig':{
          'PublishAllPorts':true
        },
        'Env': env
      }

      var startOpts = {
       "Detach": true,
       "Tty": false
      }

      docker.createContainer(createOpts, function(err, container) {
        if(err) return done(err)
        container.start(startOpts, function(err, startdata) {
          if(err) return done(err)
          var inspectcontainer = docker.getContainer(containerName)
          inspectcontainer.inspect(function (err, inspectdata) {
            data.container.ports = (data.container.ports || []).map(function(port){
              var containerPort = port.container
              var exposedPortArray = inspectdata.NetworkSettings.Ports[containerPort + '/tcp']
              var exposedPort = exposedPortArray[0].HostPort
              return {
                container:containerPort,
                host:exposedPort
              }
            })
            done(null, data)
          })
        })
      })


    }
  }
}


/*
module.exports = function(opts){
  return {
    start_container:function(data, done){
      var command = [
        'docker',
        'run',
        '--publish-all',
        data.container.image,
        data.container.arguments
      ].join(' ')

      console.log('-------------------------------------------');
      console.dir(command)

      cp.exec(command, function (error, stdout, stderr) {
        console.log('-------------------------------------------');
        console.log('running')
        console.log(error)
        console.log(stdout)
        console.log(stderr)
        done()
      })
    }
  }
}
*/
