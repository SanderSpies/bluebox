'use strict';

var __DEV__ = require('../__DEV__');

var keys = Object.keys;
var isArray = Array.isArray;
var freeze = Object.freeze;

function deepFreezeArray(_array) {
  var array = _array;
  freeze(array);
  for (var i = 0, l = array.length; i < l; i++) {
    var item = array[i];
    if (isArray(item)){
      deepFreezeArray(item);
    }
    else if (item && typeof item === 'object') {
      deepFreeze(item);
    }
  }
}

function deepFreeze(_obj) {
  if (!__DEV__) {
    console.warn('deepSeal should only be used at development time');
  }
  var obj = _obj;
  freeze(obj);
  var parameters = keys(obj);
  for (var i = 0, l = parameters.length; i < l; i++) {
    var parameter = parameters[i];
    var value = obj[parameter]
    if (isArray(value)) {
      deepFreezeArray(value);
    }
    else if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }
}


module.exports = deepFreeze;
