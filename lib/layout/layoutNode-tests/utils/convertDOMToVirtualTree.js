'use strict';

function convertDOMToVirtualTree(el) {
  var rect = el.getBoundingClientRect();

  var node = {
    layout: {
      left: rect.left,
      width: rect.width,
      right: rect.right,
      top: rect.top,
      height: rect.height,
      bottom: rect.bottom
    },
    children: []
  };

  for (var i = 0, l = el.childNodes.length; i < l; i++) {
    var childNode = el.childNodes[i];
    if (childNode.getBoundingClientRect) { // to avoid noise
      node.children.push(convertDOMToVirtualTree(childNode));
    }
  }
  return node;
}

module.exports = convertDOMToVirtualTree;
