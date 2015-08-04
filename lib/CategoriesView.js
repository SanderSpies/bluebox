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

var sharedStyle = {backgroundColor: 'green', border: 'solid 1px black', opacity: 1, width: 100, height: 100, margin: 5};
var sharedImageStyle = {width: 100, height: 100};
module.exports = View({style: {backgroundColor: 'red'}}, [
  View({
    style: {
      height: 100,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      backgroundColor: 'black',
      opacity: .6
    }
  }, [
    View({style: {width: 100, height: 100, backgroundColor: 'red'}}, [Text('a')]),
    View({style: {width: 100, height: 100, backgroundColor: 'blue'}}, [Text('b')])
  ]),
  View({style:{flexDirection: 'row'}}, [
    View({style:{width: 600, height: 300, backgroundColor: 'black', overflow: 'hidden'}}, [
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
        View({style: sharedStyle}, [Image({src: 'images/grumpy2.jpg', style: sharedImageStyle})]),
        View({style: sharedStyle}, [Image({src: 'images/grumpy2.jpg', style: sharedImageStyle})]),
        View({style: sharedStyle}, [Text('a')]),
        View({style: sharedStyle}, [Text('a')]),
        View({style: sharedStyle}, [Text('a')]),
        View({style: sharedStyle}, [Image({src: 'images/grumpy2.jpg', style: sharedImageStyle})]),
        View({style: sharedStyle}, [Text('a')]),
        View({style: sharedStyle}, [Text('z')]),
      //  View({style: sharedStyle}, [Image({src: 'images/grumpy2.jpg', style: sharedImageStyle})]),
        View({style: sharedStyle}, [Image({src: 'images/grumpy1.jpg', style: sharedImageStyle})]),
        View({style: sharedStyle}, [Image({src: 'images/cat_tardis.jpg', style: sharedImageStyle})]),
        View({
          style: {
            width: 210, height: 100, backgroundColor: 'white', margin: 5, opacity: .2
          }
        }, null)
      ])
    ]),
    View({style:{backgroundColor:'blue', flex: 1, height: 300, width: 300}}, [

    ])
  ])
]);