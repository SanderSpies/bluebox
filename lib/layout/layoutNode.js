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
  if (justifyContent === 'center') {
    justifyContent = 'flex-end';
  }
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
        childLayout.left += remainingSpaceMainAxis + child.style.marginLeft;
      }
      else {
        childLayout.left = previousChild.layout.right + child.style.marginLeft + remainingSpaceMainAxis * 2;
      }
      childLayout.right = childLayout.left + childLayout.width;
    }
    else {
      if (!previousChild) {
        childLayout.top += remainingSpaceMainAxis + child.style.marginTop;
      }
      else {
        childLayout.top = previousChild.layout.bottom + child.style.marginTop + remainingSpaceMainAxis * 2;
      }
      childLayout.bottom = childLayout.top + childLayout.height;
    }
  }
  else if (justifyContent === 'space-between' && previousChild) {
    if (newFlexDirection === ROW) {
      childLayout.left = previousChild.layout.right + remainingSpaceMainAxis + previousChild.style.marginRight + child.style.marginLeft;
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
    node.layout[xMainAxis.END] += node.style[xMainAxis.START];

  }
  else if (node.style[xMainAxis.END] !== undefined && node.style[xMainAxis.DIMENSION] !== undefined) {
    node.layout[xMainAxis.START] = parentLayout[xMainAxis.END] - node.style[xMainAxis.DIMENSION] - node.style[xMainAxis.END];
  }
  else if (previousSibling) {
    nodeLayout[xMainAxis.START] = previousSibling.layout[xMainAxis.END] + previousSibling.style[xMainAxis.MARGIN_TRAILING];
  }


  if (node.style[xCrossAxis.START] !== undefined) {
    node.layout[xCrossAxis.START] += node.style[xCrossAxis.START];
    node.layout[xCrossAxis.END] += node.style[xCrossAxis.START];

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


  if (!node.layout.height && node.style.height !== undefined) {
    node.layout.height = node.style.height;
}
  if (!node.layout.width && node.style.width  !== undefined) {
    node.layout.width = node.style.width;
  }

  if (node.layout.height < (node.layout.bottom - node.layout.top)) {
    node.layout.bottom = node.layout.top + node.layout.height;
  }

  if (node.layout.width < (node.layout.right - node.layout.left)) {
    node.layout.right = node.layout.left + node.layout.width;
  }

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
    var previousChild = null;
    var totalFlexGrow = 0;
    var lineIndex = 0;
    var isFlexWrap = node.style.flexWrap === 'wrap';
    var totalChildrenSize = 0;
    var additional = 0;
    var maxCrossDimension = 0;
    var lineLengths = [];
    var crossLineLengths = [];
    var lineNrOfChildren = [];
    var currNrOfChildren = 0;
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

      var skipPrevious = false;

      if (child.style.position !== 'absolute') {

        var newSize = (child.style[xNewMainAxisDirection.DIMENSION] + child.style[xNewCrossAxisDirection.MARGIN_LEADING] + child.style[xNewCrossAxisDirection.MARGIN_TRAILING]) || 0;
        if (isFlexWrap) {

          if ((totalChildrenSize + newSize) > node.layout[xNewMainAxisDirection.DIMENSION]) {
            lineLengths.push(totalChildrenSize);
            crossLineLengths.push(maxCrossDimension);
            lineNrOfChildren.push(currNrOfChildren);
            lineIndex++;
            currNrOfChildren = 0;
            additional += maxCrossDimension;
            maxCrossDimension = 0;

            child.layout[xNewMainAxisDirection.START] = node.layout[xNewMainAxisDirection.START]  + child.style[xNewMainAxisDirection.MARGIN_LEADING];
            child.layout[xNewMainAxisDirection.END] = child.layout[xNewMainAxisDirection.START] + child.layout[xNewMainAxisDirection.DIMENSION];

            totalChildrenSize = 0; //(child.style[xNewMainAxisDirection.DIMENSION] + child.style[xNewCrossAxisDirection.MARGIN_LEADING] + child.style[xNewCrossAxisDirection.MARGIN_TRAILING]);

          }
          child.layout.lineIndex = lineIndex;
        }
        currNrOfChildren++;
        totalChildrenSize += newSize;

        child.layout[xNewCrossAxisDirection.START] += additional;
        child.layout[xNewCrossAxisDirection.END] += additional;

        if (child.layout[xMainAxis.END] > maxSize) {
          maxSize = child.layout[xMainAxis.END] + child.style[xMainAxis.MARGIN_TRAILING];
        }

        totalFlexGrow += child.style.flexGrow;

        if (skipPrevious) {
          previousChild = null;
        } else {
          previousChild = child;
        }

        if ((child.layout[xNewCrossAxisDirection.DIMENSION] + child.style[xNewCrossAxisDirection.MARGIN_TRAILING] + child.style[xNewCrossAxisDirection.MARGIN_LEADING])> maxCrossDimension) {
          maxCrossDimension = child.layout[xNewCrossAxisDirection.DIMENSION] + child.style[xNewCrossAxisDirection.MARGIN_TRAILING] + child.style[xNewCrossAxisDirection.MARGIN_LEADING];
        }
      }

    }

    additional += maxCrossDimension;
    lineLengths.push(totalChildrenSize);
    crossLineLengths.push(maxCrossDimension);
    lineNrOfChildren.push(currNrOfChildren);

    if (node.layout[xMainAxis.DIMENSION] === 0) {
      node.layout[xMainAxis.END] = maxSize + node.style[xMainAxis.PADDING_TRAILING];
      node.layout[xMainAxis.DIMENSION] = maxSize + node.style[xMainAxis.PADDING_TRAILING] - node.layout[xMainAxis.START];
    }

    var newParentHeight = node.layout.height;
    var newParentWidth = node.layout.width;


    var mainDimensionSize = newMainAxisDirection === ROW ? newParentWidth : newParentHeight;
    var crossDimensionSize = newMainAxisDirection === ROW ? newParentHeight : newParentWidth;


    // correct the children position (justifyContent, alignItems, more?!)
    var justifyContent = node.style.justifyContent;
    var alignItems = node.style.alignItems;

    var remainingSpaceMainAxis;
    previousChild = null;
    var currentLineIndex = -1;
    var currCrossSize = 0;
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      if (currentLineIndex !== child.layout.lineIndex) {
        currentLineIndex = child.layout.lineIndex;
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
      var isPositionAbsolute = child.style.position === 'absolute';

      var remainingSpaceCrossAxisSelf = crossDimensionSize - additional;
      if (totalFlexGrow) {
        flexSize(child, previousChild, totalFlexGrow, remainingSpaceMainAxis, newMainAxisDirection);
      }
      else {
        justifyContentFn(child, previousChild, newMainAxisDirection, justifyContent, remainingSpaceMainAxis, undefined, undefined, isPositionAbsolute);
      }
      if (isPositionAbsolute) {
        absolutePosition(child, previousChild, xNewMainAxisDirection, xNewCrossAxisDirection);
      }

      var alignSelf = (!isFlexWrap ? child.style.alignSelf : alignItems) || alignItems;
      var addSpace = crossLineLengths[currentLineIndex] - child.layout[xNewCrossAxisDirection.DIMENSION] - child.style[xNewCrossAxisDirection.MARGIN_TRAILING] - child.style[xNewCrossAxisDirection.MARGIN_LEADING];
      if (addSpace) {
        remainingSpaceCrossAxisSelf += addSpace;
      }
      if (alignSelf === 'center') {
        remainingSpaceCrossAxisSelf = (remainingSpaceCrossAxisSelf / 2);
      }

      alignItemsFn(child, previousChild, newCrossAxisDirection, alignSelf, remainingSpaceCrossAxisSelf, parentHeight, parentWidth, isPositionAbsolute);

      _processChildren(child, xNewMainAxisDirection, xNewCrossAxisDirection, isPositionAbsolute);
      if (!isPositionAbsolute){
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

  if (previousSibling && node.style.position !== 'absolute') {
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
  if (node.style.position !== 'absolute') {
    _processChildren(node, xMainAxis, xCrossAxis);
  }

  return node;
}

module.exports = layoutNode;
