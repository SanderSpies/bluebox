'use strict';

var webGLContext;
require('./temp-utils');
function isVisible(node, viewPortDimensions) {
  var nodeLayout = node.layout;
  return (nodeLayout.top >= viewPortDimensions.top && nodeLayout.top <= (viewPortDimensions.top + viewPortDimensions.height)) ||
    ((nodeLayout.top + nodeLayout.height) <= (viewPortDimensions.top + viewPortDimensions.height) && (nodeLayout.top + nodeLayout.height) >= viewPortDimensions.top) ||
    nodeLayout.top < viewPortDimensions.top && (nodeLayout.top + nodeLayout.height) > (viewPortDimensions.top + viewPortDimensions.height);
}

function setBackgroundColor() {

  webGLContext.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1);
}

function renderBlock(element, top, left) {
  console.log(element.layout);
  var x1 = element.layout.left + left;
  var x2 = x1 + element.layout.width;
  var y1 = element.layout.top + top;
  var y2 = y1 + element.layout.height;

  setBackgroundColor();

  webGLContext.bufferData(webGLContext.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2]), webGLContext.STATIC_DRAW);

  webGLContext.drawArrays(webGLContext.TRIANGLES, 0, 6);
  //debugger;

}

function renderImage() {

}

function renderText() {

}

function calculatePosition(scale, px) {
  return -1 + (2 / scale * px);
}
var vertexShader;
var fragmentShader;
var program;
var colorLocation;

function render(domElement, newElement, oldElement, position, viewPortDimensions, top, left) {
  if (!webGLContext) {
    webGLContext = domElement.getContext('webgl');

    var rect = domElement.getBoundingClientRect();
    //console.log(rect.width, viewPortDimensions.width);
    console.log(rect.width, viewPortDimensions.width);
    domElement.width = viewPortDimensions.width;
    domElement.height = viewPortDimensions.height;
    webGLContext.viewport(0, 0, viewPortDimensions.width, viewPortDimensions.height);

    //var rectangleShader = webGLContext.createShader('');
    vertexShader = createShaderFromScriptElement(webGLContext, "2d-vertex-shader");
    fragmentShader = createShaderFromScriptElement(webGLContext, "2d-fragment-shader");

    program = createProgram(webGLContext, [vertexShader, fragmentShader]);
    webGLContext.useProgram(program);

    // look up where the vertex data needs to go.
    var positionLocation = webGLContext.getAttribLocation(program, "a_position");


    // set the resolution
    var resolutionLocation = webGLContext.getUniformLocation(program, "u_resolution");
    colorLocation = webGLContext.getUniformLocation(program, "u_color");


    webGLContext.uniform2f(resolutionLocation, viewPortDimensions.width, viewPortDimensions.height);
    // Create a buffer and put a single clipspace rectangle in
    // it (2 triangles)

    var buffer = webGLContext.createBuffer();
    webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, buffer);
    webGLContext.enableVertexAttribArray(positionLocation);
    webGLContext.vertexAttribPointer(positionLocation, 2, webGLContext.FLOAT, false, 0, 0);


    // draw

    //debugger;

  }
  if (typeof newElement === 'string' || !isVisible(newElement, viewPortDimensions)) {
    return;
  }

  if (newElement === oldElement) {
    return;
  }
  if (newElement && !oldElement) {
    if (!newElement.layout) {
      return;
    }
    renderBlock(newElement, top, left);

    if (newElement.type === 'view') {

    }
    else if (newElement.type === 'text') {

    }
    else if (newElement.type === 'image') {

    }
  }

  var children = newElement.children;
  if (children) {
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      render(domElement, child, null, i, viewPortDimensions, top + newElement.layout.top, left + newElement.layout.left);
    }
  }


}

module.exports = render;
