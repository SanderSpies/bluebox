'use strict';

var COLUMN = 'column';
var ROW = 'row';

function layoutNode(node, previousSibling, mainAxis) {
  var nodeLayout = node.layout;

  var parent = node.parent;
  var parentLayout = parent.layout;
  var parentWidth = parentLayout.width;
  var parentHeight = parentLayout.height;

  var crossAxis = mainAxis === COLUMN ? ROW : COLUMN;

  if (previousSibling) {
    if (mainAxis === COLUMN) {
      node.layout.top = previousSibling.layout.top + previousSibling.layout.height;
      node.layout.left = parent.layout.left || 0;
    }
    else if (mainAxis === ROW) {
      node.layout.left = previousSibling.layout.left + previousSibling.layout.width;
      node.layout.top = parent.layout.top || 0;
    }
  }
  else {
    node.layout.left = parent.layout.left || 0;
    node.layout.top = parent.layout.top || 0;
  }

  node.layout.left += node.style.marginLeft || 0;
  node.layout.top += node.style.marginTop || 0;


  var newFlexDirection = node.style.flexDirection || mainAxis;
  for (var i = 0, l = node.children.length; i < l; i++) {
    var child = node.children[i];
    var previousChild = i > 0 ? node.children[i - 1] : null;
    layoutNode(child, previousChild, newFlexDirection);
  }
}

module.exports = layoutNode;
