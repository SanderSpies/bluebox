'use strict';

var gl;
require('./temp-utils');
var renderView = require('./renderView');
var renderText = require('./renderText');
var Promise = require('promise');
var Shaders = require('./Shaders');
var VertexInfo = require('./VertexInfo');
var isViewVisible = require('./isViewVisible');

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
var dynamicViewProgram;
var staticViewProgram;
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
var dynamicBuffer;
var texCoordBuffer;
var colorBuffer;
var vertices;
var dynamicIndices;
var staticIndices;
var indexBuffer;
var colorsArray;
var dynamicArrayBuffer;
var staticArrayBuffer;
var dynamicVertexPosition = 0;
var staticVertexPosition = 0;
var staticBuffer;

function getNoVisibleDOMNodes(element, viewPortDimensions) {
  var nrOfVisibleDOMNodes = 0;

  if (isViewVisible(element, viewPortDimensions)) {
    nrOfVisibleDOMNodes += 1;
  }

  if (element.children) {
    for (var i = 0, l = element.children.length; i < l; i++) {
      nrOfVisibleDOMNodes += getNoVisibleDOMNodes(element.children[i], viewPortDimensions);
    }
  }

  return nrOfVisibleDOMNodes;
}

var isBlending = false;

function render(domElement,
  newElement,
  oldElement,
  childIndex,
  viewPortDimensions,
  isParentTransparent,
  isOverflow,
  inheritedOpacity,
  inheritedZoom,
  inheritedFontSize,
  inheritedColor,
  inheritedFilter
  ) {

  if (!gl) {
    topDOMElement = domElement;
    gl = domElement.getContext('webgl', {depth: true, alpha: true, antialias: true});
    if (gl == null) {
      gl = domElement.getContext('experimental-webgl', {depth: true, alpha: true, antialias: true});
    }

    vertexShader = createShaderFromScriptElement(gl, "2d-vertex-shader");
    vertexShader2 = createShaderFromScriptElement(gl, "2d-vertex-shader2");
    fragmentShader = createShaderFromScriptElement(gl, "2d-fragment-shader");
    imageShader = createShaderFromScriptElement(gl, "2d-image-shader");

    dynamicViewProgram = createProgram(gl, [vertexShader, fragmentShader], ['a_color', 'a_position'], [0, 1]);
    staticViewProgram = createProgram(gl, [vertexShader, fragmentShader]);
    imageProgram = createProgram(gl, [vertexShader2, imageShader]);

    //gl.bindAttribLocation(dynamicViewProgram, 0,  )

    //gl.clearColor(0,0,0,0);
    // remove shaders (not needed anymore after linking)
    gl.deleteShader(vertexShader);
    gl.deleteShader(vertexShader2);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(imageShader);

    gl.useProgram(dynamicViewProgram);

    dynamicBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dynamicBuffer);

    view_a_position = gl.getAttribLocation(dynamicViewProgram, "a_position");
    view_a_color = gl.getAttribLocation(dynamicViewProgram, "a_color");

    staticBuffer = gl.createBuffer();
    // xyzrgba
    gl.vertexAttribPointer(view_a_position, 3, gl.FLOAT, false, VertexInfo.STRIDE, 0);
    gl.enableVertexAttribArray(view_a_position);
    gl.vertexAttribPointer(view_a_color, 4, gl.UNSIGNED_BYTE, true, VertexInfo.STRIDE, 3 * Float32Array.BYTES_PER_ELEMENT);
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
    console.info(gl.drawingBufferWidth);
    console.info(gl.drawingBufferHeight);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.STENCIL_TEST);
    gl.enable(gl.DEPTH_TEST);

    gl.depthFunc(gl.LESS);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    //
    //gl.useProgram(viewProgram);
    //gl.vertexAttribPointer(view_a_position, 3, gl.UNSIGNED_SHORT, false, VertexInfo.STRIDE, 0);
    //gl.enableVertexAttribArray(view_a_position);
    //gl.vertexAttribPointer(view_a_color, 4, gl.UNSIGNED_BYTE, true, VertexInfo.STRIDE, 3 * Uint16Array.BYTES_PER_ELEMENT);
    //gl.enableVertexAttribArray(view_a_color);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  }


  if (!newElement.parent) {
    var nrOfVertices = getNoVisibleDOMNodes(newElement, viewPortDimensions);

    if (!dynamicArrayBuffer || dynamicArrayBuffer.byteLength !== (4 * nrOfVertices * VertexInfo.STRIDE)) {
      //console.info(nrOfVertices);
      skip = false;
      // vertex should be: [x,y,z,r,g,b,a]
      dynamicArrayBuffer = new ArrayBuffer(4 * nrOfVertices * VertexInfo.STRIDE);
      vertices = new Float32Array(dynamicArrayBuffer);
      colorsArray = new Uint8Array(dynamicArrayBuffer);
      dynamicIndices = new Uint16Array(6 * nrOfVertices);
   }

    dynamicVertexPosition = 0;
    //gl.depthMask(false);

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

    //if (!isParentTransparent && newElement.style.opacity !== 1 && !isBlending) {
    //  gl.enable(gl.BLEND);
    //  isBlending = true;
    //  isParentTransparent = true;
    //  //isTransparent = true;
    //} else if (!isParentTransparent && isBlending){
    //  gl.disable(gl.BLEND);
    //  isBlending = false;
    //}

    dynamicVertexPosition += renderView(vertices, dynamicIndices, dynamicVertexPosition, colorsArray, newElement, oldElement, childIndex, inheritedOpacity || 1.0, skip);

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

        render(domElement, child, oldChildren ? oldChildren[i] : null, i, viewPortDimensions, isParentTransparent,
          newElement.style.overflow === 'hidden',
          inheritedOpacity,
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
    if (skip) {
      //gl.depthMask(true);
      gl.drawElements(gl.TRIANGLES, dynamicIndices.length, gl.UNSIGNED_SHORT, 0);
    }

    if (!skip) {
      gl.bufferData(gl.ARRAY_BUFFER, dynamicArrayBuffer, gl.DYNAMIC_DRAW);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, dynamicIndices, gl.STATIC_DRAW);
    }
    else {
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, dynamicArrayBuffer);
    }
    if (!skip) {
      //gl.depthMask(true);
      gl.drawElements(gl.TRIANGLES, dynamicIndices.length, gl.UNSIGNED_SHORT, 0);

      skip = true;
    }
  }
}
var skip = false;

module.exports = render;
