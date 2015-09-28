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
      console.info(opacityProp, inheritedOpacity);
      opacity = opacityProp * inheritedOpacity;
    }

    colorsArray[index * 16 + 0] = backgroundColor[0];
    colorsArray[index * 16 + 1] = backgroundColor[1];
    colorsArray[index * 16 + 2] = backgroundColor[2];
    colorsArray[index * 16 + 3] = opacity;

    colorsArray[index * 16 + 4] = backgroundColor[0];
    colorsArray[index * 16 + 5] = backgroundColor[1];
    colorsArray[index * 16 + 6] = backgroundColor[2];
    colorsArray[index * 16 + 7] = opacity;

    colorsArray[index * 16 + 8] = backgroundColor[0];
    colorsArray[index * 16 + 9] = backgroundColor[1];
    colorsArray[index * 16 + 10] = backgroundColor[2];
    colorsArray[index * 16 + 11] = opacity;

    colorsArray[index * 16 + 12] = backgroundColor[0];
    colorsArray[index * 16 + 13] = backgroundColor[1];
    colorsArray[index * 16 + 14] = backgroundColor[2];
    colorsArray[index * 16 + 15] = opacity;
    

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

      verticesArray[index * VERTEX_SIZE + 0] = left;
      verticesArray[index * VERTEX_SIZE + 1] = top;

      verticesArray[index * VERTEX_SIZE + 2] = right;
      verticesArray[index * VERTEX_SIZE + 3] = top;

      verticesArray[index * VERTEX_SIZE + 4] = left;
      verticesArray[index * VERTEX_SIZE + 5] = bottom;

      verticesArray[index * VERTEX_SIZE + 6] = right;
      verticesArray[index * VERTEX_SIZE + 7] = bottom;

      indexArray[index * 6 + 0] = (index * VERTEX_SIZE) / 2 + 0;
      indexArray[index * 6 + 1] = (index * VERTEX_SIZE) / 2 + 1;
      indexArray[index * 6 + 2] = (index * VERTEX_SIZE) / 2 + 2;
      indexArray[index * 6 + 3] = (index * VERTEX_SIZE) / 2 + 2;
      indexArray[index * 6 + 4] = (index * VERTEX_SIZE) / 2 + 1;
      indexArray[index * 6 + 5] = (index * VERTEX_SIZE) / 2 + 3;
    }
    return 1;
  }
  return 0;
}

module.exports = renderView;
