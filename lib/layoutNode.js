/**
 * @flow
 */
'use strict';

var CSSAlign = require('./layout/CSSAlign');
var CSSConstants = require('./layout/CSSConstants');
var CSSDirection = require('./layout/CSSDirection');
var CSSFlexDirection = require('./layout/CSSFlexDirection');
var CSSJustify = require('./layout/CSSJustify');
var CSSPositionType = require('./layout/CSSPositionType');
var CSSWrap = require('./layout/CSSWrap');

var POSITION_INDEX = {
  TOP: 200,
  LEFT: 201,
  BOTTOM: 202,
  RIGHT: 203,
  START: 204,
  END: 205
};

var DIMENSION_INDEX = {
  WIDTH: 100,
  HEIGHT: 101
};

function setLayoutPosition(node, position, value) {
  if (position === POSITION_INDEX.TOP) {
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
}

function setLayoutDimension(node, dimension, value) {
  if (dimension === DIMENSION_INDEX.WIDTH) {
    node.layout.width = value;
  }
  node.layout.height = value;
}

function getLayoutDimension(node, dimension) {
  var size = node.layout.height;
  if (dimension === DIMENSION_INDEX.WIDTH) {
    size = node.layout.width;
  }
  return size;
}

function setLayoutDirection(node, direction) {
  node.layout.direction = direction;
}

function getStylePosition(node, position) {
  if (!node || !node.props || !node.props.style) {
    return undefined;
  }
  if (position === POSITION_INDEX.TOP) {
    return node.props.style.top;
  }
  else if (position === POSITION_INDEX.LEFT) {
    return node.props.style.left;
  }
  else if (position === POSITION_INDEX.RIGHT) {
    return node.props.style.right;
  }
  else if (position === POSITION_INDEX.BOTTOM) {
    return node.props.style.bottom;
  }
}

function getStyleDimension(node, dimension) {
  if (dimension === DIMENSION_INDEX.WIDTH) {
    return node.props && node.props.style ? node.props.style.width : undefined;
  }
  return node.props && node.props.style ? node.props.style.height  : undefined;
}

function getLeading(axis) {
  if (axis === CSSFlexDirection.COLUMN) {
    return POSITION_INDEX.TOP;
  }
  else if (axis === CSSFlexDirection.COLUMN_REVERSE) {
    return POSITION_INDEX.BOTTOM;
  }
  else if(axis === CSSFlexDirection.ROW) {
    return POSITION_INDEX.LEFT;
  }
  else if (axis === CSSFlexDirection.ROW_REVERSE) {
    return POSITION_INDEX.RIGHT;
  }
}

function getTrailing(axis) {
  if (axis === CSSFlexDirection.COLUMN) {
    return POSITION_INDEX.BOTTOM;
  }
  else if (axis === CSSFlexDirection.COLUMN_REVERSE) {
    return POSITION_INDEX.TOP;
  }
  else if(axis === CSSFlexDirection.ROW) {
    return POSITION_INDEX.RIGHT;
  }
  else if (axis === CSSFlexDirection.ROW_REVERSE) {
    return POSITION_INDEX.LEFT;
  }
}

function getPos(axis) {
  if (axis === CSSFlexDirection.COLUMN) {
    return POSITION_INDEX.TOP;
  }
  else if (axis === CSSFlexDirection.COLUMN_REVERSE) {
    return POSITION_INDEX.BOTTOM;
  }
  else if(axis === CSSFlexDirection.ROW) {
    return POSITION_INDEX.LEFT;
  }
  else if (axis === CSSFlexDirection.ROW_REVERSE) {
    return POSITION_INDEX.RIGHT;
  }
}

function getDim(axis) {
  if (axis === CSSFlexDirection.COLUMN || axis === CSSFlexDirection.COLUMN_REVERSE) {
    return DIMENSION_INDEX.HEIGHT;
  }
  return DIMENSION_INDEX.WIDTH;

}

function isDimDefined(node, axis) {
  var value = getStyleDimension(node, getDim(axis));
  return value && value > 0;
}

function isPosDefined(node, position) {
  return !!getStylePosition(node, position);
}

function getPosition(node, position) {
  return getStylePosition(node, position) || 0;
}

function getMarginTop() {

}

function getMarginLeft() {

}

function getMarginRight() {

}

function getMarginBottom() {

}

function getMarginStart() {

}

function getMarginEnd() {

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
  else if (position === POSITION_INDEX.START) {
    return getMarginStart(node);
  }
  else if (position === POSITION_INDEX.END) {
    return getMarginEnd(node);
  }
}

function getLeadingMargin(node, axis) {
  if (isRowDirection(axis)) {
    var leadingMargin = getMargin(node, POSITION_INDEX.START);
    if (leadingMargin) {
      return leadingMargin;
    }
  }

  return getMargin(node, getLeading(axis));
}

function getTrailingMargin(node, axis) {
  if (isRowDirection(axis)) {
    var leadingMargin = getMargin(node, POSITION_INDEX.END);
    if (leadingMargin) {
      return leadingMargin;
    }
  }

  return getMargin(node, getTrailing(axis));
}

function getPaddingTop(node) {

}

function getPaddingBottom(node) {

}

function getPaddingLeft(node) {

}

function getPaddingRight(node) {

}

function getPaddingStart(node) {

}

function getPaddingEnd(node) {

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
  else if (position === POSITION_INDEX.START) {
    return getPaddingStart(node);
  }
  else if (position === POSITION_INDEX.END) {
    return getPaddingEnd(node);
  }
}

function getLeadingPadding(node, axis) {
  if (isRowDirection(axis)) {
    var leadingPadding = getPadding(node, POSITION_INDEX.START);
    if (leadingPadding) {
      return leadingPadding;
    }
  }

  return getPadding(node, getLeading(axis));
}

function getTrailingPadding(node, axis) {
  if (isRowDirection(axis)) {
    var trailingPadding = getPaddingEnd(node);
    if (trailingPadding) {
      return trailingPadding;
    }
  }

  return getPadding(node, getTrailing(axis));
}

function getBorderTop(node) {

}

function getBorderBottom(node) {

}

function getBorderLeft(node) {

}

function getBorderRight(node) {

}

function getBorderStart(node) {

}

function getBorderEnd(node) {

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
  else if (position === POSITION_INDEX.START) {
    return getBorderStart(node);
  }
  else if (position === POSITION_INDEX.END) {
    return getBorderEnd(node);
  }
}

function getLeadingBorder(node, axis) {
  if (isRowDirection(axis)) {
    var leadingBorder =  getBorderStart(node);
    if (leadingBorder) {
      return leadingBorder;
    }
  }
  return getBorder(node, getLeading(axis));
}

function getTrailingBorder(node, axis) {
  if (isRowDirection(axis)) {
    var trailingBorder = getBorderEnd(node);
    if (trailingBorder) {
      return trailingBorder;
    }
  }

  return getBorder(node, getTrailing(axis));
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
  var min;
  var max;
  if (node.props && node.props.style) {
    if (isColumnDirection(axis)) {
      min = node.props.style.minHeight;
      max = node.props.style.maxHeight;
    }
    else if (isRowDirection(axis)) {
      min = node.props.style.minWidth;
      max = node.props.style.maxWidth;
    }
  }

  var boundValue = value;

  if (max && max > 0 && boundValue > max) {
    boundValue = max;
  }

  if (min && min > 0 && boundValue < min) {
    boundValue = min;
  }

  return boundValue;
}

function setDimensionFromStyle(node, axis) {
  if (getLayoutDimension(node, getDim(axis))) {
    return;
  }

  if (!isDimDefined(node, axis)) {
    return;
  }

  var maxLayoutDimension = Math.max(boundAxis(node, axis, getStyleDimension(node, getDim(axis))),
    getPaddingAndBorderAxis(node, axis));
  setLayoutDimension(node, getDim(axis), maxLayoutDimension);
}


function setTrailingPosition(node, child, axis) {
  setLayoutPosition(node,
                    getTrailing(axis),
                    getLayoutDimension(node, getDim(axis)) -
                      getLayoutDimension(child, getDim(axis)) -
                      getLayoutDimension(child, getPos(axis)));
}

function getRelativePosition(node, axis) {
  var lead = getStylePosition(node, getLeading(axis));
  if (lead) {
    return lead;
  }
  return -getPosition(node, getTrailing(axis));
}

function getFlex(node) {
  return node.props && node.props.style ? node.props.style.flex : undefined;
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
  var direction = CSSDirection.INHERIT;
  var props = node.props;
  if (props && props.style) {
    var style = props.style;
    if ('direction' in style) {
      direction = style.direction;
    }

    if (direction === CSSDirection.INHERIT) {
      direction = (parentDirection === undefined ? CSSDirection.LTR : parentDirection);
    }
  }
  return direction;
}

function getFlexDirection(node) {
  return node.props && node.props.style ? node.props.style.direction : undefined;
}

function getCrossFlexDirection(flexDirection, direction) {
  if (isColumnDirection(flexDirection)) {
    return resolveAxis(CSSFlexDirection.ROW, direction);
  }
  return CSSFlexDirection.COLUMN;
}

function getPositionType(node) {
  return node.props && node.props.style ? node.props.style.positionType : undefined
}

function getAlignItem(node, child) {
  if (child.props && child.props.style && child.props.style.alignSelf !== CSSAlign.AUTO) {
    return child.props.style.alignSelf;
  }
  return node.props.style.alignItems;
}

function getAlignContent(node) {
  return node.props && node.props.style ? node.props.style.alignContent : undefined
}

function getJustifyContent(node) {
  return node.props && node.props.style ? node.props.style.justifyContent : undefined
}

function isFlexWrap(node) {
  return node.props && node.props.style ? node.props.style.flexWrap === CSSWrap.WRAP : undefined;
}

function isFlex(node) {
  return getPositionType(node) === CSSPositionType.RELATIVE && getFlex(node) > 0;
}

function isMeasureDefined(node) {
  // WAT
}

function getDimWithMargin(node, axis) {
  return getLayoutDimension(node, getDim(axis)) +
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

function hasChangedLayoutDimensions(newNode, oldNode) {
  return true;
}

function getChildCount(node) {
  return node.children ? node.children.length : 0;
}

function getChildAt(node, i) {
  return node.children[i];
}

function layoutNode(node, oldNode, parentWidthChanged, parentMaxWidth, parentDirection) {
  if (node === oldNode && !parentWidthChanged) {
    return oldNode;
  }
  else {
    if (node === oldNode) {
      node = cloneObject(node); // make sure it's a new object for === checks
    }


    if (parentWidthChanged || hasChangedLayoutDimensions(node, oldNode)) {
      // alright, we really need to recalculate the layout...
      var direction = resolveDirection(node, parentDirection);
      var mainAxis = resolveAxis(getFlexDirection(node), direction);
      var crossAxis = getCrossFlexDirection(mainAxis, direction);
      var resolvedRowAxis = resolveAxis(CSSFlexDirection.ROW, direction);

      var layout = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: CSSConstants.UNDEFINED,
        height: CSSConstants.UNDEFINED,
        direction: CSSDirection.LTR
      };

      setDimensionFromStyle(node, mainAxis);
      setDimensionFromStyle(node, crossAxis);

      setLayoutDirection(node, direction);


      // The position is set by the parent, but we need to complete it with a
      // delta composed of the margin and left/top/right/bottom
      setLayoutPosition(node, getLeading(mainAxis), getLayoutPosition(node, getLeading(mainAxis)) + getLeadingMargin(node, mainAxis) +
      getRelativePosition(node, mainAxis));
      setLayoutPosition(node, getTrailing(mainAxis), getLayoutPosition(node, getTrailing(mainAxis)) + getTrailingMargin(node, mainAxis) +
      getRelativePosition(node, mainAxis));
      setLayoutPosition(node, getLeading(crossAxis), getLayoutPosition(node, getLeading(crossAxis)) + getLeadingMargin(node, crossAxis) +
      getRelativePosition(node, crossAxis));
      setLayoutPosition(node, getTrailing(crossAxis), getLayoutPosition(node, getTrailing(crossAxis)) + getTrailingMargin(node, crossAxis) +
      getRelativePosition(node, crossAxis));

      if (isMeasureDefined(node)) {
        var width = CSSConstants.UNDEFINED;
        if (isDimDefined(node, resolvedRowAxis)) {
          width = node.style.width;
        } else if (getLayoutDimension(node, getDim(resolvedRowAxis))) {
          width = getLayoutDimension(node, getDim(resolvedRowAxis));
        } else {
          width = parentMaxWidth -
          getMarginAxis(node, resolvedRowAxis);
        }
        width -= getPaddingAndBorderAxis(node, resolvedRowAxis);

        // We only need to give a dimension for the text if we haven't got any
        // for it computed yet. It can either be from the style attribute or because
        // the element is flexible.
        var isRowUndefined = !isDimDefined(node, resolvedRowAxis) &&
        !getLayoutDimension(node, getDim(resolvedRowAxis));
        var isColumnUndefined = !isDimDefined(node, CSSFlexDirection.COLUMN) &&
        !getLayoutDimension(node, getDim(CSSFlexDirection.COLUMN));

        // Let's not measure the text if we already know both dimensions
        if (isRowUndefined || isColumnUndefined) {
          var measureDim = node.measure(
            layoutContext.measureOutput,
            width
          );
          if (isRowUndefined) {
            node.layout.width = measureDim.width +
            getPaddingAndBorderAxis(node, resolvedRowAxis);
          }
          if (isColumnUndefined) {
            node.layout.height = measureDim.height +
            getPaddingAndBorderAxis(node, CSSFlexDirection.COLUMN);
          }
        }
        if (getChildCount(node) == 0) {
          return;
        }
      }

      var i;
      var ii;
      var child;
      var axis;

      // Pre-fill some dimensions straight from the parent
      for (i = 0; i < getChildCount(node); ++i) {
        child = getChildAt(node, i);

        // Pre-fill cross axis dimensions when the child is using stretch before
        // we call the recursive layout pass
        if (getAlignItem(node, child) == CSSAlign.STRETCH &&
          getPositionType(child) == CSSPositionType.RELATIVE &&
          getLayoutDimension(node, getDim(crossAxis)) &&
          !isDimDefined(child, crossAxis)) {
          setLayoutDimension(child, getDim(crossAxis), Math.max(
            boundAxis(child, crossAxis, getLayoutDimension(node, getDim(crossAxis)) -
            getPaddingAndBorderAxis(node, crossAxis) -
            getMarginAxis(child, crossAxis)),
            // You never want to go smaller than padding
            getPaddingAndBorderAxis(child, crossAxis)
          ));
        } else if (getPositionType(child) == CSSPositionType.ABSOLUTE) {
          // Pre-fill dimensions when using absolute position and both offsets for the axis are defined (either both
          // left and right or top and bottom).
          for (ii = 0; ii < 2; ii++) {
            axis = (ii != 0) ? CSSFlexDirection.ROW : CSSFlexDirection.COLUMN;
            if (getLayoutDimension(node, getDim(axis)) &&
              !isDimDefined(child, axis) &&
              isPosDefined(child, getLeading(axis)) &&
              isPosDefined(child, getTrailing(axis))) {
              setLayoutDimension(child, getDim(axis), Math.max(
                boundAxis(child, axis, getLayoutDimension(node, getDim(axis)) -
                getPaddingAndBorderAxis(node, axis) -
                getMarginAxis(child, axis) -
                getPosition(child, getLeading(axis)) -
                getPosition(child, getTrailing(axis))),
                // You never want to go smaller than padding
                getPaddingAndBorderAxis(child, axis)
              ));
            }
          }
        }
      }

      var definedMainDim = CSSConstants.UNDEFINED;
      if (getLayoutDimension(node, getDim(mainAxis))) {
        definedMainDim = getLayoutDimension(node, getDim(mainAxis)) -
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
          if (getLayoutDimension(node, getDim(mainAxis)) && isFlex(child)) {
            flexibleChildrenCount++;
            totalFlexible = totalFlexible + getFlex(child);

            // Even if we don't know its exact size yet, we already know the padding,
            // border and margin. We'll use this partial information, which represents
            // the smallest possible size for the child, to compute the remaining
            // available space.
            nextContentDim = getPaddingAndBorderAxis(child, mainAxis) +
            getMarginAxis(child, mainAxis);

          } else {
            maxWidth = CSSConstants.UNDEFINED;
            if (!isRowDirection(mainAxis)) {
              maxWidth = parentMaxWidth -
              getMarginAxis(node, resolvedRowAxis) -
              getPaddingAndBorderAxis(node, resolvedRowAxis);

              if (isDimDefined(node, resolvedRowAxis)) {
                maxWidth = getLayoutDimension(node, getDim(resolvedRowAxis)) -
                getPaddingAndBorderAxis(node, resolvedRowAxis);
              }
            }

            // This is the main recursive call. We layout non flexible children.
            if (alreadyComputedNextLayout == 0) {
              node.children[i] = layoutNode(child, oldNode && oldNode.children ? getChildAt(oldNode, i) : null, oldNode ? node.layout.width === oldNode.layout.width : false, maxWidth, direction);
            }

            // Absolute positioned elements do not take part of the layout, so we
            // don't use them to compute mainContentDim
            if (getPositionType(child) == CSSPositionType.RELATIVE) {
              nonFlexibleChildrenCount++;
              // At this point we know the final size and margin of the element.
              nextContentDim = getDimWithMargin(child, mainAxis);
            }
          }

          // The element we are about to add would make us go to the next line
          if (isFlexWrap(node) &&
            getLayoutDimension(node, getDim(mainAxis)) &&
            mainContentDim + nextContentDim > definedMainDim &&
              // If there's only one element, then it's bigger than the content
              // and needs its own line
            i != startLine) {
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
        if (getLayoutDimension(node, getDim(mainAxis))) {
          remainingMainDim = definedMainDim - mainContentDim;
        } else {
          remainingMainDim = Math.max(mainContentDim, 0) - mainContentDim;
        }

        // If there are flexible children in the mix, they are going to fill the
        // remaining space
        if (flexibleChildrenCount != 0) {
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

              if (baseMainDim != boundMainDim) {
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
            
            if (isFlex(child)) {
              // At this point we know the final size of the element in the main
              // dimension
              setLayoutDimension(child, getDim(mainAxis), boundAxis(child, mainAxis,
                flexibleMainDim * getFlex(child) + getPaddingAndBorderAxis(child, mainAxis)
              ));

              maxWidth = CSSConstants.UNDEFINED;
              if (isDimDefined(node, resolvedRowAxis)) {
                maxWidth = getLayoutDimension(node, getDim(resolvedRowAxis)) -
                getPaddingAndBorderAxis(node, resolvedRowAxis);
              } else if (!isRowDirection(mainAxis)) {
                maxWidth = parentMaxWidth -
                getMarginAxis(node, resolvedRowAxis) -
                getPaddingAndBorderAxis(node, resolvedRowAxis);
              }

              // And we recursively call the layout algorithm for this child

              node.children[i] = layoutNode(child, oldNode ? getChildAt(oldNode, i) : null, oldNode ? node.layout.width === oldNode.layout.width : null, maxWidth, direction);
            }
          }

          // We use justifyContent to figure out how to allocate the remaining
          // space available
        } else {
          var justifyContent = getJustifyContent(node);
          if (justifyContent == CSSJustify.CENTER) {
            leadingMainDim = remainingMainDim / 2;
          } else if (justifyContent == CSSJustify.FLEX_END) {
            leadingMainDim = remainingMainDim;
          } else if (justifyContent == CSSJustify.SPACE_BETWEEN) {
            remainingMainDim = Math.max(remainingMainDim, 0);
            if (flexibleChildrenCount + nonFlexibleChildrenCount - 1 != 0) {
              betweenMainDim = remainingMainDim /
              (flexibleChildrenCount + nonFlexibleChildrenCount - 1);
            } else {
              betweenMainDim = 0;
            }
          } else if (justifyContent == CSSJustify.SPACE_AROUND) {
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
        var mainDim = leadingMainDim +
        getLeadingPaddingAndBorder(node, mainAxis);

        for (i = startLine; i < endLine; ++i) {
          child = getChildAt(node, i);
          if (typeof child === 'string') {
            break;
          }
          child.lineIndex = linesCount;

          if (getPositionType(child) == CSSPositionType.ABSOLUTE &&
            isPosDefined(child, getLeading(mainAxis))) {
            // In case the child is position absolute and has left/top being
            // defined, we override the position to whatever the user said
            // (and margin/border).
            setLayoutPosition(child, getPos(mainAxis), getPosition(child, getLeading(mainAxis)) +
            getLeadingBorder(node, mainAxis) +
            getLeadingMargin(child, mainAxis));
          } else {
            // If the child is position absolute (without top/left) or relative,
            // we put it at the current accumulated offset.
            setLayoutPosition(child, getPos(mainAxis), getLayoutPosition(child, getPos(mainAxis)) + mainDim);

            // Define the trailing position accordingly.
            if (getLayoutDimension(node, getDim(mainAxis))) {
              setTrailingPosition(node, child, mainAxis);
            }
          }

          // Now that we placed the element, we need to update the variables
          // We only need to do that for relative elements. Absolute elements
          // do not take part in that phase.
          if (getPositionType(child) == CSSPositionType.RELATIVE) {
            // The main dimension is the sum of all the elements dimension plus
            // the spacing.
            mainDim = mainDim + betweenMainDim + getDimWithMargin(child, mainAxis);
            // The cross dimension is the max of the elements dimension since there
            // can only be one element in that cross dimension.
            crossDim = Math.max(crossDim, boundAxis(child, crossAxis, getDimWithMargin(child, crossAxis)));
          }
        }

        var containerCrossAxis = getLayoutDimension(node, getDim(crossAxis));
        if (getLayoutDimension(node, getDim(crossAxis))) {
          containerCrossAxis = Math.max(
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

          if (getPositionType(child) == CSSPositionType.ABSOLUTE &&
            isPosDefined(child, getLeading(crossAxis))) {
            // In case the child is absolutely positionned and has a
            // top/left/bottom/right being set, we override all the previously
            // computed positions to set it correctly.
            setLayoutPosition(child, getPos(crossAxis), getPosition(child, getLeading(crossAxis)) +
            getLeadingBorder(node, crossAxis) +
            getLeadingMargin(child, crossAxis));

          } else {
            var leadingCrossDim = getLeadingPaddingAndBorder(node, crossAxis);

            // For a relative children, we're either using alignItems (parent) or
            // alignSelf (child) in order to determine the position in the cross axis
            if (getPositionType(child) == CSSPositionType.RELATIVE) {
              var alignItem = getAlignItem(node, child);
              if (alignItem == CSSAlign.STRETCH) {
                // You can only stretch if the dimension has not already been set
                // previously.
                if (!isDimDefined(child, crossAxis)) {
                  setLayoutDimension(child, getDim(crossAxis), Math.max(
                    boundAxis(child, crossAxis, containerCrossAxis -
                    getPaddingAndBorderAxis(node, crossAxis) -
                    getMarginAxis(child, crossAxis)),
                    // You never want to go smaller than padding
                    getPaddingAndBorderAxis(child, crossAxis)
                  ));
                }
              } else if (alignItem != CSSAlign.FLEX_START) {
                // The remaining space between the parent dimensions+padding and child
                // dimensions+margin.
                var remainingCrossDim = containerCrossAxis -
                getPaddingAndBorderAxis(node, crossAxis) -
                getDimWithMargin(child, crossAxis);

                if (alignItem == CSSAlign.CENTER) {
                  leadingCrossDim = leadingCrossDim + remainingCrossDim / 2;
                } else { // CSSAlign.FLEX_END
                  leadingCrossDim = leadingCrossDim + remainingCrossDim;
                }
              }
            }

            // And we apply the position
            setLayoutPosition(child, getPos(crossAxis), getLayoutPosition(child, getPos(crossAxis)) + linesCrossDim + leadingCrossDim);

            // Define the trailing position accordingly.
            if (getLayoutDimension(node, getDim(crossAxis))) {
              setTrailingPosition(node, child, crossAxis);
            }
          }
        }

        linesCrossDim = linesCrossDim + crossDim;
        linesMainDim = Math.max(linesMainDim, mainDim);
        linesCount = linesCount + 1;
        startLine = endLine;
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
        getLayoutDimension(node, getDim(crossAxis))) {
        var nodeCrossAxisInnerSize = getLayoutDimension(node, getDim(crossAxis)) -
        getPaddingAndBorderAxis(node, crossAxis);
        var remainingAlignContentDim = nodeCrossAxisInnerSize - linesCrossDim;

        var crossDimLead = 0;
        var currentLead = getLeadingPaddingAndBorder(node, crossAxis);

        var alignContent = getAlignContent(node);
        if (alignContent == CSSAlign.FLEX_END) {
          currentLead = currentLead + remainingAlignContentDim;
        } else if (alignContent == CSSAlign.CENTER) {
          currentLead = currentLead + remainingAlignContentDim / 2;
        } else if (alignContent == CSSAlign.STRETCH) {
          if (nodeCrossAxisInnerSize > linesCrossDim) {
            crossDimLead = (remainingAlignContentDim / linesCount);
          }
        }

        var endIndex = 0;
        for (i = 0; i < linesCount; ++i) {
          var startIndex = endIndex;

          // compute the line's height and find the endIndex
          var lineHeight = 0;
          for (ii = startIndex; ii < getChildCount(node); ++ii) {
            child = getChildAt(node, ii);
            
            if (getPositionType(child) != CSSPositionType.RELATIVE) {
              continue;
            }
            if (child.lineIndex != i) {
              break;
            }
            if (getLayoutDimension(child, getDim(crossAxis))) {
              lineHeight = Math.max(
                lineHeight,
                getLayoutDimension(child, getDim(crossAxis)) + getMarginAxis(child, crossAxis)
              );
            }
          }
          endIndex = ii;
          lineHeight = lineHeight + crossDimLead;

          for (ii = startIndex; ii < endIndex; ++ii) {
            child = getChildAt(node, ii);
            
            if (getPositionType(child) != CSSPositionType.RELATIVE) {
              continue;
            }

            var alignContentAlignItem = getAlignItem(node, child);
            if (alignContentAlignItem == CSSAlign.FLEX_START) {
              setLayoutPosition(child, getPos(crossAxis), currentLead + getLeadingMargin(child, crossAxis));
            } else if (alignContentAlignItem == CSSAlign.FLEX_END) {
              setLayoutPosition(child, getPos(crossAxis), currentLead + lineHeight - getTrailingMargin(child, crossAxis) - getLayoutDimension(child, getDim(crossAxis)));
            } else if (alignContentAlignItem == CSSAlign.CENTER) {
              var childHeight = getLayoutDimension(child, getDim(crossAxis));
              setLayoutPosition(child, getPos(crossAxis), currentLead + (lineHeight - childHeight) / 2);
            } else if (alignContentAlignItem == CSSAlign.STRETCH) {
              setLayoutPosition(child, getPos(crossAxis), currentLead + getLeadingMargin(child, crossAxis));
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
      if (!getLayoutDimension(node, getDim(mainAxis))) {
        setLayoutDimension(node, getDim(mainAxis), Math.max(
          // We're missing the last padding at this point to get the final
          // dimension
          boundAxis(node, mainAxis, linesMainDim + getTrailingPaddingAndBorder(node, mainAxis)),
          // We can never assign a width smaller than the padding and borders
          getPaddingAndBorderAxis(node, mainAxis)
        ));

        needsMainTrailingPos = true;
      }

      if (!getLayoutDimension(node, getDim(crossAxis))) {
        setLayoutDimension(node, getDim(crossAxis), Math.max(
          // For the cross dim, we add both sides at the end because the value
          // is aggregate via a max function. Intermediate negative values
          // can mess this computation otherwise
          boundAxis(node, crossAxis, linesCrossDim + getPaddingAndBorderAxis(node, crossAxis)),
          getPaddingAndBorderAxis(node, crossAxis)
        ));

        needsCrossTrailingPos = true;
      }

      // <Loop F> Set trailing position if necessary
      if (needsMainTrailingPos || needsCrossTrailingPos) {
        for (i = 0; i < getChildCount(node); ++i) {
          child = getChildAt(node, i);
          if (typeof child === 'string') {
            break;
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
      for (i = 0; i < getChildCount(node); ++i) {
        child = getChildAt(node, i);

        if (getPositionType(child) == CSSPositionType.ABSOLUTE) {
          // Pre-fill dimensions when using absolute position and both offsets for the axis are defined (either both
          // left and right or top and bottom).
          for (ii = 0; ii < 2; ii++) {
            axis = (ii != 0) ? CSSFlexDirection.ROW : CSSFlexDirection.COLUMN;
            if (getLayoutDimension(node, getDim(axis)) &&
              !isDimDefined(child, axis) &&
              isPosDefined(child, getLeading(axis)) &&
              isPosDefined(child, getTrailing(axis))) {
              setLayoutDimension(child, getDim(axis), Math.max(
                boundAxis(child, axis, getLayoutDimension(node, getDim(axis)) -
                  getBorderAxis(node, axis) -
                  getMarginAxis(child, axis) -
                  getPosition(child, getLeading(axis)) -
                  getPosition(child, getTrailing(axis))
                ),
                // You never want to go smaller than padding
                getPaddingAndBorderAxis(child, axis)
              ));
            }
          }
          for (ii = 0; ii < 2; ii++) {
            axis = (ii != 0) ? CSSFlexDirection.ROW : CSSFlexDirection.COLUMN;
            if (isPosDefined(child, getTrailing(axis)) &&
              !isPosDefined(child, getLeading(axis))) {
              setLayoutPosition(child, getLeading(axis), getLayoutDimension(node, getDim(axis)) -
              getLayoutDimension(child, getDim(axis)) -
              getPosition(child, getTrailing(axis)));
            }
          }
        }
      }


      // eventually...
      node.layout = layout;
    }
    //
    //var newChildren = node.children;
    //if (newChildren && oldNode && oldNode.children) {
    //  var oldChildren = oldNode.children;
    //  for (var i = 0, l = newChildren.length; i < l; i++) {
    //    if (typeof newChildren[i] !== 'string') {
    //      newChildren[i] = layoutNode(newChildren[i], oldChildren[i], parentWidthChanged);
    //    }
    //  }
    //}
    return node;
  }
}

module.exports = layoutNode;
