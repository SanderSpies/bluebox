// xyzrgba triangle test [2 2 2 2 1 1 1]
require('./temp-utils');
var VertexInfo = require('./VertexInfo');

var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');
gl.viewportWidth = canvas.width;
gl.viewportHeight = canvas.height;

var triangleData = [
  0,  100,  0.0, 255, 0, 0,
  0, 200,  0,  255, 0, 0,
  60, 70,  0,  255, 0, 0
];

var vertexShader = createShaderFromScriptElement(gl, "2d-vertex-shader");
var fragmentShader = createShaderFromScriptElement(gl, "2d-fragment-shader");

var viewProgram = createProgram(gl, [vertexShader, fragmentShader]);

gl.useProgram(viewProgram);

var view_u_resolution = gl.getUniformLocation(viewProgram, "u_resolution");
var view_u_dimensions  = gl.getUniformLocation(viewProgram, 'u_dimensions');

gl.uniform4f(view_u_dimensions, 0, 0,  document.body.clientWidth, document.body.clientHeight);
gl.uniform2f(view_u_resolution, 1 / document.body.clientWidth, 1 / document.body.clientHeight);

var view_a_position = gl.getAttribLocation(viewProgram, "a_position");
var view_a_color = gl.getAttribLocation(viewProgram, "a_color");

// xyzrgba

var verticesBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
var stride = 7 * Float32Array.BYTES_PER_ELEMENT;
gl.vertexAttribPointer(view_a_position, 3, gl.FLOAT, false, stride, 0);
gl.enableVertexAttribArray(view_a_position);
//gl.vertexAttribPointer(view_a_color, 4, gl.FLOAT, true, stride, 3 * Float32Array.BYTES_PER_ELEMENT);
//gl.enableVertexAttribArray(view_a_color);


gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleData), gl.STATIC_DRAW);

var indexArray = [0, 1, 2];
var indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Float32Array(indexArray), gl.STATIC_DRAW)
gl.drawElements(gl.TRIANGLES, indexArray.length, gl.UNSIGNED_SHORT, 0);
//gl.drawArrays(gl.TRIANGLES, 0, 3);