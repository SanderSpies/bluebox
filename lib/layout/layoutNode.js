'use strict';

var COLUMN = 'column';
var ROW = 'row';
var FLEX_START = 'flex-start';
var LEFT = 'left';
var TOP = 'top'
var RIGHT = 'right';
var BOTTOM = 'bottom';
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
var UNDEFINED = 7000;
function justifyContentFn(child, previousChild, newFlexDirection, justifyContent, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute) {
  if (justifyContent === 'center') {
    justifyContent = 'flex-end';
  }
  var childLayout = child.layout;
  var childStyle = child.style;
  if (isPositionAbsolute && (childStyle[newFlexDirection === 'row' ? 'left' : 'top'] !== UNDEFINED || childStyle[newFlexDirection === 'row' ? 'right' : 'bottom'] !== UNDEFINED)) {
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
        childLayout.left += remainingSpaceMainAxis + childStyle.marginLeft;
      }
      else {
        childLayout.left = previousChild.layout.right + childStyle.marginLeft + remainingSpaceMainAxis * 2;
      }
      childLayout.right = childLayout.left + childLayout.width;
    }
    else {
      if (!previousChild) {
        childLayout.top += remainingSpaceMainAxis + childStyle.marginTop;
      }
      else {
        childLayout.top = previousChild.layout.bottom + childStyle.marginTop + remainingSpaceMainAxis * 2;
      }
      childLayout.bottom = childLayout.top + childLayout.height;
    }
  }
  else if (justifyContent === 'space-between' && previousChild) {
    if (newFlexDirection === ROW) {
      childLayout.left = previousChild.layout.right + remainingSpaceMainAxis + previousChild.style.marginRight + childStyle.marginLeft;
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
  var nodeStyle = node.style;
  var parentLayout = parent.layout;

  nodeLayout[xMainAxis.START] = parentLayout[xMainAxis.START];
  nodeLayout[xCrossAxis.START] = parentLayout[xCrossAxis.START];
  if (nodeStyle[xMainAxis.START] !== UNDEFINED) {
    nodeLayout[xMainAxis.START] += nodeStyle[xMainAxis.START];
    nodeLayout[xMainAxis.END] += nodeStyle[xMainAxis.START];

  }
  else if (nodeStyle[xMainAxis.END] !== UNDEFINED && nodeStyle[xMainAxis.DIMENSION] !== UNDEFINED) {
    nodeLayout[xMainAxis.START] = parentLayout[xMainAxis.END] - nodeStyle[xMainAxis.DIMENSION] - nodeStyle[xMainAxis.END];
  }
  else if (previousSibling) {
    nodeLayout[xMainAxis.START] = previousSibling.layout[xMainAxis.END] + previousSibling.style[xMainAxis.MARGIN_TRAILING];
  }


  if (nodeStyle[xCrossAxis.START] !== UNDEFINED) {
    nodeLayout[xCrossAxis.START] += nodeStyle[xCrossAxis.START];
    nodeLayout[xCrossAxis.END] += nodeStyle[xCrossAxis.START];

  }
  else if (nodeStyle[xCrossAxis.END] !== UNDEFINED && nodeStyle[xCrossAxis.DIMENSION] !== UNDEFINED) {
    nodeLayout[xCrossAxis.START] = parentLayout[xCrossAxis.END] - nodeStyle[xCrossAxis.DIMENSION] - nodeStyle[xCrossAxis.END];
  }
  else {
    nodeLayout[xCrossAxis.START] = parent ? parentLayout[xCrossAxis.START] : 0;
  }

  if (nodeStyle[xMainAxis.END] !== UNDEFINED) {
    nodeLayout[xMainAxis.END] = parentLayout[xMainAxis.END] - nodeStyle[xMainAxis.END];
    nodeLayout[xMainAxis.DIMENSION] = nodeLayout[xMainAxis.END] - nodeLayout[xMainAxis.START];
  }
  if (nodeStyle[xCrossAxis.END] !== UNDEFINED) {
    nodeLayout[xCrossAxis.END] = parentLayout[xCrossAxis.END] - nodeStyle[xCrossAxis.END];
    nodeLayout[xCrossAxis.DIMENSION] = nodeLayout[xCrossAxis.END] - nodeLayout[xCrossAxis.START];
  }


  if (!nodeLayout.height && nodeStyle.height !== UNDEFINED) {
    nodeLayout.height = nodeStyle.height;
}
  if (!nodeLayout.width && nodeStyle.width  !== UNDEFINED) {
    nodeLayout.width = nodeStyle.width;
  }

  if (nodeLayout.height < (nodeLayout.bottom - nodeLayout.top)) {
    nodeLayout.bottom = nodeLayout.top + nodeLayout.height;
  }

  if (nodeLayout.width < (nodeLayout.right - nodeLayout.left)) {
    nodeLayout.right = nodeLayout.left + nodeLayout.width;
  }

}

function alignItemsFn(child, previousChild, newFlexDirection, alignItems, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute) {
  justifyContentFn(child, previousChild, newFlexDirection, alignItems, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute);
}

function _correctChildren(node, top, left, xMainAxis, xCrossAxis) {
  var previousChild = null;
  for (var i = 0, l = node.children.length; i < l; i++) {
    var child = node.children[i];
    var childStyle = child.style;
    var childLayout = child.layout;
    if (child.children) {
      var isAbsolutePosition = childStyle.position === 'absolute';
      if (isAbsolutePosition) {
        absolutePosition(child, previousChild, xMainAxis, xCrossAxis);
      }
      else {
        childLayout.left += left;
        childLayout.right += left;
        childLayout.top += top;
        childLayout.bottom += top;
        _correctChildren(child, top, left, xMainAxis, xCrossAxis);
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
function _processChildren(node, xMainAxis, xCrossAxis, shouldProcessAbsolute) {
  var parent = node.parent;
  var parentLayout = parent ? parent.layout : null;
  var parentWidth = parentLayout ? parentLayout.width : document.body.clientWidth;
  var parentHeight = parentLayout ? parentLayout.height : document.body.clientHeight;
  var nodeLayout = node.layout;
  var nodeStyle = node.style;
  var nodeChildren = node.children;
  if (nodeChildren.length && typeof nodeChildren[0] !== 'string') {
    var newMainAxisDirection = nodeStyle && nodeStyle.flexDirection ? nodeStyle.flexDirection : COLUMN;
    var newCrossAxisDirection = newMainAxisDirection === COLUMN ? ROW : COLUMN;
    var xNewMainAxisDirection = AXIS[newMainAxisDirection];
    var xNewCrossAxisDirection = AXIS[newCrossAxisDirection];
    var maxSize = 0;
    var previousChild = null;
    var totalFlexGrow = 0;
    var lineIndex = 0;
    var isFlexWrap = nodeStyle.flexWrap === 'wrap';
    var totalChildrenSize = 0;
    var additional = 0;
    var maxCrossDimension = 0;
    var lineLengths = [];
    var crossLineLengths = [];
    var lineNrOfChildren = [];
    var currNrOfChildren = 0;
    for (var i = 0, l = nodeChildren.length; i < l; i++) {
      var child = nodeChildren[i];
      var childStyle = child.style;
      var childLayout = child.layout;
      layoutNode(child, previousChild, newMainAxisDirection, shouldProcessAbsolute);

      var skipPrevious = false;

      if (childStyle.position !== 'absolute') {

        if (i === 0) {
          childLayout[xMainAxis.START] += nodeStyle[xMainAxis.PADDING_LEADING];
          childLayout[xMainAxis.END] += nodeStyle[xMainAxis.PADDING_TRAILING];
        }
        childLayout[xCrossAxis.START] += nodeStyle[xCrossAxis.PADDING_LEADING];
        childLayout[xCrossAxis.DIMENSION] -= nodeStyle[xCrossAxis.PADDING_LEADING] + nodeStyle[xCrossAxis.PADDING_TRAILING];
        childLayout[xCrossAxis.END] -= nodeStyle[xCrossAxis.PADDING_TRAILING];

        var newSize = childStyle[xNewMainAxisDirection.DIMENSION] !== UNDEFINED ? (childStyle[xNewMainAxisDirection.DIMENSION] + childStyle[xNewCrossAxisDirection.MARGIN_LEADING] + childStyle[xNewCrossAxisDirection.MARGIN_TRAILING]) || 0 : 0;

        if (isFlexWrap) {

          if ((totalChildrenSize + newSize) > nodeLayout[xNewMainAxisDirection.DIMENSION]) {
            lineLengths.push(totalChildrenSize);
            crossLineLengths.push(maxCrossDimension);
            lineNrOfChildren.push(currNrOfChildren);
            lineIndex++;
            currNrOfChildren = 0;
            additional += maxCrossDimension;
            maxCrossDimension = 0;

            childLayout[xNewMainAxisDirection.START] = nodeLayout[xNewMainAxisDirection.START]  + childStyle[xNewMainAxisDirection.MARGIN_LEADING];
            childLayout[xNewMainAxisDirection.END] = childLayout[xNewMainAxisDirection.START] + childLayout[xNewMainAxisDirection.DIMENSION];

            totalChildrenSize = 0; //(childStyle[xNewMainAxisDirection.DIMENSION] + childStyle[xNewCrossAxisDirection.MARGIN_LEADING] + childStyle[xNewCrossAxisDirection.MARGIN_TRAILING]);

          }
          childLayout.lineIndex = lineIndex;
        }
        currNrOfChildren++;
        totalChildrenSize += newSize;

        childLayout[xNewCrossAxisDirection.START] += additional;
        childLayout[xNewCrossAxisDirection.END] += additional;

        if (childLayout[xMainAxis.END] > maxSize) {
          maxSize = childLayout[xMainAxis.END] + childStyle[xMainAxis.MARGIN_TRAILING];
        }

        totalFlexGrow += childStyle.flexGrow;

        if (skipPrevious) {
          previousChild = null;
        } else {
          previousChild = child;
        }

        if ((childLayout[xNewCrossAxisDirection.DIMENSION] + childStyle[xNewCrossAxisDirection.MARGIN_TRAILING] + childStyle[xNewCrossAxisDirection.MARGIN_LEADING])> maxCrossDimension) {
          maxCrossDimension = childLayout[xNewCrossAxisDirection.DIMENSION] + childStyle[xNewCrossAxisDirection.MARGIN_TRAILING] + childStyle[xNewCrossAxisDirection.MARGIN_LEADING];
        }
      }

    }

    additional += maxCrossDimension;
    lineLengths.push(totalChildrenSize);
    crossLineLengths.push(maxCrossDimension);
    lineNrOfChildren.push(currNrOfChildren);

    if (nodeLayout[xMainAxis.DIMENSION] === 0) {
      nodeLayout[xMainAxis.END] = maxSize + nodeStyle[xMainAxis.PADDING_TRAILING];
      nodeLayout[xMainAxis.DIMENSION] = maxSize + nodeStyle[xMainAxis.PADDING_TRAILING] - nodeLayout[xMainAxis.START];
    }

    var newParentHeight = nodeLayout.height;
    var newParentWidth = nodeLayout.width;


    var mainDimensionSize = newMainAxisDirection === ROW ? newParentWidth : newParentHeight;
    var crossDimensionSize = newMainAxisDirection === ROW ? newParentHeight : newParentWidth;


    // correct the children position (justifyContent, alignItems, more?!)
    var justifyContent = nodeStyle.justifyContent;
    var alignItems = nodeStyle.alignItems;

    var remainingSpaceMainAxis;
    previousChild = null;
    var currentLineIndex = -1;
    var currCrossSize = 0;
    for (var i = 0, l = nodeChildren.length; i < l; i++) {
      var child = nodeChildren[i];
      var childStyle = child.style;
      var childLayout = child.layout;
      if (currentLineIndex !== childLayout.lineIndex) {
        currentLineIndex = childLayout.lineIndex;
        remainingSpaceMainAxis = mainDimensionSize - lineLengths[currentLineIndex];
        if (!totalFlexGrow) {
          if (justifyContent === 'center') {
            remainingSpaceMainAxis = remainingSpaceMainAxis / 2;
          }
          else if (justifyContent === 'space-between') {
            remainingSpaceMainAxis = remainingSpaceMainAxis / (lineNrOfChildren[currentLineIndex] - 1);
            previousChild = null;
          }
          else if (justifyContent === 'space-around') {
            remainingSpaceMainAxis = remainingSpaceMainAxis / (lineNrOfChildren[currentLineIndex] * 2);
            previousChild = null;
          }
        }
        currCrossSize += lineLengths[currentLineIndex];
      }
      var isPositionAbsolute = childStyle.position === 'absolute';

      var remainingSpaceCrossAxisSelf = crossDimensionSize - additional;

      var initialTop = childLayout.top;
      var initialLeft = childLayout.left;

      if (totalFlexGrow) {
        flexSize(child, previousChild, totalFlexGrow, remainingSpaceMainAxis, newMainAxisDirection);
      }
      else {
        justifyContentFn(child, previousChild, newMainAxisDirection, justifyContent, remainingSpaceMainAxis, undefined, undefined, isPositionAbsolute);
      }

      if (isPositionAbsolute) {
        absolutePosition(child, previousChild, xNewMainAxisDirection, xNewCrossAxisDirection);
      }
      var alignSelf = (!isFlexWrap ? childStyle.alignSelf : alignItems) || alignItems;
      var addSpace = crossLineLengths[currentLineIndex] - childLayout[xNewCrossAxisDirection.DIMENSION] - childStyle[xNewCrossAxisDirection.MARGIN_TRAILING] - childStyle[xNewCrossAxisDirection.MARGIN_LEADING];
      if (addSpace) {
        remainingSpaceCrossAxisSelf += addSpace;
      }
      if (alignSelf === 'center') {
        remainingSpaceCrossAxisSelf = (remainingSpaceCrossAxisSelf / 2);
      }



      // TODO: fix flexWrap line heights
      //if (lineLengths.length > 1) {
      //  var foo = node.layout[xNewCrossAxisDirection.START] + (crossDimensionSize / (lineLengths.length - 1) * currentLineIndex);
      //
      //  childLayout[xNewCrossAxisDirection.START] = foo - childLayout[xNewCrossAxisDirection.DIMENSION] - childStyle[xNewCrossAxisDirection.MARGIN_TRAILING] - childStyle[xNewCrossAxisDirection.MARGIN_LEADING] - addSpace;
      //  childLayout[xNewCrossAxisDirection.END] = foo - addSpace;
      //}
      alignItemsFn(child, previousChild, newCrossAxisDirection, alignSelf, remainingSpaceCrossAxisSelf, parentHeight, parentWidth, isPositionAbsolute);
      if (isPositionAbsolute) {
        _processChildren(child, xNewMainAxisDirection, xNewCrossAxisDirection, isPositionAbsolute);
      }
      else if ((childLayout.top - initialTop) !== 0 || (childLayout.left - initialLeft) !== 0) {
        _correctChildren(child, childLayout.top - initialTop, childLayout.left - initialLeft, xNewMainAxisDirection, xNewCrossAxisDirection);
      }
      if (!isPositionAbsolute){
        previousChild = child;
      }
    }
  }
}

//window.testing = [];
function layoutNode(node, previousSibling, mainAxis, shouldProcessAbsolute) {

  var nodeLayout = node.layout;
  var nodeStyle = node.style;

  var parent = node.parent;
  if (parent && parent.style.position === 'absolute' && !shouldProcessAbsolute) {
    return;
  }

  //if (testing.indexOf(node) > -1) {
  //  console.warn('duplicate layoutNode call:', node, testing.indexOf(node));
  //  console.trace();
  //}
  //testing.push(node);

  var parentLayout = parent ? parent.layout : null;
  var parentWidth = parentLayout ? parentLayout.width : document.body.clientWidth;

  var xMainAxis = AXIS[mainAxis];
  var crossAxis = mainAxis === COLUMN ? ROW : COLUMN;
  var xCrossAxis = AXIS[crossAxis];

  if (previousSibling && nodeStyle.position !== 'absolute') {
    nodeLayout[xMainAxis.START] = previousSibling.layout[xMainAxis.END] + previousSibling.style[xMainAxis.MARGIN_TRAILING];
    nodeLayout[xCrossAxis.START] = parentLayout[xCrossAxis.START];

  }
  else {
    nodeLayout.left = parent ? parentLayout.left : 0;
    nodeLayout.top = parent ? parentLayout.top : 0;
  }


  nodeLayout.left += nodeStyle.marginLeft;
  nodeLayout.top += nodeStyle.marginTop;

  nodeLayout.width = (nodeStyle.width !== UNDEFINED ? nodeStyle.width : 0) || (!nodeStyle.flexGrow ? parentWidth : 0) || 0;
  nodeLayout.height = (nodeStyle.height !== UNDEFINED ? nodeStyle.height : 0);

  nodeLayout.bottom = nodeLayout.top + nodeLayout.height;
  nodeLayout.right = nodeLayout.left + nodeLayout.width;
  if (nodeStyle.position !== 'absolute') {
    _processChildren(node, xMainAxis, xCrossAxis, false);
  }

  return node;
}

module.exports = layoutNode;
