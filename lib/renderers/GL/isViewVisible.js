'use strict';

var CL = require('../../components/ComponentConstants');

var ViewPortHelper  = require('../DOM/ViewPortHelper');
var viewPortDimensions = ViewPortHelper.getDimensions();

var clipSpaceX = 1 / viewPortDimensions.width * 2;
var clipSpaceY = 1 / viewPortDimensions.height * 2;

var left = viewPortDimensions.left * clipSpaceX;
var width = viewPortDimensions.width * clipSpaceX;
var top = viewPortDimensions.top * clipSpaceY;
var height = viewPortDimensions.height * clipSpaceY;

// TODO: add overflow support here...
function isViewVisible(element) {
  var result = !!(element.style && (element.style.backgroundColor ||
    element.style.border)) &&
    ((element.layout[CL.LEFT] >= left && element.layout[CL.LEFT] <= (left + width)) ||
    (element.layout[CL.RIGHT] >= left && element.layout[CL.RIGHT] <= (left + width)) ||
    (element.layout[CL.LEFT] < left && element.layout[CL.RIGHT] > (left + width))) &&
      ((element.layout[CL.TOP] >= top && element.layout[CL.TOP] <= (top + height)) ||
      (element.layout[CL.BOTTOM] >= top && element.layout[CL.BOTTOM] <= (top + height)) ||
      (element.layout[CL.TOP] < top && element.layout[CL.BOTTOM] > (top + height)));


    return result;
}

module.exports = isViewVisible;
