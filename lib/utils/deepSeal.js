'use strict';

var __DEV__ = require('../__DEV__');

var keys = Object.keys;
var isArray = Array.isArray;
var seal = Object.seal;

function deepSealArray(_array) {
  var array = _array;
  seal(array);
  for (var i = 0, l = array.length; i < l; i++) {
    var item = array[i];
    if (isArray(item)){
      deepSealArray(item);
    }
    else if (item && typeof item === 'object') {
      deepSeal(item);
    }
  }
}

function deepSeal(_obj) {
  if (!__DEV__) {
    console.warn('deepSeal should only be used at development time');
  }
  var obj = _obj;
  seal(obj);
  var parameters = keys(obj);
  for (var i = 0, l = parameters.length; i < l; i++) {
    var parameter = parameters[i];
    var value = obj[parameter]
    if (isArray(value)) {
      deepSealArray(value);
    }
    else if (value && typeof value === 'object') {
      deepSeal(value);
    }
  }
}


module.exports = deepSeal;
