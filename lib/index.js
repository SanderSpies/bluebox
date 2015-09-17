'use strict';

var diff            = require('./diff/diff');
var layoutNode      = require('./layout/layoutNode');
var render        = require('./renderers/GL/render');
var ViewPortHelper  = require('./renderers/DOM/ViewPortHelper');
var toDOMString = require('./layout/layoutNode-tests/utils/toDOMString');
var oldComponentTree    = null;
var oldDOMElement       = null;
var viewPortDimensions  = null;
var registeredComponentTypes = {};
var AXIS = require('./layout/AXIS');
var keys = Object.keys;

global.__DEV__ = process.env.NODE_ENV !== 'production';

function registerComponentType(type, structure) {
  registeredComponentTypes[type] = structure;
}

function rerenderComponent(type, props, style, children) {
  var componentType = registeredComponentTypes[type];
  return componentType(props, style, children);
}

function clone(obj) {
  var newObj = {};
  var properties = keys(obj);
  for (var i = 0, l = properties.length; i < l; i++) {
    var property = properties[i];
    newObj[property] = obj[property];
  }
  return newObj;
}


function updateTree(component, newComponent) {
  // go up the tree and replace all the nodes
  var parent = component.parent;
  if (parent) {
    //debugger;
    // recreate the parents
    newComponent.layout = component.layout;
    while(parent) {
      var index = parent.children.indexOf(component);
      var newParent = clone(parent);
      newParent.children[index] = newComponent;
      newComponent.parent = newParent;

      if (!component.parent){
        return newComponent;
      }
      newComponent = newComponent.parent;
      component = component.parent;
      parent = component.parent;
    }

    return newComponent;
  }
  else {
    return newComponent;
  }
}

function mergeProperties(newProps, existingProps) {
  var existingPropKeys = keys(existingProps);
  for (var i = 0, l = existingPropKeys.length; i < l; i++) {
    var existingPropKey = existingPropKeys[i];
    if (!newProps[existingPropKey]) {
      newProps[existingPropKey] = existingProps[existingPropKey];
    }
  }
  return newProps;
}

function withProperties(component) {
  return {
    withProperties: function(props) {


      var newProps = mergeProperties(props, component.props);
      var newComponent = rerenderComponent(component.customType, newProps, component.style, component.children);
      var newComponentTree = updateTree(component, newComponent);

      Bluebox.renderFromTop(newComponentTree);
      newComponent.customType = component.customType;
      return newComponent;
    }
  };
}

var Bluebox = {

  create: function(type, structure) {
    registerComponentType(type, structure);
    return function(props, style, children) {
      var component =  structure(props, style, children);
      component.customType = type;
      return component;
    };
  },

  Components: {
    Image: null,
    Text: null,
    View: null
  },

  Animations: {
    Transition: null,
    Spring: null
  },

  update: function(component) {
    return withProperties(component);
  },

  renderOnly: function(c) {
    render(oldDOMElement, c, null, null, 0, viewPortDimensions, 0, 0);
  },

  renderFromTop: function(componentTree, domElement, noDiff) {
    if (!componentTree) {
      componentTree = oldComponentTree;
    }
    if (!domElement) {
      domElement = oldDOMElement;
    }
    oldDOMElement = domElement;
    var newComponentTree = noDiff ? componentTree : diff(componentTree, oldComponentTree, null, null);

    var hasChanged = false;
    if (viewPortDimensions !== ViewPortHelper.getDimensions()) {
      viewPortDimensions = ViewPortHelper.getDimensions();
      hasChanged = true;
    }
   // if (newComponentTree.layout.width === undefined) {
      newComponentTree = layoutNode(newComponentTree, oldComponentTree, false, null, AXIS.column, AXIS.row, false);
   // }

      console.log(newComponentTree);
    //console.log(toDOMString(newComponentTree));

    if (newComponentTree !== oldComponentTree || hasChanged) {
      viewPortDimensions = ViewPortHelper.getDimensions();
    }

    render(domElement, newComponentTree, null, null, 0, viewPortDimensions, 0, 0);

    oldComponentTree = newComponentTree;
    return newComponentTree;
  }

};

module.exports = Bluebox;

Bluebox.Components.View = require('./components/View');
Bluebox.Components.Text = require('./components/Text');
Bluebox.Components.Image = require('./components/Image');
Bluebox.Animations.Transition = function(){};
Bluebox.Animations.Spring = function(){};