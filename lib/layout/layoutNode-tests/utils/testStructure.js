'use strict';

var convertDOMToVirtualTree = require('./convertDOMToVirtualTree');
var toDOMString = require('./toDOMString');
var LayoutEngine = require('../../LayoutEngine');
var isLayoutEqual = require('./isLayoutEqual');
var renderDOMString = require('./renderDOMString');
var AXIS = require('../../AXIS');
function testStructure(rootNode) {
  var cssLayout = LayoutEngine.layoutRelativeNode(rootNode, null, null, AXIS.column, AXIS.row, false);
  var domString = toDOMString(cssLayout);
  renderDOMString(domString);
  var domLayout = convertDOMToVirtualTree(document.body.querySelector('div'));
  isLayoutEqual(domLayout, cssLayout);
}

module.exports = testStructure;
