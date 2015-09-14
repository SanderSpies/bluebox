'use strict';

var webGLContext;
require('./temp-utils');
var renderView = require('./renderView');
var renderText = require('./renderText');
var Promise = require('promise');

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
      parent,
      position,
      viewPortDimensions,
      top,
      left);
  }
}



var loadedImages = {

};

function loadImageDirectly(src) {
  return loadedImages[src];
}


function loadImage(src) {
  return new Promise(function(resolve, reject){
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
  var texture = webGLContext.createTexture();
  webGLContext.bindTexture(webGLContext.TEXTURE_2D, texture);
  webGLContext.texImage2D(webGLContext.TEXTURE_2D, 0, webGLContext.RGBA, webGLContext.RGBA, webGLContext.UNSIGNED_BYTE, image);
  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_WRAP_S, webGLContext.CLAMP_TO_EDGE);
  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_WRAP_T, webGLContext.CLAMP_TO_EDGE);
  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_MIN_FILTER, webGLContext.NEAREST);
  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_MAG_FILTER, webGLContext.NEAREST);
  existingImageTextures[element.props.src] = texture;
  return texture;
}

function _renderImage(image, element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight) {
  //console.info(element.style);
  //return function(image) {


  // Create a texture.
  var texture = getImageTexture(image, element);
  webGLContext.bindTexture(webGLContext.TEXTURE_2D, texture);

  webGLContext.uniform4f(u_dimensions, parentLeft, parentTop, parentLeft + parentWidth, parentTop + parentHeight);

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

  return [
    0.0,  0.0,
    1.0,  0.0,
    0.0,  1.0,
    0.0,  1.0,
    1.0,  0.0,
    1.0,  1.0];

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
    } else {
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

    webGLContext.useProgram(viewProgram);
    webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, viewBuffer);
    webGLContext.blendFuncSeparate(webGLContext.SRC_ALPHA, webGLContext.ONE_MINUS_SRC_ALPHA, webGLContext.ONE, webGLContext.ONE_MINUS_SRC_ALPHA);

    webGLContext.enableVertexAttribArray(positionLocation);
    webGLContext.vertexAttribPointer(positionLocation, 2, webGLContext.FLOAT, false, 0, 0);
  }
}

function switchToImageRendering() {
  if (!isImageRendering) {
    isImageRendering = true;
    isViewRendering = false;
    isTextRendering = false;


    webGLContext.useProgram(imageProgram);

    webGLContext.pixelStorei(webGLContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    webGLContext.blendFunc(webGLContext.ONE, webGLContext.ONE_MINUS_SRC_ALPHA);

    webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, texCoordBuffer);
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
var bigArray = [];
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
  parentHeight,
  inheritedOpacity,
  inheritedZoom,
  inheritedFontSize,
  inheritedColor,
  inheritedFilter) {

  if (!webGLContext)  {
    topDOMElement = domElement;
    webGLContext = domElement.getContext('webgl');
    if(webGLContext == null){
      webGLContext = domElement.getContext('experimental-webgl');
    }


    vertexShader = createShaderFromScriptElement(webGLContext, "2d-vertex-shader");
    vertexShader2 = createShaderFromScriptElement(webGLContext, "2d-vertex-shader2");
    fragmentShader = createShaderFromScriptElement(webGLContext, "2d-fragment-shader");
    imageShader = createShaderFromScriptElement(webGLContext, "2d-image-shader");

    viewProgram = createProgram(webGLContext, [vertexShader, fragmentShader]);
    imageProgram = createProgram(webGLContext, [vertexShader2, imageShader]);


    webGLContext.useProgram(viewProgram);
    viewBuffer = webGLContext.createBuffer();

    positionLocation = webGLContext.getAttribLocation(viewProgram, "a_position");
    textCoord = webGLContext.getAttribLocation(viewProgram, "a_textCoord");
    resolutionLocation = webGLContext.getUniformLocation(viewProgram, "u_resolution");
    colorLocation = webGLContext.getUniformLocation(viewProgram, "u_color");
    view_u_dimensions = webGLContext.getUniformLocation(viewProgram, 'u_dimensions');
    u_dimensions = webGLContext.getUniformLocation(imageProgram, 'u_dimensions');


    webGLContext.uniform4f(webGLContext.getUniformLocation(viewProgram, 'u_dimensions'), parentLeft, parentTop, parentLeft + parentWidth, parentTop + parentHeight);
    webGLContext.uniform2f(resolutionLocation, viewPortDimensions.width, viewPortDimensions.height);

    webGLContext.useProgram(imageProgram);
    texCoordBuffer = webGLContext.createBuffer();
    iTextLocation = webGLContext.getAttribLocation(imageProgram, "a_position");
    u_matrixLoc = webGLContext.getUniformLocation(imageProgram, "u_matrix");
    webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, texCoordBuffer);
    webGLContext.enableVertexAttribArray(iTextLocation);
    webGLContext.vertexAttribPointer(iTextLocation, 2, webGLContext.FLOAT, false, 0, 0);

    iResolutionLocation = webGLContext.getUniformLocation(imageProgram, "u_resolution");

    webGLContext.uniform2f(iResolutionLocation, viewPortDimensions.width, viewPortDimensions.height);

    domElement.width = viewPortDimensions.width;
    domElement.height = viewPortDimensions.height;
    webGLContext.viewport(0, 0, viewPortDimensions.width, viewPortDimensions.height);
    webGLContext.enable(webGLContext.BLEND);
  }
  if (!newElement.parentReference.parent) {
    topElement = newElement;
    topOldElement = oldElement;
    bigArray = [];
  }

  //webGLContext.clearColor(0.0, 0.0, 0.0, 1.0);                      // Set clear color to black, fully opaque
  //webGLContext.enable(webGLContext.DEPTH_TEST);                               // Enable depth testing
  //webGLContext.depthFunc(webGLContext.LEQUAL);                                // Near things obscure far things
  //  webGLContext.clear(webGLContext.COLOR_BUFFER_BIT|webGLContext.DEPTH_BUFFER_BIT);

  if (!parentWidth) {
    parentWidth = viewPortDimensions.width;
    parentLeft = 0;
    parentHeight = viewPortDimensions.height;
    parentTop = 0;
  }

  if (typeof newElement === 'string' || !isVisible(newElement, viewPortDimensions))  {
//    return;
  }

  //if (newElement === oldElement) {
    //return;
 // }
 // fixme: if (newElement && !oldElement) {
    if (!newElement.layout) {
      return;
    }

    if (newElement.type === 'view') {

      switchToViewRendering();

      var data = renderView(webGLContext, view_u_dimensions, newElement, colorLocation, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity || 1);
      if (data) {
        bigArray = bigArray.concat(data);
      }

        var style = newElement.style;
        if ('opacity' in style) {
          inheritedOpacity = (inheritedOpacity || 1) * style.opacity;
        }
        if (style.fontSize) {
          inheritedFontSize = style.fontSize;
        }
        if (style.zoom) {
          inheritedZoom = (inheritedZoom || 1) * style.zoom;
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
          render(domElement, child, null, newElement, i, viewPortDimensions, newElement.layout.top, newElement.layout.left, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity,
            inheritedZoom,
            inheritedFontSize,
            inheritedColor,
            inheritedFilter);
        }
      }
    }
    else if (newElement.type === 'text') {
     switchToImageRendering();
     var data = renderText(webGLContext, imageProgram, u_dimensions, u_matrixLoc, iTextLocation, texCoordBuffer, newElement, inheritedOpacity || 1, inheritedColor);
      if (data) {
        bigArray = bigArray.concat(data);
      }
    }
    else if (newElement.type === 'image') {
     switchToImageRendering();
     var data = renderImage(topDOMElement, topElement, topOldElement, newElement, top, left, newElement.layout.width, newElement.layout.height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity || 1, inheritedColor);
      if (data) {
        bigArray = bigArray.concat(data);
      }
    }
  if (!newElement.parentReference.parent) {
    // TODO: set image information here :-/
    webGLContext.bufferData(webGLContext.ARRAY_BUFFER, new Float32Array(bigArray), webGLContext.STATIC_DRAW);
    webGLContext.drawArrays(webGLContext.TRIANGLES, 0, bigArray.length / 2);
  }
}



module.exports = render;
