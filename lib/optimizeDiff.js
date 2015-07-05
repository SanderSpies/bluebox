'use strict';

// TODO: let it also work horizontally
function isVisible(newLayout, viewPortDimensions) {
  const layout = newLayout.layout;
  return (layout.top > viewPortDimensions.top && layout.top < (viewPortDimensions.top + viewPortDimensions.height)) ||
         ((layout.top + layout.bottom) < (viewPortDimensions.top + viewPortDimensions.height) && (layout.top + layout.bottom) > viewPortDimensions.top);
}



/**
 * viewPortDimensions:
 * - top, left, width, height
 *
 */
function optimizeDiff(diffResult, newLayout, viewPortDimensions) {
  if (!isVisible(newLayout, viewPortDimensions)) {
    return {
      type: 'div',
      props: {
        style: diffResult.style
      }
    }
  }
  if (diffResult.props) {
    let children = diffResult.props.children;
    for (let i = 0, l = children.length; i < l; i++) {
      const child = children[i];
      children[i] = optimizeDiff(child, newLayout.children[i], viewPortDimensions);
    }
  }

  return diffResult;
}

module.exports = optimizeDiff;
