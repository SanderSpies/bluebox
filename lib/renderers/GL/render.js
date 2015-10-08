'use strict';

var gl;
require('./temp-utils');
var renderView = require('./renderView');
var renderText = require('./renderText');
var Promise = require('promise');
var Shaders = require('./Shaders');
var VertexInfo = require('./VertexInfo');

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

  gl.uniform4f(image_u_dimensions, parentLeft, parentTop, parentLeft + parentWidth, parentTop + parentHeight);

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
  gl.uniformMatrix3fv(image_u_matrix, false, [
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
var view_a_color;
var view_a_position;
//var iPositionLocation;
var image_u_resolution;
var view_u_resolution;
var textCoord;
var image_a_position;
var image_u_matrix;
var view_u_dimensions;
var topElement;
var topOldElement;
var topDOMElement;
var image_u_dimensions;
var viewBuffer;
var texCoordBuffer;
var colorBuffer;
var vertices;
var indices;
var indexBuffer;
var colorsArray;
var arraybuff;
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
    //gl.clearColor(0,0,0,0);
    // remove shaders (not needed anymore after linking)
    gl.deleteShader(vertexShader);
    gl.deleteShader(vertexShader2);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(imageShader);

    gl.useProgram(viewProgram);

    view_u_resolution = gl.getUniformLocation(viewProgram, "u_resolution");
    view_u_dimensions = gl.getUniformLocation(viewProgram, 'u_dimensions');

    gl.uniform4f(view_u_dimensions, parentLeft, parentTop, parentLeft + parentWidth, parentTop + parentHeight);
    gl.uniform2f(view_u_resolution, 1 / viewPortDimensions.width, 1 / viewPortDimensions.height);

    viewBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, viewBuffer);

    view_a_position = gl.getAttribLocation(viewProgram, "a_position");
    view_a_color = gl.getAttribLocation(viewProgram, "a_color");

    // xyzrgba
    gl.vertexAttribPointer(view_a_position, 3, gl.SHORT, false, VertexInfo.STRIDE, 0);
    gl.enableVertexAttribArray(view_a_position);
    gl.vertexAttribPointer(view_a_color, 4, gl.UNSIGNED_BYTE, true, VertexInfo.STRIDE, 3 * Int16Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(view_a_color);

    indexBuffer = gl.createBuffer();

    //gl.useProgram(imageProgram);
    //
    //image_u_dimensions = gl.getUniformLocation(imageProgram, 'u_dimensions');
    //image_u_matrix = gl.getUniformLocation(imageProgram, "u_matrix");
    //image_u_resolution = gl.getUniformLocation(imageProgram, "u_resolution");
    //gl.uniform2f(image_u_resolution, viewPortDimensions.width, viewPortDimensions.height);
    //
    //texCoordBuffer = gl.createBuffer();
    //gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    //
    //image_a_position = gl.getAttribLocation(imageProgram, "a_position");
    //gl.vertexAttribPointer(image_a_position, 2, gl.FLOAT, false, 0, 0);
    //gl.enableVertexAttribArray(image_a_position);

    domElement.width = viewPortDimensions.width;
    domElement.height = viewPortDimensions.height;

    gl.viewport(0, 0, viewPortDimensions.width, viewPortDimensions.height);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.STENCIL_TEST);
        gl.enable(gl.DEPTH_TEST); // should enable according to 2011 new game conf presentation (ben vanik + co)
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    //
    //gl.useProgram(viewProgram);
    //gl.vertexAttribPointer(view_a_position, 3, gl.UNSIGNED_SHORT, false, VertexInfo.STRIDE, 0);
    //gl.enableVertexAttribArray(view_a_position);
    //gl.vertexAttribPointer(view_a_color, 4, gl.UNSIGNED_BYTE, true, VertexInfo.STRIDE, 3 * Uint16Array.BYTES_PER_ELEMENT);
    //gl.enableVertexAttribArray(view_a_color);
  }

  if (!newElement.parent) {
    var nrOfVertices = newElement.nrOfVertices;
    if (!arraybuff || arraybuff.byteLength !== (4 * nrOfVertices * VertexInfo.STRIDE)) {
      // vertex should be: [x,y,z,r,g,b,a]
      arraybuff = new ArrayBuffer(4 * nrOfVertices * VertexInfo.STRIDE);
      vertices = new Int16Array(arraybuff);
      colorsArray = new Uint8Array(arraybuff);
      indices = new Uint16Array(6 * nrOfVertices * VertexInfo.STRIDE);
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

  //console.info(newElement.type);
  if (newElement.type === 'view') {

    vertexPosition += renderView(vertices, indices, vertexPosition, colorsArray, newElement, oldElement, inheritedOpacity || 1.0, skip);

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
    var oldChildren = oldElement ? oldElement.children : null;
    if (children) {
      for (var i = 0, l = children.length; i < l; i++) {
        var child = children[i];
        if (newElement.style.overflow === 'hidden') {
          parentWidth = newElement.layout.width;
          parentLeft = newElement.layout.left;
          parentHeight = newElement.layout.height;
          parentTop = newElement.layout.top;
        }
        render(domElement, child, oldChildren ? oldChildren[i] : null, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity,
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

    if (!skip) {
      gl.bindBuffer(gl.ARRAY_BUFFER, viewBuffer);
    }

    gl.bufferData(gl.ARRAY_BUFFER, arraybuff, gl.STATIC_DRAW);

    if (!skip) { // skipIndices
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    }

    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    skip = true;
  }
}
var skip = false;

module.exports = render;
