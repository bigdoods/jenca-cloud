var tape = require('tape')

var utils = require('../utils')
var Database = require('../database')
var MessageBus = require('../messagebus')

var project_fixture = require(__dirname + '/fixtures/project2.json')

function get_setup(){
  var bus = MessageBus()
  var database = Database('jsonfile', bus, {
    datafile:utils.tempfile()
  })

  return {
    bus:bus,
    database:database
  }
}

tape('create project should emit container events', function (t) {

  var setup = get_setup()

  var messages = []

  setup.bus.json_subscribe('container.start', function(data){
    messages.push(data)
  }, function(){
    setup.database.create_project(1, project_fixture, function(){})

    setTimeout(function(){

      t.equal(messages.length, 2)

      t.equal(messages[0].user, 1)
      t.equal(messages[0].project.name, 'My First Project')
      t.equal(messages[0].project.containers.length, 2)
      t.equal(messages[0].project.containers[0].name, 'Test')
      t.equal(messages[0].project.containers[1].name, 'Test2')
      t.equal(messages[0].project.containers[0].image, 'jenca/testimage:1.0.0')
      t.equal(messages[0].project.containers[1].image, 'jenca/testimage2:1.0.0')
      t.end()
      
    }, 1000)
  })

})