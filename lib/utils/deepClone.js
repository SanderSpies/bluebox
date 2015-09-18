'use strict';

var keys = Object.keys;
var isArray = Array.isArray;

function deepCloneArray(_arr) {
  var arr = _arr;
  var newArr = [];
  for (var i = 0, l = arr.length; i < l; i++) {
    var item = arr[i];
    if (isArray(item)) {
      newArr[i] = deepCloneArray(item);
    }
    else if (value && typeof item === 'object') {
      newArr[i] = deepClone(item);
    }
  }
  return newArr;
}

function deepClone(_obj) {
  var obj = _obj;
  var newObj = {};
  var parameters = keys(obj);
  for (var i = 0, l = parameters.length; i < l; i++) {
    var parameter = parameters[i];
    var value = obj[parameter]
    if (isArray(value)) {
      newObj[parameter] = deepCloneArray(value);
    }
    else if (value && typeof value === 'object') {
      newObj[parameter] = deepClone(value);
    }
    else {
      newObj[parameter] = obj[parameter];
    }
  }
  return newObj;
}

module.exports = deepClone;
