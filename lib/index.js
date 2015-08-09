'use strict';

var diff = require('./diff');
var layoutNode = require('./layout/layoutNode');
var ViewPortHelper = require('./renderers/DOM/ViewPortHelper');
var renderer = require('./renderers/GL/renderer');

var oldComponentTree = null;
var viewPortDimensions = null;
var oldEl;

var BlueBox = {

  create: function(type, structure) {
    // TODO: register component
    return function(props, style, children) {
      return structure.render(props, style, children);
    };
  },

  renderFromTop: function(definition, el) {
    if (!definition) {
      definition = oldComponentTree;
    }
    if (!el) {
      el = oldEl;
    }
    oldEl = el;
    var diff2 = diff(definition, oldComponentTree, null, 'ltr');

    var hasChanged = false;
    if (viewPortDimensions !== ViewPortHelper.getDimensions()) {
      viewPortDimensions = ViewPortHelper.getDimensions();
      hasChanged = true;
    }
    if (diff2.layout.width === undefined) {
      diff2 = layoutNode(diff2, oldComponentTree, true, viewPortDimensions.width, viewPortDimensions.height, 'ltr');
      console.log(diff2);
    }
    if (diff2 !== oldComponentTree || hasChanged) {
      viewPortDimensions = ViewPortHelper.getDimensions();
    }
    //console.log('A');
    renderer(el, diff2, oldComponentTree, null, 0, viewPortDimensions, 0, 0);
    //renderer(el, diff2, oldComponentTree, 0, viewPortDimensions, 1, 0);
    oldComponentTree = diff2;
    return diff2;
  }

};

ViewPortHelper.onScroll(function(){
  BlueBox.renderFromTop();
});

module.exports = BlueBox;
