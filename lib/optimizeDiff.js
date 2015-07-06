'use strict';

// TODO: let it also work horizontally
function isVisible(newLayout, viewPortDimensions) {
  const layout = newLayout.layout;
  return (layout.top >= viewPortDimensions.top && layout.top <= (viewPortDimensions.top + viewPortDimensions.height)) ||
         ((layout.top + layout.height) <= (viewPortDimensions.top + viewPortDimensions.height) && (layout.top + layout.height) >= viewPortDimensions.top) ||
          layout.top < viewPortDimensions.top && (layout.top + layout.height) > (viewPortDimensions.top + viewPortDimensions.height);
}

/**
 * viewPortDimensions:
 * - top, left, width, height
 *
 */
function optimizeDiff(diffResult, newLayout, viewPortDimensions) {
  if (typeof diffResult === 'string') {
    // not supported yet
    return diffResult;
  }
  if (!isVisible(newLayout, viewPortDimensions)) {
    console.log('not visible:', newLayout, viewPortDimensions);
    let result = {
      type: 'div',
      props: {
        style: diffResult.props ? diffResult.props.style : {}
      }
    };
    if (result.props.style) {
      result.props.style.width = result.props.style.width || newLayout.layout.width;
      result.props.style.height = result.props.style.height || newLayout.layout.height;
    }
    return result;
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
