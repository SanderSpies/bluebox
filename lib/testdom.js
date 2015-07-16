'use strict';

var ObjectPool = require('./ObjectPool');
var C = require('./components/C');

var foo = [];
for (var i = 0; i < 10000; i++) {
  foo.push(C('span', {key: i, style: {height: 30, flex: 1}}, ['yay']));
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
          backgroundColor: 'orange',
          flexDirection: 'column'
        }
      },
      foo)
  ]);