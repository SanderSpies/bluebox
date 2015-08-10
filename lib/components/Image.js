'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./C');

var Image = Bluebox.create('view', function render(props, style, children) {
  return C('image', props, style, []);
});

module.exports = Image;
