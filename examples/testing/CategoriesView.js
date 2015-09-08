'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./../../lib/components/C');

var Image = Bluebox.Components.Image;
var Text = Bluebox.Components.Text;
var View = Bluebox.Components.View;

var sharedStyle = {backgroundColor: 'green', opacity: 1, width: 100, height: 100, marginTop: 5, marginBottom: 5, marginLeft: 5, marginRight: 5};
var sharedImageStyle = {width: 100, height: 100};
/**
 * "/Applications/Google Chrome.app/Contts/MacOS/Google Chrome" http://localhost:63342/bluebox/build/index.html --no-sandbox --js-flags="--trace-hydroge --trace-phase=Z --trace-deopt --code-comments --hydrogen-track-positions --redirect-code-traces"

 */
//module.exports = View({}, {flexDirection: 'row', height: 500, width: 1000, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue'}, [
//  View({}, {height: 200, width: 200, flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: 'green'}, [
//    View({}, {height: 20, width: 20, backgroundColor: 'white'}, []),
//    View({}, {height: 20, width: 20, position:'absolute', top: 20, backgroundColor: 'red'}, [])
//  ])
//])
//return;
//
//module.exports = View({}, {flexDirection: 'row', backgroundColor: 'green', height: 500, width: 1000, alignItems: 'flex-end', flexWrap: 'wrap'}, [
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, []),
//
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'blue', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'white', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'black', height: Math.floor(100 * Math.random())}, []),
//  View({}, {width: Math.floor(100 * Math.random()), backgroundColor: 'red', height: Math.floor(100 * Math.random())}, [])
//]);
//
//return;

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
    View({}, {backgroundColor:'blue', height: 200, width: 300, alignSelf: 'center', marginLeft: 50, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}, [
      View({}, {backgroundColor: 'white', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 100, height: 10}, []), // 120
      View({}, {backgroundColor: 'red', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 50, height: 10}, []),// 190
      View({}, {backgroundColor: 'white', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 20, height: 10}, []), // 230
      View({}, {backgroundColor: 'red', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 100, height: 10}, []), // 270
      View({}, {backgroundColor: 'white', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 50, height: 10}, []), // 50
      View({}, {backgroundColor: 'red', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 70, height: 10}, []), // 120
      View({}, {backgroundColor: 'white', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 100, height: 10}, []), // 220
      View({}, {backgroundColor: 'red', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 50, height: 10}, []), // 270
      View({}, {backgroundColor: 'white', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 20, height: 10}, []), // 290
      View({}, {backgroundColor: 'red', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 100, height: 10}, []), // 100
      View({}, {backgroundColor: 'white', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 50, height: 10}, []), // 150
      View({}, {backgroundColor: 'red', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 70, height: 10}, []), // 220
      View({}, {backgroundColor: 'white', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 100, height: 10}, []), // 100
      View({}, {backgroundColor: 'red', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 70, height: 10}, []) // 170
    ])
  ]),
  View({}, {position: 'absolute', top: 10, left: 100, right: 100, bottom: 10, opacity: .6, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}, [
    View({}, {backgroundColor:'blue', left: 0, right: 0, top: 100, height: 300, position: 'absolute', flexDirection: 'row', alignItems: 'flex-start'}, [
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