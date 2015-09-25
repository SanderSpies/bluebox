'use strict';

var __DEV__   = require('../__DEV__');
var UNDEFINED = require('../UNDEFINED');

function requestStyleRecalculation(node, oldNode) {
  var currentNode = node;
  var currentOldNode = oldNode;
  var requireStyleRecalculation = true;

  while(requireStyleRecalculation) {

    requireStyleRecalculation = false;
    var parent = currentNode.parent;
    var oldParent = currentOldNode.oldParent || currentOldNode.parent;
    if (__DEV__) {
      if (parent && parent === oldParent) {
        console.warn('new parent shouldn\'t be equal to old parent');
      }
    }
    var nodeStyle = currentNode.style;
    var oldNodeStyle = currentOldNode.style;

    if (parent &&
      (nodeStyle.position === 'absolute' || parent.style.flexWrap === 'wrap' || nodeStyle.alignSelf !== '' ||
      (parent.style.width === UNDEFINED || parent.style.height === UNDEFINED) &&
      (nodeStyle.position !== nodeStyle.position ||
       nodeStyle.width !== oldNodeStyle.width ||
       nodeStyle.height !== oldNodeStyle.height ||
       nodeStyle.top !== oldNodeStyle.top ||
       nodeStyle.left !== oldNodeStyle.left ||
       nodeStyle.right !== oldNodeStyle.right ||
       nodeStyle.bottom !== oldNodeStyle.bottom ||
       nodeStyle.marginBottom !== oldNodeStyle.marginBottom ||
       nodeStyle.marginTop !== oldNodeStyle.marginTop ||
       nodeStyle.marginRight !== oldNodeStyle.marginRight ||
       nodeStyle.marginLeft !== oldNodeStyle.marginLeft ||
       nodeStyle.paddingBottom !== oldNodeStyle.paddingBottom ||
       nodeStyle.paddingTop !== oldNodeStyle.paddingTop ||
       nodeStyle.paddingRight !== oldNodeStyle.paddingRight ||
       nodeStyle.paddingLeft !== oldNodeStyle.paddingLeft ||
       nodeStyle.justifyContent !== oldNodeStyle.justifyContent ||
       nodeStyle.alignItems !== oldNodeStyle.alignItems ||
       nodeStyle.alignSelf !== oldNodeStyle.alignSelf ||
       nodeStyle.flexGrow !== oldNodeStyle.flexGrow ||
       nodeStyle.flexWrap !== oldNodeStyle.flexWrap))) {
      requireStyleRecalculation = true;
      currentOldNode = oldParent;
      currentNode = parent;
    }
  }
  currentNode.oldRef = currentOldNode;
  return currentNode;
}

module.exports = requestStyleRecalculation;
