'use strict';

var C = require('./C');

function Text(str) {
  return C('text', null, [str]);
}

module.exports = Text;