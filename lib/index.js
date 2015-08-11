'use strict';

var diff            = require('./diff/diff');
var layoutNode      = require('./layout/layoutNode');
var renderer        = require('./renderers/GL/renderer');
var ViewPortHelper  = require('./renderers/DOM/ViewPortHelper');

var oldComponentTree    = null;
var oldDOMElement       = null;
var viewPortDimensions  = null;

function withProperties(component) {
  return {
    withProperties: function(props) {

      // TODO: update the tree
      // TODO: re-render it all
      console.log(component, props);
    }
  };
}

var Bluebox = {

  create: function(type, structure) {
    // TODO: register component
    return function(props, style, children) {
      var component =  structure(props, style, children);

      return component;
    };
  },

  Components: {
    Image: null,
    Text: null,
    View: null
  },

  update: function(component) {
    return withProperties(component);
  },

  renderFromTop: function(componentTree, domElement) {
    if (!componentTree) {
      componentTree = oldComponentTree;
    }
    if (!domElement) {
      domElement = oldDOMElement;
    }
    oldDOMElement = domElement;
    var diff2 = diff(componentTree, oldComponentTree, null, 'ltr');

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
    renderer(domElement, diff2, oldComponentTree, null, 0, viewPortDimensions, 0, 0);
    oldComponentTree = diff2;
    return diff2;
  }

};

module.exports = Bluebox;

Bluebox.Components.View = require('./components/View');
Bluebox.Components.Text = require('./components/Text');
Bluebox.Components.Image = require('./components/Image');


