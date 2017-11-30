// if test function expects second named argument it will be executed
// in async mode and test will be complete only after callback is called
exports['test clearing cache'] = function(assert, done) {
  const cache = require('cachedata')
  cache.setData('chicken','egg')
  assert.equal(cache.getData('chicken'),'egg','Initial value set')
  cache.clear()
  assert.equal(cache.getData('chicken'),null,'Value cleared')
  assert.equal(cache.count(),0,'No entries in cache')
  done()
}

exports['test simple cache'] = function(assert, done) {
  const cache = require('cachedata')
  cache.clear()
  cache.setData('chicken','egg')
  assert.equal(cache.getData('chicken'),'egg','Success')
  done()
}

exports['test cache expiration'] = function(assert, done) {
  const cache = require('cachedata')
  cache.clear()
  cache.setData('chicken','egg',1)
  assert.equal(cache.getData('chicken'),'egg','Initial value correct')
  setTimeout(function(){
    assert.equal(cache.getData('chicken'),null,'Value expired')
    done()
  },1000)
}

exports['test cache persistence and expiration'] = function(assert, done) {
  const cache = require('cachedata')
  cache.clear()
  cache.setData('chicken','egg',1)
  assert.equal(cache.getData('chicken'),'egg','Initial value correct')
  setTimeout(function(){
    assert.equal(cache.getData('chicken'),'egg','Value not expired yet')
    setTimeout(function(){
      assert.equal(cache.getData('chicken'),null,'Value expired')
      done()
    },500)
  },500)
}

if (module == require.main) require('test').run(exports)
