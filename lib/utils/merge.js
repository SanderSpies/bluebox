'use strict';

var toFloat32 = require('../utils/toFloat32');

function merge(parent, child) {
  var childKeys = Object.keys(child);
  for (var i = 0, l = childKeys.length; i < l; i++) {
    var childKey = childKeys[i];
    var value = child[childKey];
    parent[childKey] = !isNaN(value) ? toFloat32(value) : value;
  }
  return parent;
}

module.exports = merge;
