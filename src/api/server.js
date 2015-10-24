var concat = require('concat-stream')
var Router = require('routes-router')
var ecstatic = require('ecstatic')
var fs = require('fs');

module.exports = function(opts){

  var dataFile = opts.datafile

  var connectionStatus = true

  function readData(){
    var whaleData = fs.readFileSync(dataFile, 'utf8')
    return JSON.parse(whaleData)
  }

  function writeData(data){
    fs.writeFileSync(dataFile, JSON.stringify(data), 'utf8')
  }

  if(!fs.existsSync(dataFile)){
    writeData([])
  }

  var router = Router()
  var fileServer = ecstatic({ root: __dirname + '/client' })

  router.addRoute("/v1/ping", {
    GET: function(req, res){
      res.setHeader('Content-type', 'application/json')
      res.end(JSON.stringify({
        connected:connectionStatus
      }))
    }
  })

  router.addRoute("/v1/whales", {
    GET: function (req, res) {
      var whaleData = JSON.stringify(readData())
      res.end(whaleData)
    },
    POST: function (req, res) {
      req.pipe(concat(function(data){
        data = data.toString()
        var allWhales = readData()
        allWhales.push(data)
        writeData(allWhales)
        res.end('ok')
      }))
    }
  })

  router.addRoute("/*", fileServer)

  return router
}
