module.exports = function(opts){
  return {
    start_container:function(data, done){
      data.container.fruit = 'pears'
      done(null, data)
    }
  }
}