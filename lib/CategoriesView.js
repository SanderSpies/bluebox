'use strict';

var C = require('./components/C');

function L(props, children) {
  return C('div', props, children);
}

var sharedStyle = {backgroundColor: 'blue', width: 100, height: 100};
module.exports = L({}, [
  L({style: {height: 100}}, []),
  L({style:{flexDirection: 'row', margin: 20}}, [
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a'])
  ]),
  L({style:{flexDirection: 'row', margin: 20}}, [
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a']),
    L({style:sharedStyle}, ['a'])
  ])

]);