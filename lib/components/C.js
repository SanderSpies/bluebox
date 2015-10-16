'use strict';

var merge = require('../utils/merge');
var UNDEFINED = require('../UNDEFINED');
var __DEV__ = require('../__DEV__');
var ViewPortHelper  = require('../renderers/DOM/ViewPortHelper');
var viewPortDimensions = ViewPortHelper.getDimensions();
var seal = Object.seal;
var clipSpaceX = 1 / viewPortDimensions.width * 2;
var clipSpaceY = 1 / viewPortDimensions.height * 2;

function convertToClipSpace(style) {
  if (style.width !== UNDEFINED) {
    style.width *= clipSpaceX;
  }
  if (style.height !== UNDEFINED) {
    style.height *= clipSpaceY;
  }
  if (style.top !== UNDEFINED) {
    style.top *= clipSpaceY;
  }
  if (style.left !== UNDEFINED) {
    style.left *= clipSpaceX;
  }
  if (style.right !== UNDEFINED) {
    style.right *= clipSpaceX;
  }
  if (style.bottom !== UNDEFINED) {
    style.bottom *= clipSpaceY;
  }
  if (style.marginLeft !== 0) {
    style.marginLeft *= clipSpaceX;
  }
  if (style.marginRight !== 0) {
    style.marginRight *= clipSpaceX;
  }
  if (style.marginTop !== 0) {
    style.marginTop *= clipSpaceY;
  }
  if (style.marginBottom !== 0) {
    style.marginBottom *= clipSpaceY;
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
      position: 'relative',
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
