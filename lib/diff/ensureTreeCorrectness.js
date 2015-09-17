'use strict';

function ensureTreeCorrectness(node) {
  return;
  var children = node.children;
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    if (child.type) {
      if (child.parent !== node) {
        console.warn('PARENT CHILD MISMATCH');
        //debugger;
        return false;
      }
      return ensureTreeCorrectness(child);
    }
  }
  return true;
}

module.exports = ensureTreeCorrectness;