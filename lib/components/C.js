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
    layout: {left: 0, width: undefined, right: 0, top: 0, height: undefined, bottom: 0, lineIndex: 0},
    style: merge({
      backgroundColor: '',
      color: '',
      margin: '',
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      minHeight: 0,
      minWidth: 0,
      padding: '',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      opacity: 1,
      overflow: 'inherit',
      width: undefined,
      height: undefined,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'column',
      alignSelf: '',
      flexGrow: 0,
      flexWrap: 'nowrap',
      //alignContent: 'flex-start',
      left: undefined,
      top: undefined,
      right: undefined,
      bottom: undefined
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
