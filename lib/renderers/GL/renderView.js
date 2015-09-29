'use strict';

var WebGLColors = {
  black: [0.0, 0.0, 0.0],
  silver: [],
  gray: [],
  white: [1.0, 1.0, 1.0],
  maroon: [],
  red: [1.0, 0.0, 0.0],
  purple: [],
  fuchsia: [],
  green: [0.0, 0.5, 0.0],
  lime: [],
  olive: [],
  yellow: [],
  navy: [],
  blue: [0.0, 0.0, 1.0],
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

    var colorPosition = index * 16;
    colorsArray[colorPosition + 0] = backgroundColor[0];
    colorsArray[colorPosition + 1] = backgroundColor[1];
    colorsArray[colorPosition + 2] = backgroundColor[2];
    colorsArray[colorPosition + 3] = opacity;

    colorsArray[colorPosition + 4] = backgroundColor[0];
    colorsArray[colorPosition + 5] = backgroundColor[1];
    colorsArray[colorPosition + 6] = backgroundColor[2];
    colorsArray[colorPosition + 7] = opacity;

    colorsArray[colorPosition + 8] = backgroundColor[0];
    colorsArray[colorPosition + 9] = backgroundColor[1];
    colorsArray[colorPosition + 10] = backgroundColor[2];
    colorsArray[colorPosition + 11] = opacity;

    colorsArray[colorPosition + 12] = backgroundColor[0];
    colorsArray[colorPosition + 13] = backgroundColor[1];
    colorsArray[colorPosition + 14] = backgroundColor[2];
    colorsArray[colorPosition + 15] = opacity;
    

  }
}

function setBorder(element) {
  if (element.props && element.props.style && element.props.style.border) {
    console.warn('not implemented yet');
  }
}

function isViewVisible(element) {
  return element.style && element.style.backgroundColor ||
    element.style && element.style.border;
}

var VERTEX_SIZE = 8;

function renderView(verticesArray, indexArray, index, colorsArray, element, oldElement, inheritedOpacity, skip) {
  if (isViewVisible(element)) {
    if (element !== oldElement) {
      var elementLayout = element.layout;
      var left = elementLayout.left;
      var right = elementLayout.right;
      var top = elementLayout.top;
      var bottom = elementLayout.bottom;

      setBackgroundColor(colorsArray, index, element, inheritedOpacity);
      setBorder(element);

      var vertexPos = (index * VERTEX_SIZE);
      verticesArray[vertexPos + 0] = left;
      verticesArray[vertexPos + 1] = top;

      verticesArray[vertexPos + 2] = right;
      verticesArray[vertexPos + 3] = top;

      verticesArray[vertexPos + 4] = left;
      verticesArray[vertexPos + 5] = bottom;

      verticesArray[vertexPos + 6] = right;
      verticesArray[vertexPos + 7] = bottom;

      
      vertexPos /= 2
      var indexPos = index * 6;
      
      indexArray[indexPos + 0] = vertexPos + 0;
      indexArray[indexPos + 1] = vertexPos + 1;
      indexArray[indexPos + 2] = vertexPos + 2;
      indexArray[indexPos + 3] = vertexPos + 2;
      indexArray[indexPos + 4] = vertexPos + 1;
      indexArray[indexPos + 5] = vertexPos + 3;
    }
    return 1;
  }
  return 0;
}

module.exports = renderView;
