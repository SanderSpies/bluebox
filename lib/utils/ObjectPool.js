'use strict';

var ObjectPools = {};
var index = {};

function clone(def, keys) {
  var clone = {};
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    clone[key] = def[key];
  }
  return clone;
}

function clean(def) {
  var keys = Object.keys(def);
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    var value = def[key];
    if (!isNaN(value)) {
      def[key] = -1;
    }
    else if (typeof value === 'boolean') {
      def[key] = false;
    }
    else if (typeof value === 'object') {
      def[key] = null;
    }
  }
  return def;
}

function growalloc(poolName, size) {
  var pool = ObjectPools[poolName];
  var lastItem = pool[pool.length - 1];
  var keys = Object.keys(lastItem);
  for (var i = pool.length, l = pool.length + size; i < l; i++) {
    pool[i] = clone(lastItem, keys);
  }
  console.warn('grew pool ', poolName, ' by ', size, ' to ', pool.length);
}

function prealloc(poolName, def, size) {
  var pool = ObjectPools[poolName] = [];
  index[poolName] = 0;
  var keys = Object.keys(def);
  for (var i = 0, l = size; i < l; i++) {
    pool[i] = clone(def, keys);
  //  console.log('prealloc:', poolName, i, pool[i]);
  }
}

function getInstance(poolName) {
  var pool = ObjectPools[poolName];
  var i = index[poolName];
  if (i < pool.length - 1) {
    index[poolName]++;
    var component = pool[i];
    if (component) {
      pool[i] = null;
      return component;
    }
  }
  growalloc(poolName, 10);
  return getInstance(poolName);
}

function release(poolName, obj) {
  var pool = ObjectPools[poolName];
  for (var i = 0, l = pool.length; i < l - 1; i++) {
    var component = pool[i];
    if (!component) {
      pool[i] = clean(obj);
    }
  }
}

module.exports = {
  prealloc: prealloc,
  getInstance: getInstance,
  release: release
};


