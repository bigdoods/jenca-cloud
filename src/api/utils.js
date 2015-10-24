var hyperquest = require('hyperquest')
var concat = require('concat-stream');
var uuid = require('uuid');

function tempfile(){
  return '/tmp/' + uuid.v1()
}

function get_request(url, done){
  hyperquest(url).pipe(concat(function(result){
    done(null, result.toString())
  }))
}

function json_get_request(url, done){
  get_request(url, function(err, result){
    if(err) return done(err)
    done(null, JSON.parse(result))
  })
}

function post_request(url, data, done){
  var req = hyperquest.post(url)
  req.pipe(concat(function(result){
    done(null, result.toString())
  }))
  req.end(data.toString())
}

function json_post_request(url, data, done){
  post_request(url, JSON.stringify(data), function(err, result){
    if(err) return done(err)
    done(null, JSON.parse(result))
  })
}

// read the JSON body from an incoming HTTP request
function slurp_json(req, done){
  req.pipe(concat(function(data){
    done(null, JSON.parse(data.toString()))
  }))
}

module.exports = {
  slurp_json:slurp_json,
  tempfile:tempfile,
  request:{
    get:get_request,
    post:post_request,
    json_get:json_get_request,
    json_post:json_post_request
  }
}