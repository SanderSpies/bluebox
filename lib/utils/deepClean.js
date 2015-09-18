'use strict';

var keys = Object.keys;
var isArray = Array.isArray;

function deepClean(structure, obj) {
  var parameters = keys(structure);
  for (var i = 0, l = parameters.length; i < l; i++) {
    var parameter = parameters[i];
    var value = structure[parameter];
    if (isArray(value)) {
      obj[parameter] = [];
    }
    else if (value && typeof value === 'object') {
      deepClean(value, obj[parameter]);
    }
    //else if (Object.isFrozen(obj)) {
      if (typeof value === 'string') {
        obj[parameter] = '';
      }
      else if (typeof value === 'number') {
        obj[parameter] = -1;
      }
      else if (typeof value === 'function') {
        obj[parameter] = function() {
        };
      }
      else if (typeof value === 'boolean') {
        obj[parameter] = false;
      }
    }
  //}

}

module.exports = deepClean;