'use strict';

var loadedImages = {

};

function loadImage(src) {
  return new Promise(function(resolve, reject){
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


function loadImageDirectly(src) {
  return loadedImages[src];
}

function _renderImage(webGLContext, imageProgram, texCoordBuffer, iTextLocation, u_matrixLoc, image, element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight) {
  //return function(image) {
  webGLContext.useProgram(imageProgram);


  webGLContext.blendFunc(webGLContext.ONE, webGLContext.ONE_MINUS_SRC_ALPHA);
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
      var image = loadImageDirectly(element.props.src);
      _renderImage(image, element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight);
    }
  }
}

var ImageRenderer = {

  renderImage: function() {

  },

  releaseUnusedImages: function() {

  }

};

module.exports = renderImage;