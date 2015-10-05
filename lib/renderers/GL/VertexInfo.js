'use strict';

/**
 * Helper for the Vertices.
 *
 * A vertex contains the following data:
 * [x,y,z,r,g,b,a]
 * [2, 2, 2, 1, 1, 1]
 * - TODO: add additional bytes
 * - XYZ for positioning
 * - RGBA for colors and alpha
 *
 * @type
 */
var VertexInfo = {

  STRIDE: Uint16Array.BYTES_PER_ELEMENT * 3 + Uint8Array.BYTES_PER_ELEMENT * 4

};

module.exports = VertexInfo;

