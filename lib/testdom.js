'use strict';

var ObjectPool = require('./ObjectPool');
var C = require('./components/C');

var foo = [];
var style = {height: 30, flex: 1, backgroundColor: 'green'};
for (var i = 0; i < 5000; i++) {
  foo.push(C('span', {key: i, style: style}, ['yay' + i]));
}

module.exports = C('div', null,
  [
    C('div',{
        style: {
          backgroundColor: 'orange',
          flexDirection: 'row'
        }
    }),
    C('div',{
      style: {
        backgroundColor: 'orange',
        flexDirection: 'row'
      }
    }),
    C('div', {
        style: {
          backgroundColor: 'green',
          flexDirection: 'column'
        }
      },
      foo)
  ]);