'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./C');

var Image = Bluebox.create('image', function render(props, style, children) {
  props.isLoaded = false;
  return C('image', props, style, []);
});

module.exports = Image;
