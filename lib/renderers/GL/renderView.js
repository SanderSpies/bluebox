'use strict';

var WebGLColors = {
  black: [0, 0, 0],
  silver: [],
  gray: [],
  white: [1, 1, 1],
  maroon: [],
  red: [1, 0, 0],
  purple: [],
  fuchsia: [],
  green: [0, .5, 0],
  lime: [],
  olive: [],
  yellow: [],
  navy: [],
  blue: [0, 0, 1],
  teal: [],
  acqua: []

};


function setBackgroundColor(webGLContext, element, colorLocation, inheritedOpacity) {
  if (element.style.backgroundColor !== '') {
    var backgroundColor = WebGLColors[element.style.backgroundColor];
    var opacity = 1;
    var opacityProp = element.style.opacity;
    if (!isNaN(opacityProp)) {
      opacity = opacityProp * inheritedOpacity;
    }
    else if (inheritedOpacity) {
      opacity = inheritedOpacity;
    }

    webGLContext.uniform4f(colorLocation, backgroundColor[0], backgroundColor[1], backgroundColor[2], opacity);
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

function renderView(webGLContext, viewProgram, element, viewPortDimensions, top, left, colorLocation, positionLocation, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity) {
  if (isViewVisible(element)) {

    webGLContext.useProgram(viewProgram);
    //webGLContext.blendEquationSeparate(webGLContext.FUNC_ADD, webGLContext.FUNC_ADD);
    //webGLContext.blend
    webGLContext.blendFuncSeparate(webGLContext.SRC_ALPHA, webGLContext.ONE_MINUS_SRC_ALPHA, webGLContext.ONE, webGLContext.ONE_MINUS_SRC_ALPHA);

    var buffer = webGLContext.createBuffer();
    webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, buffer);
    webGLContext.enableVertexAttribArray(positionLocation);
    webGLContext.vertexAttribPointer(positionLocation, 2, webGLContext.FLOAT, false, 0, 0);

    webGLContext.uniform4f(webGLContext.getUniformLocation(viewProgram, 'u_dimensions'), parentLeft, parentTop, parentLeft + parentWidth, parentTop + parentHeight);

    var x1 = element.layout.left;
    var x2 = element.layout.right;
    var y1 = element.layout.top;

    var y2 = element.layout.bottom;

    setBackgroundColor(webGLContext, element, colorLocation, inheritedOpacity);
    setBorder(element);

    webGLContext.bufferData(webGLContext.ARRAY_BUFFER, new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2]), webGLContext.STATIC_DRAW);

    webGLContext.drawArrays(webGLContext.TRIANGLES, 0, 6);
  }
}

module.exports = renderView;
