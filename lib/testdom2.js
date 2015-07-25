'use strict';

var C = require('./components/C');

var foo = [];
var style = {height: 30, flex:1, backgroundColor: Math.random() * 2 < 1 ? 'yellow' : 'yellow'};
for (var i = 0; i < 5000; i++) {
  foo.push(C('span', {key: i, style: style}, ['hai' + i]));
}
//foo[100].props.style.backgroundColor = 'green';
foo[5].children[0] = 'yay100';

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
          backgroundColor: 'blue',
          flexDirection: 'column'
        }
      },
      foo)
  ]);