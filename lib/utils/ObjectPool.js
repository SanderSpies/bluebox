'use strict';

var __DEV__ = require('../__DEV__');
var deepClone = require('./deepClone');
var deepFreeze = require('./deepFreeze');
var deepSeal = require('./deepSeal');
var deepClean = require('./deepClean');

function ObjectPool(structure) {
  this.pool = [];
  if (__DEV__){
    if (!('_pool' in structure)) {
      console.warn('Structure should have a _pool structure that can store an instance to this pool');
    }
  }
  this._structure = structure;
  if (__DEV__) {
    deepFreeze(this._structure)
  }
}

ObjectPool.prototype = {

  allocate: function() {
    if (this.pool.length) {
      return this.pool.shift();
    }
    var newInstance = deepClone(this._structure);
    if (__DEV__) {
      deepSeal(newInstance);
    }
    newInstance._pool = this;
    return newInstance;
  },

  free: function(object) {
    deepClean(this._structure, object);
    this.pool.push(object);
  }

};

module.exports = ObjectPool;
