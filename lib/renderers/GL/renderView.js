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

    colorsArray[index * 24 + 0] = backgroundColor[0];
    colorsArray[index * 24 + 1] = backgroundColor[1];
    colorsArray[index * 24 + 2] = backgroundColor[2];
    colorsArray[index * 24 + 3] = opacity;

    colorsArray[index * 24 + 4] = backgroundColor[0];
    colorsArray[index * 24 + 5] = backgroundColor[1];
    colorsArray[index * 24 + 6] = backgroundColor[2];
    colorsArray[index * 24 + 7] = opacity;

    colorsArray[index * 24 + 8] = backgroundColor[0];
    colorsArray[index * 24 + 9] = backgroundColor[1];
    colorsArray[index * 24 + 10] = backgroundColor[2];
    colorsArray[index * 24 + 11] = opacity;

    colorsArray[index * 24 + 12] = backgroundColor[0];
    colorsArray[index * 24 + 13] = backgroundColor[1];
    colorsArray[index * 24 + 14] = backgroundColor[2];
    colorsArray[index * 24 + 15] = opacity;

    colorsArray[index * 24 + 16] = backgroundColor[0];
    colorsArray[index * 24 + 17] = backgroundColor[1];
    colorsArray[index * 24 + 18] = backgroundColor[2];
    colorsArray[index * 24 + 19] = opacity;

    colorsArray[index * 24 + 20] = backgroundColor[0];
    colorsArray[index * 24 + 21] = backgroundColor[1];
    colorsArray[index * 24 + 22] = backgroundColor[2];
    colorsArray[index * 24 + 23] = opacity;

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

function renderView(verticesArray, index, colorsArray, element, inheritedOpacity) {
  if (isViewVisible(element)) {

  //  webGLContext.uniform4f(u_view_dimensions, parentLeft, parentTop, parentLeft + parentWidth, parentTop + parentHeight);

    var x1 = element.layout.left;
    var x2 = element.layout.right;
    var y1 = element.layout.top;
    var y2 = element.layout.bottom;

    setBackgroundColor(colorsArray, index, element, inheritedOpacity);
    setBorder(element);

    verticesArray[index * 12 + 0] = x1;
    verticesArray[index * 12 + 1] = y1;
    verticesArray[index * 12 + 2] = x2;

    verticesArray[index * 12 + 3] = y1;
    verticesArray[index * 12 + 4] = x1;
    verticesArray[index * 12 + 5] = y2;

    verticesArray[index * 12 + 6] = x1;
    verticesArray[index * 12 + 7] = y2;
    verticesArray[index * 12 + 8] = x2;

    verticesArray[index * 12 + 9]  = y1;
    verticesArray[index * 12 + 10] = x2;
    verticesArray[index * 12 + 11] = y2;

    return 1;
  }
  return 0;
}

module.exports = renderView;
