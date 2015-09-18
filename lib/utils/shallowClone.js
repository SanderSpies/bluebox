'use strict';

var keys = Object.keys;

function shallowClone(node) {
  var newNode = {};
  var parameters = keys(node);
  for (var i = 0, l = parameters.length; i < l; i++) {
    var parameter = parameters[i];
    newNode[parameter] = node[parameter];
  }
  return newNode;
}

module.exports = shallowClone;
