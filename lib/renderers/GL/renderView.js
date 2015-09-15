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


function setBackgroundColor(colorsArray, element, inheritedOpacity) {
  if (element.style.backgroundColor !== '') {
    var backgroundColor = WebGLColors[element.style.backgroundColor];
    var opacity = 1.0;
    var opacityProp = element.style.opacity;
    if (!isNaN(opacityProp)) {
      opacity = opacityProp * inheritedOpacity;
    }
    else if (inheritedOpacity) {
      opacity = inheritedOpacity;
    }

    colorsArray[colorsArray.length] = backgroundColor[0];
    colorsArray[colorsArray.length] = backgroundColor[1];
    colorsArray[colorsArray.length] = backgroundColor[2];
    colorsArray[colorsArray.length] = opacity;
    colorsArray[colorsArray.length] = backgroundColor[0];
    colorsArray[colorsArray.length] = backgroundColor[1];
    colorsArray[colorsArray.length] = backgroundColor[2];
    colorsArray[colorsArray.length] = opacity;
    colorsArray[colorsArray.length] = backgroundColor[0];
    colorsArray[colorsArray.length] = backgroundColor[1];
    colorsArray[colorsArray.length] = backgroundColor[2];
    colorsArray[colorsArray.length] = opacity;
    colorsArray[colorsArray.length] = backgroundColor[0];
    colorsArray[colorsArray.length] = backgroundColor[1];
    colorsArray[colorsArray.length] = backgroundColor[2];
    colorsArray[colorsArray.length] = opacity;
    colorsArray[colorsArray.length] = backgroundColor[0];
    colorsArray[colorsArray.length] = backgroundColor[1];
    colorsArray[colorsArray.length] = backgroundColor[2];
    colorsArray[colorsArray.length] = opacity;
    colorsArray[colorsArray.length] = backgroundColor[0];
    colorsArray[colorsArray.length] = backgroundColor[1];
    colorsArray[colorsArray.length] = backgroundColor[2];
    colorsArray[colorsArray.length] = opacity;

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

function renderView(verticesArray, colorsArray, element, inheritedOpacity) {
  if (isViewVisible(element)) {

  //  webGLContext.uniform4f(u_view_dimensions, parentLeft, parentTop, parentLeft + parentWidth, parentTop + parentHeight);

    var x1 = element.layout.left;
    var x2 = element.layout.right;
    var y1 = element.layout.top;
    var y2 = element.layout.bottom;

    setBackgroundColor(colorsArray, element, inheritedOpacity);
    setBorder(element);

    verticesArray[verticesArray.length] = x1;
    verticesArray[verticesArray.length] = y1;
    verticesArray[verticesArray.length] = x2;

    verticesArray[verticesArray.length] = y1;
    verticesArray[verticesArray.length] = x1;
    verticesArray[verticesArray.length] = y2;

    verticesArray[verticesArray.length] = x1;
    verticesArray[verticesArray.length] = y2;
    verticesArray[verticesArray.length] = x2;

    verticesArray[verticesArray.length] = y1;
    verticesArray[verticesArray.length] = x2;
    verticesArray[verticesArray.length] = y2;

  }
}

module.exports = renderView;
