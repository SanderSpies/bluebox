'use strict';

var ObjectPool = require('../ObjectPool');

ObjectPool.prealloc('layout', {width: undefined, height: undefined, top: 0, left: 0, right: 0, bottom: 0}, 20000);
ObjectPool.prealloc('components', {layout: null, type: '', props: null, children: null}, 60000);

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
