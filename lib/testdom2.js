'use strict';

var C = require('./components/C');

var foo = [];
for (var i = 0; i < 10000; i++) {
  foo.push(C('span', {key: i, style: {height: 30, flex:1, backgroundColor: Math.random() * 2 > 1 ? 'blue' : 'yellow'}}, [Math.random() * 2 > 1 ? 'yay' : 'hai']));
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
        //  backgroundColor: 'blue',
          flexDirection: 'column'
        }
      },
      foo)
  ]);