'use strict';

var ObjectPool = require('../utils/ObjectPool');

ObjectPool.prealloc('layout', {width: undefined, height: undefined, top: 0, left: 0, right: 0, bottom: 0}, 1000);
ObjectPool.prealloc('components', {
  layout: null,
  style: null,
  parent: null,
  type: '',
  props: null,
  children: null,
  lineIndex: 0
}, 1000);
var styleObj = {
  backgroundColor: '',
  color: '',
  margin: '',
  marginLeft: -1,
  marginRight: -1,
  marginTop: -1,
  marginBottom: -1,
  minHeight: -1,
  minWidth: -1,
  padding: '',
  paddingLeft: -1,
  paddingRight: -1,
  paddingTop: -1,
  paddingBottom: -1,
  opacity: 1,
  overflow: 'inherit',
  width: -1,
  height: -1
};
ObjectPool.prealloc('style', styleObj, 1000);
var styleKeys = Object.keys(styleObj);
function merge(parent, child) {
  var childKeys = Object.keys(child);
  for (var i = 0, l = childKeys.length; i < l; i++) {
    var childKey = childKeys[i];
    parent[childKey] = child[childKey];
  }
  return parent;
}

function Component(type, props, style, children) {
  var layout = ObjectPool.getInstance('layout');
  var component = ObjectPool.getInstance('components');
  var baseStyle = ObjectPool.getInstance('style');
  component.layout = layout;
  component.style = style ? merge(baseStyle, style) : baseStyle;
  component.type = type;
  component.props = props;
  component.children = children;
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    if (child.type) {
      child.parent = component;
    }
  }
  return component;
}

module.exports = Component;
