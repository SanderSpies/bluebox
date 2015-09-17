'use strict';

var UNDEFINED = 7000;
function requestStyleRecalculation(node, oldNode) {
  node.requireStyleRecalculation = true;
  var currentNode = node;
  var currentOldNode = oldNode;
  while(currentNode.requireStyleRecalculation) {
    var parent = currentNode.parent;
    var oldParent = currentOldNode.parent;
    var nodeStyle = currentNode.style;
    var oldNodeStyle = currentOldNode.style;
    if (!parent.requireStyleRecalculation &&
      (parent.style.width === UNDEFINED || parent.style.height === UNDEFINED) &&
      (
      nodeStyle.position !== oldNodeStyle.position ||
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
      nodeStyle.flexWrap !== oldNodeStyle.flexWrap
      )
    ){
      parent.requireStyleRecalculation = true;
    }
    currentNode = parent;
    currentOldNode = oldParent;
  }
}

module.exports = requestStyleRecalculation;
