'use strict';

var __DEV__ = require('../../__DEV__');
var VertexInfo = require('./VertexInfo');
var ensureViewIntegrity = require('./ensureViewIntegrity');
var isViewVisible = require('./isViewVisible');

var WebGLColors = {
  black: [0, 0, 0],
  silver: [],
  gray: [],
  white: [255, 255, 255],
  maroon: [],
  red: [255, 0, 0],
  purple: [],
  fuchsia: [],
  green: [0, 128, 0],
  lime: [],
  olive: [],
  yellow: [],
  navy: [],
  blue: [0, 0, 255],
  teal: [],
  acqua: []

};


function setBackgroundColor(colorsArray, index, element, inheritedOpacity) {
  if (element.style.backgroundColor !== '') {
    var backgroundColor = WebGLColors[element.style.backgroundColor];
    var opacity = 1.0;
    var opacityProp = element.style.opacity;
    if (inheritedOpacity === 1) {
      opacity = opacityProp;
    }
    else if (opacityProp === 1) {
      opacity = inheritedOpacity;
    }
    else {
      opacity = opacityProp * inheritedOpacity;
    }

    opacity = opacity * 255;
    var colorPosition = index * VertexInfo.STRIDE * 4;
    // 0 - 2 - xyz

    colorPosition += 3 * Float32Array.BYTES_PER_ELEMENT;
    colorsArray[colorPosition + 0] = backgroundColor[0];
    colorsArray[colorPosition + 1] = backgroundColor[1];
    colorsArray[colorPosition + 2] = backgroundColor[2];
    colorsArray[colorPosition + 3] = opacity;

    // 7 - 9 - xyz

    colorPosition += 3 * Float32Array.BYTES_PER_ELEMENT + 4;
    colorsArray[colorPosition + 0] = backgroundColor[0];
    colorsArray[colorPosition + 1] = backgroundColor[1];
    colorsArray[colorPosition + 2] = backgroundColor[2];
    colorsArray[colorPosition + 3] = opacity;

    // 14 - 16 - xyz

    colorPosition += 3 * Float32Array.BYTES_PER_ELEMENT + 4;
    colorsArray[colorPosition + 0] = backgroundColor[0];
    colorsArray[colorPosition + 1] = backgroundColor[1];
    colorsArray[colorPosition + 2] = backgroundColor[2];
    colorsArray[colorPosition + 3] = opacity;

    // 21 - 23 - xyz

    colorPosition += 3 * Float32Array.BYTES_PER_ELEMENT + 4;
    colorsArray[colorPosition + 0] = backgroundColor[0];
    colorsArray[colorPosition + 1] = backgroundColor[1];
    colorsArray[colorPosition + 2] = backgroundColor[2];
    colorsArray[colorPosition + 3] = opacity;
  }
}

function setBorder(element) {
  if (element.props && element.props.style && element.props.style.border) {
    console.warn('not implemented yet');
  }
}



//var VERTEX_SIZE = 8;

function renderView(viewPortDimensions, verticesArray, indexArray, index, colorsArray, element, oldElement, inheritedOpacity, skip) {
  if (isViewVisible(element, viewPortDimensions)) {
    if (element !== oldElement) {
      var elementLayout = element.layout;

      // TODO: move to compile time to remove stress from runtime CPU
      var a = 1 / viewPortDimensions.width * 2;
      var b = 1 / viewPortDimensions.height * 2;
      var left   = elementLayout.left * a - 1.0;
      var right  = elementLayout.right * a - 1.0;
      var top    = (elementLayout.top * b - 1.0) * -1.0;
      var bottom = (elementLayout.bottom * b - 1.0) * -1.0;
      var zIndex = 1.0 - 1.0 / element.depth;

      setBackgroundColor(colorsArray, index, element, inheritedOpacity);
      setBorder(element);

      var vertexPos = index * VertexInfo.STRIDE * 4 / Float32Array.BYTES_PER_ELEMENT;

      verticesArray[vertexPos + 0] = left;
      verticesArray[vertexPos + 1] = top;
      verticesArray[vertexPos + 2] = zIndex;

      // color rgba 3 - 6
      vertexPos += 4;

      //012 3456 7

      verticesArray[vertexPos + 0] = right;
      verticesArray[vertexPos + 1] = top;
      verticesArray[vertexPos + 2] = zIndex;

      // color rgba 10 - 13
      vertexPos += 4;

      verticesArray[vertexPos + 0] = left;
      verticesArray[vertexPos + 1] = bottom;
      verticesArray[vertexPos + 2] = zIndex;

      // color rgba 17 - 20
      vertexPos += 4;

      verticesArray[vertexPos + 0] = right;
      verticesArray[vertexPos + 1] = bottom;
      verticesArray[vertexPos + 2] = zIndex;


      if (__DEV__) {
        ensureViewIntegrity(element, index, verticesArray, colorsArray)
      }
      
      vertexPos = index * 4;
      var indexPos = index * 6;
      
      indexArray[indexPos + 0] = vertexPos + 0;
      indexArray[indexPos + 1] = vertexPos + 1;
      indexArray[indexPos + 2] = vertexPos + 2;
      indexArray[indexPos + 3] = vertexPos + 2;
      indexArray[indexPos + 4] = vertexPos + 1;
      indexArray[indexPos + 5] = vertexPos + 3;
      //console.info('vertex:', vertexPos);
      //console.info('setting indexPos:', indexPos);
    }
    return 1;
  }
  return 0;
}

module.exports = renderView;
