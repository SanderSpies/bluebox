'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./C');

var Text = Bluebox.create('text', function(props, style, children) {
    return C('text', {}, style, [props]);
});

module.exports = Text;
