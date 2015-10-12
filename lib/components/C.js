'use strict';

var merge = require('../utils/merge');
var UNDEFINED = require('../UNDEFINED');
var __DEV__ = require('../__DEV__');
var ViewPortHelper  = require('../renderers/DOM/ViewPortHelper');
var viewPortDimensions = ViewPortHelper.getDimensions();
var seal = Object.seal;
var a = 1 / viewPortDimensions.width * 2;
var b = 1 / viewPortDimensions.height * 2;

function convertToClipSpace(style) {
  if (style.width !== UNDEFINED) {
    style.width *= a;
  }
  if (style.height !== UNDEFINED) {
    style.height *= b;
  }
  if (style.top !== UNDEFINED) {
    style.top *= b;
  }
  if (style.left !== UNDEFINED) {
    style.left *= a;
  }
  if (style.right !== UNDEFINED) {
    style.right *= a;
  }
  if (style.bottom !== UNDEFINED) {
    style.bottom *= b;
  }
  if (style.marginLeft !== 0) {
    style.marginLeft *= a;
  }
  if (style.marginRight !== 0) {
    style.marginRight *= a;
  }
  if (style.marginTop !== 0) {
    style.marginTop *= b;
  }
  if (style.marginBottom !== 0) {
    style.marginBottom *= b;
  }
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
    oldParent: null,
    oldRef: null,
    type: type,
    props: props,
    children: children,
    lineIndex: 0,
    isAnimating: false,
    isChildAnimating: 0,
    newRef: null,
    nrOfVertices: 1,
    depth: 0
  };
  if (__DEV__) {
    seal(component);
    seal(component.layout);
    seal(component.style);
  }
  var depth = 0;
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    if (child.type) {
      child.parent = component;
      if (!component.isChildAnimating && (child.isAnimating || child.isChildAnimating)) {
        component.isChildAnimating++;
      }
      component.nrOfVertices += child.nrOfVertices;
      if (child.depth > depth) {
        depth = child.depth;
      }
    }

  }

  convertToClipSpace(component.style);
  component.depth = 1 + depth;

  return component;
}

module.exports = Component;
