'use strict';

var C = require('./C');

function View(props, children) {
  return C('view', props, children);
}

module.exports = View;
