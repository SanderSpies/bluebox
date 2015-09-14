/**
 * Text caching:
 * - create canvas for each new text elements for performance
 * - only remove text elements when not rendering text to the screen anymore
 */

var textCaching = {};
var textCanvas = document.createElement('canvas');
var textCanvasCtx = textCanvas.getContext('2d');
function drawTextOnCanvas(webgl, newElement, width, height, inheritedOpacity, inheritedColor) {
  var text = newElement.children[0];
  var font = newElement.style.fontStyle + ' ' + newElement.style.fontWeight + ' ' + newElement.style.fontSize + 'px ' + newElement.style.fontFamily;
  var textAlign = newElement.style.textAlign;
  var textBaseLine = 'middle';
  var fillStyle = inheritedColor || "black";

  var uniqueKey = text + font + width + height + textAlign + textBaseLine + fillStyle;
  if(textCaching[uniqueKey]){
    return textCaching[uniqueKey];
  }


  textCanvasCtx.clearRect(0, 0, width, height);
  textCanvasCtx.canvas.width = width;
  textCanvasCtx.canvas.height = height;
  textCanvasCtx.font = font;
  textCanvasCtx.textAlign = newElement.style.textAlign;
  textCanvasCtx.textBaseline = textBaseLine;
  textCanvasCtx.fillStyle = fillStyle;
  var left = 0;
  if (textAlign === 'right') {
    left = width;
  }
  else if (textAlign === 'center') {
    left = width / 2;
  }
  textCanvasCtx.fillText(text, left, newElement.style.fontSize / 2);
  var canvas = textCanvasCtx.canvas;
  var texture = webgl.createTexture();
  webgl.bindTexture(webgl.TEXTURE_2D, texture);
  webgl.pixelStorei(webgl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.CLAMP_TO_EDGE);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.CLAMP_TO_EDGE);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.NEAREST);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.NEAREST);

  webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA, webgl.RGBA, webgl.UNSIGNED_BYTE, textCanvas);
  textCaching[uniqueKey] = texture;

  return texture;
}

var u_matrixLoc;
function renderText(webgl, imageProgram, u_dimensions, u_matrixLoc, iTextLocation, texCoordBuffer, newElement, inheritedOpacity, inheritedColor) {
  var layout = newElement.layout;
  var top = layout.top;
  var left = layout.left;
  var width = layout.width;
  var height = layout.height;
  var parent = newElement.parentReference.parent;
  var parentLayout = parent.layout;
  var parentTop = parentLayout.top;
  var parentLeft = parentLayout.left;
  var parentWidth = parentLayout.width;
  var parentHeight = parentLayout.height;
  var parentRight = parentLayout.right;
  var parentBottom = parentLayout.bottom;

  webgl.useProgram(imageProgram);


  webgl.uniform4f(u_dimensions, parentLeft, parentTop, parentRight, parentBottom);
  webgl.blendFunc(webgl.ONE, webgl.ONE_MINUS_SRC_ALPHA);
  webgl.bindBuffer(webgl.ARRAY_BUFFER, texCoordBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array([
    0.0,  0.0,
    1.0,  0.0,
    0.0,  1.0,
    0.0,  1.0,
    1.0,  0.0,
    1.0,  1.0]), webgl.STATIC_DRAW);
  webgl.enableVertexAttribArray(iTextLocation);
  webgl.vertexAttribPointer(iTextLocation, 2, webgl.FLOAT, false, 0, 0);

  var texture = drawTextOnCanvas(webgl, newElement, parentWidth, parentHeight, inheritedOpacity, inheritedColor);
  // Create a texture.

  webgl.bindTexture(webgl.TEXTURE_2D, texture);
  // Upload the image into the texture.

  //webGLContext.activeTexture(webGLContext.TEXTURE0);
  // Set the parameters so we can render any size image.

  var dstX = parentLeft;
  var dstY = parentTop;
  var dstWidth = parentWidth;
  var dstHeight = parentHeight;

  // convert dst pixel coords to clipspace coords
  var clipX = dstX / webgl.canvas.width  *  2 - 1;
  var clipY = dstY / webgl.canvas.height * -2 + 1;
  var clipWidth = dstWidth  / webgl.canvas.width  *  2;
  var clipHeight = dstHeight / webgl.canvas.height * -2;

  // build a matrix that will stretch our
  // unit quad to our desired size and location
  webgl.uniformMatrix3fv(u_matrixLoc, false, [
    clipWidth, 0, 0,
    0, clipHeight, 0,
    clipX, clipY, 1
  ]);

  webgl.drawArrays(webgl.TRIANGLES, 0, 6);
}

var TextRenderer = {

  renderText: function() {

  },

  cleanTextCaching: function() {

  }

};

module.exports = renderText;
