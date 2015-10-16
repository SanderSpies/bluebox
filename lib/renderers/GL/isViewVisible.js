'use strict';

var ViewPortHelper  = require('../DOM/ViewPortHelper');
var viewPortDimensions = ViewPortHelper.getDimensions();

var left = viewPortDimensions.left;
var width = viewPortDimensions.width;
var top = viewPortDimensions.top;
var height = viewPortDimensions.height;

// TODO: add overflow support here...
function isViewVisible(element) {
  var result = !!(element.style && (element.style.backgroundColor ||
    element.style.border)) &&
    ((element.layout.left >= left && element.layout.left <= (left + width)) ||
    (element.layout.right >= left && element.layout.right <= (left + width)) ||
    (element.layout.left < left && element.layout.right > (left + width))) &&
      ((element.layout.top >= top && element.layout.top <= (top + height)) ||
      (element.layout.bottom >= top && element.layout.bottom <= (top + height)) ||
      (element.layout.top < top && element.layout.bottom > (top + height)));


    return result;
}

module.exports = isViewVisible;
