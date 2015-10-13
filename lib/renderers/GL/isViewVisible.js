'use strict';

var ViewPortHelper  = require('../DOM/ViewPortHelper');
var viewPortDimensions = ViewPortHelper.getDimensions();

var a = 1 / viewPortDimensions.width * 2;
var b = 1 / viewPortDimensions.height * 2;

var left = viewPortDimensions.left * a;
var width = viewPortDimensions.width * a;
var top = viewPortDimensions.top * b;
var height = viewPortDimensions.height * b;

function isViewVisible(element) {
  var result = (element.style && (element.style.backgroundColor ||
    element.style.border)) &&
    ((element.layout.left >= left && element.layout.left <= (left + width)) ||
    (element.layout.right >= left && element.layout.right <= (left + width)) ||
    (element.layout.left < left && element.layout.right > (left + width))) &&
      ((element.layout.top >= top && element.layout.top <= (top + height)) ||
      (element.layout.bottom >= top && element.layout.bottom <= (top+ height)) ||
      (element.layout.top < top && element.layout.bottom > (top + height)));

    return !!result;
}

module.exports = isViewVisible;
