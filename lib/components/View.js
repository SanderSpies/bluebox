'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./C');

var View = Bluebox.create('view', function render(props, style, children) {
  return C('view', props, style, children || []);
});

module.exports = View;
