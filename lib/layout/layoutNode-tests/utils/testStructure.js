'use strict';

var convertDOMToVirtualTree = require('./convertDOMToVirtualTree');
var toDOMString = require('./toDOMString');
var layoutNode = require('../../layoutNode');
var isLayoutEqual = require('./isLayoutEqual');
var renderDOMString = require('./renderDOMString');

function testStructure(rootNode) {
  var cssLayout = layoutNode(rootNode, null, 'column');
  var domString = toDOMString(cssLayout);
  renderDOMString(domString);
  var domLayout = convertDOMToVirtualTree(document.body.querySelector('div'));
  isLayoutEqual(domLayout, cssLayout);
}

module.exports = testStructure;
