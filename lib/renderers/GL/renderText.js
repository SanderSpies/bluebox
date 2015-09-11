var textCanvas = document.createElement('canvas');
var textCanvasCtx = textCanvas.getContext('2d');

function drawTextOnCanvas(newElement, width, height, inheritedOpacity, inheritedColor) {
  textCanvasCtx.clearRect(0, 0, width, height);
  textCanvasCtx.canvas.width = width;
  textCanvasCtx.canvas.height = height;

  textCanvasCtx.font = newElement.style.fontStyle + ' ' +newElement.style.fontWeight + ' ' + newElement.style.fontSize + 'px ' + newElement.style.fontFamily;
  var textAlign = newElement.style.textAlign;
  textCanvasCtx.textAlign = newElement.style.textAlign;
  textCanvasCtx.textBaseline = "middle";
  textCanvasCtx.fillStyle = inheritedColor || "black";
  var left = 0;
  if (textAlign === 'right') {
    left = width;
  }
  else if (textAlign === 'center') {
    left = width / 2;
  }
  textCanvasCtx.fillText(newElement.children[0], left, newElement.style.fontSize / 2);
  return textCanvasCtx.canvas;
}

var u_matrixLoc;
function renderText(webGLContext, imageProgram, iTextLocation, newElement, inheritedOpacity, inheritedColor) {
  var layout = newElement.layout;
  var top = layout.top;
  var left = layout.left;
  var width = layout.width;
  var height = layout.height;
  var parent = newElement.parent;
  var parentLayout = parent.layout;
  var parentTop = parentLayout.top;
  var parentLeft = parentLayout.left;
  var parentWidth = parentLayout.width;
  var parentHeight = parentLayout.height;
  var parentRight = parentLayout.right;
  var parentBottom = parentLayout.bottom;

  webGLContext.useProgram(imageProgram);
  u_matrixLoc = webGLContext.getUniformLocation(imageProgram, "u_matrix");
  var foo = drawTextOnCanvas(newElement, parentWidth, parentHeight, inheritedOpacity, inheritedColor);


  var texCoordBuffer = webGLContext.createBuffer();
  webGLContext.uniform4f(webGLContext.getUniformLocation(imageProgram, 'u_dimensions'), parentLeft, parentTop, parentRight, parentBottom);
  webGLContext.pixelStorei(webGLContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
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
  webGLContext.texImage2D(webGLContext.TEXTURE_2D, 0, webGLContext.RGBA, webGLContext.RGBA, webGLContext.UNSIGNED_BYTE, foo);
  //webGLContext.activeTexture(webGLContext.TEXTURE0);
  // Set the parameters so we can render any size image.
  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_WRAP_S, webGLContext.CLAMP_TO_EDGE);
  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_WRAP_T, webGLContext.CLAMP_TO_EDGE);
  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_MIN_FILTER, webGLContext.NEAREST);

  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_MAG_FILTER, webGLContext.NEAREST);

  var dstX = parentLeft;
  var dstY = parentTop;
  var dstWidth = parentWidth;
  var dstHeight = parentHeight;

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

module.exports = renderText;