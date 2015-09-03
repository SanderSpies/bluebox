'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./../../lib/components/C');

var Image = Bluebox.Components.Image;
var Text = Bluebox.Components.Text;
var View = Bluebox.Components.View;

var sharedStyle = {backgroundColor: 'green', opacity: 1, width: 100, height: 100, marginTop: 5, marginBottom: 5, marginLeft: 5, marginRight: 5};
var sharedImageStyle = {width: 100, height: 100};


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
    View({}, {height: 100, backgroundColor: 'red', flexGrow: 4}, [Text('a')]),
    View({}, {height: 100, backgroundColor: 'blue', flexGrow: 1}, [Text('b')])
  ]),
  View({}, {flexDirection: 'row'}, [
    View({}, {width: 600, height: 400, backgroundColor: 'black', overflow: 'hidden'}, [
      View({}, {flexDirection: 'row', marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20}, [
        View({}, sharedStyle, [Text('foobar123')]),
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
    View({}, {backgroundColor:'blue', height: 300, width: 300, alignSelf: 'center', marginLeft: 50, flexWrap: 'wrap', flexDirection: 'row'}, [
      View({}, {backgroundColor: 'white', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 100, height: 10}, []),
      View({}, {backgroundColor: 'white', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 50, height: 10}, []),
      View({}, {backgroundColor: 'white', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 20, height: 10}, []),
      View({}, {backgroundColor: 'white', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 100, height: 10}, []),
      View({}, {backgroundColor: 'white', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 50, height: 10}, []),
      View({}, {backgroundColor: 'white', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 70, height: 10}, [])
    ])
  ]),
  View({}, {position: 'absolute', top: 10, left: 100, right: 100, bottom: 10, opacity: .6, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}, [
    View({}, {backgroundColor:'blue', left: 0, right: 0, height: 300, position: 'absolute', flexDirection: 'row', alignItems: 'flex-start'}, [
      View({}, {flexGrow: 1, height: 20, backgroundColor: 'green', alignSelf: 'center'}, []),
      View({}, {flexGrow: 2, height: 20, backgroundColor: 'red'}, []),
      View({}, {flexGrow: 1, height: 100, backgroundColor: 'green', flexDirection: 'column'}, [
        View({}, {flexGrow: 1, width: 10, backgroundColor: 'green'}, []),
        View({}, {flexGrow: 2, width: 10, backgroundColor: 'red'}, []),
        View({}, {flexGrow: 1, width: 10, backgroundColor: 'green'}, [


        ])
      ])
    ])
  ])
]);