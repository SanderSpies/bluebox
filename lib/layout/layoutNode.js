'use strict';

var COLUMN = 'column';
var ROW = 'row';
var FLEX_START = 'flex-start';

var AXIS = {
  row: {
    START: 'left',
    END: 'right',
    DIMENSION: 'width',
    MARGIN_LEADING: 'marginLeft',
    MARGIN_TRAILING: 'marginRight',
    PADDING_LEADING: 'paddingLeft',
    PADDING_TRAILING: 'paddingRight'
  },
  column: {
    START: 'top',
    END: 'bottom',
    DIMENSION: 'height',
    MARGIN_LEADING: 'marginTop',
    MARGIN_TRAILING: 'marginBottom',
    PADDING_LEADING: 'paddingTop',
    PADDING_TRAILING: 'paddingBottom'
  }
};

function justifyContentFn(child, previousChild, newFlexDirection, justifyContent, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute) {
  var childLayout = child.layout;
  if (isPositionAbsolute && (child.style[newFlexDirection === 'row' ? 'left' : 'top'] !== undefined || child.style[newFlexDirection === 'row' ? 'right' : 'bottom'] !== undefined)) {
    return;
  }

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
  else if (justifyContent === 'stretch') {
    if (newFlexDirection === ROW && childLayout.width === 0) {
      childLayout.left = 0;
      childLayout.width = parentWidth;
      childLayout.right = parentWidth;
    }
    else {
      if (childLayout.height === 0) {
        childLayout.top = 0;
        childLayout.height = parentHeight;
        childLayout.bottom = parentHeight;
      }
    }
  }
}

function absolutePosition(node, previousSibling, xMainAxis, xCrossAxis) {

  var parent = node.parent;
  var nodeLayout = node.layout;
  var parentLayout = parent.layout;

  node.layout[xMainAxis.START] = parentLayout[xMainAxis.START];
  node.layout[xCrossAxis.START] = parentLayout[xCrossAxis.START];
  if (node.style[xMainAxis.START] !== undefined) {
    node.layout[xMainAxis.START] += node.style[xMainAxis.START];
  }
  else if (node.style[xMainAxis.END] !== undefined && node.style[xMainAxis.DIMENSION] !== undefined) {
    node.layout[xMainAxis.START] = parentLayout[xMainAxis.END] - node.style[xMainAxis.DIMENSION] - node.style[xMainAxis.END];
  }
  else if (previousSibling) {
    nodeLayout[xMainAxis.START] = previousSibling.layout[xMainAxis.END] + previousSibling.style[xMainAxis.MARGIN_TRAILING];
  }
  else {
    nodeLayout[xMainAxis.START] = parent ? parentLayout[xMainAxis.START] : 0;
  }

  if (node.style[xCrossAxis.START] !== undefined) {
    node.layout[xCrossAxis.START] += node.style[xCrossAxis.START];
  }
  else if (node.style[xCrossAxis.END] !== undefined && node.style[xCrossAxis.DIMENSION] !== undefined) {
    node.layout[xCrossAxis.START] = parentLayout[xCrossAxis.END] - node.style[xCrossAxis.DIMENSION] - node.style[xCrossAxis.END];
  }
  else {
    nodeLayout[xCrossAxis.START] = parent ? parentLayout[xCrossAxis.START] : 0;
  }

  if (node.style[xMainAxis.END] !== undefined) {
    node.layout[xMainAxis.END] = parentLayout[xMainAxis.END] - node.style[xMainAxis.END];
    node.layout[xMainAxis.DIMENSION] = node.layout[xMainAxis.END] - node.layout[xMainAxis.START];
  }
  if (node.style[xCrossAxis.END] !== undefined) {
    node.layout[xCrossAxis.END] = parentLayout[xCrossAxis.END] - node.style[xCrossAxis.END];
    node.layout[xCrossAxis.DIMENSION] = node.layout[xCrossAxis.END] - node.layout[xCrossAxis.START];
  }

  //_processChildren(node, xMainAxis, xCrossAxis, true);
}

function alignItemsFn(child, previousChild, newFlexDirection, alignItems, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute) {
  justifyContentFn(child, previousChild, newFlexDirection, alignItems, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute);
}

function flexSize(child, previousChild, totalFlexGrow, remainingSpaceMainAxis, mainAxis) {
  if (mainAxis === ROW) {
    if (previousChild) {
      child.layout.left = previousChild.layout.right;
    }
    child.layout.width = child.style.flexGrow / totalFlexGrow * remainingSpaceMainAxis + (child.style.width || 0);
    child.layout.right = child.layout.left + child.layout.width;
  }
  else {
    if (previousChild) {
      child.layout.top = previousChild.layout.bottom;
    }
    child.layout.height = child.style.flexGrow / totalFlexGrow * remainingSpaceMainAxis + (child.style.height || 0);
    child.layout.bottom = child.layout.top + child.layout.height;
  }
}
var X = 0;
function _processChildren(node, xMainAxis, xCrossAxis, shouldProcessAbsolute) {
  if (X===61) {
  //  debugger;
  }
  X++;
  var parent = node.parent;
  var parentLayout = parent ? parent.layout : null;
  var parentWidth = parentLayout ? parentLayout.width : document.body.clientWidth;
  var parentHeight = parentLayout ? parentLayout.height : document.body.clientHeight;

  if (node.children.length && typeof node.children[0] !== 'string') {
    var newMainAxisDirection = node.style && node.style.flexDirection ? node.style.flexDirection : COLUMN;
    var newCrossAxisDirection = newMainAxisDirection === COLUMN ? ROW : COLUMN;
    var xNewMainAxisDirection = AXIS[newMainAxisDirection];
    var xNewCrossAxisDirection = AXIS[newCrossAxisDirection];
    var maxSize = 0;
    var previousChild;
    var totalFlexGrow = 0;
    var lineIndex = 0;
    var isFlexWrap = node.style.flexWrap === 'wrap';
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      layoutNode(child, previousChild, newMainAxisDirection, shouldProcessAbsolute);

      if (i === 0) {
        child.layout[xMainAxis.START] += node.style[xMainAxis.PADDING_LEADING];
        child.layout[xMainAxis.END] += node.style[xMainAxis.PADDING_TRAILING];
      }
      child.layout[xCrossAxis.START] += node.style[xCrossAxis.PADDING_LEADING];
      child.layout[xCrossAxis.DIMENSION] -= node.style[xCrossAxis.PADDING_LEADING] + node.style[xCrossAxis.PADDING_TRAILING];
      child.layout[xCrossAxis.END] -= node.style[xCrossAxis.PADDING_TRAILING];
      if (child.style.position !== 'absolute') {
        if (isFlexWrap) {
          if (child.layout.right + child.style.marginRight > parentWidth) {
            // next line please
            lineIndex++;
          }
          child.layout.lineIndex = lineIndex;
        }
        if (child.layout[xMainAxis.END] > maxSize) {
          maxSize = child.layout[xMainAxis.END] + child.style[xMainAxis.MARGIN_TRAILING];
        }

        totalFlexGrow += child.style.flexGrow;

        previousChild = child;
      }
    }

    // resize containers if necessary

    if (node.layout[xMainAxis.DIMENSION] === 0) {
      node.layout[xMainAxis.END] = maxSize + node.style[xMainAxis.PADDING_TRAILING];
      node.layout[xMainAxis.DIMENSION] = maxSize + node.style[xMainAxis.PADDING_TRAILING];
    }

    var newParentHeight = node.layout.height;
    var newParentWidth = node.layout.width;


    var mainDimensionSize = newMainAxisDirection === ROW ? newParentWidth : newParentHeight;
    var crossDimensionSize = newMainAxisDirection === ROW ? newParentHeight : newParentWidth;


    // correct the children position (justifyContent, alignItems, more?!)
    var justifyContent = node.style.justifyContent;
    var alignItems = node.style.alignItems;

    var remainingSpaceMainAxis;
    remainingSpaceMainAxis = mainDimensionSize - node.children[node.children.length - 1].layout[xNewMainAxisDirection.END];
    previousChild = null;

    if (remainingSpaceMainAxis < 0) {
      remainingSpaceMainAxis = mainDimensionSize;
    }

    //if (isNaN(remainingSpaceMainAxis)) {
    //  remainingSpaceMainAxis = mainDimensionSize = node.style[xMainAxis.DIMENSION];
    //}

    if (!totalFlexGrow) {
      if (justifyContent === 'center') {
        remainingSpaceMainAxis = remainingSpaceMainAxis / 2;
        justifyContent = 'flex-end';
      }
      else if (justifyContent === 'space-between') {
        remainingSpaceMainAxis = remainingSpaceMainAxis / (node.children.length - 1);
      }
      else if (justifyContent === 'space-around') {
        remainingSpaceMainAxis = remainingSpaceMainAxis / (node.children.length * 2);
      }
    }

    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      var isPositionAbsolute = child.style.position === 'absolute';
      var remainingSpaceCrossAxisSelf = crossDimensionSize - child.layout[xNewCrossAxisDirection.DIMENSION] - child.layout[xNewCrossAxisDirection.START];
      if (isPositionAbsolute) {
        absolutePosition(child, previousChild, xNewMainAxisDirection, xNewCrossAxisDirection);
      }
      if (totalFlexGrow) {
        flexSize(child, previousChild, totalFlexGrow, remainingSpaceMainAxis, newMainAxisDirection);
      }
      else {
        justifyContentFn(child, previousChild, newMainAxisDirection, justifyContent, remainingSpaceMainAxis, undefined, undefined, isPositionAbsolute);
      }


      var alignSelf = child.style.alignSelf || alignItems;
      if (alignSelf === 'center') {
        remainingSpaceCrossAxisSelf = remainingSpaceCrossAxisSelf / 2;
        alignSelf = 'flex-end';
      }
      else if (alignSelf === 'space-between') {
        remainingSpaceCrossAxisSelf = remainingSpaceCrossAxisSelf / (node.children.length - 1);
      }
      else if (alignSelf === 'space-around') {
        remainingSpaceCrossAxisSelf = remainingSpaceCrossAxisSelf / (node.children.length * 2);
      }
      alignItemsFn(child, previousChild, newCrossAxisDirection, alignSelf, remainingSpaceCrossAxisSelf, parentHeight, parentWidth, isPositionAbsolute);
      if (isPositionAbsolute) {
        _processChildren(child, xNewMainAxisDirection, xNewCrossAxisDirection, true);
      } else  {
        previousChild = child;
      }
    }
  }
}

function layoutNode(node, previousSibling, mainAxis, shouldProcessAbsolute) {
  var nodeLayout = node.layout;
  var parent = node.parent;
  if (parent && parent.style.position === 'absolute' && !shouldProcessAbsolute) {
    return;
  }

  var parentLayout = parent ? parent.layout : null;
  var parentWidth = parentLayout ? parentLayout.width : document.body.clientWidth;

  var xMainAxis = AXIS[mainAxis];
  var crossAxis = mainAxis === COLUMN ? ROW : COLUMN;
  var xCrossAxis = AXIS[crossAxis];

  if (previousSibling) {
    nodeLayout[xMainAxis.START] = previousSibling.layout[xMainAxis.END] + previousSibling.style[xMainAxis.MARGIN_TRAILING];
    nodeLayout[xCrossAxis.START] = parentLayout[xCrossAxis.START];

  }
  else {
    nodeLayout.left = parent ? parentLayout.left : 0;
    nodeLayout.top = parent ? parentLayout.top : 0;
  }

  nodeLayout.left += node.style.marginLeft;
  nodeLayout.top += node.style.marginTop;

  nodeLayout.width = node.style.width || (!node.style.flexGrow ? parentWidth : 0) || 0;
  nodeLayout.height = node.style.height || 0;

  nodeLayout.bottom = nodeLayout.top + nodeLayout.height;
  nodeLayout.right = nodeLayout.left + nodeLayout.width;
  _processChildren(node, xMainAxis, xCrossAxis);

  return node;
}

module.exports = layoutNode;
