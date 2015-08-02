'use strict';

var C = require('./components/C');

function View(props, children) {
  return C('view', props, children);
}

function Text(text) {
  return C('text', null, [text]);
}

function Image(props) {
  return C('image', props, null);
}

var sharedStyle = {backgroundColor: 'green', border: 'solid 1px black', opacity: 1, width: 100, height: 100};
var sharedImageStyle = {width: 100, height: 100};
module.exports = View({}, [
  View({style: {height: 100}}, []),
  View({style: {flexDirection: 'row', margin: 20}}, [
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Text('a')])
  ]),
  View({style: {flexDirection: 'row', margin: 20}}, [
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Text('a')]),
    View({style: sharedStyle}, [Image({src: 'images/grumpy2.jpg', style: sharedImageStyle})]),
    View({style: sharedStyle}, [Image({src: 'images/grumpy1.jpg', style: sharedImageStyle})]),
    View({style: sharedStyle}, [Image({src: 'images/grumpy2.jpg', style: sharedImageStyle})])
  ])

]);