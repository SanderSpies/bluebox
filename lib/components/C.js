'use strict';

var ObjectPool = require('../ObjectPool');

ObjectPool.prealloc('layout', {width: undefined, height: undefined, top: 0, left: 0, right: 0, bottom: 0}, 20000);
ObjectPool.prealloc('__bluebox', {hasOnlyTextChildren: false, direction: 'ltr', mainAxis: '', crossAxis: '', flexDirection: '', crossFlexDirection: '', paddingAndBorderAxis: ''}, 20000);
ObjectPool.prealloc('components', {layout: null, type: '', props: null, children: null, __bluebox: null}, 20000);

function Component(type, props, children) {
  var layout = ObjectPool.getInstance('layout');
  var component = ObjectPool.getInstance('components');
  var __bluebox = ObjectPool.getInstance('__bluebox');
  component.layout = layout;
  component.type = type;
  component.props = props;
  component.children = children;
  component.__bluebox = __bluebox;
  return component;
}

module.exports = Component;
