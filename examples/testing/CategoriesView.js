'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./../../lib/components/C');

var Image = Bluebox.Components.Image;
var Text = Bluebox.Components.Text;
var View = Bluebox.Components.View;

var sharedStyle = {backgroundColor: 'green', opacity: 1, width: 100, height: 100, marginTop: 5, marginBottom: 5, marginLeft: 5, marginRight: 5};
var sharedImageStyle = {width: 100, height: 100};

function onClick(component, e) {
  Bluebox.update(component).withProperties({foo: 'foo'});
}

module.exports = View({}, {backgroundColor: 'red'}, [
  View({},{
      height: 300,
      justifyContent: 'space-around',
      flexDirection: 'row',
      backgroundColor: 'black',
      opacity: .4,
      alignItems: 'center'
  }, [
    View({}, {height: 100, backgroundColor: 'green', flexGrow: 1}, [Text('a')]),
    View({}, {height: 100, backgroundColor: 'red', flexGrow: 1}, [Text('a')]),
    View({}, {height: 100, backgroundColor: 'blue', flexGrow: 4}, [Text('b')])
  ]),
  View({}, {flexDirection: 'row'}, [
    View({}, {width: 600, height: 400, backgroundColor: 'black', overflow: 'hidden'}, [
      View({}, {flexDirection: 'row', marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20}, [
        View({onClick: onClick}, sharedStyle, [Text('foobar123')]),
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
      View({}, {flexDirection: 'row', marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20}, [
        View({}, sharedStyle, [Image({src: 'images/foo.png', style: sharedImageStyle})]),
        View({}, sharedStyle, [Text('foobar')]),
        View({}, sharedStyle, [Text('a')]),
        View({}, {width: 300, height: 100, backgroundColor: 'red', color:'white', marginTop: 5, marginBottom: 5, marginLeft: 5, marginRight: 5, opacity: 0.8}, [Text('a')]),
        View({}, sharedStyle, [Image({src: 'images/grumpy2.jpg', style: sharedImageStyle})]),
        View({}, sharedStyle, [Image({src: 'images/grumpy1.jpg', style: sharedImageStyle})]),
        View({}, sharedStyle, [Image({src: 'images/cat_tardis.jpg', style: sharedImageStyle})]),
        View({},{
          width: 210, height: 100, backgroundColor: 'white', marginTop: 5, marginBottom: 5, marginLeft: 5, marginRight: 5, opacity: 1
        }, [])
      ])
    ]),
    View({}, {backgroundColor:'blue', height: 300, width: 300, alignSelf: 'center', marginLeft: 100}, [

    ])
  ]),
  View({}, {position: 'absolute', top: 10, left: 10, right: 10, bottom: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}, [
    View({}, {backgroundColor:'blue', left: 0, right: 0, height: 300, position: 'absolute', flexDirection: 'column', alignItems: 'center'}, [
      View({}, {flexGrow: 1, width: 20, backgroundColor: 'green'}, []),
      View({}, {flexGrow: 2, width: 20, backgroundColor: 'red'}, []),
      View({}, {flexGrow: 1, width: 20, backgroundColor: 'green'}, []),
    ])

  ])
]);