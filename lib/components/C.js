'use strict';

var ObjectPool = require('../ObjectPool');

ObjectPool.prealloc('layout', {width: -1, height: -1, top: 0, left: 0, right: 0, bottom:0}, 40000);
ObjectPool.prealloc('components', {layout:null, type: '', props: null, children: null}, 40000);

function Component(type, props, children) {
  var layout = ObjectPool.getInstance('layout');
  var component = ObjectPool.getInstance('components');
  component.layout = layout;
  component.type = type;
  component.props = props;
  component.children = children;
  return component;
}

module.exports = Component;
