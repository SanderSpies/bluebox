'use strict';

function merge(parent, child) {
  var childKeys = Object.keys(child);
  for (var i = 0, l = childKeys.length; i < l; i++) {
    var childKey = childKeys[i];
    parent[childKey] = child[childKey];
  }
  return parent;
}

function Component(type, props, style, children) {
  var component = {
    customType: null,
    layout: {width: undefined, height: undefined, top: 0, left: 0, right: 0, bottom: 0},
    style: merge({
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
    }, style || {}),
    parent: null,
    type: type,
    props: props,
    children: children,
    lineIndex: 0
  };

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    if (child.type) {
      child.parent = component;
    }
  }
  return component;
}

module.exports = Component;
