'use strict';

var __DEV__ = require('../__DEV__');
var COLUMN = 'column';
var ROW = 'row';
var FLEX_START = 'flex-start';
var FLEX_END = 'flex-end';
var SPACE_AROUND = 'space-around';
var SPACE_BETWEEN = 'space-between';
var ABSOLUTE = 'absolute';
var STRETCH = 'stretch';
var LEFT = 'left';
var TOP = 'top';
var RIGHT = 'right';
var BOTTOM = 'bottom';
var CENTER = 'center';
var AXIS = require('./AXIS');
var WRAP = 'wrap';
var UNDEFINED = require('../UNDEFINED');
var ViewPortHelper = require('../renderers/DOM/ViewPortHelper');
var viewPortDimensions = ViewPortHelper.getDimensions();

var toFloat32 = require('../utils/toFloat32');
var clipSpaceX = toFloat32(1 / viewPortDimensions.width * 2);
var clipSpaceY = toFloat32(1 / viewPortDimensions.height * 2);

var clientWidth = toFloat32(document.body.clientWidth) * clipSpaceX;
var clientHeight = toFloat32(document.body.clientHeight)  * clipSpaceY;


function justifyContentFn(child, previousChild, mainAxis, justifyContentX, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute) {
  var justifyContent = justifyContentX;
  if (justifyContent === CENTER) {
    justifyContent = FLEX_END;
  }
  var childLayout = child.layout;
  var childStyle = child.style;
  if (isPositionAbsolute && (childStyle[mainAxis.START] !== UNDEFINED || childStyle[mainAxis.END] !== UNDEFINED)) {
    return;
  }

  if (justifyContent === FLEX_END) {
    childLayout[mainAxis.START] += remainingSpaceMainAxis;
    childLayout[mainAxis.END] += remainingSpaceMainAxis;

  }
  else if (justifyContent === SPACE_AROUND) {
    if (!previousChild) {
      childLayout[mainAxis.START] += remainingSpaceMainAxis + childStyle[mainAxis.MARGIN_LEADING];
    }
    else {
      childLayout[mainAxis.START] = previousChild.layout[mainAxis.END] + childStyle[mainAxis.MARGIN_LEADING] + remainingSpaceMainAxis * toFloat32(2);
    }
    childLayout[mainAxis.END] = childLayout[mainAxis.START] + childLayout[mainAxis.DIMENSION];

  }
  else if (justifyContent === SPACE_BETWEEN && previousChild) {
    childLayout[mainAxis.START] = previousChild.layout[mainAxis.END] + remainingSpaceMainAxis + previousChild.style[mainAxis.MARGIN_TRAILING] + childStyle[mainAxis.MARGIN_LEADING];
    childLayout[mainAxis.END] = childLayout[mainAxis.START] + childLayout[mainAxis.DIMENSION];
  }
  else if (justifyContent === STRETCH) {
    if (childLayout[mainAxis.DIMENSION] === 0) {
      childLayout[mainAxis.START] = 0;
      childLayout[mainAxis.DIMENSION] = mainAxis === AXIS.row ? parentWidth : parentHeight;
      childLayout[mainAxis.END] = childLayout[mainAxis.DIMENSION];

    }

  }
}

function absolutePosition(node, previousSibling, mainAxis, crossAxis) {
  var parent = node.parent;
  var nodeLayout = node.layout;
  var nodeStyle = node.style;
  var parentLayout = parent.layout;

  nodeLayout[mainAxis.START] = parentLayout[mainAxis.START];
  nodeLayout[crossAxis.START] = parentLayout[crossAxis.START];
  if (nodeStyle[mainAxis.START] !== UNDEFINED) {
    nodeLayout[mainAxis.START] += nodeStyle[mainAxis.START];
    nodeLayout[mainAxis.END] += nodeStyle[mainAxis.START];

  }
  else if (nodeStyle[mainAxis.END] !== UNDEFINED && nodeStyle[mainAxis.DIMENSION] !== UNDEFINED) {
    nodeLayout[mainAxis.START] = parentLayout[mainAxis.END] - nodeStyle[mainAxis.DIMENSION] - nodeStyle[mainAxis.END];
  }
  else if (previousSibling) {
    nodeLayout[mainAxis.START] = previousSibling.layout[mainAxis.END] + previousSibling.style[mainAxis.MARGIN_TRAILING];
  }

  if (nodeStyle[crossAxis.START] !== UNDEFINED) {
    nodeLayout[crossAxis.START] += nodeStyle[crossAxis.START];
    nodeLayout[crossAxis.END] += nodeStyle[crossAxis.START];

  }
  else if (nodeStyle[crossAxis.END] !== UNDEFINED && nodeStyle[crossAxis.DIMENSION] !== UNDEFINED) {
    nodeLayout[crossAxis.START] = parentLayout[crossAxis.END] - nodeStyle[crossAxis.DIMENSION] - nodeStyle[crossAxis.END];
  }
  else {
    nodeLayout[crossAxis.START] = parent ? parentLayout[crossAxis.START] : toFloat32(0);
  }

  if (nodeStyle[mainAxis.END] !== UNDEFINED) {
    nodeLayout[mainAxis.END] = parentLayout[mainAxis.END] - nodeStyle[mainAxis.END];
    nodeLayout[mainAxis.DIMENSION] = nodeLayout[mainAxis.END] - nodeLayout[mainAxis.START];
  }
  if (nodeStyle[crossAxis.END] !== UNDEFINED) {
    nodeLayout[crossAxis.END] = parentLayout[crossAxis.END] - nodeStyle[crossAxis.END];
    nodeLayout[crossAxis.DIMENSION] = nodeLayout[crossAxis.END] - nodeLayout[crossAxis.START];
  }

  if (!nodeLayout.height && nodeStyle.height !== UNDEFINED) {
    nodeLayout.height = nodeStyle.height;
  }
  if (!nodeLayout.width && nodeStyle.width !== UNDEFINED) {
    nodeLayout.width = nodeStyle.width;
  }

  if (nodeLayout.height < (nodeLayout.bottom - nodeLayout.top)) {
    nodeLayout.bottom = nodeLayout.top + nodeLayout.height;
  }

  if (nodeLayout.width < (nodeLayout.right - nodeLayout.left)) {
    nodeLayout.right = nodeLayout.left + nodeLayout.width;
  }

}

function alignItemsFn(child, previousChild, mainAxis, alignItems, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute) {
  justifyContentFn(child, previousChild, mainAxis, alignItems, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute);
}

function correctChildren(node, oldNode, top, left, mainAxis, crossAxis) {
  var previousChild = null;
  for (var i = 0, l = node.children.length; i < l; i++) {
    var child = node.children[i];
    var childStyle = child.style;
    var childLayout = child.layout;
    if (child.children) {
      var isAbsolutePosition = childStyle.position === ABSOLUTE;
      if (isAbsolutePosition) {
        absolutePosition(child, previousChild, mainAxis, crossAxis);
      }
      else {
        childLayout.left += left;
        childLayout.right += left;
        childLayout.top += top;
        childLayout.bottom += top;
        correctChildren(child, oldNode, top, left, mainAxis, crossAxis);
      }
      previousChild = child;
    }
  }
}

function flexSize(child, previousChild, totalFlexGrow, remainingSpaceMainAxis, mainAxis) {
  var childLayout = child.layout;
  var childStyle = child.style;
  if (mainAxis === ROW) {
    if (previousChild) {
      childLayout.left = previousChild.layout.right;
    }
    childLayout.width = childStyle.flexGrow / totalFlexGrow * remainingSpaceMainAxis + (childStyle.width !== UNDEFINED ? childStyle.width : 0);
    childLayout.right = childLayout.left + childLayout.width;
  }
  else {
    if (previousChild) {
      childLayout.top = previousChild.layout.bottom;
    }
    childLayout.height = childStyle.flexGrow / totalFlexGrow * remainingSpaceMainAxis + (childStyle.height !== UNDEFINED ? childStyle.height : 0);
    childLayout.bottom = childLayout.top + childLayout.height;
  }
}

// main bottleneck - takes up most cpu and allocations
//                   ideally we skip it when possible
//                   - add hasParentDimensionsChanged argument
function hasPositionChanged(node, oldNode) {
  return node.style.left !== oldNode.style.left ||
    node.style.right !== oldNode.style.right ||
    node.style.top !== oldNode.style.top ||
    node.style.bottom !== oldNode.style.bottom;
}


function processChildren(node, oldNode, parentMainAxis, parentCrossAxis, shouldProcessAbsolute, hasParentDimensionsChanged, offsetX, offsetY) {

  var parent = node.parent;
  var nodeStyle = node.style;

  if (oldNode) {
    if (node.style !== oldNode.style) {
      if (node.style.width !== oldNode.style.width || node.style.height !== oldNode.style.height) {
        hasParentDimensionsChanged = true;
      }

    }

    if (node.style.width !== UNDEFINED && node.style.height !== UNDEFINED &&
      node.style.width === oldNode.style.width && node.style.height === oldNode.style.height
    ) {
      hasParentDimensionsChanged = false;
    }
  }

  var parentLayout = parent ? parent.layout : null;
  var parentWidth = parentLayout ? parentLayout.width : clientWidth;
  var parentHeight = parentLayout ? parentLayout.height : clientHeight;
  var nodeLayout = node.layout;
  var nodeChildren = node.children;
  if (nodeChildren.length && typeof nodeChildren[0] !== 'string') {
    var newMainAxisDirection = nodeStyle && nodeStyle.flexDirection ? nodeStyle.flexDirection : COLUMN;
    var newCrossAxisDirection = newMainAxisDirection === COLUMN ? ROW : COLUMN;
    var mainAxis = AXIS[newMainAxisDirection];
    var crossAxis = AXIS[newCrossAxisDirection];
    var maxSize = 0;
    var previousChild = null;
    var totalFlexGrow = 0;
    var lineIndex = 0;
    var isFlexWrap = nodeStyle.flexWrap === WRAP;
    var totalChildrenSize = 0;
    var additional = 0;
    var maxCrossDimension = 0;
    var lineLengths = [];
    var crossLineLengths = [];
    var lineNrOfChildren = [];
    var currNrOfChildren = 0;
    var child;
    var childStyle;
    var childLayout;
    var i;
    var l;
    var oldChild;
    var hasParentLocationChanged = oldNode && hasPositionChanged(node, oldNode);
    for (i = 0, l = nodeChildren.length; i < l; i++) {
      child = nodeChildren[i];
      oldChild = oldNode ? oldNode.children[i] : null;

      childStyle = child.style;
      childLayout = child.layout;

      layoutRelativeNode(child, oldChild, previousChild, mainAxis, crossAxis, shouldProcessAbsolute, hasParentDimensionsChanged);

      var skipPrevious = false;

      if (childStyle.position !== ABSOLUTE) {

        if (i === 0) {
          childLayout[parentMainAxis.START] += nodeStyle[parentMainAxis.PADDING_LEADING];
          childLayout[parentMainAxis.END] += nodeStyle[parentMainAxis.PADDING_TRAILING];
        }
        childLayout[parentCrossAxis.START] += nodeStyle[parentCrossAxis.PADDING_LEADING];
        childLayout[parentCrossAxis.DIMENSION] -= nodeStyle[parentCrossAxis.PADDING_LEADING] + nodeStyle[parentCrossAxis.PADDING_TRAILING];
        childLayout[parentCrossAxis.END] -= nodeStyle[parentCrossAxis.PADDING_TRAILING];

        var newSize = childStyle[mainAxis.DIMENSION] !== UNDEFINED ? (childStyle[mainAxis.DIMENSION] + childStyle[crossAxis.MARGIN_LEADING] + childStyle[crossAxis.MARGIN_TRAILING]) || 0 : 0;

        if (isFlexWrap) {

          if ((totalChildrenSize + newSize) > nodeLayout[mainAxis.DIMENSION]) {
            lineLengths.push(toFloat32(totalChildrenSize));
            crossLineLengths.push(toFloat32(maxCrossDimension));
            lineNrOfChildren.push(toFloat32(currNrOfChildren));
            lineIndex++;
            currNrOfChildren = 0;
            additional += maxCrossDimension;
            maxCrossDimension = 0;

            childLayout[mainAxis.START] = nodeLayout[mainAxis.START] + childStyle[mainAxis.MARGIN_LEADING];
            childLayout[mainAxis.END] = childLayout[mainAxis.START] + childLayout[mainAxis.DIMENSION];

            totalChildrenSize = 0;

          }
          childLayout.lineIndex = lineIndex;
        }
        currNrOfChildren++;
        totalChildrenSize += newSize;

        childLayout[crossAxis.START] += additional;
        childLayout[crossAxis.END] += additional;

        if (childLayout[parentMainAxis.END] > maxSize) {
          maxSize = childLayout[parentMainAxis.END] + childStyle[parentMainAxis.MARGIN_TRAILING];
        }

        totalFlexGrow += childStyle.flexGrow;

        if (skipPrevious) {
          previousChild = null;
        }
        else {
          previousChild = child;
        }

        if ((childLayout[crossAxis.DIMENSION] + childStyle[crossAxis.MARGIN_TRAILING] + childStyle[crossAxis.MARGIN_LEADING]) > maxCrossDimension) {
          maxCrossDimension = childLayout[crossAxis.DIMENSION] + childStyle[crossAxis.MARGIN_TRAILING] + childStyle[crossAxis.MARGIN_LEADING];
        }
      }

    }

    additional += maxCrossDimension;
    lineLengths.push(totalChildrenSize);
    crossLineLengths.push(maxCrossDimension);
    lineNrOfChildren.push(currNrOfChildren);

    if (node !== oldNode && nodeLayout[parentMainAxis.DIMENSION] === 0) {
      nodeLayout[parentMainAxis.END] = maxSize + nodeStyle[parentMainAxis.PADDING_TRAILING];
      nodeLayout[parentMainAxis.DIMENSION] = maxSize + nodeStyle[parentMainAxis.PADDING_TRAILING] - nodeLayout[parentMainAxis.START];
    }

    var newParentHeight = nodeLayout.height;
    var newParentWidth = nodeLayout.width;

    var mainDimensionSize = mainAxis === AXIS.row ? newParentWidth : newParentHeight;
    var crossDimensionSize = mainAxis === AXIS.row ? newParentHeight : newParentWidth;

    // correct the children position (justifyContent, alignItems, more?!)
    var justifyContent = nodeStyle.justifyContent;
    var alignItems = nodeStyle.alignItems;

    var remainingSpaceMainAxis;
    previousChild = null;
    var currentLineIndex = -1;
    var currCrossSize = 0;

    for (i = 0, l = nodeChildren.length; i < l; i++) {
      child = nodeChildren[i];
      childStyle = child.style;
      childLayout = child.layout;
      oldChild = oldNode ? oldNode.children[i] : null;
      if (currentLineIndex !== childLayout.lineIndex) {
        currentLineIndex = childLayout.lineIndex;
        remainingSpaceMainAxis = mainDimensionSize - lineLengths[currentLineIndex];
        if (!totalFlexGrow) {
          if (justifyContent === CENTER) {
            remainingSpaceMainAxis /= toFloat32(2);
          }
          else if (justifyContent === SPACE_BETWEEN) {
            remainingSpaceMainAxis /= (lineNrOfChildren[currentLineIndex] - toFloat32(1));
            previousChild = null;
          }
          else if (justifyContent === SPACE_AROUND) {
            remainingSpaceMainAxis /= (lineNrOfChildren[currentLineIndex] * toFloat32(2));
            previousChild = null;
          }
        }
        currCrossSize += lineLengths[currentLineIndex];
      }
      var isPositionAbsolute = childStyle.position === ABSOLUTE;

      var remainingSpaceCrossAxisSelf = crossDimensionSize - additional;

      var initialTop = childLayout.top;
      var initialLeft = childLayout.left;

      if (totalFlexGrow) {
        flexSize(child, previousChild, totalFlexGrow, remainingSpaceMainAxis, newMainAxisDirection);
      }
      else {
        justifyContentFn(child, previousChild, mainAxis, justifyContent, remainingSpaceMainAxis, undefined, undefined, isPositionAbsolute);
      }

      if (isPositionAbsolute) {
        absolutePosition(child, previousChild, mainAxis, crossAxis);
      }
      var alignSelf = (!isFlexWrap ? childStyle.alignSelf : alignItems) || alignItems;
      var addSpace = crossLineLengths[currentLineIndex] - childLayout[crossAxis.DIMENSION] - childStyle[crossAxis.MARGIN_TRAILING] - childStyle[crossAxis.MARGIN_LEADING];
      if (addSpace) {
        remainingSpaceCrossAxisSelf += addSpace;
      }
      if (alignSelf === CENTER) {
        remainingSpaceCrossAxisSelf = (remainingSpaceCrossAxisSelf / 2);
      }

      // TODO: fix flexWrap line heights
      //if (lineLengths.length > 1) {
      //  var foo = node.layout[xNewCrossAxisDirection.START] + (crossDimensionSize / (lineLengths.length - 1) * currentLineIndex);
      //
      //  childLayout[xNewCrossAxisDirection.START] = foo - childLayout[xNewCrossAxisDirection.DIMENSION] - childStyle[xNewCrossAxisDirection.MARGIN_TRAILING] - childStyle[xNewCrossAxisDirection.MARGIN_LEADING] - addSpace;
      //  childLayout[xNewCrossAxisDirection.END] = foo - addSpace;
      //}
      alignItemsFn(child, previousChild, crossAxis, alignSelf, remainingSpaceCrossAxisSelf, parentHeight, parentWidth, isPositionAbsolute);
      if (isPositionAbsolute) {
        processChildren(child, oldChild, mainAxis, crossAxis, isPositionAbsolute, hasParentDimensionsChanged, offsetX, offsetY);
      }
      else if ((childLayout.top - initialTop) !== 0 || (childLayout.left - initialLeft) !== 0) {
        correctChildren(child, oldChild, childLayout.top - initialTop, childLayout.left - initialLeft, mainAxis, crossAxis);
      }
      if (!isPositionAbsolute) {
        previousChild = child;
      }
    }

    if (hasParentLocationChanged) {
      //console.info(offsetY, offsetX);
      //debugger;
      correctChildren(node, oldNode, offsetY, offsetX, parentMainAxis, parentCrossAxis);
    }
  }
}


function layoutRelativeNode(node, oldNode, previousSibling, mainAxis, crossAxis, shouldProcessAbsolute, hasParentDimensionsChanged) {
  var nodeLayout = node.layout;
  var nodeStyle = node.style;

  var oldNodeTop = 0;
  var oldNodeLeft = 0;
  if (oldNode) {
    oldNodeTop = oldNode.layout.top;
    oldNodeLeft = oldNode.layout.left;
  }

  var parent = node.parent;
  if (parent && parent.style.position === ABSOLUTE && !shouldProcessAbsolute) {
    return node;
  }

  if (node === oldNode && !hasParentDimensionsChanged) {
    return node;
  }

  var parentLayout = parent ? parent.layout : null;
  var parentWidth = parentLayout ? parentLayout.width : clientWidth;

  if (previousSibling && nodeStyle.position !== ABSOLUTE) {
    nodeLayout[mainAxis.START] = previousSibling.layout[mainAxis.END] + previousSibling.style[mainAxis.MARGIN_TRAILING];
    nodeLayout[crossAxis.START] = parentLayout[crossAxis.START];

  }
  else {
    nodeLayout.left = parent ? parentLayout.left : toFloat32(0);
    nodeLayout.top = parent ? parentLayout.top : toFloat32(0);
  }

  nodeLayout.left += nodeStyle.marginLeft;
  nodeLayout.top += nodeStyle.marginTop;

  nodeLayout.width = (nodeStyle.width !== UNDEFINED ? nodeStyle.width : 0) || (!nodeStyle.flexGrow ? parentWidth : 0) || 0;
  nodeLayout.height = (nodeStyle.height !== UNDEFINED ? nodeStyle.height : 0);

  nodeLayout.bottom = nodeLayout.top + nodeLayout.height;
  nodeLayout.right = nodeLayout.left + nodeLayout.width;


  if (nodeStyle.position !== ABSOLUTE) {
    processChildren(node, oldNode, mainAxis, crossAxis, false, hasParentDimensionsChanged, oldNodeLeft - node.layout.left, oldNodeTop - node.layout.top);
  }



  return node;
}

function layoutAbsoluteNode(node, oldNode, previousSibling, mainAxis, crossAxis) {
  absolutePosition(node, previousSibling, mainAxis, crossAxis);
  processChildren(node, oldNode, mainAxis, crossAxis, true);
}

module.exports = {
  layoutRelativeNode: layoutRelativeNode//,
  //layoutAbsoluteNode: layoutAbsoluteNode
};
