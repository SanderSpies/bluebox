'use strict';

var shallowClone = require('./shallowClone');

function recreateNode(node) {
  var currentNode = node;
  var path = [node];
  while (currentNode.parent) {
    path.push(currentNode.parentIndex);
    currentNode = currentNode.parent;
  }

  var newRoot = shallowClone(path[path.length - 1]);

  var currentNewPath = newRoot;
  for (var i = 1, l = path.length; i < l; i++) {
    var pathItem = path[path.length - i - 1];
    var newItem = shallowClone(pathItem);

    currentNewPath.children = currentNewPath.children.slice(0);
    currentNewPath.children[newItem.parentIndex] = newItem;
  }

  return newItem;
}

