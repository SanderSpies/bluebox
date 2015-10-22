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
var AXIS2 = require('./AXIS2');
var WRAP = 'wrap';
var UNDEFINED = require('../UNDEFINED');
var ViewPortHelper = require('../renderers/DOM/ViewPortHelper');
var CL = require('../components/ComponentConstants');
var viewPortDimensions = ViewPortHelper.getDimensions();
var toFloat32 = require('../utils/toFloat32');
var clipSpaceX = toFloat32(1 / viewPortDimensions.width * 2);
var clipSpaceY = toFloat32(1 / viewPortDimensions.height * 2);

var clientWidth = toFloat32(document.body.clientWidth) * clipSpaceX;
var clientHeight = toFloat32(document.body.clientHeight)  * clipSpaceY;


function justifyContentFn(child, previousChild, mainAxis, mainAxis2, justifyContentX, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute) {
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
    childLayout[mainAxis2.START] += remainingSpaceMainAxis;
    childLayout[mainAxis2.END] += remainingSpaceMainAxis;

  }
  else if (justifyContent === SPACE_AROUND) {
    if (!previousChild) {
      childLayout[mainAxis2.START] += remainingSpaceMainAxis + childStyle[mainAxis.MARGIN_LEADING];
    }
    else {
      childLayout[mainAxis2.START] = previousChild.layout[mainAxis2.END] + childStyle[mainAxis.MARGIN_LEADING] + remainingSpaceMainAxis * 2;
    }
    childLayout[mainAxis2.END] = childLayout[mainAxis2.START] + childLayout[mainAxis2.DIMENSION];

  }
  else if (justifyContent === SPACE_BETWEEN && previousChild) {
    childLayout[mainAxis2.START] = previousChild.layout[mainAxis2.END] + remainingSpaceMainAxis + previousChild.style[mainAxis.MARGIN_TRAILING] + childStyle[mainAxis.MARGIN_LEADING];
    childLayout[mainAxis2.END] = childLayout[mainAxis2.START] + childLayout[mainAxis2.DIMENSION];
  }
  else if (justifyContent === STRETCH) {
    if (childLayout[mainAxis2.DIMENSION] === 0) {
      childLayout[mainAxis2.START] = 0;
      childLayout[mainAxis2.DIMENSION] = mainAxis === AXIS.row ? parentWidth : parentHeight;
      childLayout[mainAxis2.END] = childLayout[mainAxis2.DIMENSION];

    }

  }
}

function absolutePosition(node, previousSibling, mainAxis, crossAxis, mainAxis2, crossAxis2) {
  var parent = node.parent;
  var nodeLayout = node.layout;
  var nodeStyle = node.style;
  var parentLayout = parent.layout;

  nodeLayout[mainAxis2.START] = parentLayout[mainAxis2.START];
  nodeLayout[crossAxis2.START] = parentLayout[crossAxis2.START];
  if (nodeStyle[mainAxis.START] !== UNDEFINED) {
    nodeLayout[mainAxis2.START] += nodeStyle[mainAxis.START];
    nodeLayout[mainAxis2.END] += nodeStyle[mainAxis.START];

  }
  else if (nodeStyle[mainAxis.END] !== UNDEFINED && nodeStyle[mainAxis.DIMENSION] !== UNDEFINED) {
    nodeLayout[mainAxis2.START] = parentLayout[mainAxis2.END] - nodeStyle[mainAxis.DIMENSION] - nodeStyle[mainAxis.END];
  }
  else if (previousSibling) {
    nodeLayout[mainAxis2.START] = previousSibling.layout[mainAxis2.END] + previousSibling.style[mainAxis.MARGIN_TRAILING];
  }

  if (nodeStyle[crossAxis.START] !== UNDEFINED) {
    nodeLayout[crossAxis2.START] += nodeStyle[crossAxis.START];
    nodeLayout[crossAxis2.END] += nodeStyle[crossAxis.START];

  }
  else if (nodeStyle[crossAxis.END] !== UNDEFINED && nodeStyle[crossAxis.DIMENSION] !== UNDEFINED) {
    nodeLayout[crossAxis2.START] = parentLayout[crossAxis2.END] - nodeStyle[crossAxis.DIMENSION] - nodeStyle[crossAxis.END];
  }
  else {
    nodeLayout[crossAxis2.START] = parent ? parentLayout[crossAxis2.START] : 0;
  }

  if (nodeStyle[mainAxis.END] !== UNDEFINED) {
    nodeLayout[mainAxis2.END] = parentLayout[mainAxis2.END] - nodeStyle[mainAxis.END];
    nodeLayout[mainAxis2.DIMENSION] = nodeLayout[mainAxis2.END] - nodeLayout[mainAxis2.START];
  }
  if (nodeStyle[crossAxis.END] !== UNDEFINED) {
    nodeLayout[crossAxis2.END] = parentLayout[crossAxis2.END] - nodeStyle[crossAxis.END];
    nodeLayout[crossAxis2.DIMENSION] = nodeLayout[crossAxis2.END] - nodeLayout[crossAxis2.START];
  }

  if (!nodeLayout[CL.HEIGHT] && nodeStyle.height !== UNDEFINED) {
    nodeLayout[CL.HEIGHT] = nodeStyle.height;
  }
  if (!nodeLayout[CL.WIDTH] && nodeStyle.width !== UNDEFINED) {
    nodeLayout[CL.WIDTH] = nodeStyle.width;
  }

  if (nodeLayout[CL.WIDTH] < (nodeLayout[CL.BOTTOM] - nodeLayout[CL.TOP])) {
    nodeLayout[CL.BOTTOM] = nodeLayout[CL.TOP] + nodeLayout[CL.HEIGHT];
  }

  if (nodeLayout[CL.WIDTH] < (nodeLayout[CL.RIGHT] - nodeLayout[CL.LEFT])) {
    nodeLayout[CL.RIGHT] = nodeLayout[CL.LEFT] + nodeLayout[CL.WIDTH];
  }

}

function alignItemsFn(child, previousChild, mainAxis, mainAxis2, alignItems, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute) {
  justifyContentFn(child, previousChild, mainAxis, mainAxis2, alignItems, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute);
}

function correctChildren(node, oldNode, top, left, mainAxis, crossAxis, mainAxis2, crossAxis2) {
  var previousChild = null;
  for (var i = 0, l = node.children.length; i < l; i++) {
    var child = node.children[i];
    var childStyle = child.style;
    var childLayout = child.layout;
    if (child.children) {
      var isAbsolutePosition = childStyle.position === ABSOLUTE;
      if (isAbsolutePosition) {
        absolutePosition(child, previousChild, mainAxis, crossAxis, mainAxis2, crossAxis2);
      }
      else {
        childLayout[CL.LEFT] += left;
        childLayout[CL.RIGHT] += left;
        childLayout[CL.TOP] += top;
        childLayout[CL.BOTTOM] += top;
        correctChildren(child, oldNode, top, left, mainAxis, crossAxis, mainAxis2, crossAxis2);
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
      childLayout[CL.LEFT] = previousChild.layout[CL.RIGHT];
    }
    childLayout[CL.WIDTH] = childStyle.flexGrow / totalFlexGrow * remainingSpaceMainAxis + (childStyle.width !== UNDEFINED ? childStyle.width : 0);
    childLayout[CL.RIGHT] = childLayout[CL.LEFT] + childLayout[CL.WIDTH];
  }
  else {
    if (previousChild) {
      childLayout[CL.TOP] = previousChild.layout[CL.BOTTOM];
    }
    childLayout[CL.HEIGHT] = childStyle.flexGrow / totalFlexGrow * remainingSpaceMainAxis + (childStyle.height !== UNDEFINED ? childStyle.height : 0);
    childLayout[CL.BOTTOM] = childLayout[CL.TOP] + childLayout[CL.HEIGHT];
  }
}

// main bottleneck - takes up most cpu and allocations
//                   ideally we skip it when possible
//                   - add hasParentDimensionsChanged argument
function hasPositionChanged(node, oldNode) {
  return !(node.style.left === oldNode.style.left &&
    node.style.right === oldNode.style.right &&
    node.style.top === oldNode.style.top);
}


function processChildren(node, oldNode, parentMainAxis, parentCrossAxis, parentMainAxis2, parentCrossAxis2, shouldProcessAbsolute, hasParentDimensionsChanged, offsetX, offsetY) {

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
  var parentWidth = parentLayout ? parentLayout[CL.WIDTH] : clientWidth;
  var parentHeight = parentLayout ? parentLayout[CL.HEIGHT] : clientHeight;
  var nodeLayout = node.layout;
  var nodeChildren = node.children;
  if (nodeChildren.length && typeof nodeChildren[0] !== 'string') {
    var newMainAxisDirection = nodeStyle && nodeStyle.flexDirection ? nodeStyle.flexDirection : COLUMN;
    var newCrossAxisDirection = newMainAxisDirection === COLUMN ? ROW : COLUMN;
    var mainAxis = AXIS[newMainAxisDirection];
    var crossAxis = AXIS[newCrossAxisDirection];
    var mainAxis2 = AXIS2[newMainAxisDirection];
    var crossAxis2 = AXIS2[newCrossAxisDirection];

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

      layoutRelativeNode(child, oldChild, previousChild, mainAxis, crossAxis, mainAxis2, crossAxis2, shouldProcessAbsolute, hasParentDimensionsChanged);

      var skipPrevious = false;

      if (childStyle.position !== ABSOLUTE) {

        if (i === 0) {
          childLayout[parentMainAxis2.START] += nodeStyle[parentMainAxis.PADDING_LEADING];
          childLayout[parentMainAxis2.END] += nodeStyle[parentMainAxis.PADDING_TRAILING];
        }
        childLayout[parentCrossAxis2.START] += nodeStyle[parentCrossAxis.PADDING_LEADING];
        childLayout[parentCrossAxis2.DIMENSION] -= nodeStyle[parentCrossAxis.PADDING_LEADING] + nodeStyle[parentCrossAxis.PADDING_TRAILING];
        childLayout[parentCrossAxis2.END] -= nodeStyle[parentCrossAxis.PADDING_TRAILING];

        var newSize = childStyle[mainAxis.DIMENSION] !== UNDEFINED ? (childStyle[mainAxis.DIMENSION] + childStyle[crossAxis.MARGIN_LEADING] + childStyle[crossAxis.MARGIN_TRAILING]) || 0 : 0;

        if (isFlexWrap) {

          if ((totalChildrenSize + newSize) > nodeLayout[mainAxis2.DIMENSION]) {
            lineLengths.push(totalChildrenSize);
            crossLineLengths.push(maxCrossDimension);
            lineNrOfChildren.push(currNrOfChildren);
            lineIndex++;
            currNrOfChildren = 0;
            additional += maxCrossDimension;
            maxCrossDimension = 0;

            childLayout[mainAxis2.START] = nodeLayout[mainAxis2.START] + childStyle[mainAxis.MARGIN_LEADING];
            childLayout[mainAxis2.END] = childLayout[mainAxis2.START] + childLayout[mainAxis2.DIMENSION];

            totalChildrenSize = 0;

          }
          childLayout[CL.LINE_INDEX] = lineIndex;
        }
        currNrOfChildren++;
        totalChildrenSize += newSize;

        childLayout[crossAxis2.START] += additional;
        childLayout[crossAxis2.END] += additional;

        if (childLayout[parentMainAxis2.END] > maxSize) {
          maxSize = childLayout[parentMainAxis2.END] + childStyle[parentMainAxis.MARGIN_TRAILING];
        }

        totalFlexGrow += childStyle.flexGrow;

        if (skipPrevious) {
          previousChild = null;
        }
        else {
          previousChild = child;
        }

        if ((childLayout[crossAxis2.DIMENSION] + childStyle[crossAxis.MARGIN_TRAILING] + childStyle[crossAxis.MARGIN_LEADING]) > maxCrossDimension) {
          maxCrossDimension = childLayout[crossAxis2.DIMENSION] + childStyle[crossAxis.MARGIN_TRAILING] + childStyle[crossAxis.MARGIN_LEADING];
        }
      }

    }

    additional += maxCrossDimension;
    lineLengths.push(totalChildrenSize);
    crossLineLengths.push(maxCrossDimension);
    lineNrOfChildren.push(currNrOfChildren);

    if (node !== oldNode && nodeLayout[parentMainAxis2.DIMENSION] === 0) {
      nodeLayout[parentMainAxis2.END] = maxSize + nodeStyle[parentMainAxis.PADDING_TRAILING];
      nodeLayout[parentMainAxis2.DIMENSION] = nodeLayout[parentMainAxis2.END] - nodeLayout[parentMainAxis2.START];
    }

    var newParentHeight = nodeLayout[CL.HEIGHT];
    var newParentWidth = nodeLayout[CL.WIDTH];

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
      if (currentLineIndex !== childLayout[CL.LINE_INDEX]) {
        currentLineIndex = childLayout[CL.LINE_INDEX];
        remainingSpaceMainAxis = mainDimensionSize - lineLengths[currentLineIndex];
        if (!totalFlexGrow) {
          if (justifyContent === CENTER) {
            remainingSpaceMainAxis /= 2;
          }
          else if (justifyContent === SPACE_BETWEEN) {
            remainingSpaceMainAxis /= (lineNrOfChildren[currentLineIndex] - 1);
            previousChild = null;
          }
          else if (justifyContent === SPACE_AROUND) {
            remainingSpaceMainAxis /= (lineNrOfChildren[currentLineIndex] * 2);
            previousChild = null;
          }
        }
        currCrossSize += lineLengths[currentLineIndex];
      }
      var isPositionAbsolute = childStyle.position === ABSOLUTE;

      var remainingSpaceCrossAxisSelf = crossDimensionSize - additional;

      var initialTop = childLayout[CL.TOP];
      var initialLeft = childLayout[CL.LEFT];

      if (totalFlexGrow) {
        flexSize(child, previousChild, totalFlexGrow, remainingSpaceMainAxis, newMainAxisDirection);
      }
      else {
        justifyContentFn(child, previousChild, mainAxis, mainAxis2, justifyContent, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute);
      }

      if (isPositionAbsolute) {
        absolutePosition(child, previousChild, mainAxis, crossAxis, mainAxis2, crossAxis2);
      }
      var alignSelf = (!isFlexWrap ? childStyle.alignSelf : alignItems) || alignItems;
      var addSpace = crossLineLengths[currentLineIndex] - childLayout[crossAxis2.DIMENSION] - childStyle[crossAxis.MARGIN_TRAILING] - childStyle[crossAxis.MARGIN_LEADING];
      if (addSpace) {
        remainingSpaceCrossAxisSelf += addSpace;
      }
      if (alignSelf === CENTER) {
        remainingSpaceCrossAxisSelf = (remainingSpaceCrossAxisSelf / 2);
      }

      // TODO: fix flexWrap line heights
      //if (lineLengths.length > 1) {
      //  var foo = node.layout2[xNewCrossAxisDirection.START] + (crossDimensionSize / (lineLengths.length - 1) * currentLineIndex);
      //
      //  childLayout[xNewCrossAxisDirection.START] = foo - childLayout[xNewCrossAxisDirection.DIMENSION] - childStyle[xNewCrossAxisDirection.MARGIN_TRAILING] - childStyle[xNewCrossAxisDirection.MARGIN_LEADING] - addSpace;
      //  childLayout[xNewCrossAxisDirection.END] = foo - addSpace;
      //}
      alignItemsFn(child, previousChild, crossAxis, crossAxis2, alignSelf, remainingSpaceCrossAxisSelf, parentHeight, parentWidth, isPositionAbsolute);
      if (isPositionAbsolute) {
        processChildren(child, oldChild, mainAxis, crossAxis, mainAxis2, crossAxis2, isPositionAbsolute, hasParentDimensionsChanged, offsetX, offsetY);
      }
      else if ((childLayout[CL.TOP] - initialTop) !== 0 || (childLayout[CL.LEFT] - initialLeft) !== 0) {
        correctChildren(child, oldChild, childLayout[CL.TOP] - initialTop, childLayout[CL.LEFT] - initialLeft, mainAxis, crossAxis, mainAxis2, crossAxis2);
      }
      if (!isPositionAbsolute) {
        previousChild = child;
      }
    }

    if (hasParentLocationChanged) {
      correctChildren(node, oldNode, offsetY, offsetX, parentMainAxis, parentCrossAxis);
    }

  }

}


function layoutRelativeNode(node, oldNode, previousSibling, mainAxis, crossAxis, mainAxis2, crossAxis2, shouldProcessAbsolute, hasParentDimensionsChanged) {
  var nodeLayout = node.layout;
  var nodeStyle = node.style;

  var oldNodeTop = 0;
  var oldNodeLeft = 0;
  if (oldNode) {
    oldNodeTop = oldNode.layout[CL.TOP];
    oldNodeLeft = oldNode.layout[CL.LEFT];
  }

  var parent = node.parent;
  if (parent && parent.style.position === ABSOLUTE && !shouldProcessAbsolute) {
    return node;
  }

  if (node === oldNode && !hasParentDimensionsChanged) {
    return node;
  }

  var parentLayout = parent ? parent.layout : null;
  var parentWidth = parentLayout ? parentLayout[CL.WIDTH] : clientWidth;

  if (previousSibling && nodeStyle.position !== ABSOLUTE) {
    nodeLayout[mainAxis2.START] = previousSibling.layout[mainAxis2.END] + previousSibling.style[mainAxis.MARGIN_TRAILING];
    nodeLayout[crossAxis2.START] = parentLayout[crossAxis2.START];

  }
  else {
    nodeLayout[CL.LEFT] = parent ? parentLayout[CL.LEFT] : 0;
    nodeLayout[CL.TOP] = parent ? parentLayout[CL.TOP] : 0;
  }

  nodeLayout[CL.LEFT] += nodeStyle.marginLeft;
  nodeLayout[CL.TOP] += nodeStyle.marginTop;

  nodeLayout[CL.WIDTH] = (nodeStyle.width !== UNDEFINED ? nodeStyle.width : 0) || (!nodeStyle.flexGrow ? parentWidth : 0) || 0;
  nodeLayout[CL.HEIGHT] = (nodeStyle.height !== UNDEFINED ? nodeStyle.height : 0);

  nodeLayout[CL.BOTTOM] = nodeLayout[CL.TOP] + nodeLayout[CL.HEIGHT];
  nodeLayout[CL.RIGHT] = nodeLayout[CL.LEFT] + nodeLayout[CL.WIDTH];


  if (nodeStyle.position !== ABSOLUTE) {
    processChildren(node, oldNode, mainAxis, crossAxis, mainAxis2, crossAxis2, false, hasParentDimensionsChanged, oldNodeLeft - node.layout[CL.LEFT], oldNodeTop - node.layout[CL.TOP]);
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
