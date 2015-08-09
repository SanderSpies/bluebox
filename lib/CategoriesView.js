'use strict';

var BlueBox = require('./index');
var C = require('./components/C');

var View = BlueBox.create('view', {

  render: function(props, style, children) {
    return C('view', props, style, children || []);
  }

});

var Text = BlueBox.create('text', {

  render: function(props, style, children) {
    return C('text', {}, null, [props]);
  }

});

var Image = BlueBox.create('image', {

  render: function(props, style, children) {
    return C('image', props, style, []);
  }

});


var sharedStyle = {backgroundColor: 'green', border: 'solid 1px black', opacity: 1, width: 100, height: 100, margin: 5};
var sharedImageStyle = {width: 100, height: 100};


function onClick() {

}

module.exports = View({}, {backgroundColor: 'red'}, [
  View({},{
      height: 100,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      backgroundColor: 'black',
      opacity: .4
  }, [
    View({}, {width: 100, height: 100, backgroundColor: 'red'}, [Text('a')]),
    View({}, {width: 100, height: 100, backgroundColor: 'blue'}, [Text('b')])
  ]),
  View({}, {flexDirection: 'row'}, [
    View({}, {width: 600, height: 400, backgroundColor: 'black', overflow: 'hidden'}, [
      View({}, {flexDirection: 'row', margin: 20}, [
        View({onClick:onClick}, sharedStyle, [Text('a')]),
        View({}, sharedStyle, [Text('a')]),
        View({}, sharedStyle, [Text('a')]),
        View({}, sharedStyle, [Text('a')]),
        View({}, sharedStyle, [Text('a')]),
        View({}, sharedStyle, [Text('a')]),
        View({}, sharedStyle, [Text('a')]),
        View({}, sharedStyle, [Text('a')]),
        View({}, sharedStyle, [Text('a')]),
        View({}, sharedStyle, [Text('a')]),
        View({}, sharedStyle, [Text('a')]),
        View({}, sharedStyle, [Text('a')]),
        View({}, sharedStyle, [Text('a')])
      ]),
      View({}, {flexDirection: 'row', margin: 20}, [
        View({}, sharedStyle, [Image({src: 'images/foo.png', style: sharedImageStyle})]),
        View({}, sharedStyle, [Text('foobar')]),
        View({}, sharedStyle, [Text('a')]),
        View({}, {width: 300, height: 100, transform: 'scale(2,3)', backgroundColor: 'red', color:'white', margin: 5, opacity: 0.8}, [Text('a')]),
        View({}, sharedStyle, [Image({src: 'images/grumpy2.jpg', style: sharedImageStyle})]),
        View({}, sharedStyle, [Image({src: 'images/grumpy1.jpg', style: sharedImageStyle})]),
        View({},sharedStyle, [Image({src: 'images/cat_tardis.jpg', style: sharedImageStyle})]),
        View({},{
          width: 210, height: 100, backgroundColor: 'white', margin: 5, opacity: 1
        }, [])
      ])
    ]),
    View({}, {backgroundColor:'blue', height: 300, width: 300}, [

    ])
  ])
]);