'use strict';

function isInTree(rootNode, item) {
  if (rootNode === item) {
    return true;
  }

  var children = rootNode.children;
  if (children) {
    for (var i = 0, l = children.length; i < l; i++) {
      if (isInTree(children[i], item)) {
        return true;
      }
    }
  }
  return false;
}

module.exports = isInTree;
