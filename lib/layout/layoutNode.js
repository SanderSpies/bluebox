/**
 * @flow
 */
'use strict';

var CSSAlign = require('./CSSAlign');
var CSSConstants = require('./CSSConstants');
var CSSDirection = require('./CSSDirection');
var CSSFlexDirection = require('./CSSFlexDirection');
var CSSJustify = require('./CSSJustify');
var CSSPositionType = require('./CSSPositionType');
var CSSWrap = require('./CSSWrap');

var POSITION_INDEX = {
  TOP: 'top',
  LEFT: 'left',
  BOTTOM: 'bottom',
  RIGHT: 'right',
  START: 'left',
  END: 'right'
};

var DIMENSION_INDEX = {
  WIDTH: 'width',
  HEIGHT: 'height'
};

function fmaxf(a, b) {
  if (a > b) {
    return a;
  }
  return b;
}

function setLayoutPosition(node, position, value) {
  if (position === POSITION_INDEX.TOP) {
    if (value === 200) {
      debugger;
    }
    node.layout.top = value;
  }
  else if (position === POSITION_INDEX.LEFT) {
    node.layout.left = value;
  }
  else if (position === POSITION_INDEX.RIGHT) {
    node.layout.right = value;
  }
  else if (position === POSITION_INDEX.BOTTOM) {
    node.layout.bottom = value;
  }
  else {
    throw new Error('should not happen');
  }
}

function getLayoutPosition(node, position) {
  if (position === POSITION_INDEX.TOP) {
    return node.layout.top;
  }
  else if (position === POSITION_INDEX.LEFT) {
    return node.layout.left;
  }
  else if (position === POSITION_INDEX.RIGHT) {
    return node.layout.right;
  }
  else if (position === POSITION_INDEX.BOTTOM) {
    return node.layout.bottom;
  }
  else {
    throw new Error('should not happen');
  }
}

function setLayoutDimension(node, dimension, value) {
  if (dimension === DIMENSION_INDEX.WIDTH) {
    node.layout.width = value;
  }
  else if (dimension === DIMENSION_INDEX.HEIGHT) {
    node.layout.height = value;

  }
  else {
    throw new Error('should not happen');
  }

}

function getLayoutDimension(node, dimension) {
  if (dimension === DIMENSION_INDEX.WIDTH) {
    return node.layout.width;
  }
  else if (dimension === DIMENSION_INDEX.HEIGHT) {
    return node.layout.height;
  }
  throw new Error('should not happen');
}

function setLayoutDirection(node, direction) {
  node.layout.direction = direction;
}

function getStylePosition(node, position) {
  if (!node || !node.style) {
    return 0;
  }
  if (position === POSITION_INDEX.TOP) {
    return node.style.top;
  }
  else if (position === POSITION_INDEX.LEFT) {
    return node.style.left;
  }
  else if (position === POSITION_INDEX.RIGHT) {
    return node.style.right;
  }
  else if (position === POSITION_INDEX.BOTTOM) {
    return node.style.bottom;
  }
}

function getStyleDimension(node, dimension) {
  if (dimension === DIMENSION_INDEX.WIDTH) {
    return node.style.width;
  }
  else if (dimension === DIMENSION_INDEX.HEIGHT) {
    return node.style.height;
  }
  throw new Error('should not happen');
}

var leading = {
  column: POSITION_INDEX.TOP,
  'column-reverse': POSITION_INDEX.BOTTOM,
  row: POSITION_INDEX.LEFT,
  'row-reverse': POSITION_INDEX.RIGHT
};

var trailing = {
  column: POSITION_INDEX.BOTTOM,
  'column-reverse': POSITION_INDEX.TOP,
  row: POSITION_INDEX.RIGHT,
  'row-reverse': POSITION_INDEX.LEFT
};

var pos = leading;

var dim = {
  column: DIMENSION_INDEX.HEIGHT,
  'column-reverse': DIMENSION_INDEX.HEIGHT,
  row: DIMENSION_INDEX.WIDTH,
  'row-reverse': DIMENSION_INDEX.WIDTH
};

function isDimDefined(node, axis) {
  var value = getStyleDimension(node, dim[axis]);
  return value && value > 0;
}

function isPosDefined(node, position) {
  return getStylePosition(node, position) !== undefined;
}

function getPosition(node, position) {
  var pos = getStylePosition(node, position);
  return pos === undefined ? 0 : pos;
}

function getMarginTop(node) {
  return node.style.marginTop !== -1 ? node.style.marginTop : getDimension(node.style.margin).top;
}

function getMarginLeft(node) {
  return node.style.marginLeft !== -1 ? node.style.marginLeft : getDimension(node.style.margin).left;
}

function getMarginRight(node) {
  return node.style.marginRight !== -1 ? node.style.marginRight : getDimension(node.style.margin).right;
}

function getMarginBottom(node) {
  return node.style.marginBottom !== -1 ? node.style.marginBottom : getDimension(node.style.margin).bottom;
}

function getMargin(node, position) {
  if (position === POSITION_INDEX.TOP) {
    return getMarginTop(node);
  }
  else if (position === POSITION_INDEX.LEFT) {
    return getMarginLeft(node);
  }
  else if (position === POSITION_INDEX.RIGHT) {
    return getMarginRight(node);
  }
  else if (position === POSITION_INDEX.BOTTOM) {
    return getMarginBottom(node);
  }
  throw new Error('should not happen');
}

function getLeadingMargin(node, axis) {
  if (isRowDirection(axis)) {
    var leadingMargin = getMargin(node, POSITION_INDEX.START);
    if (leadingMargin !== undefined) {
      return leadingMargin;
    }
  }

  return getMargin(node, leading[axis]) || 0;
}

function getTrailingMargin(node, axis) {
  if (isRowDirection(axis)) {
    var leadingMargin = getMargin(node, POSITION_INDEX.END);
    if (leadingMargin !== undefined) {
      return leadingMargin;
    }
  }

  return getMargin(node, trailing[axis]) || 0;
}

function getDimension(obj) {
  if (!obj || obj === '') {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0};
  }

  if (typeof obj === 'number') {
    return {
      top: obj,
      right: obj,
      bottom: obj,
      left: obj
    };
  }

  var items = obj.split(' ');
  if (items.length === 1) {
    return {
      top: parseInt(items[0], 10),
      right: parseInt(items[0], 10),
      bottom: parseInt(items[0], 10),
      left: parseInt(items[0], 10)
    }
  }
  else if (items.length === 2) {
    return {
      top: parseInt(items[0], 10),
      right: parseInt(items[1], 10),
      bottom: parseInt(items[0], 10),
      left: parseInt(items[1], 10)
    }
  }
  else if (items.length === 3) {
    return {
      top: parseInt(items[0], 10),
      right: parseInt(items[1], 10),
      bottom: parseInt(items[2], 10),
      left: parseInt(items[1], 10)
    }
  }
  else if (items.length === 4) {
    return {
      top: parseInt(items[0], 10),
      right: parseInt(items[1], 10),
      bottom: parseInt(items[2], 10),
      left: parseInt(items[3], 10)
    }
  }

}

function getPaddingTop(node) {
  return  node.style.paddingTop !== -1 ? node.style.paddingTop : getDimension(node.style.padding).top;
}

function getPaddingBottom(node) {
  return  node.style.paddingBottom !== -1 ? node.style.paddingBottom : getDimension(node.style.padding).bottom;
}

function getPaddingLeft(node) {
  return  node.style.paddingLeft !== -1 ? node.style.paddingLeft : getDimension(node.style.padding).left;
}

function getPaddingRight(node) {
  return  node.style.paddingRight !== -1 ? node.style.paddingRight : getDimension(node.style.padding).right;
}

function getPadding(node, position) {
  if (position === POSITION_INDEX.TOP) {
    return getPaddingTop(node);
  }
  else if (position === POSITION_INDEX.LEFT) {
    return getPaddingLeft(node);
  }
  else if (position === POSITION_INDEX.RIGHT) {
    return getPaddingRight(node);
  }
  else if (position === POSITION_INDEX.BOTTOM) {
    return getPaddingBottom(node);
  }
  throw new Error('should not happen');
}

function getLeadingPadding(node, axis) {
  if (isRowDirection(axis)) {
    var leadingPadding = getPadding(node, POSITION_INDEX.START);
    if (leadingPadding !== undefined) {
      return leadingPadding;
    }
  }

  return getPadding(node, leading[axis]) || 0;
}

function getTrailingPadding(node, axis) {
  if (isRowDirection(axis)) {
    var trailingPadding = getPaddingRight(node);
    if (trailingPadding !== undefined) {
      return trailingPadding;
    }
  }

  return getPadding(node, trailing[axis]) || 0;
}

function getBorderTop(node) {
  return  node.style.borderTop !== -1 ? node.style.borderTop : getDimension(node.style.border).top;
}

function getBorderBottom(node) {
  return  node.style.borderBottom !== -1 ? node.style.borderBottom : getDimension(node.style.border).bottom;
}

function getBorderLeft(node) {
  return  node.style.borderLeft !== -1 ? node.style.borderLeft : getDimension(node.style.border).left;
}

function getBorderRight(node) {
  return  node.style.borderRight !== -1 ? node.style.borderRight : getDimension(node.style.border).right;
}

function getBorder(node, position) {
  if (position === POSITION_INDEX.TOP) {
    return getBorderTop(node);
  }
  else if (position === POSITION_INDEX.BOTTOM) {
    return getBorderBottom(node);
  }
  else if (position === POSITION_INDEX.LEFT) {
    return getBorderLeft(node);
  }
  else if (position === POSITION_INDEX.RIGHT) {
    return getBorderRight(node);
  }
}

function getLeadingBorder(node, axis) {
  if (isRowDirection(axis)) {
    var leadingBorder = getBorderLeft(node);
    if (leadingBorder !== undefined) {
      return leadingBorder;
    }
  }
  return getBorder(node, leading[axis]) || 0;
}

function getTrailingBorder(node, axis) {
  if (isRowDirection(axis)) {
    var trailingBorder = getBorderRight(node);
    if (trailingBorder !== undefined) {
      return trailingBorder;
    }
  }

  return getBorder(node, trailing[axis]) || 0;
}

function getLeadingPaddingAndBorder(node, axis) {
  return getLeadingPadding(node, axis) + getLeadingBorder(node, axis);
}

function getTrailingPaddingAndBorder(node, axis) {
  return getTrailingPadding(node, axis) + getTrailingBorder(node, axis);
}

function getBorderAxis(node, axis) {
  return getLeadingBorder(node, axis) + getTrailingBorder(node, axis);
}

function getMarginAxis(node, axis) {
  return getLeadingMargin(node, axis) + getTrailingMargin(node, axis);
}

function getPaddingAndBorderAxis(node, axis) {
  return getLeadingPaddingAndBorder(node, axis) + getTrailingPaddingAndBorder(node, axis);
}

function boundAxis(node, axis, value) {
  var min = undefined;
  var max = undefined;
  if ( node.style) {
    if (isColumnDirection(axis)) {
      min = node.style.minHeight;
      max = node.style.maxHeight;
    }
    else if (isRowDirection(axis)) {
      min = node.style.minWidth;
      max = node.style.maxWidth;
    }
  }

  var boundValue = value;

  if (max !== undefined && max > 0 && boundValue > max) {
    boundValue = max;
  }

  if (min !== undefined && min > 0 && boundValue < min) {
    boundValue = min;
  }

  return boundValue;
}

function setDimensionFromStyle(node, axis) {
  if (getLayoutDimension(node, dim[axis]) !== undefined) {
    return;
  }

  if (!isDimDefined(node, axis)) {
    return;
  }

  var maxLayoutDimension = fmaxf(boundAxis(node, axis, getStyleDimension(node, dim[axis])),
    getPaddingAndBorderAxis(node, axis));
  setLayoutDimension(node, dim[axis], maxLayoutDimension);
}

function setTrailingPosition(node, child, axis) {
  setLayoutPosition(node,
    trailing[axis],
    (getLayoutDimension(node, dim[axis]) || 0) -
    (getLayoutDimension(child, dim[axis]) || 0) -
    getLayoutPosition(child, pos[axis]));
}

function getRelativePosition(node, axis) {
  var lead = getStylePosition(node, leading[axis]);
  if (lead !== undefined) {
    return lead;
  }
  return -getPosition(node, trailing[axis]);
}

function getFlex(node) {
  return  node.style ? node.style.flex : undefined;
}

function isRowDirection(flexDirection) {
  return flexDirection === CSSFlexDirection.ROW || flexDirection === CSSFlexDirection.ROW_REVERSE;
}

function isColumnDirection(flexDirection) {
  return flexDirection === CSSFlexDirection.COLUMN || flexDirection === CSSFlexDirection.COLUMN_REVERSE;
}

function resolveAxis(axis, direction) {
  if (direction === CSSDirection.RTL) {
    if (axis === CSSFlexDirection.ROW) {
      return CSSFlexDirection.ROW_REVERSE;
    }
    else if (axis === CSSFlexDirection.ROW_REVERSE) {
      return CSSFlexDirection.ROW;
    }
  }
  return axis;
}

function resolveDirection(node, parentDirection) {
  var direction = parentDirection || CSSDirection.INHERIT;
    var style = node.style;
    if ('direction' in style) {
      direction = style.direction;
    }

  return direction;
}

function getFlexDirection(node) {
  return  node.style && 'flexDirection' in node.style ? node.style.flexDirection : CSSFlexDirection.COLUMN;
}

function getCrossFlexDirection(flexDirection, direction) {
  if (isColumnDirection(flexDirection)) {
    return resolveAxis(CSSFlexDirection.ROW, direction);
  }
  return CSSFlexDirection.COLUMN;
}

function getPositionType(node) {
  return  node.style && 'position' in node.style ? node.style.position : 'relative'
}

function getAlignItem(node, child) {
  if (child.style.alignSelf !== CSSAlign.AUTO) {
    return child.style.alignSelf;
  }
  return  node.style ? node.style.alignItems : 'stretch';
}

function getAlignContent(node) {
  return  node.style ? node.style.alignContent : 'flex-start';
}

function getJustifyContent(node) {
  return  node.style ? node.style.justifyContent : 'flex-start';
}

function isFlexWrap(node) {
  return  node.style && node.style.flexWrap === CSSWrap.WRAP;
}

function isFlex(node) {
  return getPositionType(node) === CSSPositionType.RELATIVE && getFlex(node) > 0;
}

function isMeasureDefined(node) {
  // WAT
}

function getDimWithMargin(node, axis) {
  return getLayoutDimension(node, dim[axis]) +
    getLeadingMargin(node, axis) +
    getTrailingMargin(node, axis);
}

function cloneObject(node) {
  var result = {};
  var keys = Object.keys(node);
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    result[key] = node[key];
  }
  return result;
}




function getChildCount(node) {
  return node.children.length;
}

function getChildAt(node, i) {
  return node.children[i];
}

function layoutNode(node, oldNode, parentWidthChanged, parentMaxWidth, parentMaxHeight, parentDirection) {

    node.layout.width = undefined;
    node.layout.height = undefined;
    node.layout.top = 0;
    node.layout.left = 0;
    node.layout.right = 0;
    node.layout.bottom = 0;

    var hasOnlyTextChildren = true;
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      if (typeof child !== 'string') {
        hasOnlyTextChildren = false;
        break;
      }
    }


    // alright, we really need to recalculate the layout...
    var direction = resolveDirection(node, parentDirection);
    var mainAxis = resolveAxis(getFlexDirection(node), direction);
    var crossAxis = getCrossFlexDirection(mainAxis, direction);
    var resolvedRowAxis = resolveAxis(CSSFlexDirection.ROW, direction);

    setDimensionFromStyle(node, mainAxis);
    setDimensionFromStyle(node, crossAxis);

    setLayoutDirection(node, direction);

    // The position is set by the parent, but we need to complete it with a
    // delta composed of the margin and left/top/right/bottom
    var leadingMainAxis = leading[mainAxis];
    var leadingCrossAxis = leading[crossAxis];
    var trailingMainAxis = trailing[mainAxis];
    var trailingCrossAxis = trailing[crossAxis];
    var mainRelativePosition = getRelativePosition(node, mainAxis);
    var crossRelativePosition = getRelativePosition(node, crossAxis);
    setLayoutPosition(node, leadingMainAxis, getLayoutPosition(node, leadingMainAxis) + getLeadingMargin(node, mainAxis) +
    mainRelativePosition);
    setLayoutPosition(node, trailingMainAxis, getLayoutPosition(node, trailingMainAxis) + getTrailingMargin(node, mainAxis) +
    mainRelativePosition);
    setLayoutPosition(node, leadingCrossAxis, getLayoutPosition(node, leadingCrossAxis) + getLeadingMargin(node, crossAxis) +
    crossRelativePosition);
    setLayoutPosition(node, trailingCrossAxis, getLayoutPosition(node, trailingCrossAxis) + getTrailingMargin(node, crossAxis) +
    crossRelativePosition);

    //if (isMeasureDefined(node)) {
    var width = CSSConstants.UNDEFINED;
    if (isDimDefined(node, resolvedRowAxis)) {
      width = node.style.width;
    }
    else if (getLayoutDimension(node, dim[resolvedRowAxis]) !== undefined) {
      width = getLayoutDimension(node, dim[resolvedRowAxis]);
    }
    else {
      width = parentMaxWidth -
        getMarginAxis(node, resolvedRowAxis);
    }
    width -= getPaddingAndBorderAxis(node, resolvedRowAxis);

    // We only need to give a dimension for the text if we haven't got any
    // for it computed yet. It can either be from the style attribute or because
    // the element is flexible.
    var isRowUndefined = !isDimDefined(node, resolvedRowAxis) &&
      getLayoutDimension(node, dim[resolvedRowAxis]) === undefined;
    var isColumnUndefined = !isDimDefined(node, CSSFlexDirection.COLUMN) &&
      getLayoutDimension(node, dim[CSSFlexDirection.COLUMN]) === undefined;

    // Let's not measure the text if we already know both dimensions
    if (isRowUndefined || isColumnUndefined) {

      if (isRowUndefined) {
        node.layout.width = width +
          getPaddingAndBorderAxis(node, resolvedRowAxis);
      }
    }

    // }

    var i;
    var ii;
    var child;
    var axis;

    // Pre-fill some dimensions straight from the parent
    //console.log('A loop through children:', node.children);
    if (!hasOnlyTextChildren) {
      var childCount = getChildCount(node);
      for (i = 0; i < childCount; ++i) {
        child = getChildAt(node, i);
        if (typeof child === 'string') {
          continue;
        }
        // Pre-fill cross axis dimensions when the child is using stretch before
        // we call the recursive layout pass
        var crossAxisDim = dim[crossAxis];
        var layoutDimensionCrossAxis = getLayoutDimension(node, crossAxisDim);
        var childPositionType = getPositionType(child);
        if (getAlignItem(node, child) === CSSAlign.STRETCH &&
          childPositionType === CSSPositionType.RELATIVE &&
          layoutDimensionCrossAxis !== undefined && !isDimDefined(child, crossAxis)) {
          setLayoutDimension(child, crossAxisDim, fmaxf(
            boundAxis(child, crossAxis, layoutDimensionCrossAxis -
            getPaddingAndBorderAxis(node, crossAxis) -
            getMarginAxis(child, crossAxis)),
            // You never want to go smaller than padding
            getPaddingAndBorderAxis(child, crossAxis)
          ));
        }
        else if (childPositionType === CSSPositionType.ABSOLUTE) {
          // Pre-fill dimensions when using absolute position and both offsets for the axis are defined (either both
          // left and right or top and bottom).
          for (ii = 0; ii < 2; ii++) {
            axis = (ii !== 0) ? CSSFlexDirection.ROW : CSSFlexDirection.COLUMN;
            if (getLayoutDimension(node, dim[axis]) !== undefined && !isDimDefined(child, axis) &&
              isPosDefined(child, leading[axis]) &&
              isPosDefined(child, trailing[axis])) {
              setLayoutDimension(child, dim[axis], fmaxf(
                boundAxis(child, axis, getLayoutDimension(node, dim[axis]) -
                getPaddingAndBorderAxis(node, axis) -
                getMarginAxis(child, axis) -
                getPosition(child, leading[axis]) -
                getPosition(child, trailing[axis])),
                // You never want to go smaller than padding
                getPaddingAndBorderAxis(child, axis)
              ));
            }
          }
        }
      }
    }
    var definedMainDim = CSSConstants.UNDEFINED;
    if (getLayoutDimension(node, dim[mainAxis]) !== undefined) {
      definedMainDim = getLayoutDimension(node, dim[mainAxis]) -
      getPaddingAndBorderAxis(node, mainAxis);
    }

    // We want to execute the next two loops one per line with flex-wrap
    var startLine = 0;
    var endLine = 0;
    // var nextOffset = 0;
    var alreadyComputedNextLayout = 0;
    // We aggregate the total dimensions of the container in those two variables
    var linesCrossDim = 0;
    var linesMainDim = 0;
    var linesCount = 0;

    if (!hasOnlyTextChildren) {
      while (endLine < getChildCount(node)) {

        // <Loop A> Layout non flexible children and count children by type

        // mainContentDim is accumulation of the dimensions and margin of all the
        // non flexible children. This will be used in order to either set the
        // dimensions of the node if none already exist, or to compute the
        // remaining space left for the flexible children.
        var mainContentDim = 0;

        // There are three kind of children, non flexible, flexible and absolute.
        // We need to know how many there are in order to distribute the space.
        var flexibleChildrenCount = 0;
        var totalFlexible = 0;
        var nonFlexibleChildrenCount = 0;

        var maxWidth;
        for (i = startLine; i < getChildCount(node); ++i) {
          child = getChildAt(node, i);
          if (typeof child === 'string') {
            endLine = i + 1;
            break;
          }
          var nextContentDim = 0;

          // It only makes sense to consider a child flexible if we have a computed
          // dimension for the node.
          if (getLayoutDimension(node, dim[mainAxis]) !== undefined && isFlex(child)) {
            flexibleChildrenCount++;
            totalFlexible = totalFlexible + getFlex(child);

            // Even if we don't know its exact size yet, we already know the padding,
            // border and margin. We'll use this partial information, which represents
            // the smallest possible size for the child, to compute the remaining
            // available space.
            nextContentDim = getPaddingAndBorderAxis(child, mainAxis) +
            getMarginAxis(child, mainAxis);

          }
          else {
            maxWidth = CSSConstants.UNDEFINED;
            if (!isRowDirection(mainAxis)) {
              maxWidth = parentMaxWidth -
              getMarginAxis(node, resolvedRowAxis) -
              getPaddingAndBorderAxis(node, resolvedRowAxis);

              if (isDimDefined(node, resolvedRowAxis)) {
                maxWidth = getLayoutDimension(node, dim[resolvedRowAxis]) -
                getPaddingAndBorderAxis(node, resolvedRowAxis);
              }
            }
            var maxHeight = 1; // TODO
            // This is the main recursive call. We layout non flexible children.
            if (alreadyComputedNextLayout === 0) {
              node.children[i] = layoutNode(child, oldNode && oldNode.children ? getChildAt(oldNode, i) : null, oldNode ? node.layout.width !== oldNode.layout.width : true, maxWidth, maxHeight, direction);
            }

            // Absolute positioned elements do not take part of the layout, so we
            // don't use them to compute mainContentDim
            if (getPositionType(child) === CSSPositionType.RELATIVE) {
              nonFlexibleChildrenCount++;
              // At this point we know the final size and margin of the element.
              nextContentDim = getDimWithMargin(child, mainAxis);
            }
          }

          // The element we are about to add would make us go to the next line
          if (isFlexWrap(node) &&
            getLayoutDimension(node, dim[mainAxis]) !== undefined &&
            mainContentDim + nextContentDim > definedMainDim &&
              // If there's only one element, then it's bigger than the content
              // and needs its own line
            i !== startLine) {
            nonFlexibleChildrenCount--;
            alreadyComputedNextLayout = 1;
            break;
          }
          alreadyComputedNextLayout = 0;
          mainContentDim = mainContentDim + nextContentDim;
          endLine = i + 1;
        }

        // <Loop B> Layout flexible children and allocate empty space

        // In order to position the elements in the main axis, we have two
        // controls. The space between the beginning and the first element
        // and the space between each two elements.
        var leadingMainDim = 0;
        var betweenMainDim = 0;

        // The remaining available space that needs to be allocated
        var remainingMainDim = 0;
        if (getLayoutDimension(node, dim[mainAxis]) !== undefined) {
          remainingMainDim = definedMainDim - mainContentDim;
        }
        else {
          remainingMainDim = fmaxf(mainContentDim, 0) - mainContentDim;
        }

        // If there are flexible children in the mix, they are going to fill the
        // remaining space
        if (flexibleChildrenCount !== 0) {
          var flexibleMainDim = remainingMainDim / totalFlexible;
          var baseMainDim;
          var boundMainDim;

          // Iterate over every child in the axis. If the flex share of remaining
          // space doesn't meet min/max bounds, remove this child from flex
          // calculations.
          for (i = startLine; i < endLine; ++i) {
            child = getChildAt(node, i);

            if (isFlex(child)) {
              baseMainDim = flexibleMainDim * getFlex(child) +
              getPaddingAndBorderAxis(child, mainAxis);
              boundMainDim = boundAxis(child, mainAxis, baseMainDim);

              if (baseMainDim !== boundMainDim) {
                remainingMainDim -= boundMainDim;
                totalFlexible -= getFlex(child);
              }
            }
          }
          flexibleMainDim = remainingMainDim / totalFlexible;

          // The non flexible children can overflow the container, in this case
          // we should just assume that there is no space available.
          if (flexibleMainDim < 0) {
            flexibleMainDim = 0;
          }
          // We iterate over the full array and only apply the action on flexible
          // children. This is faster than actually allocating a new array that
          // contains only flexible children.
          for (i = startLine; i < endLine; ++i) {
            child = getChildAt(node, i);

            if (typeof child === 'string') {
              continue;
            }

            if (isFlex(child)) {
              // At this point we know the final size of the element in the main
              // dimension
              setLayoutDimension(child, dim[mainAxis], boundAxis(child, mainAxis,
                flexibleMainDim * getFlex(child) + getPaddingAndBorderAxis(child, mainAxis)
              ));

              maxWidth = CSSConstants.UNDEFINED;
              if (isDimDefined(node, resolvedRowAxis)) {
                maxWidth = getLayoutDimension(node, dim[resolvedRowAxis]) -
                getPaddingAndBorderAxis(node, resolvedRowAxis);
              }
              else if (!isRowDirection(mainAxis)) {
                maxWidth = parentMaxWidth -
                getMarginAxis(node, resolvedRowAxis) -
                getPaddingAndBorderAxis(node, resolvedRowAxis);
              }

              // And we recursively call the layout algorithm for this child
              //debugger;
              //var top = node.layout.top;
              //var left = node.layout.left;

              node.children[i] = layoutNode(child, oldNode ? getChildAt(oldNode, i) : null, oldNode ? node.layout.width !== oldNode.layout.width : true, maxWidth, maxHeight, direction);
            }
          }

          // We use justifyContent to figure out how to allocate the remaining
          // space available
        }
        else {
          var justifyContent = getJustifyContent(node);
          if (justifyContent === CSSJustify.CENTER) {
            leadingMainDim = remainingMainDim / 2;
          }
          else if (justifyContent === CSSJustify.FLEX_END) {
            leadingMainDim = remainingMainDim;
          }
          else if (justifyContent === CSSJustify.SPACE_BETWEEN) {
            remainingMainDim = fmaxf(remainingMainDim, 0);
            if (flexibleChildrenCount + nonFlexibleChildrenCount - 1 !== 0) {
              betweenMainDim = remainingMainDim /
              (flexibleChildrenCount + nonFlexibleChildrenCount - 1);
            }
            else {
              betweenMainDim = 0;
            }
          }
          else if (justifyContent === CSSJustify.SPACE_AROUND) {
            // Space on the edges is half of the space between elements
            betweenMainDim = remainingMainDim /
            (flexibleChildrenCount + nonFlexibleChildrenCount);
            leadingMainDim = betweenMainDim / 2;
          }
        }

        // <Loop C> Position elements in the main axis and compute dimensions

        // At this point, all the children have their dimensions set. We need to
        // find their position. In order to do that, we accumulate data in
        // variables that are also useful to compute the total dimensions of the
        // container!
        var crossDim = 0;
        //debugger;
        var mainDim = leadingMainDim +
          getLeadingPaddingAndBorder(node, mainAxis);

        //console.log('mainDim:', mainDim);

        for (i = startLine; i < endLine; ++i) {
          child = getChildAt(node, i);
          if (typeof child === 'string') {
            break;
          }
          child.lineIndex = linesCount;

          var leadingMainAxisChild = leading[mainAxis];
          var posMainAxisChild = pos[mainAxis];
          var posTypeChild = getPositionType(child);
          if (posTypeChild === CSSPositionType.ABSOLUTE &&
            isPosDefined(child, leadingMainAxisChild)) {
            // In case the child is position absolute and has left/top being
            // defined, we override the position to whatever the user said
            // (and margin/border).
            setLayoutPosition(child, posMainAxisChild, getPosition(child, leadingMainAxisChild) +
            getLeadingBorder(node, mainAxis) +
            getLeadingMargin(child, mainAxis));
          }
          else {
            // If the child is position absolute (without top/left) or relative,
            // we put it at the current accumulated offset.
            setLayoutPosition(child, posMainAxisChild, getLayoutPosition(child, posMainAxisChild) + mainDim);

            // Define the trailing position accordingly.
            if (getLayoutDimension(node, dim[mainAxis]) !== undefined) {
              setTrailingPosition(node, child, mainAxis);
            }
          }

          // Now that we placed the element, we need to update the variables
          // We only need to do that for relative elements. Absolute elements
          // do not take part in that phase.
          if (posTypeChild === CSSPositionType.RELATIVE) {
            //console.log('new main dim:', mainDim, betweenMainDim, getDimWithMargin(child, mainAxis));
            // The main dimension is the sum of all the elements dimension plus
            // the spacing.
            mainDim = mainDim + betweenMainDim + getDimWithMargin(child, mainAxis);
            // The cross dimension is the max of the elements dimension since there
            // can only be one element in that cross dimension.
            crossDim = fmaxf(crossDim, boundAxis(child, crossAxis, getDimWithMargin(child, crossAxis)));
          }
        }

        var containerCrossAxis = getLayoutDimension(node, dim[crossAxis]);
        if (containerCrossAxis === undefined) {
          containerCrossAxis = fmaxf(
            // For the cross dim, we add both sides at the end because the value
            // is aggregate via a max function. Intermediate negative values
            // can mess this computation otherwise
            boundAxis(node, crossAxis, crossDim + getPaddingAndBorderAxis(node, crossAxis)),
            getPaddingAndBorderAxis(node, crossAxis)
          );
        }

        // <Loop D> Position elements in the cross axis

        for (i = startLine; i < endLine; ++i) {
          child = getChildAt(node, i);

          if (typeof child === 'string') {
            break;
          }
          var childPosition = getPositionType(child);
          if (childPosition === CSSPositionType.ABSOLUTE &&
            isPosDefined(child, leading[crossAxis])) {
            // In case the child is absolutely positionned and has a
            // top/left/bottom/right being set, we override all the previously
            // computed positions to set it correctly.
            setLayoutPosition(child, pos[crossAxis], getPosition(child, leading[crossAxis]) +
            getLeadingBorder(node, crossAxis) +
            getLeadingMargin(child, crossAxis));

          }
          else {
            var leadingCrossDim = getLeadingPaddingAndBorder(node, crossAxis);

            // For a relative children, we're either using alignItems (parent) or
            // alignSelf (child) in order to determine the position in the cross axis
            if (childPosition === CSSPositionType.RELATIVE) {
              var alignItem = getAlignItem(node, child);
              if (alignItem === CSSAlign.STRETCH) {
                // You can only stretch if the dimension has not already been set
                // previously.
                if (!isDimDefined(child, crossAxis)) {
                  setLayoutDimension(child, dim[crossAxis], fmaxf(
                    boundAxis(child, crossAxis, containerCrossAxis -
                    getPaddingAndBorderAxis(node, crossAxis) -
                    getMarginAxis(child, crossAxis)),
                    // You never want to go smaller than padding
                    getPaddingAndBorderAxis(child, crossAxis)
                  ));
                }
              }
              else if (alignItem !== CSSAlign.FLEX_START) {
                // The remaining space between the parent dimensions+padding and child
                // dimensions+margin.
                var remainingCrossDim = containerCrossAxis -
                  getPaddingAndBorderAxis(node, crossAxis) -
                  getDimWithMargin(child, crossAxis);

                if (alignItem === CSSAlign.CENTER) {
                  leadingCrossDim = leadingCrossDim + remainingCrossDim / 2;
                }
                else { // CSSAlign.FLEX_END
                  leadingCrossDim = leadingCrossDim + remainingCrossDim;
                }
              }
            }

            // And we apply the position
            setLayoutPosition(child, pos[crossAxis], getLayoutPosition(child, pos[crossAxis]) + linesCrossDim + leadingCrossDim);

            // Define the trailing position accordingly.
            if (getLayoutDimension(node, dim[crossAxis]) !== undefined) {
              setTrailingPosition(node, child, crossAxis);
            }
          }
        }

        linesCrossDim = linesCrossDim + crossDim;
        linesMainDim = fmaxf(linesMainDim, mainDim);
        linesCount = linesCount + 1;
        startLine = endLine;
      }
    }
    // <Loop E>

    //
    // Note(prenaux): More than one line, we need to layout the crossAxis
    // according to alignContent.
    //
    // Note that we could probably remove <Loop D> and handle the one line case
    // here too, but for the moment this is safer since it won't interfere with
    // previously working code.
    //
    // See specs:
    // http://www.w3.org/TR/2012/CR-css3-flexbox-20120918/#layout-algorithm
    // section 9.4
    //
    if (linesCount > 1 &&
      getLayoutDimension(node, dim[crossAxis]) !== undefined) {
      var nodeCrossAxisInnerSize = getLayoutDimension(node, dim[crossAxis]) -
        getPaddingAndBorderAxis(node, crossAxis);
      var remainingAlignContentDim = nodeCrossAxisInnerSize - linesCrossDim;

      var crossDimLead = 0;
      var currentLead = getLeadingPaddingAndBorder(node, crossAxis);

      var alignContent = getAlignContent(node);
      if (alignContent === CSSAlign.FLEX_END) {
        currentLead = currentLead + remainingAlignContentDim;
      }
      else if (alignContent === CSSAlign.CENTER) {
        currentLead = currentLead + remainingAlignContentDim / 2;
      }
      else if (alignContent === CSSAlign.STRETCH) {
        if (nodeCrossAxisInnerSize > linesCrossDim) {
          crossDimLead = (remainingAlignContentDim / linesCount);
        }
      }

      var endIndex = 0;
      for (i = 0; i < linesCount; ++i) {
        var startIndex = endIndex;

        // compute the line's height and find the endIndex
        var lineHeight = 0;
        //console.log('D loop through children:', node.children);
        if (!hasOnlyTextChildren) {
          for (ii = startIndex; ii < getChildCount(node); ++ii) {
            child = getChildAt(node, ii);

            if (getPositionType(child) !== CSSPositionType.RELATIVE) {
              continue;
            }
            if (child.lineIndex !== i) {
              break;
            }
            if (getLayoutDimension(child, dim[crossAxis]) !== undefined) {
              lineHeight = fmaxf(
                lineHeight,
                getLayoutDimension(child, dim[crossAxis]) + getMarginAxis(child, crossAxis)
              );
            }
          }
        }
        endIndex = ii;
        lineHeight = lineHeight + crossDimLead;

        for (ii = startIndex; ii < endIndex; ++ii) {
          child = getChildAt(node, ii);

          if (typeof child === 'string') {
            continue;
          }

          if (getPositionType(child) !== CSSPositionType.RELATIVE) {
            continue;
          }

          var alignContentAlignItem = getAlignItem(node, child);
          if (alignContentAlignItem === CSSAlign.FLEX_START) {
            setLayoutPosition(child, pos[crossAxis], currentLead + getLeadingMargin(child, crossAxis));
          }
          else if (alignContentAlignItem === CSSAlign.FLEX_END) {
            setLayoutPosition(child, pos[crossAxis], currentLead + lineHeight - getTrailingMargin(child, crossAxis) - getLayoutDimension(child, dim[crossAxis]));
          }
          else if (alignContentAlignItem === CSSAlign.CENTER) {
            var childHeight = getLayoutDimension(child, dim[crossAxis]);
            setLayoutPosition(child, pos[crossAxis], currentLead + (lineHeight - childHeight) / 2);
          }
          else if (alignContentAlignItem === CSSAlign.STRETCH) {
            setLayoutPosition(child, pos[crossAxis], currentLead + getLeadingMargin(child, crossAxis));
            // TODO(prenaux): Correctly set the height of items with undefined
            //                (auto) crossAxis dimension.
          }
        }

        currentLead = currentLead + lineHeight;
      }
    }

    var needsMainTrailingPos = false;
    var needsCrossTrailingPos = false;

    // If the user didn't specify a width or height, and it has not been set
    // by the container, then we set it via the children.

    if (getLayoutDimension(node, dim[mainAxis]) === undefined) {
      //console.log('A');
      setLayoutDimension(node, dim[mainAxis], fmaxf(
        // We're missing the last padding at this point to get the final
        // dimension
        boundAxis(node, mainAxis, linesMainDim + getTrailingPaddingAndBorder(node, mainAxis)),
        // We can never assign a width smaller than the padding and borders
        getPaddingAndBorderAxis(node, mainAxis)
      ));

      needsMainTrailingPos = true;
    }

    if (getLayoutDimension(node, dim[crossAxis]) === undefined) {
      setLayoutDimension(node, dim[crossAxis], fmaxf(
        // For the cross dim, we add both sides at the end because the value
        // is aggregate via a max function. Intermediate negative values
        // can mess this computation otherwise
        boundAxis(node, crossAxis, linesCrossDim + getPaddingAndBorderAxis(node, crossAxis)),
        getPaddingAndBorderAxis(node, crossAxis)
      ));

      needsCrossTrailingPos = true;
    }
    // <Loop F> Set trailing position if necessary
    if ((needsMainTrailingPos || needsCrossTrailingPos) && !hasOnlyTextChildren) {
      //console.log('E loop through children:', node.children);
      for (i = 0; i < getChildCount(node); ++i) {
        child = getChildAt(node, i);
        if (typeof child === 'string') {
          continue;
        }
        if (needsMainTrailingPos) {
          setTrailingPosition(node, child, mainAxis);
        }

        if (needsCrossTrailingPos) {
          setTrailingPosition(node, child, crossAxis);
        }
      }
    }

    // <Loop G> Calculate dimensions for absolutely positioned elements
    // console.log('F loop through children:', node.children);
    if (!hasOnlyTextChildren) {
      for (i = 0; i < getChildCount(node); ++i) {
        child = getChildAt(node, i);

        if (getPositionType(child) === CSSPositionType.ABSOLUTE) {
          // Pre-fill dimensions when using absolute position and both offsets for the axis are defined (either both
          // left and right or top and bottom).
          for (ii = 0; ii < 2; ii++) {
            axis = (ii !== 0) ? CSSFlexDirection.ROW : CSSFlexDirection.COLUMN;
            if (getLayoutDimension(node, dim[axis]) !== undefined && !isDimDefined(child, axis) &&
              isPosDefined(child, leading[axis]) &&
              isPosDefined(child, trailing[axis])) {
              setLayoutDimension(child, dim[axis], fmaxf(
                boundAxis(child, axis, getLayoutDimension(node, dim[axis]) -
                  getBorderAxis(node, axis) -
                  getMarginAxis(child, axis) -
                  getPosition(child, leading[axis]) -
                  getPosition(child, trailing[axis])
                ),
                // You never want to go smaller than padding
                getPaddingAndBorderAxis(child, axis)
              ));
            }
          }
          for (ii = 0; ii < 2; ii++) {
            axis = (ii !== 0) ? CSSFlexDirection.ROW : CSSFlexDirection.COLUMN;
            if (isPosDefined(child, trailing[axis]) && !isPosDefined(child, leading[axis])) {
              setLayoutPosition(child, leading[axis], getLayoutDimension(node, dim[axis]) -
              getLayoutDimension(child, dim[axis]) -
              getPosition(child, trailing[axis]));
            }
          }
        }
      }
    }


  return node;
}

module.exports = layoutNode;
