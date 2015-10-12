'use strict';

function isViewVisible(element, viewPortDimensions) {
  var result = (element.style && (element.style.backgroundColor ||
    element.style.border));
  //&&
  //  ((element.layout.left >= viewPortDimensions.left && element.layout.left <= (viewPortDimensions.left + viewPortDimensions.width)) ||
  //  (element.layout.right >= viewPortDimensions.left && element.layout.right <= (viewPortDimensions.left + viewPortDimensions.width)) ||
  //  (element.layout.left < viewPortDimensions.left && element.layout.right > (viewPortDimensions.left + viewPortDimensions.width))) &&
  //    ((element.layout.top >= viewPortDimensions.top && element.layout.top <= (viewPortDimensions.top + viewPortDimensions.height)) ||
  //    (element.layout.bottom >= viewPortDimensions.top && element.layout.bottom <= (viewPortDimensions.top + viewPortDimensions.height)) ||
  //    (element.layout.top < viewPortDimensions.top && element.layout.bottom > (viewPortDimensions.top + viewPortDimensions.height)));

    return !!result;
}

module.exports = isViewVisible;
