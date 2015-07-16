'use strict';

var C = require('./components/C');

// TODO: var it also work horizontally
function isVisible(newLayout, viewPortDimensions) {
  var layout = newLayout.layout;
  return (layout.top >= viewPortDimensions.top && layout.top <= (viewPortDimensions.top + viewPortDimensions.height)) ||
         ((layout.top + layout.height) <= (viewPortDimensions.top + viewPortDimensions.height) && (layout.top + layout.height) >= viewPortDimensions.top) ||
          layout.top < viewPortDimensions.top && (layout.top + layout.height) > (viewPortDimensions.top + viewPortDimensions.height);
}

/**
 * viewPortDimensions:
 * - top, left, width, height
 *
 */
function optimizeDiff(diffResult, viewPortDimensions) {
  if (typeof diffResult === 'string') {
    // not supported yet :-(
    return diffResult;
  }
  if (!isVisible(diffResult, viewPortDimensions)) {
    var result = C('div',{
        style: diffResult.props ? diffResult.props.style : {}
      }, null);

    return result;
  }

  var children = diffResult.children;
  if (children) {
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      children[i] = optimizeDiff(child, newLayout.children[i], viewPortDimensions);
    }
  }

  return diffResult;
}

module.exports = optimizeDiff;
