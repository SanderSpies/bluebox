'use strict';

var merge = require('../utils/merge');
var UNDEFINED = require('../UNDEFINED');
var __DEV__ = require('../__DEV__');

var seal = Object.seal;
var deepSeal = require('../utils/deepSeal');

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
      width: UNDEFINED,
      height: UNDEFINED,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'column',
      alignSelf: '',
      flexGrow: 0,
      flexWrap: 'nowrap',
      //alignContent: 'flex-start',
      left: UNDEFINED,
      top: UNDEFINED,
      right: UNDEFINED,
      bottom: UNDEFINED,
      fontSize: 12,
      fontFamily: 'Arial',
      textAlign: 'left',
      fontWeight: '',
      fontStyle: 'normal'
    }, style || {}),
    parent: null,
    oldRef: null,
    type: type,
    props: props,
    children: children,
    lineIndex: 0,
    isAnimating: false,
    isChildAnimating: 0,
    newRef: null
  };
  if (__DEV__) {
    seal(component);
    seal(component.layout);
    seal(component.style);
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    if (child.type) {
      child.parent = component;
      if (!component.isChildAnimating && (child.isAnimating || child.isChildAnimating)) {
        component.isChildAnimating++;
      }
    }
  }



  return component;
}

module.exports = Component;
