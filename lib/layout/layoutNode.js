'use strict';

var COLUMN = 'column';
var ROW = 'row';
var FLEX_START = 'flex-start';

function justifyContentFn(child, previousChild, newFlexDirection, justifyContent, remainingSpaceMainAxis) {
    var childLayout = child.layout;
    if (justifyContent === 'flex-end') {
      // rearrange items
      if (newFlexDirection === ROW) {
        childLayout.left += remainingSpaceMainAxis;
        childLayout.right += remainingSpaceMainAxis;
      }
      else {
        childLayout.top += remainingSpaceMainAxis;
        childLayout.bottom += remainingSpaceMainAxis;
      }
    }
    else if (justifyContent === 'space-around') {
      if (newFlexDirection === ROW) {
        if (!previousChild) {
          childLayout.left = remainingSpaceMainAxis;
        }
        else {
          childLayout.left = previousChild.layout.right + remainingSpaceMainAxis * 2;
        }
        childLayout.right = childLayout.left + childLayout.width;
      }
      else {
        if (!previousChild) {
          childLayout.top = remainingSpaceMainAxis;
        }
        else {
          childLayout.top = previousChild.layout.bottom + remainingSpaceMainAxis * 2;
        }
        childLayout.bottom = childLayout.top + childLayout.height;
      }
    }
    else if (justifyContent === 'space-between' && previousChild) {
      if (newFlexDirection === ROW) {
        childLayout.left = previousChild.layout.right + remainingSpaceMainAxis;
        childLayout.right = childLayout.left + childLayout.width;
      }
      else {
        childLayout.top = previousChild.layout.bottom + remainingSpaceMainAxis;
        childLayout.bottom = childLayout.top + childLayout.height;
      }
    }
}

function alignItemsFn() {

}

function layoutNode(node, previousSibling, mainAxis) {
  var nodeLayout = node.layout;

  var parent = node.parent;
  var parentLayout = parent ? parent.layout : null;
  var parentWidth = parentLayout ? parentLayout.width : document.body.clientWidth;
  var parentHeight = parentLayout ? parentLayout.height : document.body.clientHeight;
  var alignItems = parent ? parent.style.alignItems : FLEX_START;

  var crossAxis = mainAxis === COLUMN ? ROW : COLUMN;

  if (previousSibling) {
    if (mainAxis === COLUMN) {
      nodeLayout.top = previousSibling.layout.bottom + previousSibling.style.marginBottom;

      if (alignItems === FLEX_START && parentLayout) {
        nodeLayout.left = parentLayout.left;
      }
    }
    else if (mainAxis === ROW) {
      nodeLayout.left = previousSibling.layout.right  + previousSibling.style.marginRight;

      if (alignItems === FLEX_START && parentLayout) {
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
    var previousChild;
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
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
      } else {
        if (i === 0) {
          child.layout.left += node.style.paddingLeft;
          child.layout.right += node.style.paddingRight;
        }
        child.layout.top += node.style.paddingTop;
        child.layout.height -= node.style.paddingTop + node.style.paddingBottom;
        child.layout.bottom -= node.style.paddingBottom;

        if (child.layout.bottom > maxSize) {
          maxSize = child.layout.right + child.style.marginRight;
        }
      }
      previousChild = child;
    }

    // resize containers if necessary
    if (mainAxis === ROW) {
      if (node.layout.width === 0) {
        node.layout.right = maxSize + node.style.paddingRight;
        node.layout.width = maxSize + node.style.paddingRight;
      }
    }
    else {
      if (node.layout.height === 0) {
        node.layout.bottom = maxSize + node.style.paddingBottom;
        node.layout.height = maxSize + node.style.paddingBottom;
      }
    }

    parentHeight = node.layout.height;
    parentWidth = node.layout.width;

    // correct the children position (justifyContent, alignItems, more?!)
    var justifyContent = node.style.justifyContent;
    var remainingSpaceMainAxis;
    var remainingSpaceCrossAxis;
    if (newFlexDirection === ROW) {
      remainingSpaceMainAxis = parentWidth - node.children[node.children.length - 1].layout.right;
      remainingSpaceCrossAxis  = parentHeight - node.children[node.children.length - 1].layout.bottom;
    }
    else {
      remainingSpaceMainAxis = parentHeight - node.children[node.children.length - 1].layout.bottom;
      remainingSpaceCrossAxis = parentWidth - node.children[node.children.length - 1].layout.right;
    }

    if (justifyContent === 'center') {
      remainingSpaceMainAxis = remainingSpaceMainAxis / 2;
      justifyContent = 'flex-end';
    } else if (justifyContent === 'space-between') {
      remainingSpaceMainAxis = remainingSpaceMainAxis / (node.children.length - 1);
    } else if (justifyContent === 'space-around') {
      remainingSpaceMainAxis = remainingSpaceMainAxis / (node.children.length * 2);
    }



    previousChild = null;

    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      justifyContentFn(child, previousChild, newFlexDirection, justifyContent, remainingSpaceMainAxis);
      previousChild = child;
    }
  }

  return node;
}

module.exports = layoutNode;
