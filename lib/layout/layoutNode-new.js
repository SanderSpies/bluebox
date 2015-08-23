'use strict';

var COLUMN = 'column';
var ROW = 'row';

function layoutNode(node, previousSibling, mainAxis) {
  var nodeLayout = node.layout;

  var parent = node.parent;
  var parentLayout = parent ? parent.layout : null;
  var parentWidth = parentLayout ? parentLayout.width : document.body.clientWidth;
  var parentHeight = parentLayout ? parentLayout.height : 0;
  var justifyContent = parent ? parent.style.justifyContent : 'flex-start';
  var alignItems = parent ? parent.style.alignItems : 'flex-start';

  var crossAxis = mainAxis === COLUMN ? ROW : COLUMN;

  if (previousSibling) {
    if (mainAxis === COLUMN) {
      if (justifyContent === 'flex-start') {
        nodeLayout.top = previousSibling.layout.bottom + previousSibling.style.marginBottom;
      }
      if (alignItems === 'flex-start' && parentLayout) {
        nodeLayout.left = parentLayout.left;
      }

    }
    else if (mainAxis === ROW) {
      if (justifyContent === 'flex-start') {
        nodeLayout.left = previousSibling.layout.right  + previousSibling.style.marginRight;
      }

      if (alignItems === 'flex-start' && parentLayout) {
        nodeLayout.top = parentLayout.top;
      }
    }
  }
  else {
    nodeLayout.left = parent ? parentLayout.left : 0;
    nodeLayout.top = parent ? parentLayout.top : 0;
  }

  nodeLayout.left += node.style.marginLeft;
  nodeLayout.top += node.style.marginTop;

  nodeLayout.width = node.style.width || parentWidth;
  nodeLayout.height = node.style.height;


  nodeLayout.bottom = nodeLayout.top + nodeLayout.height;
  nodeLayout.right = nodeLayout.left + nodeLayout.width;


  if (node.children.length && typeof node.children[0] !== 'string') {
    var newFlexDirection = node.style && node.style.flexDirection? node.style.flexDirection : COLUMN;
    var maxSize = 0;
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      var previousChild = i > 0 ? node.children[i - 1] : null;
      layoutNode(child, previousChild, newFlexDirection);

      if (mainAxis === COLUMN) {
        if (i === 0) {
          child.layout.top += node.style.paddingTop;
          child.layout.bottom += node.style.paddingTop;
        }
        child.layout.left += node.style.paddingLeft;
        child.layout.width -= node.style.paddingLeft + node.style.paddingRight;
        child.layout.right -= node.style.paddingRight;

        if (child.layout.bottom > maxSize) {
          maxSize = child.layout.bottom + child.style.marginBottom;
        }
      }
    }


    var remainingSpaceMainAxis;
    if (mainAxis === ROW) {
      remainingSpaceMainAxis = parentWidth - node.children[node.children.length - 1].layout.right;
    }
    else {
      remainingSpaceMainAxis = parentHeight - node.children[node.children.length - 1].layout.bottom;
    }

    if (justifyContent === 'flex-end') {
      // rearrange items
      if (mainAxis === ROW) {
        for (var i = 0, l = node.children.length; i < l; i++) {
          var child = node.children[i];
          var childLayout = child.layout;
          childLayout.left -= remainingSpaceMainAxis;
          childLayout.right -= remainingSpaceMainAxis;
        }
      }
      else {
        for (var i = 0, l = node.children.length; i < l; i++) {
          var child = node.children[i];
          var childLayout = child.layout;
          childLayout.top -= remainingSpaceMainAxis;
          childLayout.bottom -= remainingSpaceMainAxis;
        }
      }
    }


    //if (mainAxis === ROW) {
      if (node.layout.right < node.children[node.children.length - 1].layout.right && node.layout.width === 0) {
        node.layout.right = node.children[node.children.length - 1].layout.right;
        node.layout.width = node.children[node.children.length - 1].layout.right - node.layout.left;
      }
   // }
    //else {
      if (node.layout.bottom < maxSize && node.layout.height === 0) {
        node.layout.bottom = maxSize + node.style.paddingBottom;
        node.layout.height = maxSize + node.style.paddingBottom;
      }
   // }

  }

  return node;
}

module.exports = layoutNode;
