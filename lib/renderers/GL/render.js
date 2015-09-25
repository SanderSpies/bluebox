'use strict';

var gl;
require('./temp-utils');
var renderView = require('./renderView');
var renderText = require('./renderText');
var Promise = require('promise');
var Shaders = require('./Shaders');

function isVisible(node, viewPortDimensions) {
  var nodeLayout = node.layout;
  return (nodeLayout.top >= viewPortDimensions.top && nodeLayout.top <= (viewPortDimensions.top + viewPortDimensions.height)) ||
    ((nodeLayout.top + nodeLayout.height) <= (viewPortDimensions.top + viewPortDimensions.height) && (nodeLayout.top + nodeLayout.height) >= viewPortDimensions.top) ||
    nodeLayout.top < viewPortDimensions.top && (nodeLayout.top + nodeLayout.height) > (viewPortDimensions.top + viewPortDimensions.height);
}

function rerender(domElement,
  newElement,
  oldElement,
  parent,
  position,
  viewPortDimensions,
  top,
  left) {
  return function() {
    render(domElement,
      newElement,
      oldElement,
      viewPortDimensions);
  }
}

var loadedImages = {};

function loadImageDirectly(src) {
  return loadedImages[src];
}

function loadImage(src) {
  return new Promise(function(resolve, reject) {
    // TODO: pool this
    var image = new Image();

    image.onload = function image$onload() {
      loadedImages[src] = image;
      resolve(image);
    };
    image.onerror = function image$onerror() {
      reject(image);
    };
    image.src = src;
  });
}

var existingImageTextures = {};

function getImageTexture(image, element) {
  if (existingImageTextures[element.props.src]) {
    return existingImageTextures[element.props.src];
  }
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  existingImageTextures[element.props.src] = texture;
  return texture;
}

function _renderImage(image, element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight) {
  //console.info(element.style);
  //return function(image) {

  // Create a texture.
  var texture = getImageTexture(image, element);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.uniform4f(u_dimensions, parentLeft, parentTop, parentLeft + parentWidth, parentTop + parentHeight);

  var dstX = left;
  var dstY = top;
  var dstWidth = width;
  var dstHeight = height;

  // convert dst pixel coords to clipspace coords
  var clipX = dstX / gl.canvas.width * 2 - 1;
  var clipY = dstY / gl.canvas.height * -2 + 1;
  var clipWidth = dstWidth / gl.canvas.width * 2;
  var clipHeight = dstHeight / gl.canvas.height * -2;

  // build a matrix that will stretch our
  // unit quad to our desired size and location
  gl.uniformMatrix3fv(u_matrixLoc, false, [
    clipWidth, 0, 0,
    0, clipHeight, 0,
    clipX, clipY, 1
  ]);

  return [
    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    1.0, 1.0];

  //webGLContext.drawArrays(webGLContext.TRIANGLES, 0, 6);

  // }
}

function _rejectedImageLoad() {
  // TODO
}

function setLoaded(element) {
  return function() {
    element.props.isLoaded = true;
  }
}

function renderImage(domElement, newComponentTree, oldComponentTree, element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight) {
  if (element.props && element.props.src) {
    if (!element.props.isLoaded) {
      loadImage(element.props.src)
        .then(setLoaded(element), _rejectedImageLoad)
        .then(rerender(domElement, newComponentTree, oldComponentTree, null, 0, viewPortDimensions, 0, 0));
    }
    else {
      //console.info('YUP');
      var image = loadImageDirectly(element.props.src);
      _renderImage(image, element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight);
    }
  }
}

var isViewRendering = false;
var isImageRendering = false;
var isTextRendering = false;
function switchToViewRendering() {
  if (!isViewRendering) {
    isViewRendering = true;
    isImageRendering = false;
    isTextRendering = false;

    gl.useProgram(viewProgram);
    //gl.bindBuffer(gl.ARRAY_BUFFER, viewBuffer);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  }
}

function switchToImageRendering() {
  if (!isImageRendering) {
    isImageRendering = true;
    isViewRendering = false;
    isTextRendering = false;

    gl.useProgram(imageProgram);

    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  }
}

var vertexShader;
var vertexShader2;
var fragmentShader;
var imageShader;
var imageProgram;
var viewProgram;
var colorLocation;
var positionLocation;
//var iPositionLocation;
var iResolutionLocation;
var resolutionLocation;
var textCoord;
var iTextLocation;
var u_matrixLoc;
var view_u_dimensions;
var topElement;
var topOldElement;
var topDOMElement;
var u_dimensions;
var viewBuffer;
var texCoordBuffer;
var colorsBuffer;
var verticesArray = [];
var colorsArray = [];

function isViewVisible(element) {
  return element.style && element.style.backgroundColor ||
    element.style && element.style.border;
}



var vertexPosition = 0;
function render(domElement,
  newElement,
  oldElement,
  viewPortDimensions,
  parentLeft,
  parentWidth,
  parentTop,
  parentHeight,
  inheritedOpacity,
  inheritedZoom,
  inheritedFontSize,
  inheritedColor,
  inheritedFilter) {

  if (!gl) {
    topDOMElement = domElement;
    gl = domElement.getContext('webgl');
    if (gl == null) {
      gl = domElement.getContext('experimental-webgl');
    }

    vertexShader = createShaderFromScriptElement(gl, "2d-vertex-shader");
    vertexShader2 = createShaderFromScriptElement(gl, "2d-vertex-shader2");
    fragmentShader = createShaderFromScriptElement(gl, "2d-fragment-shader");
    imageShader = createShaderFromScriptElement(gl, "2d-image-shader");

    viewProgram = createProgram(gl, [vertexShader, fragmentShader]);
    imageProgram = createProgram(gl, [vertexShader2, imageShader]);

    // remove shaders (not needed anymore after linking)
    gl.deleteShader(vertexShader);
    gl.deleteShader(vertexShader2);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(imageShader);

    gl.useProgram(viewProgram);
    viewBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, viewBuffer);

    positionLocation = gl.getAttribLocation(viewProgram, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    resolutionLocation = gl.getUniformLocation(viewProgram, "u_resolution");

    view_u_dimensions = gl.getUniformLocation(viewProgram, 'u_dimensions');
    u_dimensions = gl.getUniformLocation(imageProgram, 'u_dimensions');

    gl.uniform4f(gl.getUniformLocation(viewProgram, 'u_dimensions'), parentLeft, parentTop, parentLeft + parentWidth, parentTop + parentHeight);
    gl.uniform2f(resolutionLocation, 1 / viewPortDimensions.width, 1 / viewPortDimensions.height);

    gl.useProgram(imageProgram);
    texCoordBuffer = gl.createBuffer();

    iTextLocation = gl.getAttribLocation(imageProgram, "a_position");
    u_matrixLoc = gl.getUniformLocation(imageProgram, "u_matrix");
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.enableVertexAttribArray(iTextLocation);
    gl.vertexAttribPointer(iTextLocation, 2, gl.FLOAT, false, 0, 0);

    iResolutionLocation = gl.getUniformLocation(imageProgram, "u_resolution");

    gl.uniform2f(iResolutionLocation, viewPortDimensions.width, viewPortDimensions.height);

    colorsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
    colorLocation = gl.getAttribLocation(viewProgram, "aVertexColor");
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);

    domElement.width = viewPortDimensions.width;
    domElement.height = viewPortDimensions.height;
    gl.viewport(0, 0, viewPortDimensions.width, viewPortDimensions.height);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.STENCIL_TEST);
    gl.enable(gl.BLEND);


  }
  if (!newElement.parent) {
    var nrOfVertices = newElement.nrOfVertices;
    if (verticesArray.length !== nrOfVertices * 12) {
      verticesArray   = new Float32Array(nrOfVertices * 12);
      colorsArray     = new Float32Array(nrOfVertices * 24);

      // can we allocate more here?!
    }

    vertexPosition = 0;
  }

  if (typeof newElement === 'string') {
    return;
  }

  // fixme: if (newElement && !oldElement) {
  if (!newElement.layout) {
    return;
  }

  if (newElement.type === 'view') {

    switchToViewRendering();

    vertexPosition += renderView(verticesArray, vertexPosition, colorsArray, newElement, inheritedOpacity || 1.0);
    //console.info(verticesArray);
    //vertexPosition++;

    var style = newElement.style;
    if ('opacity' in style) {
      inheritedOpacity = (inheritedOpacity || 1.0) * style.opacity;
    }
    if (style.fontSize) {
      inheritedFontSize = style.fontSize;
    }
    if (style.zoom) {
      inheritedZoom = (inheritedZoom || 1.0) * style.zoom;
    }
    if (style.color) {
      inheritedColor = style.color;
    }
    if (style.filter) {
      // complex...
    }

    var children = newElement.children;
    if (children) {
      for (var i = 0, l = children.length; i < l; i++) {
        var child = children[i];
        if (newElement.style.overflow === 'hidden') {
          parentWidth = newElement.layout.width;
          parentLeft = newElement.layout.left;
          parentHeight = newElement.layout.height;
          parentTop = newElement.layout.top;
        }

        render(domElement, child, null, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity,
          inheritedZoom,
          inheritedFontSize,
          inheritedColor,
          inheritedFilter);
      }
    }
  }
  else if (newElement.type === 'text') {
    //switchToImageRendering();
    //var data = renderText(webGLContext, imageProgram, u_dimensions, u_matrixLoc, iTextLocation, texCoordBuffer, newElement, inheritedOpacity || 1, inheritedColor);
    // if (data) {
    //   bigArray = bigArray.concat(data);
    // }
  }
  else if (newElement.type === 'image') {
    //switchToImageRendering();
    //var data = renderImage(topDOMElement, topElement, topOldElement, newElement, top, left, newElement.layout.width, newElement.layout.height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity || 1, inheritedColor);
    // if (data) {
    //   bigArray = bigArray.concat(data);
    // }
  }
  if (!newElement.parent) {
    // TODO: set image information here :-/

    // render all the views at once...
    gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colorsArray, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, viewBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesArray, gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, verticesArray.length / 2);

    //switchToImageRendering();

    // TODO: render all images at once here...

    //var verticesBuffer = webGLContext.createBuffer();
    //webGLContext.bindBuffer(webGLContext.ELEMENT_ARRAY_BUFFER, verticesBuffer);
    //webGLContext.bufferData(webGLContext.ELEMENT_ARRAY_BUFFER, new Uint16Array(verticesArray), webGLContext.STATIC_DRAW);
    //webGLContext.drawElements(webGLContext.TRIANGLES, verticesArray.length / 2, webGLContext.UNSIGNED_SHORT, 0);

    //gl.clearColor(0,0,0,0);
    //gl.clear(gl.COLOR_BUFFER_BIT);
  }
}

module.exports = render;
