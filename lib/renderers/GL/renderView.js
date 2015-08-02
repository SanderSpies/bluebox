'use strict';

var WebGLColors = {
  black: [0, 0, 0],
  white: [1, 1, 1],
  red: [1, 0, 0],
  green: [0, .5, 0],
  blue: [0, 0, 1]
};


function setBackgroundColor(webGLContext, element, colorLocation) {
  if (element.props && element.props.style && element.props.style.backgroundColor) {
    var backgroundColor = WebGLColors[element.props.style.backgroundColor];
    var opacity = 1;
    var opacityProp = element.props.style.opacity;
    if (!isNaN(opacityProp)) {
      opacity = opacityProp;
    }
    webGLContext.uniform4f(colorLocation, backgroundColor[0], backgroundColor[1], backgroundColor[2], opacity);
    //webGLContext.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), opacity);
  }
}

function setBorder(element) {
  if (element.props && element.props.style && element.props.style.border) {
    console.warn('not implemented yet');
  }
}

function renderView(webGLContext, viewProgram, element, top, left, colorLocation, positionLocation) {
  webGLContext.useProgram(viewProgram);
  var buffer = webGLContext.createBuffer();
  webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, buffer);

  webGLContext.enableVertexAttribArray(positionLocation);
  webGLContext.vertexAttribPointer(positionLocation, 2, webGLContext.FLOAT, false, 0, 0);


  var x1 = element.layout.left + left;
  var x2 = x1 + element.layout.width;
  var y1 = element.layout.top + top;
  var y2 = y1 + element.layout.height;

  setBackgroundColor(webGLContext, element, colorLocation);
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

module.exports = renderView;
