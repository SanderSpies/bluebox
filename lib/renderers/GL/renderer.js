'use strict';

var webGLContext;
require('./temp-utils');
var renderView = require('./renderView');

function isVisible(node, viewPortDimensions) {
  var nodeLayout = node.layout;
  return (nodeLayout.top >= viewPortDimensions.top && nodeLayout.top <= (viewPortDimensions.top + viewPortDimensions.height)) ||
    ((nodeLayout.top + nodeLayout.height) <= (viewPortDimensions.top + viewPortDimensions.height) && (nodeLayout.top + nodeLayout.height) >= viewPortDimensions.top) ||
    nodeLayout.top < viewPortDimensions.top && (nodeLayout.top + nodeLayout.height) > (viewPortDimensions.top + viewPortDimensions.height);
}



function loadImage(src) {
  return new Promise(function(resolve, reject){
    // TODO: pool this
    var image = new Image();

    image.onload = function() {
      resolve(image);
    };
    image.onerror = function() {
      reject(image);
    };
    image.src = src;
  });
}

function _renderImage(element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth) {
  return function(image) {
    webGLContext.useProgram(imageProgram);

    iTextLocation = webGLContext.getAttribLocation(imageProgram, "a_position");

    var texCoordBuffer = webGLContext.createBuffer();
    webGLContext.uniform1f(webGLContext.getUniformLocation(imageProgram, 'u_parentWidth'), parentLeft + parentWidth);
    webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, texCoordBuffer);
    webGLContext.bufferData(webGLContext.ARRAY_BUFFER, new Float32Array([
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0]), webGLContext.STATIC_DRAW);
    webGLContext.enableVertexAttribArray(iTextLocation);
    webGLContext.vertexAttribPointer(iTextLocation, 2, webGLContext.FLOAT, false, 0, 0);


    // Create a texture.
    var texture = webGLContext.createTexture();
    webGLContext.bindTexture(webGLContext.TEXTURE_2D, texture);
    // Upload the image into the texture.
    webGLContext.texImage2D(webGLContext.TEXTURE_2D, 0, webGLContext.RGBA, webGLContext.RGBA, webGLContext.UNSIGNED_BYTE, image);
    //webGLContext.activeTexture(webGLContext.TEXTURE0);
    // Set the parameters so we can render any size image.
    webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_WRAP_S, webGLContext.CLAMP_TO_EDGE);
    webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_WRAP_T, webGLContext.CLAMP_TO_EDGE);
    webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_MIN_FILTER, webGLContext.NEAREST);

    webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_MAG_FILTER, webGLContext.NEAREST);

    var dstX = left;
    var dstY = top;
    var dstWidth = width;
    var dstHeight = height;

    // convert dst pixel coords to clipspace coords
    var clipX = dstX / webGLContext.canvas.width  *  2 - 1;
    var clipY = dstY / webGLContext.canvas.height * -2 + 1;
    var clipWidth = dstWidth  / webGLContext.canvas.width  *  2;
    var clipHeight = dstHeight / webGLContext.canvas.height * -2;

    // build a matrix that will stretch our
    // unit quad to our desired size and location
    webGLContext.uniformMatrix3fv(u_matrixLoc, false, [
      clipWidth, 0, 0,
      0, clipHeight, 0,
      clipX, clipY, 1
    ]);

    webGLContext.drawArrays(webGLContext.TRIANGLES, 0, 6);
  }
}

function _rejectedImageLoad() {
  // TODO
}

function renderImage(element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth) {
  if (element.props && element.props.src) {
    loadImage(element.props.src)
      .then(_renderImage(element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth), _rejectedImageLoad);
  }
}

var textCanvas = document.createElement('canvas');
var textCanvasCtx = textCanvas.getContext('2d');

function drawTextOnCanvas(newElement, top, left, width, height, parentLeft, parentWidth) {
  textCanvasCtx.canvas.width = 200 || width;
  textCanvasCtx.canvas.height = 200 || height;
  textCanvasCtx.font = "20px monospace";
  textCanvasCtx.textAlign = "center";
  textCanvasCtx.textBaseline = "middle";
  textCanvasCtx.fillStyle = "black";
  textCanvasCtx.clearRect(0, 0, textCanvasCtx.canvas.width, textCanvasCtx.canvas.height);
  textCanvasCtx.fillText(newElement.children[0], width / 2, height / 2);
  return textCanvasCtx.canvas;
}

function renderText(newElement, top, left, width, height, parentLeft, parentWidth) {
  var textCanvas = drawTextOnCanvas(newElement, top, left, width, height, parentWidth);
  var textWidth  = textCanvas.width;
  var textHeight = textCanvas.height;
  var textTex = webGLContext.createTexture();
  webGLContext.bindTexture(webGLContext.TEXTURE_2D, textTex);
  webGLContext.texImage2D(webGLContext.TEXTURE_2D, 0, webGLContext.RGBA, webGLContext.RGBA, webGLContext.UNSIGNED_BYTE, textCanvas);
// make sure we can render it even if it's not a power of 2
  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_MIN_FILTER, webGLContext.LINEAR);
  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_WRAP_S, webGLContext.CLAMP_TO_EDGE);
  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_WRAP_T, webGLContext.CLAMP_TO_EDGE);
}

function calculatePosition(scale, px) {
  return -1 + (2 / scale * px);
}
var vertexShader;
var vertexShader2;
var fragmentShader;
var imageShader;
var imageProgram;
var viewProgram;
var colorLocation;
var positionLocation;
var iPositionLocation;
var iResolutionLocation;
var resolutionLocation;
var textCoord;
var iTextLocation;
var u_matrixLoc;
function render(domElement,
  newElement,
  oldElement,
  parent,
  position,
  viewPortDimensions,
  top,
  left,
  parentLeft,
  parentWidth,
  parentTop,
  parentHeight) {
  if (!webGLContext) {
    webGLContext = domElement.getContext('webgl',  {preserveDrawingBuffer: true });
    domElement.width = viewPortDimensions.width;
    domElement.height = viewPortDimensions.height;
    webGLContext.viewport(0, 0, viewPortDimensions.width, viewPortDimensions.height);
    webGLContext.enable(webGLContext.BLEND);
    webGLContext.blendFunc(webGLContext.SRC_ALPHA, webGLContext.ONE_MINUS_SRC_ALPHA);
    vertexShader = createShaderFromScriptElement(webGLContext, "2d-vertex-shader");
    vertexShader2 = createShaderFromScriptElement(webGLContext, "2d-vertex-shader2");
    fragmentShader = createShaderFromScriptElement(webGLContext, "2d-fragment-shader");
    imageShader = createShaderFromScriptElement(webGLContext, "2d-image-shader");

    viewProgram = createProgram(webGLContext, [vertexShader, fragmentShader]);
    imageProgram = createProgram(webGLContext, [vertexShader2, imageShader]);


    webGLContext.useProgram(viewProgram);

    positionLocation = webGLContext.getAttribLocation(viewProgram, "a_position");
    textCoord = webGLContext.getAttribLocation(viewProgram, "a_textCoord");
    resolutionLocation = webGLContext.getUniformLocation(viewProgram, "u_resolution");
    colorLocation = webGLContext.getUniformLocation(viewProgram, "u_color");

    webGLContext.uniform2f(resolutionLocation, viewPortDimensions.width, viewPortDimensions.height);

    webGLContext.useProgram(imageProgram);

    var u_imageLoc = webGLContext.getUniformLocation(imageProgram, "u_image");
    u_matrixLoc = webGLContext.getUniformLocation(imageProgram, "u_matrix");
    iPositionLocation = webGLContext.getAttribLocation(imageProgram, "a_position");

    iResolutionLocation = webGLContext.getUniformLocation(imageProgram, "u_resolution");

    webGLContext.uniform2f(iResolutionLocation, viewPortDimensions.width, viewPortDimensions.height);
  }

  if (!parentWidth) {
    parentWidth = viewPortDimensions.width;
    parentLeft = 0;
    parentHeight = viewPortDimensions.height;
    parentTop = 0;
  }

  if (typeof newElement === 'string' || !isVisible(newElement, viewPortDimensions))  {
    return;
  }

  if (newElement === oldElement) {
    return;
  }
  if (newElement && !oldElement) {
    if (!newElement.layout) {
      return;
    }

    if (newElement.type === 'view') {
      renderView(webGLContext, viewProgram, newElement, top, left, colorLocation, positionLocation, parentLeft, parentWidth);

      var children = newElement.children;
      if (children) {
        for (var i = 0, l = children.length; i < l; i++) {
          var child = children[i];
          if (newElement.props && newElement.props.style && newElement.props.style.overflow === 'hidden') {
            parentWidth = newElement.layout.width - newElement.layout.right;
            parentLeft = left + newElement.layout.left;
            parentHeight = newElement.layout.height - newElement.layout.bottom;
            parentTop = top + newElement.layout.top;
          }
          render(domElement, child, null, newElement, i, viewPortDimensions, top + newElement.layout.top, left + newElement.layout.left, parentLeft, parentWidth, parentTop, parentHeight);
        }
      }

    }
    else if (newElement.type === 'text') {
      renderText(newElement, top, left, newElement.layout.width, newElement.layout.height, parentLeft, parentWidth);
    }
    else if (newElement.type === 'image') {
      renderImage(newElement, top, left, newElement.layout.width, newElement.layout.height, viewPortDimensions, parentLeft, parentWidth);
    }
  }

}

module.exports = render;
