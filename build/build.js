(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./../../lib/components/C');

var Image = Bluebox.Components.Image;
var Text = Bluebox.Components.Text;
var View = Bluebox.Components.View;

var Animator = require('../../lib/animation/Animator');

//var Transition = Bluebox.Animations.Transition;

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

function Transition(start, end, opts, node) {
  Animator.registerAbsoluteTransition(start, end, opts, node);
  node.isAnimating = true;
  return node;
}

setTimeout(Animator._startAnimating, 300);

module.exports = View({}, {backgroundColor: 'red'}, [
  View({isStatic: true}, {
      height: 300,
      justifyContent: 'space-around',
      flexDirection: 'row',
      backgroundColor: 'black',
      opacity: 1,
      alignItems: 'center'
  }, [
    View({isStatic: true}, {height: 100, backgroundColor: 'green', flexGrow: 1}, [Text('a')]),
    View({isStatic: true}, {height: 100, backgroundColor: 'red', color:'blue', flexGrow: 4}, [Text('a', { textAlign:'center', fontSize: 50, fontWeight: 'bold', fontFamily: 'San Francisco'})]),
    View({isStatic: true}, {height: 100, backgroundColor: 'blue', flexGrow: 1}, [Text('b')])
  ]),
  View({}, {flexDirection: 'row'}, [
    View({}, {width: 600, height: 400, backgroundColor: 'black', overflow: 'hidden'}, [
      //Transition({left: 0}, {left: 500}, {duration: 1000, easing: 'linear'},
        View({}, {flexDirection: 'row', marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20}, [
          View({}, sharedStyle, [Text('foobar123', {fontStyle: 'italic'})]),
          View({}, sharedStyle, [Text('a')]),
          Transition({left: 0}, {left: 500}, {duration: 1000, easing: 'linear'},
            View({}, {left: 0, top: 0, width: 100, height: 100, marginTop: 5, marginBottom: 5, marginLeft: 5, marginRight: 5, backgroundColor: 'blue', position:'absolute'}, [Text('a')])
          ),
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
      //),
      View({}, {flexDirection: 'row', marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20}, [
        Transition({left: 0, top: 0}, {left: 200, top: -200}, {duration: 3000, easing: 'ease-in'},
          View({}, {position: 'absolute', backgroundColor:'white', top: 0, left: 0, width: 100, height: 100}, [Image({src: 'images/foo.png'},sharedImageStyle)])
        ),
        View({}, sharedStyle, [Text('Text that might or might not wrap...')]),
        View({}, sharedStyle, [Text('a')]),
        View({}, {width: 300, height: 100, backgroundColor: 'red', color:'white', marginTop: 5, marginBottom: 5, marginLeft: 5, marginRight: 5, opacity: 0.8}, [Text('a')]),
        View({}, sharedStyle, [Image({src: 'images/foo.png'}, sharedImageStyle)]),
        View({}, sharedStyle, [Image({src: 'images/foo.png'}, sharedImageStyle)]),
        View({}, sharedStyle, [Image({src: 'images/foo.png'}, sharedImageStyle)]),
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
        Transition({width: 50}, {width: 200}, {duration: 2000, easing: 'ease-in'},
          View({}, {backgroundColor: 'red', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 50, height: 10}, []) // 270
        ),
        View({}, {backgroundColor: 'white', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 20, height: 10}, []), // 290
        View({}, {backgroundColor: 'red', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 100, height: 10}, []), // 100
        View({}, {backgroundColor: 'white', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 50, height: 10}, []), // 150
        View({}, {backgroundColor: 'red', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 70, height: 10}, []), // 220
        View({}, {backgroundColor: 'white', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 100, height: 10}, []), // 100
        View({}, {backgroundColor: 'red', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: 70, height: 10}, []) // 170
      ])

  ]),
  View({}, {position: 'absolute', top: 10, left: 100, right: 100, bottom: 10, opacity: .6, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}, [
    Transition({top: -100}, {top: 200}, {duration: 2000, easing: 'ease-in-elastic'},
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
    )
  ])
]);
},{"../../lib/animation/Animator":5,"./../../lib/components/C":7,"./../../lib/index":16}],2:[function(require,module,exports){
var Bluebox = require('./../../lib/index');

var doms = [require('./CategoriesView')]; //, require('./testdom2'), require('./testdom3')];
var i = 0;

function continuousRendering() {
  Bluebox.renderFromTop(doms[0], document.getElementById('canvas'));
  //requestAnimationFrame(continuousRendering);
}

requestAnimationFrame(continuousRendering);


},{"./../../lib/index":16,"./CategoriesView":1}],3:[function(require,module,exports){
module.exports = 7000.0;
},{}],4:[function(require,module,exports){
module.exports = true; //process.env.NODE_ENV !== 'production';

},{}],5:[function(require,module,exports){
'use strict';

var Bluebox = require('../index');
var __DEV__ = require('../__DEV__');
var keys = Object.keys;
var registeredAbsoluteTransitions = [];

var easings = require('./_easings');

var startTime = Date.now();
function processTransitions(currentTime) {
  for (var i = 0, l = registeredAbsoluteTransitions.length; i < l; i++) {
    var absoluteTransition = registeredAbsoluteTransitions[i];
    var node  = absoluteTransition.node;
    var start = absoluteTransition.start;
    var end   = absoluteTransition.end;
    var keys  = absoluteTransition.keys;
    var opts  = absoluteTransition.opts;
    var duration = opts.duration;
    var easing = opts.easing || 'linear';

    // perform calculations here
   // var newNode = cloneWithClonedStyle(node);
    for (var j = 0, l2 = keys.length; j < l2; j++) {
      var key = keys[j];
      node.style[key] = easings[easing](currentTime, start[key], end[key], duration);
    }

    absoluteTransition.node = node;
  }
}

function onAnimate() {
  requestAnimationFrame(onAnimate);

  var currentTime = Date.now() - startTime;

  processTransitions(currentTime);

  Bluebox.relayout();

}
//
//function compareOldAndNew(oldC, newC) {
//  if (oldC.children && oldC.children.length !== newC.children.length) {
//    console.warn('Something got lost here...');
//    debugger;
//  }
//  if (oldC.children) {
//    for (var i = 0, l = oldC.children.length; i < l; i++) {
//      compareOldAndNew(oldC.children[i], newC.children[i]);
//    }
//  }
//}

var ViewPortHelper  = require('../renderers/DOM/ViewPortHelper');
var viewPortDimensions = ViewPortHelper.getDimensions();

var clipSpaceX = 1 / viewPortDimensions.width * 2;
var clipSpaceY = 1 / viewPortDimensions.height * 2;

var Animator = {

  isAnimating: false,

  registerAbsoluteTransition: function(start, end, opts, node) {
    var isPositionalChange = false;
    var isInnerChange = false;
    var animationProperties = keys(start);

    if (('left' in start && !('right' in start)) ||
      ('right' in start && !('left' in start)) ||
      ('top' in start && !('bottom' in start)) ||
      ('bottom' in start && !('top' in start))) {
      isPositionalChange = true;
    }
    if (isPositionalChange) {
      for (var i = 0, l = animationProperties.length; i < l; i++) {
        var prop = animationProperties[i];
        if (prop !== 'left' &&
          prop !== 'right' &&
          prop !== 'top' &&
          prop !== 'bottom') {
          isPositionalChange = false;
        }
      }
    }

    // convert to clipspace
    if (start.left) {
      start.left *= clipSpaceX;
    }
    if (start.right) {
      start.right *= clipSpaceX;
    }
    if (start.width) {
      start.width *= clipSpaceX;
    }
    if (start.top) {
      start.top *= clipSpaceY;
    }
    if (start.bottom) {
      start.bottom *= clipSpaceY;
    }
    if (start.height) {
      start.height *= clipSpaceY;
    }

    if (end.left) {
      end.left *= clipSpaceX;
    }
    if (end.right) {
      end.right *= clipSpaceX;
    }
    if (end.width) {
      end.width *= clipSpaceX;
    }
    if (end.top) {
      end.top *= clipSpaceY;
    }
    if (end.bottom) {
      end.bottom *= clipSpaceY;
    }
    if (end.height) {
      end.height *= clipSpaceY;
    }

    registeredAbsoluteTransitions.push({
      keys: keys(start),
      start: start,
      end: end,
      opts: opts,
      node: node,
      startTime: Date.now(),
      isPositionalChange: isPositionalChange
    });
  },

  registerRelativeTransition: function() {

  },

  registerSpring: function() {

  },

  _startAnimating: function() {
    if (!Animator.isAnimating) {
      Animator.isAnimating = true;
      requestAnimationFrame(onAnimate);
    }
  }

};

module.exports = Animator;

},{"../__DEV__":4,"../index":16,"../renderers/DOM/ViewPortHelper":21,"./_easings":6}],6:[function(require,module,exports){
var easings = {

  linear: function(t, b, _c, d) {
    var c = _c - b;
    var result = t * c / d + b;
    if (t > d) {
      result = _c;
    }
    return result;
  },

  'ease-in': function(t, b, _c, d) {
    var c = _c - b;
    var _t = t / d;
    var result = c * (_t) * _t + b;

    if (t > d) {
      result = _c;
    }
    return result;
  },

  'ease-in-elastic': function(t, b, _c, d) {
    if (t > d) {
      return _c;
    }

    var c = _c - b;
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) {
      return b;
    }
    if ((t /= d) == 1) {
      return b + c;
    }
    if (!p) {
      p = d * .3;
    }
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    }
    else {
      var s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  }

};

module.exports = easings;
},{}],7:[function(require,module,exports){
'use strict';

var merge = require('../utils/merge');
var UNDEFINED = require('../UNDEFINED');
var __DEV__ = require('../__DEV__');
var ViewPortHelper  = require('../renderers/DOM/ViewPortHelper');

var toFloat32 = require('../utils/toFloat32');


var seal = Object.seal;

var viewPortDimensions = ViewPortHelper.getDimensions();
var clipSpaceX = toFloat32(1 / viewPortDimensions.width * 2);
var clipSpaceY = toFloat32(1 / viewPortDimensions.height * 2);


function convertToClipSpace(style) {
  if (style.width !== UNDEFINED) {
    style.width *= clipSpaceX;
  }
  if (style.height !== UNDEFINED) {
    style.height *= clipSpaceY;
  }
  if (style.top !== UNDEFINED) {
    style.top *= clipSpaceY;
  }
  if (style.left !== UNDEFINED) {
    style.left *= clipSpaceX;
  }
  if (style.right !== UNDEFINED) {
    style.right *= clipSpaceX;
  }
  if (style.bottom !== UNDEFINED) {
    style.bottom *= clipSpaceY;
  }
  if (style.marginLeft !== 0) {
    style.marginLeft *= clipSpaceX;
  }
  if (style.marginRight !== 0) {
    style.marginRight *= clipSpaceX;
  }
  if (style.marginTop !== 0) {
    style.marginTop *= clipSpaceY;
  }
  if (style.marginBottom !== 0) {
    style.marginBottom *= clipSpaceY;
  }
}

function Component(type, props, style, children) {
  var component = {
    customType: null,
   // layout: {left: 0, width: undefined, right: 0, top: 0, height: undefined, bottom: 0, lineIndex: 0},
    layout: new Float32Array(7), /*left, width, right, top, height, bottom, lineIndex*/
    style: merge({
      backgroundColor: '',
      color: '',
      margin: '',
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      minHeight: 0,
      minWidth: 0,
      padding: '',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      opacity: 1,
      overflow: 'inherit',
      width: UNDEFINED,
      height: UNDEFINED,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'column',
      alignSelf: '',
      flexGrow: 0,
      flexWrap: 'nowrap',
      //alignContent: 'flex-start',
      left: UNDEFINED,
      top: UNDEFINED,
      right: UNDEFINED,
      bottom: UNDEFINED,
      position: 'relative',
      fontSize: 12,
      fontFamily: 'Arial',
      textAlign: 'left',
      fontWeight: '',
      fontStyle: 'normal'
    }, style || {}),
    parent: null,
    oldParent: null,
    oldRef: null,
    type: type,
    props: props,
    children: children,
    lineIndex: 0,
    isAnimating: false,
    isChildAnimating: 0,
    newRef: null,
    nrOfVertices: 1,
    depth: 0
  };
  if (__DEV__) {
    seal(component);
    //seal(component.layout);
    seal(component.style);
  }
  var depth = 0;
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    if (child.type) {
      child.parent = component;
      if (!component.isChildAnimating && (child.isAnimating || child.isChildAnimating)) {
        component.isChildAnimating++;
      }
      component.nrOfVertices += child.nrOfVertices;
      if (child.depth > depth) {
        depth = child.depth;
      }
    }
  }

  convertToClipSpace(component.style);

  component.depth = 1 + depth;

  return component;
}

module.exports = Component;

},{"../UNDEFINED":3,"../__DEV__":4,"../renderers/DOM/ViewPortHelper":21,"../utils/merge":30,"../utils/toFloat32":31}],8:[function(require,module,exports){
'use strict';

var ComponentConstants = {
  LEFT: 0,
  WIDTH: 1,
  RIGHT: 2,
  TOP: 3,
  HEIGHT: 4,
  BOTTOM: 5,
  LINE_INDEX: 6
};

module.exports = ComponentConstants;

},{}],9:[function(require,module,exports){
'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./C');

var Image = Bluebox.create('image', function render(props, style, children) {
  props.isLoaded = false;
  return C('image', props, style, []);
});

module.exports = Image;

},{"./../../lib/index":16,"./C":7}],10:[function(require,module,exports){
'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./C');

var Text = Bluebox.create('text', function(props, style, children) {
  //TODO: add calculated text width and cache it or something...
  return C('text', {}, style, [props]);
});

module.exports = Text;

},{"./../../lib/index":16,"./C":7}],11:[function(require,module,exports){
'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./C');

var View = Bluebox.create('view', function render(props, style, children) {
  return C('view', props, style, children || []);
});

module.exports = View;

},{"./../../lib/index":16,"./C":7}],12:[function(require,module,exports){
/**
 * @flow
 */
'use strict';

var EventHandling = require('../events/EventHandling');

var isArray          = Array.isArray;
var keys             = Object.keys;
var BIG_ARRAY        = 100;

function createKeyMap(children) {
  var keyMap = {};
  if (children) {
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var key = child.props ? child.props.key : null;
      if (key) {
        keyMap[key] = child;
      }
    }
  }
  return keyMap;
}

function diffArray(newNode, oldNode, parent, oldParent) {
  var isDifferent = false;
  for (var i = 0, l = newNode.length; i < l; i++) {
    var oldNodeChild = oldNode[i];
    var difference = diff(newNode[i], oldNodeChild, parent, oldParent);
    if (oldNodeChild !== difference) {
      newNode[i] = difference;
      isDifferent = true;
    }
  }

  return isDifferent;
}

function diffFunction(newNode, oldNode) {
  var isDifferent = false;
  if (newNode.toString() !== oldNode.toString()) {
    isDifferent = true;
  }
  return isDifferent;
}
function handleChildItem(oldNode, newValue, k, oldValue, isDifferent, skipKeys, keyMap, newNode) {
  var oldNodeChildren = oldNode.children;
  var key = newValue[k].props ? newValue[k].props.key : null;
  var difference2;
  if (key && keyMap[key]) {
    difference2 = diff(newValue[k], keyMap[key]);
  }
  else {
    difference2 = diff(newValue[k], oldNodeChildren ? oldNodeChildren[k] : null, newNode, oldNode);
  }
  if (!oldValue || oldValue[k] !== difference2) {
    isDifferent = true;
  }

  newNode.children[k] = difference2;

  return {
    isDifferent: isDifferent,
    skipKeys: skipKeys
  };
}


function handleProperty(newNode, oldNode, newNodeKeys, i, isDifferent, parent, oldParent) {
  var key = newNodeKeys[i];
  if (key !== 'layout' && key !== 'parentReference') {
    var newValue = newNode[key];
    var oldValue = oldNode[key];
    if (newNode.props) {
      EventHandling.setEventListeners(newNode, oldNode);
    }
    if (key === 'children' && isArray(newValue)) {
      if (!oldValue) {
        isDifferent = true;
        return {
          isDifferent: isDifferent
        };
      }
      var keyMap = createKeyMap(oldValue);
      var skipKeys = false;
      for (var k = 0, j = newValue.length; k < j; k++) {
        var __ret = handleChildItem(oldNode, newValue, k, oldValue, isDifferent, skipKeys, keyMap, newNode);
        isDifferent = __ret || isDifferent;
        skipKeys = __ret.skipKeys;
      }
    }
    else {
      var difference3 = diff(newValue, oldValue, newNode, oldNode);
      newNode[key] = difference3;
      if (difference3 !== oldValue) {
        isDifferent = true;
      }

    }
  }

  return isDifferent;
}

function diffObject(newNode, oldNode, parent, oldParent) {
  var isDifferent = false;
  var newNodeKeys = keys(newNode);
  var newNodeKeysLength = newNodeKeys.length;
  var oldNodeKeysLength = keys(oldNode).length;

  if (newNodeKeysLength !== oldNodeKeysLength) {
    isDifferent = true;
  }
  for (var i = 0; i < newNodeKeysLength; i++) {
    isDifferent = handleProperty(newNode, oldNode, newNodeKeys, i, isDifferent, parent, oldParent) || isDifferent;
  }

  return isDifferent;
}



function diff(newNode, oldNode, parent, oldParent) {
  var isDifferent = false;
  if (newNode === oldNode) {
    return oldNode;
  }
  if (!oldNode || !newNode) {
    if (newNode && newNode.props) {
      EventHandling.setEventListeners(newNode, oldNode);
    }
    return newNode;
  }
  var newNodeType = typeof newNode;
  var oldNodeType = typeof oldNode;
  if (newNodeType !== oldNodeType) {
    isDifferent = true;
    return newNode;
  }
  if (isDifferent) {
    return newNode;
  }
  if (isArray(newNode)) {
    isDifferent = diffArray(newNode, oldNode, parent, oldParent) || isDifferent;
  }
  else if (newNodeType === 'object') {
    isDifferent = diffObject(newNode, oldNode, parent, oldParent) || isDifferent;
  }
  else if (newNodeType === 'function') {
    isDifferent = diffFunction(newNode, oldNode, parent, oldParent) || isDifferent;
  }
  else if (newNode !== oldNode) {
    isDifferent = true;
  }

  var returnNode = isDifferent ? newNode : oldNode;
  if (returnNode && returnNode.props && returnNode.props.style) {
    var style = returnNode.props.style;
    if (style.display === 'none' && returnNode.children && returnNode.children.length) {
      returnNode.children = [];
    }
  }

  return returnNode;
}

module.exports = diff;

},{"../events/EventHandling":14}],13:[function(require,module,exports){
'use strict';

function ensureTreeCorrectness(node) {
  var children = node.children;
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    if (child.type) {
      if (child.parent !== node) {
        console.warn('PARENT CHILD MISMATCH');
        return false;
      }
      if (child.newRef) {
        console.warn('NEWREF LEAK FOUND');
        return false;
      }
      return ensureTreeCorrectness(child);
    }
  }
  return true;
}

module.exports = ensureTreeCorrectness;
},{}],14:[function(require,module,exports){
'use strict';

var handleEvents = require('../events/handleEvents');
var handleEvent = handleEvents.handleEvent;

function handleEventProperty(newComponent, oldComponent, key, fn) {
  if (key === 'onClick' || key === 'onMouseEnter' || key === 'onMouseLeave' || key === 'onKeyUp' || key === 'onKeyPress')  {
    if (!oldComponent) {
      handleEvents.addEventListener(newComponent, key, handleEvents.handleEvent(fn));
    }
    else if (oldComponent !== newComponent) {
      handleEvents.updateComponents(oldComponent, newComponent);
    }
    else if (oldComponent && !newComponent){
      console.warn('TODO: remove event listeners for this and also the children...');
    }
  }
}

function setEventListeners(node, oldNode) {
  if (node.props.onClick) {
    handleEventProperty(node, oldNode, 'onClick', node.props.onClick);
  }
  if (node.props.onKeyUp) {
    handleEventProperty(node, oldNode, 'onKeyUp', node.props.onKeyUp);
  }
  if (node.props.onMouseEnter) {
    handleEventProperty(node, oldNode, 'onMouseEnter', node.props.onMouseEnter);
  }
  if (node.props.onMouseLeave) {
    handleEventProperty(node, oldNode, 'onMouseLeave', node.props.onMouseLeave);
  }
  if (node.children) {
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      if (typeof child !== 'string') {
        setEventListeners(node.children[i], oldNode ? oldNode.children[i]: null);
      }
    }
  }
}

module.exports = {
  setEventListeners: setEventListeners
};

},{"../events/handleEvents":15}],15:[function(require,module,exports){
'use strict';

// TODO: make it all virtual
var attachedEventListeners = {
  onClick: [],
  onKeyUp: [],
  onMouseEnter: [],
  onMouseMove: [],
  onMouseLeave: []
};

var map = {
  onClick: 'click',
  onKeyUp: 'keyup',
  onMouseMove: 'mousemove'
};

// TODO: ensure components stay correct after diffing

function addEventListener(component, event, fn) {
  if ((event === 'onMouseEnter' || event === 'onMouseLeave') && !attachedEventListeners.onMouseMove.length) {
    document.addEventListener('mousemove', handleMouseMove(component));
  }
  else if (!attachedEventListeners[event].length) {
    document.addEventListener(map[event], handleEvents2(component, event));
  }
  attachedEventListeners[event].push({component: component, fn: fn});
}

var mouseLeaveComponent = null;
function handleMouseMove(component, fn) {
  return function(e) {
    if (mouseLeaveComponent && mouseLeaveComponent.component.props.onMouseLeave && !(e.clientY >= mouseLeaveComponent.component.layout.top && e.clientY <= (mouseLeaveComponent.component.layout.top + mouseLeaveComponent.component.layout.height) && e.clientX >= mouseLeaveComponent.component.layout.left && e.clientX <= (mouseLeaveComponent.component.layout.left + mouseLeaveComponent.component.layout.width) )) {
      mouseLeaveComponent.component.props.onMouseLeave(mouseLeaveComponent.component, e);
      mouseLeaveComponent = null;
    }

    var mouseEnterComponents = attachedEventListeners.onMouseEnter;
    for (var i = 0, l = mouseEnterComponents.length; i < l; i++) {
      var mouseEnterComponent = mouseEnterComponents[i];
      if (mouseLeaveComponent !== mouseEnterComponent) {
        if (e.clientY >= mouseEnterComponent.component.layout.top && e.clientY <= (mouseEnterComponent.component.layout.top + mouseEnterComponent.component.layout.height)
          && e.clientX >= mouseEnterComponent.component.layout.left && e.clientX <= (mouseEnterComponent.component.layout.left + mouseEnterComponent.component.layout.width)) {
          mouseEnterComponent.fn(mouseEnterComponent.component, e);
          mouseLeaveComponent = mouseEnterComponent;
        }
      }
    }

  };
}

function handleEvents2(component, type) {
  return function(e) {
    var listeners = attachedEventListeners[type];
    for (var i = 0, l = listeners.length; i < l; i++) {
      var listener = listeners[i];
      listener.fn(listener.component, e);
    }
  }
}

function handleEvent(fn) {
  // TODO: during dev mode component should be non-changeable
  return function(component, e) {
    if(e instanceof MouseEvent) {
      // TODO: improve more...
      if (e.clientY > component.layout.top && e.clientY < component.layout.bottom &&
        e.clientX > component.layout.left && e.clientX < component.layout.right) {
        fn(component, e);
      }
    }
    if (e instanceof KeyboardEvent) {
      fn(component, e);
    }
  }
}

function handleEvents(component) {
  var props = component.props;
  if (props.onClick) {
    addEventListener(component, 'click', handleEvent(component, props.onClick));
  }
  if (props.onMouseEnter) {
    addEventListener(component, 'mouseenter', props.onMouseEnter);
  }
  if (props.onKeyPress) {
    addEventListener(component, 'keypress', handleEvent(component, props.onKeyPress));
  }
  if (props.onKeyUp) {
    addEventListener(component, 'keyup', handleEvent(component, props.onKeyUp));
  }
}

function updateComponents(oldComponent, newComponent) {
  var onClickListeners = attachedEventListeners.onClick;
  for (var i = 0, l = onClickListeners.length; i < l; i++) {
    var onClickListener = onClickListeners[i];
    if (onClickListener.component === oldComponent) {
      onClickListener.component = newComponent;
    }
  }
  var onKeyUpListeners = attachedEventListeners.onKeyUp;
  for (var i = 0, l = onKeyUpListeners.length; i < l; i++) {
    var onKeyUpListener = onKeyUpListeners[i];
    if (onKeyUpListener.component === oldComponent) {
      onKeyUpListener.component = newComponent;
    }
  }
}

module.exports = {
  handleEvents: handleEvents,
  addEventListener: addEventListener,
  handleEvent: handleEvent,
  updateComponents: updateComponents
};
},{}],16:[function(require,module,exports){
'use strict';

var diff            = require('./diff/diff');
var LayoutEngine      = require('./layout/LayoutEngine');
var render        = require('./renderers/GL/render');
var ViewPortHelper  = require('./renderers/DOM/ViewPortHelper');
var requestStyleRecalculation = require('./layout/requestStyleRecalculation');
var ensureTreeCorrectness = require('./diff/ensureTreeCorrectness');
//var toDOMString = require('./layout/layoutNode-tests/utils/toDOMString');
var oldComponentTree    = null;
var oldDOMElement       = null;
var viewPortDimensions  = null;
var registeredComponentTypes = {};
var AXIS = require('./layout/AXIS');
var AXIS2 = require('./layout/AXIS2');
var keys = Object.keys;

function registerComponentType(type, structure) {
  registeredComponentTypes[type] = structure;
}

function rerenderComponent(type, props, style, children) {
  var componentType = registeredComponentTypes[type];
  return componentType(props, style, children);
}

function clone(obj) {
  var newObj = {};
  var properties = keys(obj);
  for (var i = 0, l = properties.length; i < l; i++) {
    var property = properties[i];
    newObj[property] = obj[property];
  }
  return newObj;
}


function updateTree(component, newComponent) {
  // go up the tree and replace all the nodes
  var parent = component.parent;
  if (parent) {
    //debugger;
    // recreate the parents
    newComponent.layout = component.layout;
    while(parent) {
      var index = parent.children.indexOf(component);
      var newParent = clone(parent);
      newParent.children[index] = newComponent;
      newComponent.parent = newParent;

      if (!component.parent){
        return newComponent;
      }
      newComponent = newComponent.parent;
      component = component.parent;
      parent = component.parent;
    }

    return newComponent;
  }
  else {
    return newComponent;
  }
}

function mergeProperties(newProps, existingProps) {
  var existingPropKeys = keys(existingProps);
  for (var i = 0, l = existingPropKeys.length; i < l; i++) {
    var existingPropKey = existingPropKeys[i];
    if (!newProps[existingPropKey]) {
      newProps[existingPropKey] = existingProps[existingPropKey];
    }
  }
  return newProps;
}

function withProperties(component) {
  return {
    withProperties: function(props) {


      var newProps = mergeProperties(props, component.props);
      var newComponent = rerenderComponent(component.customType, newProps, component.style, component.children);
      var newComponentTree = updateTree(component, newComponent);

      Bluebox.renderFromTop(newComponentTree);
      newComponent.customType = component.customType;
      return newComponent;
    }
  };
}

var Bluebox = {

  create: function(type, structure) {
    registerComponentType(type, structure);
    return function(props, style, children) {
      var component =  structure(props, style, children);
      component.customType = type;
      return component;
    };
  },

  Components: {
    Image: null,
    Text: null,
    View: null
  },

  Animations: {
    Transition: null,
    Spring: null
  },

  update: function(component) {
    return withProperties(component);
  },

  renderOnly: function(c) {
    render(oldDOMElement, c, null, viewPortDimensions);
  },

  renderFromTop: function(componentTree, domElement, noDiff) {

    if (!componentTree) {
      componentTree = oldComponentTree;
    }
    if (!domElement) {
      domElement = oldDOMElement;
    }
    oldDOMElement = domElement;
    var newComponentTree = noDiff ? componentTree : diff(componentTree, oldComponentTree, null, null);

    var hasChanged = false;
    if (viewPortDimensions !== ViewPortHelper.getDimensions()) {
      viewPortDimensions = ViewPortHelper.getDimensions();
      hasChanged = true;
    }
   // if (newComponentTree.layout.width === undefined) {
      newComponentTree = LayoutEngine.layoutRelativeNode(newComponentTree, null, null, AXIS.column, AXIS.row, AXIS2.column, AXIS2.row, false);
   // }

    console.log(newComponentTree);
    //console.log(toDOMString(newComponentTree));

    if (newComponentTree !== oldComponentTree || hasChanged) {
      viewPortDimensions = ViewPortHelper.getDimensions();
    }

    render(domElement, newComponentTree, null, 0, viewPortDimensions, false, false);

    oldComponentTree = newComponentTree;
    return newComponentTree;
  },


  relayout: function() {
    // TODO: remove this, shouldn't happen all the time - only once ideally



    LayoutEngine.layoutRelativeNode(oldComponentTree, null, null, AXIS.column, AXIS.row, AXIS2.column, AXIS2.row, false);

    render(oldDOMElement, oldComponentTree, null, 0, viewPortDimensions, false, false);


    return oldComponentTree;
  }

};

module.exports = Bluebox;

Bluebox.Components.View = require('./components/View');
Bluebox.Components.Text = require('./components/Text');
Bluebox.Components.Image = require('./components/Image');
Bluebox.Animations.Transition = function(){};
Bluebox.Animations.Spring = function(){};
},{"./components/Image":9,"./components/Text":10,"./components/View":11,"./diff/diff":12,"./diff/ensureTreeCorrectness":13,"./layout/AXIS":17,"./layout/AXIS2":18,"./layout/LayoutEngine":19,"./layout/requestStyleRecalculation":20,"./renderers/DOM/ViewPortHelper":21,"./renderers/GL/render":26}],17:[function(require,module,exports){
var AXIS = {
  row: {
    START: 'left',
    END: 'right',
    DIMENSION: 'width',
    MARGIN_LEADING: 'marginLeft',
    MARGIN_TRAILING: 'marginRight',
    PADDING_LEADING: 'paddingLeft',
    PADDING_TRAILING: 'paddingRight'
  },
  column: {
    START: 'top',
    END: 'bottom',
    DIMENSION: 'height',
    MARGIN_LEADING: 'marginTop',
    MARGIN_TRAILING: 'marginBottom',
    PADDING_LEADING: 'paddingTop',
    PADDING_TRAILING: 'paddingBottom'
  }
};

module.exports = AXIS;
},{}],18:[function(require,module,exports){
'use strict';

var AXIS = {

    row: {
      START: 0,
      END: 2,
      DIMENSION: 1
    },
    column: {
      START: 3,
      END: 5,
      DIMENSION: 4
    }

};

module.exports = AXIS;

},{}],19:[function(require,module,exports){
'use strict';

var __DEV__ = require('../__DEV__');
var COLUMN = 'column';
var ROW = 'row';
var FLEX_START = 'flex-start';
var FLEX_END = 'flex-end';
var SPACE_AROUND = 'space-around';
var SPACE_BETWEEN = 'space-between';
var ABSOLUTE = 'absolute';
var STRETCH = 'stretch';
var LEFT = 'left';
var TOP = 'top';
var RIGHT = 'right';
var BOTTOM = 'bottom';
var CENTER = 'center';
var AXIS = require('./AXIS');
var AXIS2 = require('./AXIS2');
var WRAP = 'wrap';
var UNDEFINED = require('../UNDEFINED');
var ViewPortHelper = require('../renderers/DOM/ViewPortHelper');
var CL = require('../components/ComponentConstants');
var viewPortDimensions = ViewPortHelper.getDimensions();
var toFloat32 = require('../utils/toFloat32');
var clipSpaceX = toFloat32(1 / viewPortDimensions.width * 2);
var clipSpaceY = toFloat32(1 / viewPortDimensions.height * 2);

var clientWidth = toFloat32(document.body.clientWidth) * clipSpaceX;
var clientHeight = toFloat32(document.body.clientHeight)  * clipSpaceY;


function justifyContentFn(child, previousChild, mainAxis, mainAxis2, justifyContentX, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute) {
  var justifyContent = justifyContentX;
  if (justifyContent === CENTER) {
    justifyContent = FLEX_END;
  }
  var childLayout = child.layout;
  var childStyle = child.style;
  if (isPositionAbsolute && (childStyle[mainAxis.START] !== UNDEFINED || childStyle[mainAxis.END] !== UNDEFINED)) {
    return;
  }

  if (justifyContent === FLEX_END) {
    childLayout[mainAxis2.START] += remainingSpaceMainAxis;
    childLayout[mainAxis2.END] += remainingSpaceMainAxis;

  }
  else if (justifyContent === SPACE_AROUND) {
    if (!previousChild) {
      childLayout[mainAxis2.START] += remainingSpaceMainAxis + childStyle[mainAxis.MARGIN_LEADING];
    }
    else {
      childLayout[mainAxis2.START] = previousChild.layout[mainAxis2.END] + childStyle[mainAxis.MARGIN_LEADING] + remainingSpaceMainAxis * 2;
    }
    childLayout[mainAxis2.END] = childLayout[mainAxis2.START] + childLayout[mainAxis2.DIMENSION];

  }
  else if (justifyContent === SPACE_BETWEEN && previousChild) {
    childLayout[mainAxis2.START] = previousChild.layout[mainAxis2.END] + remainingSpaceMainAxis + previousChild.style[mainAxis.MARGIN_TRAILING] + childStyle[mainAxis.MARGIN_LEADING];
    childLayout[mainAxis2.END] = childLayout[mainAxis2.START] + childLayout[mainAxis2.DIMENSION];
  }
  else if (justifyContent === STRETCH) {
    if (childLayout[mainAxis2.DIMENSION] === 0) {
      childLayout[mainAxis2.START] = 0;
      childLayout[mainAxis2.DIMENSION] = mainAxis === AXIS.row ? parentWidth : parentHeight;
      childLayout[mainAxis2.END] = childLayout[mainAxis2.DIMENSION];

    }

  }
}

function absolutePosition(node, previousSibling, mainAxis, crossAxis, mainAxis2, crossAxis2) {
  var parent = node.parent;
  var nodeLayout = node.layout;
  var nodeStyle = node.style;
  var parentLayout = parent.layout;

  nodeLayout[mainAxis2.START] = parentLayout[mainAxis2.START];
  nodeLayout[crossAxis2.START] = parentLayout[crossAxis2.START];
  if (nodeStyle[mainAxis.START] !== UNDEFINED) {
    nodeLayout[mainAxis2.START] += nodeStyle[mainAxis.START];
    nodeLayout[mainAxis2.END] += nodeStyle[mainAxis.START];

  }
  else if (nodeStyle[mainAxis.END] !== UNDEFINED && nodeStyle[mainAxis.DIMENSION] !== UNDEFINED) {
    nodeLayout[mainAxis2.START] = parentLayout[mainAxis2.END] - nodeStyle[mainAxis.DIMENSION] - nodeStyle[mainAxis.END];
  }
  else if (previousSibling) {
    nodeLayout[mainAxis2.START] = previousSibling.layout[mainAxis2.END] + previousSibling.style[mainAxis.MARGIN_TRAILING];
  }

  if (nodeStyle[crossAxis.START] !== UNDEFINED) {
    nodeLayout[crossAxis2.START] += nodeStyle[crossAxis.START];
    nodeLayout[crossAxis2.END] += nodeStyle[crossAxis.START];

  }
  else if (nodeStyle[crossAxis.END] !== UNDEFINED && nodeStyle[crossAxis.DIMENSION] !== UNDEFINED) {
    nodeLayout[crossAxis2.START] = parentLayout[crossAxis2.END] - nodeStyle[crossAxis.DIMENSION] - nodeStyle[crossAxis.END];
  }
  else {
    nodeLayout[crossAxis2.START] = parent ? parentLayout[crossAxis2.START] : 0;
  }

  if (nodeStyle[mainAxis.END] !== UNDEFINED) {
    nodeLayout[mainAxis2.END] = parentLayout[mainAxis2.END] - nodeStyle[mainAxis.END];
    nodeLayout[mainAxis2.DIMENSION] = nodeLayout[mainAxis2.END] - nodeLayout[mainAxis2.START];
  }
  if (nodeStyle[crossAxis.END] !== UNDEFINED) {
    nodeLayout[crossAxis2.END] = parentLayout[crossAxis2.END] - nodeStyle[crossAxis.END];
    nodeLayout[crossAxis2.DIMENSION] = nodeLayout[crossAxis2.END] - nodeLayout[crossAxis2.START];
  }

  if (!nodeLayout[CL.HEIGHT] && nodeStyle.height !== UNDEFINED) {
    nodeLayout[CL.HEIGHT] = nodeStyle.height;
  }
  if (!nodeLayout[CL.WIDTH] && nodeStyle.width !== UNDEFINED) {
    nodeLayout[CL.WIDTH] = nodeStyle.width;
  }

  if (nodeLayout[CL.WIDTH] < (nodeLayout[CL.BOTTOM] - nodeLayout[CL.TOP])) {
    nodeLayout[CL.BOTTOM] = nodeLayout[CL.TOP] + nodeLayout[CL.HEIGHT];
  }

  if (nodeLayout[CL.WIDTH] < (nodeLayout[CL.RIGHT] - nodeLayout[CL.LEFT])) {
    nodeLayout[CL.RIGHT] = nodeLayout[CL.LEFT] + nodeLayout[CL.WIDTH];
  }

}

function alignItemsFn(child, previousChild, mainAxis, mainAxis2, alignItems, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute) {
  justifyContentFn(child, previousChild, mainAxis, mainAxis2, alignItems, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute);
}

function correctChildren(node, oldNode, top, left, mainAxis, crossAxis, mainAxis2, crossAxis2) {
  var previousChild = null;
  for (var i = 0, l = node.children.length; i < l; i++) {
    var child = node.children[i];
    var childStyle = child.style;
    var childLayout = child.layout;
    if (child.children) {
      var isAbsolutePosition = childStyle.position === ABSOLUTE;
      if (isAbsolutePosition) {
        absolutePosition(child, previousChild, mainAxis, crossAxis, mainAxis2, crossAxis2);
      }
      else {
        childLayout[CL.LEFT] += left;
        childLayout[CL.RIGHT] += left;
        childLayout[CL.TOP] += top;
        childLayout[CL.BOTTOM] += top;
        correctChildren(child, oldNode, top, left, mainAxis, crossAxis, mainAxis2, crossAxis2);
      }
      previousChild = child;
    }
  }
}

function flexSize(child, previousChild, totalFlexGrow, remainingSpaceMainAxis, mainAxis) {
  var childLayout = child.layout;
  var childStyle = child.style;
  if (mainAxis === ROW) {
    if (previousChild) {
      childLayout[CL.LEFT] = previousChild.layout[CL.RIGHT];
    }
    childLayout[CL.WIDTH] = childStyle.flexGrow / totalFlexGrow * remainingSpaceMainAxis + (childStyle.width !== UNDEFINED ? childStyle.width : 0);
    childLayout[CL.RIGHT] = childLayout[CL.LEFT] + childLayout[CL.WIDTH];
  }
  else {
    if (previousChild) {
      childLayout[CL.TOP] = previousChild.layout[CL.BOTTOM];
    }
    childLayout[CL.HEIGHT] = childStyle.flexGrow / totalFlexGrow * remainingSpaceMainAxis + (childStyle.height !== UNDEFINED ? childStyle.height : 0);
    childLayout[CL.BOTTOM] = childLayout[CL.TOP] + childLayout[CL.HEIGHT];
  }
}

// main bottleneck - takes up most cpu and allocations
//                   ideally we skip it when possible
//                   - add hasParentDimensionsChanged argument
function hasPositionChanged(node, oldNode) {
  return !(node.style.left === oldNode.style.left &&
    node.style.right === oldNode.style.right &&
    node.style.top === oldNode.style.top);
}


function processChildren(node, oldNode, parentMainAxis, parentCrossAxis, parentMainAxis2, parentCrossAxis2, shouldProcessAbsolute, hasParentDimensionsChanged, offsetX, offsetY) {

  var parent = node.parent;
  var nodeStyle = node.style;

  if (oldNode) {
    if (node.style !== oldNode.style) {
      if (node.style.width !== oldNode.style.width || node.style.height !== oldNode.style.height) {
        hasParentDimensionsChanged = true;
      }

    }

    if (node.style.width !== UNDEFINED && node.style.height !== UNDEFINED &&
      node.style.width === oldNode.style.width && node.style.height === oldNode.style.height
    ) {
      hasParentDimensionsChanged = false;
    }
  }

  var parentLayout = parent ? parent.layout : null;
  var parentWidth = parentLayout ? parentLayout[CL.WIDTH] : clientWidth;
  var parentHeight = parentLayout ? parentLayout[CL.HEIGHT] : clientHeight;
  var nodeLayout = node.layout;
  var nodeChildren = node.children;
  if (nodeChildren.length && typeof nodeChildren[0] !== 'string') {
    var newMainAxisDirection = nodeStyle && nodeStyle.flexDirection ? nodeStyle.flexDirection : COLUMN;
    var newCrossAxisDirection = newMainAxisDirection === COLUMN ? ROW : COLUMN;
    var mainAxis = AXIS[newMainAxisDirection];
    var crossAxis = AXIS[newCrossAxisDirection];
    var mainAxis2 = AXIS2[newMainAxisDirection];
    var crossAxis2 = AXIS2[newCrossAxisDirection];

    var maxSize = 0;
    var previousChild = null;
    var totalFlexGrow = 0;
    var lineIndex = 0;
    var isFlexWrap = nodeStyle.flexWrap === WRAP;
    var totalChildrenSize = 0;
    var additional = 0;
    var maxCrossDimension = 0;
    var lineLengths = [];
    var crossLineLengths = [];
    var lineNrOfChildren = [];
    var currNrOfChildren = 0;
    var child;
    var childStyle;
    var childLayout;
    var i;
    var l;
    var oldChild;
    var hasParentLocationChanged = oldNode && hasPositionChanged(node, oldNode);
    for (i = 0, l = nodeChildren.length; i < l; i++) {
      child = nodeChildren[i];
      oldChild = oldNode ? oldNode.children[i] : null;

      childStyle = child.style;
      childLayout = child.layout;

      layoutRelativeNode(child, oldChild, previousChild, mainAxis, crossAxis, mainAxis2, crossAxis2, shouldProcessAbsolute, hasParentDimensionsChanged);

      var skipPrevious = false;

      if (childStyle.position !== ABSOLUTE) {

        if (i === 0) {
          childLayout[parentMainAxis2.START] += nodeStyle[parentMainAxis.PADDING_LEADING];
          childLayout[parentMainAxis2.END] += nodeStyle[parentMainAxis.PADDING_TRAILING];
        }
        childLayout[parentCrossAxis2.START] += nodeStyle[parentCrossAxis.PADDING_LEADING];
        childLayout[parentCrossAxis2.DIMENSION] -= nodeStyle[parentCrossAxis.PADDING_LEADING] + nodeStyle[parentCrossAxis.PADDING_TRAILING];
        childLayout[parentCrossAxis2.END] -= nodeStyle[parentCrossAxis.PADDING_TRAILING];

        var newSize = childStyle[mainAxis.DIMENSION] !== UNDEFINED ? (childStyle[mainAxis.DIMENSION] + childStyle[crossAxis.MARGIN_LEADING] + childStyle[crossAxis.MARGIN_TRAILING]) || 0 : 0;

        if (isFlexWrap) {

          if ((totalChildrenSize + newSize) > nodeLayout[mainAxis2.DIMENSION]) {
            lineLengths.push(totalChildrenSize);
            crossLineLengths.push(maxCrossDimension);
            lineNrOfChildren.push(currNrOfChildren);
            lineIndex++;
            currNrOfChildren = 0;
            additional += maxCrossDimension;
            maxCrossDimension = 0;

            childLayout[mainAxis2.START] = nodeLayout[mainAxis2.START] + childStyle[mainAxis.MARGIN_LEADING];
            childLayout[mainAxis2.END] = childLayout[mainAxis2.START] + childLayout[mainAxis2.DIMENSION];

            totalChildrenSize = 0;

          }
          childLayout[CL.LINE_INDEX] = lineIndex;
        }
        currNrOfChildren++;
        totalChildrenSize += newSize;

        childLayout[crossAxis2.START] += additional;
        childLayout[crossAxis2.END] += additional;

        if (childLayout[parentMainAxis2.END] > maxSize) {
          maxSize = childLayout[parentMainAxis2.END] + childStyle[parentMainAxis.MARGIN_TRAILING];
        }

        totalFlexGrow += childStyle.flexGrow;

        if (skipPrevious) {
          previousChild = null;
        }
        else {
          previousChild = child;
        }

        if ((childLayout[crossAxis2.DIMENSION] + childStyle[crossAxis.MARGIN_TRAILING] + childStyle[crossAxis.MARGIN_LEADING]) > maxCrossDimension) {
          maxCrossDimension = childLayout[crossAxis2.DIMENSION] + childStyle[crossAxis.MARGIN_TRAILING] + childStyle[crossAxis.MARGIN_LEADING];
        }
      }

    }

    additional += maxCrossDimension;
    lineLengths.push(totalChildrenSize);
    crossLineLengths.push(maxCrossDimension);
    lineNrOfChildren.push(currNrOfChildren);

    if (node !== oldNode && nodeLayout[parentMainAxis2.DIMENSION] === 0) {
      nodeLayout[parentMainAxis2.END] = maxSize + nodeStyle[parentMainAxis.PADDING_TRAILING];
      nodeLayout[parentMainAxis2.DIMENSION] = nodeLayout[parentMainAxis2.END] - nodeLayout[parentMainAxis2.START];
    }

    var newParentHeight = nodeLayout[CL.HEIGHT];
    var newParentWidth = nodeLayout[CL.WIDTH];

    var mainDimensionSize = mainAxis === AXIS.row ? newParentWidth : newParentHeight;
    var crossDimensionSize = mainAxis === AXIS.row ? newParentHeight : newParentWidth;

    // correct the children position (justifyContent, alignItems, more?!)
    var justifyContent = nodeStyle.justifyContent;
    var alignItems = nodeStyle.alignItems;

    var remainingSpaceMainAxis;
    previousChild = null;
    var currentLineIndex = -1;
    var currCrossSize = 0;

    for (i = 0, l = nodeChildren.length; i < l; i++) {
      child = nodeChildren[i];
      childStyle = child.style;
      childLayout = child.layout;
      oldChild = oldNode ? oldNode.children[i] : null;
      if (currentLineIndex !== childLayout[CL.LINE_INDEX]) {
        currentLineIndex = childLayout[CL.LINE_INDEX];
        remainingSpaceMainAxis = mainDimensionSize - lineLengths[currentLineIndex];
        if (!totalFlexGrow) {
          if (justifyContent === CENTER) {
            remainingSpaceMainAxis /= 2;
          }
          else if (justifyContent === SPACE_BETWEEN) {
            remainingSpaceMainAxis /= (lineNrOfChildren[currentLineIndex] - 1);
            previousChild = null;
          }
          else if (justifyContent === SPACE_AROUND) {
            remainingSpaceMainAxis /= (lineNrOfChildren[currentLineIndex] * 2);
            previousChild = null;
          }
        }
        currCrossSize += lineLengths[currentLineIndex];
      }
      var isPositionAbsolute = childStyle.position === ABSOLUTE;

      var remainingSpaceCrossAxisSelf = crossDimensionSize - additional;

      var initialTop = childLayout[CL.TOP];
      var initialLeft = childLayout[CL.LEFT];

      if (totalFlexGrow) {
        flexSize(child, previousChild, totalFlexGrow, remainingSpaceMainAxis, newMainAxisDirection);
      }
      else {
        justifyContentFn(child, previousChild, mainAxis, mainAxis2, justifyContent, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute);
      }

      if (isPositionAbsolute) {
        absolutePosition(child, previousChild, mainAxis, crossAxis, mainAxis2, crossAxis2);
      }
      var alignSelf = (!isFlexWrap ? childStyle.alignSelf : alignItems) || alignItems;
      var addSpace = crossLineLengths[currentLineIndex] - childLayout[crossAxis2.DIMENSION] - childStyle[crossAxis.MARGIN_TRAILING] - childStyle[crossAxis.MARGIN_LEADING];
      if (addSpace) {
        remainingSpaceCrossAxisSelf += addSpace;
      }
      if (alignSelf === CENTER) {
        remainingSpaceCrossAxisSelf = (remainingSpaceCrossAxisSelf / 2);
      }

      // TODO: fix flexWrap line heights
      //if (lineLengths.length > 1) {
      //  var foo = node.layout2[xNewCrossAxisDirection.START] + (crossDimensionSize / (lineLengths.length - 1) * currentLineIndex);
      //
      //  childLayout[xNewCrossAxisDirection.START] = foo - childLayout[xNewCrossAxisDirection.DIMENSION] - childStyle[xNewCrossAxisDirection.MARGIN_TRAILING] - childStyle[xNewCrossAxisDirection.MARGIN_LEADING] - addSpace;
      //  childLayout[xNewCrossAxisDirection.END] = foo - addSpace;
      //}
      alignItemsFn(child, previousChild, crossAxis, crossAxis2, alignSelf, remainingSpaceCrossAxisSelf, parentHeight, parentWidth, isPositionAbsolute);
      if (isPositionAbsolute) {
        processChildren(child, oldChild, mainAxis, crossAxis, mainAxis2, crossAxis2, isPositionAbsolute, hasParentDimensionsChanged, offsetX, offsetY);
      }
      else if ((childLayout[CL.TOP] - initialTop) !== 0 || (childLayout[CL.LEFT] - initialLeft) !== 0) {
        correctChildren(child, oldChild, childLayout[CL.TOP] - initialTop, childLayout[CL.LEFT] - initialLeft, mainAxis, crossAxis, mainAxis2, crossAxis2);
      }
      if (!isPositionAbsolute) {
        previousChild = child;
      }
    }

    if (hasParentLocationChanged) {
      correctChildren(node, oldNode, offsetY, offsetX, parentMainAxis, parentCrossAxis);
    }

  }

}


function layoutRelativeNode(node, oldNode, previousSibling, mainAxis, crossAxis, mainAxis2, crossAxis2, shouldProcessAbsolute, hasParentDimensionsChanged) {
  var nodeLayout = node.layout;
  var nodeStyle = node.style;

  var oldNodeTop = 0;
  var oldNodeLeft = 0;
  if (oldNode) {
    oldNodeTop = oldNode.layout[CL.TOP];
    oldNodeLeft = oldNode.layout[CL.LEFT];
  }

  var parent = node.parent;
  if (parent && parent.style.position === ABSOLUTE && !shouldProcessAbsolute) {
    return node;
  }

  if (node === oldNode && !hasParentDimensionsChanged) {
    return node;
  }

  var parentLayout = parent ? parent.layout : null;
  var parentWidth = parentLayout ? parentLayout[CL.WIDTH] : clientWidth;

  if (previousSibling && nodeStyle.position !== ABSOLUTE) {
    nodeLayout[mainAxis2.START] = previousSibling.layout[mainAxis2.END] + previousSibling.style[mainAxis.MARGIN_TRAILING];
    nodeLayout[crossAxis2.START] = parentLayout[crossAxis2.START];

  }
  else {
    nodeLayout[CL.LEFT] = parent ? parentLayout[CL.LEFT] : 0;
    nodeLayout[CL.TOP] = parent ? parentLayout[CL.TOP] : 0;
  }

  nodeLayout[CL.LEFT] += nodeStyle.marginLeft;
  nodeLayout[CL.TOP] += nodeStyle.marginTop;

  nodeLayout[CL.WIDTH] = (nodeStyle.width !== UNDEFINED ? nodeStyle.width : 0) || (!nodeStyle.flexGrow ? parentWidth : 0) || 0;
  nodeLayout[CL.HEIGHT] = (nodeStyle.height !== UNDEFINED ? nodeStyle.height : 0);

  nodeLayout[CL.BOTTOM] = nodeLayout[CL.TOP] + nodeLayout[CL.HEIGHT];
  nodeLayout[CL.RIGHT] = nodeLayout[CL.LEFT] + nodeLayout[CL.WIDTH];


  if (nodeStyle.position !== ABSOLUTE) {
    processChildren(node, oldNode, mainAxis, crossAxis, mainAxis2, crossAxis2, false, hasParentDimensionsChanged, oldNodeLeft - node.layout[CL.LEFT], oldNodeTop - node.layout[CL.TOP]);
  }

  return node;
}

function layoutAbsoluteNode(node, oldNode, previousSibling, mainAxis, crossAxis) {
  absolutePosition(node, previousSibling, mainAxis, crossAxis);
  processChildren(node, oldNode, mainAxis, crossAxis, true);
}

module.exports = {
  layoutRelativeNode: layoutRelativeNode//,
  //layoutAbsoluteNode: layoutAbsoluteNode
};

},{"../UNDEFINED":3,"../__DEV__":4,"../components/ComponentConstants":8,"../renderers/DOM/ViewPortHelper":21,"../utils/toFloat32":31,"./AXIS":17,"./AXIS2":18}],20:[function(require,module,exports){
'use strict';

var __DEV__   = require('../__DEV__');
var UNDEFINED = require('../UNDEFINED');

function requestStyleRecalculation(node, oldNode) {
  var currentNode = node;
  var currentOldNode = oldNode;
  var requireStyleRecalculation = true;

  while(requireStyleRecalculation) {

    requireStyleRecalculation = false;
    var parent = currentNode.parent;
    var oldParent = currentOldNode.oldParent || currentOldNode.parent;
    if (__DEV__) {
      if (parent && parent === oldParent) {
        console.warn('new parent shouldn\'t be equal to old parent');
      }
    }
    var nodeStyle = currentNode.style;
    var oldNodeStyle = currentOldNode.style;

    if (parent &&
      (nodeStyle.position === 'absolute' || parent.style.flexWrap === 'wrap' || nodeStyle.alignSelf !== '' ||
      (parent.style.width === UNDEFINED || parent.style.height === UNDEFINED) &&
      (nodeStyle.position !== nodeStyle.position ||
       nodeStyle.width !== oldNodeStyle.width ||
       nodeStyle.height !== oldNodeStyle.height ||
       nodeStyle.top !== oldNodeStyle.top ||
       nodeStyle.left !== oldNodeStyle.left ||
       nodeStyle.right !== oldNodeStyle.right ||
       nodeStyle.bottom !== oldNodeStyle.bottom ||
       nodeStyle.marginBottom !== oldNodeStyle.marginBottom ||
       nodeStyle.marginTop !== oldNodeStyle.marginTop ||
       nodeStyle.marginRight !== oldNodeStyle.marginRight ||
       nodeStyle.marginLeft !== oldNodeStyle.marginLeft ||
       nodeStyle.paddingBottom !== oldNodeStyle.paddingBottom ||
       nodeStyle.paddingTop !== oldNodeStyle.paddingTop ||
       nodeStyle.paddingRight !== oldNodeStyle.paddingRight ||
       nodeStyle.paddingLeft !== oldNodeStyle.paddingLeft ||
       nodeStyle.justifyContent !== oldNodeStyle.justifyContent ||
       nodeStyle.alignItems !== oldNodeStyle.alignItems ||
       nodeStyle.alignSelf !== oldNodeStyle.alignSelf ||
       nodeStyle.flexGrow !== oldNodeStyle.flexGrow ||
       nodeStyle.flexWrap !== oldNodeStyle.flexWrap))) {
      requireStyleRecalculation = true;
      currentOldNode = oldParent;
      currentNode = parent;
    }
  }
  currentNode.oldRef = currentOldNode;
  return currentNode;
}

module.exports = requestStyleRecalculation;

},{"../UNDEFINED":3,"../__DEV__":4}],21:[function(require,module,exports){
'use strict';

var dimensions = {
  width: window.innerWidth,
  height: window.innerHeight,
  top: window.scrollY,
  left: window.scrollX
};

var isBusy = false;
var fn;
var currentRAF;
var ViewPortHelper = {

  getDimensions: function() {
    return dimensions;
  },

  onScroll: function(_fn) {
    fn = _fn;
  },

  _onScroll: function(evt) {
    if (currentRAF) {
      cancelAnimationFrame(currentRAF);
    }
    currentRAF = requestAnimationFrame(function() {
      dimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
        top: window.scrollY,
        left: window.scrollX
      };
      isBusy = false;
      if (fn) {
        fn.call();
      }
    });
  }

};

document.addEventListener('scroll', ViewPortHelper._onScroll);


module.exports = ViewPortHelper;

},{}],22:[function(require,module,exports){
'use strict';

var Shaders = {
  VertexShader2d :
'attribute vec2 a_position;'+
'attribute vec4 aVertexColor;'+
'uniform vec2 u_resolution;'+
'varying vec4 vColor;'+

'void main() {'+
'  // convert the rectangle from pixels to 0.0 to 1.0'+
'  vec2 zeroToOne = a_position / u_resolution;'+

'  // convert from 0->1 to 0->2'+
'  vec2 zeroToTwo = zeroToOne * 2.0;'+

'  // convert from 0->2 to -1->+1 (clipspace)'+
'  vec2 clipSpace = zeroToTwo - 1.0;'+

'  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);'+

'  vColor = aVertexColor;'+
'}'
};

module.exports = Shaders;
},{}],23:[function(require,module,exports){
'use strict';

/**
 * Helper for the Vertices.
 *
 * A vertex contains the following data:
 * [x,y,z,r,g,b,a]
 * [4, 4, 4, 1, 1, 1, 1]
 * - TODO: add additional bytes
 * - XYZ for positioning
 * - RGBA for colors and alpha
 *
 * @type
 */
var VertexInfo = {

  STRIDE: Float32Array.BYTES_PER_ELEMENT * 3 + Uint8Array.BYTES_PER_ELEMENT * 4

};

module.exports = VertexInfo;



},{}],24:[function(require,module,exports){
'use strict';

var VertexInfo = require('./VertexInfo');

function ensureViewIntegrity(element, index, verticesArray, colorsArray) {


}

module.exports = ensureViewIntegrity;

},{"./VertexInfo":23}],25:[function(require,module,exports){
'use strict';

var CL = require('../../components/ComponentConstants');

var ViewPortHelper  = require('../DOM/ViewPortHelper');
var viewPortDimensions = ViewPortHelper.getDimensions();

var clipSpaceX = 1 / viewPortDimensions.width * 2;
var clipSpaceY = 1 / viewPortDimensions.height * 2;

var left = viewPortDimensions.left * clipSpaceX;
var width = viewPortDimensions.width * clipSpaceX;
var top = viewPortDimensions.top * clipSpaceY;
var height = viewPortDimensions.height * clipSpaceY;

// TODO: add overflow support here...
function isViewVisible(element) {
  var result = !!(element.style && (element.style.backgroundColor ||
    element.style.border)) &&
    ((element.layout[CL.LEFT] >= left && element.layout[CL.LEFT] <= (left + width)) ||
    (element.layout[CL.RIGHT] >= left && element.layout[CL.RIGHT] <= (left + width)) ||
    (element.layout[CL.LEFT] < left && element.layout[CL.RIGHT] > (left + width))) &&
      ((element.layout[CL.TOP] >= top && element.layout[CL.TOP] <= (top + height)) ||
      (element.layout[CL.BOTTOM] >= top && element.layout[CL.BOTTOM] <= (top + height)) ||
      (element.layout[CL.TOP] < top && element.layout[CL.BOTTOM] > (top + height)));


    return result;
}

module.exports = isViewVisible;

},{"../../components/ComponentConstants":8,"../DOM/ViewPortHelper":21}],26:[function(require,module,exports){
'use strict';

var gl;
require('./temp-utils');
var renderView = require('./renderView');
var renderText = require('./renderText');
var Promise = require('promise');
var Shaders = require('./Shaders');
var VertexInfo = require('./VertexInfo');
var isViewVisible = require('./isViewVisible');

function rerender(domElement,
  newElement,
  oldElement,
  parent,
  position,
  viewPortDimensions,
  top,
  left) {
  return function() {
    render(domElement,
      newElement,
      oldElement,
      viewPortDimensions);
  }
}

var loadedImages = {};

function loadImageDirectly(src) {
  return loadedImages[src];
}

function loadImage(src) {
  return new Promise(function(resolve, reject) {
    // TODO: pool this
    var image = new Image();

    image.onload = function image$onload() {
      loadedImages[src] = image;
      resolve(image);
    };
    image.onerror = function image$onerror() {
      reject(image);
    };
    image.src = src;
  });
}

var existingImageTextures = {};

function getImageTexture(image, element) {
  if (existingImageTextures[element.props.src]) {
    return existingImageTextures[element.props.src];
  }
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  existingImageTextures[element.props.src] = texture;
  return texture;
}

function _renderImage(image, element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight) {
  //console.info(element.style);
  //return function(image) {

  // Create a texture.
  var texture = getImageTexture(image, element);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.uniform4f(image_u_dimensions, parentLeft, parentTop, parentLeft + parentWidth, parentTop + parentHeight);

  var dstX = left;
  var dstY = top;
  var dstWidth = width;
  var dstHeight = height;

  // convert dst pixel coords to clipspace coords
  var clipX = dstX / gl.canvas.width * 2 - 1;
  var clipY = dstY / gl.canvas.height * -2 + 1;
  var clipWidth = dstWidth / gl.canvas.width * 2;
  var clipHeight = dstHeight / gl.canvas.height * -2;

  // build a matrix that will stretch our
  // unit quad to our desired size and location
  gl.uniformMatrix3fv(image_u_matrix, false, [
    clipWidth, 0, 0,
    0, clipHeight, 0,
    clipX, clipY, 1
  ]);

  return [
    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    1.0, 1.0];

  //webGLContext.drawArrays(webGLContext.TRIANGLES, 0, 6);

  // }
}

function _rejectedImageLoad() {
  // TODO
}

function setLoaded(element) {
  return function() {
    element.props.isLoaded = true;
  }
}

function renderImage(domElement, newComponentTree, oldComponentTree, element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight) {
  if (element.props && element.props.src) {
    if (!element.props.isLoaded) {
      loadImage(element.props.src)
        .then(setLoaded(element), _rejectedImageLoad)
        .then(rerender(domElement, newComponentTree, oldComponentTree, null, 0, viewPortDimensions, 0, 0));
    }
    else {
      //console.info('YUP');
      var image = loadImageDirectly(element.props.src);
      _renderImage(image, element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight);
    }
  }
}

var isViewRendering = false;
var isImageRendering = false;
var isTextRendering = false;

function switchToImageRendering() {
  if (!isImageRendering) {
    isImageRendering = true;
    isViewRendering = false;
    isTextRendering = false;

    gl.useProgram(imageProgram);

    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  }
}

var vertexShader;
var vertexShader2;
var fragmentShader;
var imageShader;
var imageProgram;
var dynamicViewProgram;
var staticViewProgram;
var view_a_color;
var view_a_position;
//var iPositionLocation;
var image_u_resolution;
var view_u_resolution;
var textCoord;
var image_a_position;
var image_u_matrix;
var view_u_dimensions;
var topElement;
var topOldElement;
var topDOMElement;
var image_u_dimensions;
var dynamicBuffer;
var texCoordBuffer;
var colorBuffer;
var vertices;
var dynamicIndices;
var staticIndices;
var indexBuffer;
var colorsArray;
var dynamicArrayBuffer;
var staticArrayBuffer;
var dynamicVertexPosition = 0;
var staticVertexPosition = 0;
var staticBuffer;

function getNoVisibleDOMNodes(element, viewPortDimensions) {
  var nrOfVisibleDOMNodes = 0;

  if (isViewVisible(element, viewPortDimensions)) {
    nrOfVisibleDOMNodes += 1;
  }

  if (element.children) {
    for (var i = 0, l = element.children.length; i < l; i++) {
      nrOfVisibleDOMNodes += getNoVisibleDOMNodes(element.children[i], viewPortDimensions);
    }
  }

  return nrOfVisibleDOMNodes;
}

var isBlending = false;

function render(domElement,
  newElement,
  oldElement,
  childIndex,
  viewPortDimensions,
  isParentTransparent,
  isOverflow,
  inheritedOpacity,
  inheritedZoom,
  inheritedFontSize,
  inheritedColor,
  inheritedFilter
  ) {

  if (!gl) {
    topDOMElement = domElement;
    gl = domElement.getContext('webgl', {depth: true, alpha: true, antialias: true});
    if (gl == null) {
      gl = domElement.getContext('experimental-webgl', {depth: true, alpha: true, antialias: true});
    }

    vertexShader = createShaderFromScriptElement(gl, "2d-vertex-shader");
    vertexShader2 = createShaderFromScriptElement(gl, "2d-vertex-shader2");
    fragmentShader = createShaderFromScriptElement(gl, "2d-fragment-shader");
    imageShader = createShaderFromScriptElement(gl, "2d-image-shader");

    dynamicViewProgram = createProgram(gl, [vertexShader, fragmentShader], ['a_color', 'a_position'], [0, 1]);
    staticViewProgram = createProgram(gl, [vertexShader, fragmentShader]);
    imageProgram = createProgram(gl, [vertexShader2, imageShader]);

    //gl.bindAttribLocation(dynamicViewProgram, 0,  )

    //gl.clearColor(0,0,0,0);
    // remove shaders (not needed anymore after linking)
    gl.deleteShader(vertexShader);
    gl.deleteShader(vertexShader2);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(imageShader);

    gl.useProgram(dynamicViewProgram);

    dynamicBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dynamicBuffer);

    view_a_position = gl.getAttribLocation(dynamicViewProgram, "a_position");
    view_a_color = gl.getAttribLocation(dynamicViewProgram, "a_color");

    staticBuffer = gl.createBuffer();
    // xyzrgba
    gl.vertexAttribPointer(view_a_position, 3, gl.FLOAT, false, VertexInfo.STRIDE, 0);
    gl.enableVertexAttribArray(view_a_position);
    gl.vertexAttribPointer(view_a_color, 4, gl.UNSIGNED_BYTE, true, VertexInfo.STRIDE, 3 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(view_a_color);

    indexBuffer = gl.createBuffer();

    //gl.useProgram(imageProgram);
    //
    //image_u_dimensions = gl.getUniformLocation(imageProgram, 'u_dimensions');
    //image_u_matrix = gl.getUniformLocation(imageProgram, "u_matrix");
    //image_u_resolution = gl.getUniformLocation(imageProgram, "u_resolution");
    //gl.uniform2f(image_u_resolution, viewPortDimensions.width, viewPortDimensions.height);
    //
    //texCoordBuffer = gl.createBuffer();
    //gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    //
    //image_a_position = gl.getAttribLocation(imageProgram, "a_position");
    //gl.vertexAttribPointer(image_a_position, 2, gl.FLOAT, false, 0, 0);
    //gl.enableVertexAttribArray(image_a_position);

    domElement.width = viewPortDimensions.width;
    domElement.height = viewPortDimensions.height;
    console.info(gl.drawingBufferWidth);
    console.info(gl.drawingBufferHeight);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.STENCIL_TEST);
    gl.enable(gl.DEPTH_TEST);

    gl.depthFunc(gl.LESS);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    //
    //gl.useProgram(viewProgram);
    //gl.vertexAttribPointer(view_a_position, 3, gl.UNSIGNED_SHORT, false, VertexInfo.STRIDE, 0);
    //gl.enableVertexAttribArray(view_a_position);
    //gl.vertexAttribPointer(view_a_color, 4, gl.UNSIGNED_BYTE, true, VertexInfo.STRIDE, 3 * Uint16Array.BYTES_PER_ELEMENT);
    //gl.enableVertexAttribArray(view_a_color);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  }


  if (!newElement.parent) {
    var nrOfVertices = getNoVisibleDOMNodes(newElement, viewPortDimensions);

    if (!dynamicArrayBuffer || dynamicArrayBuffer.byteLength !== (4 * nrOfVertices * VertexInfo.STRIDE)) {
      //console.info(nrOfVertices);
      skip = false;
      // vertex should be: [x,y,z,r,g,b,a]
      dynamicArrayBuffer = new ArrayBuffer(4 * nrOfVertices * VertexInfo.STRIDE);
      vertices = new Float32Array(dynamicArrayBuffer);
      colorsArray = new Uint8Array(dynamicArrayBuffer);
      dynamicIndices = new Uint16Array(6 * nrOfVertices);
   }

    dynamicVertexPosition = 0;
    //gl.depthMask(false);

  }

  if (typeof newElement === 'string') {
    return;
  }

  // fixme: if (newElement && !oldElement) {
  if (!newElement.layout) {
    return;
  }

  //console.info(newElement.type);
  if (newElement.type === 'view') {

    //if (!isParentTransparent && newElement.style.opacity !== 1 && !isBlending) {
    //  gl.enable(gl.BLEND);
    //  isBlending = true;
    //  isParentTransparent = true;
    //  //isTransparent = true;
    //} else if (!isParentTransparent && isBlending){
    //  gl.disable(gl.BLEND);
    //  isBlending = false;
    //}

    dynamicVertexPosition += renderView(vertices, dynamicIndices, dynamicVertexPosition, colorsArray, newElement, oldElement, childIndex, inheritedOpacity || 1.0, skip);

    var style = newElement.style;
    if ('opacity' in style) {
      inheritedOpacity = (inheritedOpacity || 1.0) * style.opacity;
    }
    if (style.fontSize) {
      inheritedFontSize = style.fontSize;
    }
    if (style.zoom) {
      inheritedZoom = (inheritedZoom || 1.0) * style.zoom;
    }
    if (style.color) {
      inheritedColor = style.color;
    }
    if (style.filter) {
      // complex...
    }

    var children = newElement.children;
    var oldChildren = oldElement ? oldElement.children : null;
    if (children) {
      for (var i = 0, l = children.length; i < l; i++) {
        var child = children[i];

        render(domElement, child, oldChildren ? oldChildren[i] : null, i, viewPortDimensions, isParentTransparent,
          newElement.style.overflow === 'hidden',
          inheritedOpacity,
          inheritedZoom,
          inheritedFontSize,
          inheritedColor,
          inheritedFilter);
      }
    }
  }
  else if (newElement.type === 'text') {
    //switchToImageRendering();
    //var data = renderText(webGLContext, imageProgram, u_dimensions, u_matrixLoc, iTextLocation, texCoordBuffer, newElement, inheritedOpacity || 1, inheritedColor);
    // if (data) {
    //   bigArray = bigArray.concat(data);
    // }
  }
  else if (newElement.type === 'image') {
    //switchToImageRendering();
    //var data = renderImage(topDOMElement, topElement, topOldElement, newElement, top, left, newElement.layout.width, newElement.layout.height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity || 1, inheritedColor);
    // if (data) {
    //   bigArray = bigArray.concat(data);
    // }

  }
  if (!newElement.parent) {
    if (skip) {
      //gl.depthMask(true);
      gl.drawElements(gl.TRIANGLES, dynamicIndices.length, gl.UNSIGNED_SHORT, 0);
    }

    if (!skip) {
      gl.bufferData(gl.ARRAY_BUFFER, dynamicArrayBuffer, gl.DYNAMIC_DRAW);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, dynamicIndices, gl.STATIC_DRAW);
    }
    else {
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, dynamicArrayBuffer);
    }
    if (!skip) {
      //gl.depthMask(true);
      gl.drawElements(gl.TRIANGLES, dynamicIndices.length, gl.UNSIGNED_SHORT, 0);

      skip = true;
    }
  }
}
var skip = false;

module.exports = render;

},{"./Shaders":22,"./VertexInfo":23,"./isViewVisible":25,"./renderText":27,"./renderView":28,"./temp-utils":29,"promise":35}],27:[function(require,module,exports){
/**
 * Text caching:
 * - create canvas for each new text elements for performance
 * - only remove text elements when not rendering text to the screen anymore
 */

var textCaching = {};
var textCanvas = document.createElement('canvas');
var textCanvasCtx = textCanvas.getContext('2d');
function drawTextOnCanvas(webgl, newElement, width, height, inheritedOpacity, inheritedColor) {
  var text = newElement.children[0];
  var font = newElement.style.fontStyle + ' ' + newElement.style.fontWeight + ' ' + newElement.style.fontSize + 'px ' + newElement.style.fontFamily;
  var textAlign = newElement.style.textAlign;
  var textBaseLine = 'middle';
  var fillStyle = inheritedColor || "black";

  var uniqueKey = text + font + width + height + textAlign + textBaseLine + fillStyle;
  if(textCaching[uniqueKey]){
    return textCaching[uniqueKey];
  }


  textCanvasCtx.clearRect(0, 0, width, height);
  textCanvasCtx.canvas.width = width;
  textCanvasCtx.canvas.height = height;
  textCanvasCtx.font = font;
  textCanvasCtx.textAlign = newElement.style.textAlign;
  textCanvasCtx.textBaseline = textBaseLine;
  textCanvasCtx.fillStyle = fillStyle;
  var left = 0;
  if (textAlign === 'right') {
    left = width;
  }
  else if (textAlign === 'center') {
    left = width / 2;
  }
  textCanvasCtx.fillText(text, left, newElement.style.fontSize / 2);
  var canvas = textCanvasCtx.canvas;
  var texture = webgl.createTexture();
  webgl.bindTexture(webgl.TEXTURE_2D, texture);

  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.CLAMP_TO_EDGE);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.CLAMP_TO_EDGE);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.NEAREST);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.NEAREST);

  webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA, webgl.RGBA, webgl.UNSIGNED_BYTE, textCanvas);
  textCaching[uniqueKey] = texture;

  return texture;
}

var u_matrixLoc;
function renderText(webgl, imageProgram, u_dimensions, u_matrixLoc, iTextLocation, texCoordBuffer, newElement, inheritedOpacity, inheritedColor) {
  var layout = newElement.layout;
  var top = layout.top;
  var left = layout.left;
  var width = layout.width;
  var height = layout.height;
  var parent = newElement.parent;
  var parentLayout = parent.layout;
  var parentTop = parentLayout.top;
  var parentLeft = parentLayout.left;
  var parentWidth = parentLayout.width;
  var parentHeight = parentLayout.height;
  var parentRight = parentLayout.right;
  var parentBottom = parentLayout.bottom;

  webgl.useProgram(imageProgram);



  webgl.uniform4f(u_dimensions, parentLeft, parentTop, parentRight, parentBottom);
  //webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(), webgl.STATIC_DRAW);


  var texture = drawTextOnCanvas(webgl, newElement, parentWidth, parentHeight, inheritedOpacity, inheritedColor);
  // Create a texture.

  webgl.bindTexture(webgl.TEXTURE_2D, texture);
  // Upload the image into the texture.

  //webGLContext.activeTexture(webGLContext.TEXTURE0);
  // Set the parameters so we can render any size image.

  var dstX = parentLeft;
  var dstY = parentTop;
  var dstWidth = parentWidth;
  var dstHeight = parentHeight;

  // convert dst pixel coords to clipspace coords
  var clipX = dstX / webgl.canvas.width  *  2 - 1;
  var clipY = dstY / webgl.canvas.height * -2 + 1;
  var clipWidth = dstWidth  / webgl.canvas.width  *  2;
  var clipHeight = dstHeight / webgl.canvas.height * -2;

  // build a matrix that will stretch our
  // unit quad to our desired size and location
  webgl.uniformMatrix3fv(u_matrixLoc, false, [
    clipWidth, 0, 0,
    0, clipHeight, 0,
    clipX, clipY, 1
  ]);

  //webgl.drawArrays(webgl.TRIANGLES, 0, 6);
  //return 6;
  return [
    0.0,  0.0,
    1.0,  0.0,
    0.0,  1.0,
    0.0,  1.0,
    1.0,  0.0,
    1.0,  1.0];
}

var TextRenderer = {

  renderText: function() {

  },

  cleanTextCaching: function() {

  }

};

module.exports = renderText;

},{}],28:[function(require,module,exports){
'use strict';

var __DEV__ = require('../../__DEV__');
var VertexInfo = require('./VertexInfo');
var ensureViewIntegrity = require('./ensureViewIntegrity');
var isViewVisible = require('./isViewVisible');

var WebGLColors = {
  black: [0, 0, 0],
  silver: [],
  gray: [],
  white: [255, 255, 255],
  maroon: [],
  red: [255, 0, 0],
  purple: [],
  fuchsia: [],
  green: [0, 128, 0],
  lime: [],
  olive: [],
  yellow: [],
  navy: [],
  blue: [0, 0, 255],
  teal: [],
  acqua: []

};


function setBackgroundColor(colorsArray, index, element, inheritedOpacity) {
  if (element.style.backgroundColor !== '') {
    var backgroundColor = WebGLColors[element.style.backgroundColor];
    var opacity = 1.0;
    var opacityProp = element.style.opacity;
    if (inheritedOpacity === 1) {
      opacity = opacityProp;
    }
    else if (opacityProp === 1) {
      opacity = inheritedOpacity;
    }
    else {
      opacity = opacityProp * inheritedOpacity;
    }

    opacity = opacity * 255;
    var colorPosition = index * VertexInfo.STRIDE * 4;
    // 0 - 2 - xyz

    colorPosition += 3 * Float32Array.BYTES_PER_ELEMENT;
    colorsArray[colorPosition + 0] = backgroundColor[0];
    colorsArray[colorPosition + 1] = backgroundColor[1];
    colorsArray[colorPosition + 2] = backgroundColor[2];
    colorsArray[colorPosition + 3] = opacity;

    // 7 - 9 - xyz

    colorPosition += 3 * Float32Array.BYTES_PER_ELEMENT + 4;
    colorsArray[colorPosition + 0] = backgroundColor[0];
    colorsArray[colorPosition + 1] = backgroundColor[1];
    colorsArray[colorPosition + 2] = backgroundColor[2];
    colorsArray[colorPosition + 3] = opacity;

    // 14 - 16 - xyz

    colorPosition += 3 * Float32Array.BYTES_PER_ELEMENT + 4;
    colorsArray[colorPosition + 0] = backgroundColor[0];
    colorsArray[colorPosition + 1] = backgroundColor[1];
    colorsArray[colorPosition + 2] = backgroundColor[2];
    colorsArray[colorPosition + 3] = opacity;

    // 21 - 23 - xyz

    colorPosition += 3 * Float32Array.BYTES_PER_ELEMENT + 4;
    colorsArray[colorPosition + 0] = backgroundColor[0];
    colorsArray[colorPosition + 1] = backgroundColor[1];
    colorsArray[colorPosition + 2] = backgroundColor[2];
    colorsArray[colorPosition + 3] = opacity;
  }
}

function setBorder(element) {
  if (element.props && element.props.style && element.props.style.border) {
    console.warn('not implemented yet');
    // 4x renderView I guess?! do borderLeft, borderTop, borderRight, borderBottom separately...
  }
}

var ViewPortHelper  = require('../DOM/ViewPortHelper');
var viewPortDimensions = ViewPortHelper.getDimensions();

var clipSpaceX = 1 / viewPortDimensions.width * 2;
var clipSpaceY = 1 / viewPortDimensions.height * 2;
var viewPortLeft = viewPortDimensions.left * clipSpaceX;
var viewPortRight = viewPortDimensions.right * clipSpaceX;
var viewPortTop = viewPortDimensions.top * clipSpaceY;
var viewPortBottom = viewPortDimensions.bottom * clipSpaceY;


function renderView(verticesArray, indexArray, index, colorsArray, element, oldElement, childIndex, inheritedOpacity, skip) {
  if (isViewVisible(element)) {
    if (element !== oldElement || !skip) {
      var elementLayout = element.layout;

      // TODO: move to compile time to remove stress from runtime CPU
      var left   = elementLayout[0];
      var right  = elementLayout[2];
      var top    = elementLayout[3];
      var bottom = elementLayout[5];
      if (left < viewPortLeft) {
        left = viewPortLeft;
      }
      if (right > viewPortRight) {
        right = viewPortRight;
      }
      if (top < viewPortTop) {
        top = viewPortTop;
      }
      if (bottom > viewPortBottom) {
        bottom = viewPortBottom;
      }

      left   = left - 1.0;
      right  = right - 1.0;
      top    = (top - 1.0) * -1.0;
      bottom = (bottom - 1.0) * -1.0;



      // TODO better calculate zIndex
      var zIndex = element.depth * 0.1;

      setBackgroundColor(colorsArray, index, element, inheritedOpacity);
      setBorder(element);

      var vertexPos = index * VertexInfo.STRIDE * 4 / Float32Array.BYTES_PER_ELEMENT;

      verticesArray[vertexPos + 0] = left;
      verticesArray[vertexPos + 1] = top;
      verticesArray[vertexPos + 2] = zIndex;

      // color rgba 3 - 6
      vertexPos += 4;

      //012 3456 7

      verticesArray[vertexPos + 0] = right;
      verticesArray[vertexPos + 1] = top;
      verticesArray[vertexPos + 2] = zIndex;

      // color rgba 10 - 13
      vertexPos += 4;

      verticesArray[vertexPos + 0] = left;
      verticesArray[vertexPos + 1] = bottom;
      verticesArray[vertexPos + 2] = zIndex;

      // color rgba 17 - 20
      vertexPos += 4;

      verticesArray[vertexPos + 0] = right;
      verticesArray[vertexPos + 1] = bottom;
      verticesArray[vertexPos + 2] = zIndex;


      if (__DEV__) {
        ensureViewIntegrity(element, index, verticesArray, colorsArray)
      }
      
      vertexPos = index * 4;


      // all opaque values should go from front to back
      var indexPos;
      indexPos = indexArray.length - 6 - index * 6;

      // TODO: all transparent values should go after the opaque values



      indexArray.set([vertexPos + 0,
                      vertexPos + 1,
                      vertexPos + 2,
                      vertexPos + 2,
                      vertexPos + 1,
                      vertexPos + 3], indexPos);
      //indexArray[indexPos + 0] = vertexPos + 0;
      //indexArray[indexPos + 1] = vertexPos + 1;
      //indexArray[indexPos + 2] = vertexPos + 2;
      //indexArray[indexPos + 3] = vertexPos + 2;
      //indexArray[indexPos + 4] = vertexPos + 1;
      //indexArray[indexPos + 5] = vertexPos + 3;



    }
    return 1;
  }
  return 0;
}

module.exports = renderView;

},{"../../__DEV__":4,"../DOM/ViewPortHelper":21,"./VertexInfo":23,"./ensureViewIntegrity":24,"./isViewVisible":25}],29:[function(require,module,exports){
// Licensed under a BSD license. See ../license.html for license

// These funcitions are meant solely to help unclutter the tutorials.
// They are not meant as production type functions.

(function() {

  /**
   * Wrapped logging function.
   * @param {string} msg The message to log.
   */
  var log = function(msg) {
    if (window.console && window.console.log) {
      window.console.log(msg);
    }
  };

  /**
   * Wrapped logging function.
   * @param {string} msg The message to log.
   */
  var error = function(msg) {
    if (window.console) {
      if (window.console.error) {
        window.console.error(msg);
      }
      else if (window.console.log) {
        window.console.log(msg);
      }
    }
  };

  /**
   * Turn off all logging.
   */
  var loggingOff = function() {
    log = function() {};
    error = function() {};
  };

  /**
   * Check if the page is embedded.
   * @return {boolean} True of we are in an iframe
   */
  var isInIFrame = function() {
    return window != window.top;
  };

  /**
   * Converts a WebGL enum to a string
   * @param {!WebGLContext} gl The WebGLContext to use.
   * @param {number} value The enum value.
   * @return {string} The enum as a string.
   */
  var glEnumToString = function(gl, value) {
    for (var p in gl) {
      if (gl[p] == value) {
        return p;
      }
    }
    return "0x" + value.toString(16);
  };

  /**
   * Creates the HTLM for a failure message
   * @param {string} canvasContainerId id of container of th
   *        canvas.
   * @return {string} The html.
   */
  var makeFailHTML = function(msg) {
    return '' +
      '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
      '<td align="center">' +
      '<div style="display: table-cell; vertical-align: middle;">' +
      '<div style="">' + msg + '</div>' +
      '</div>' +
      '</td></tr></table>';
  };

  /**
   * Mesasge for getting a webgl browser
   * @type {string}
   */
  var GET_A_WEBGL_BROWSER = '' +
    'This page requires a browser that supports WebGL.<br/>' +
    '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

  /**
   * Mesasge for need better hardware
   * @type {string}
   */
  var OTHER_PROBLEM = '' +
    "It doesn't appear your computer can support WebGL.<br/>" +
    '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';

  /**
   * Creates a webgl context. If creation fails it will
   * change the contents of the container of the <canvas>
   * tag to an error message with the correct links for WebGL.
   * @param {Element} canvas. The canvas element to create a
   *     context from.
   * @param {WebGLContextCreationAttirbutes} opt_attribs Any
   *     creation attributes you want to pass in.
   * @return {WebGLRenderingContext} The created context.
   */
  var setupWebGL = function(canvas, opt_attribs) {
    function showLink(str) {
      var container = canvas.parentNode;
      if (container) {
        container.innerHTML = makeFailHTML(str);
      }
    };

    if (!window.WebGLRenderingContext) {
      showLink(GET_A_WEBGL_BROWSER);
      return null;
    }

    var context = create3DContext(canvas, opt_attribs);
    if (!context) {
      showLink(OTHER_PROBLEM);
    }
    return context;
  };

  /**
   * Creates a webgl context.
   * @param {!Canvas} canvas The canvas tag to get context
   *     from. If one is not passed in one will be created.
   * @return {!WebGLContext} The created context.
   */
  var create3DContext = function(canvas, opt_attribs) {
    var names = ["webgl", "experimental-webgl"];
    var context = null;
    for (var ii = 0; ii < names.length; ++ii) {
      try {
        context = canvas.getContext(names[ii], opt_attribs);
      } catch(e) {}
      if (context) {
        break;
      }
    }
    return context;
  }

  var updateCSSIfInIFrame = function() {
    if (isInIFrame()) {
      document.body.className = "iframe";
    }
  };

  /**
   * Gets a WebGL context.
   * makes its backing store the size it is displayed.
   */
  var getWebGLContext = function(canvas) {
    if (isInIFrame()) {
      updateCSSIfInIFrame();

      // make the canvas backing store the size it's displayed.
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    } else {
      var title = document.getElementsByTagName("title")[0].innerText;
      var h1 = document.createElement("h1");
      h1.innerText = title;
      document.body.insertBefore(h1, document.body.children[0]);
    }

    var gl = setupWebGL(canvas);
    return gl;
  };

  /**
   * Loads a shader.
   * @param {!WebGLContext} gl The WebGLContext to use.
   * @param {string} shaderSource The shader source.
   * @param {number} shaderType The type of shader.
   * @param {function(string): void) opt_errorCallback callback for errors.
 * @return {!WebGLShader} The created shader.
   */
  var loadShader = function(gl, shaderSource, shaderType, opt_errorCallback) {
    var errFn = opt_errorCallback || error;
    // Create the shader object
    var shader = gl.createShader(shaderType);

    // Load the shader source
    gl.shaderSource(shader, shaderSource);

    // Compile the shader
    gl.compileShader(shader);

    // Check the compile status
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
      // Something went wrong during compilation; get the error
      lastError = gl.getShaderInfoLog(shader);
      errFn("*** Error compiling shader '" + shader + "':" + lastError);
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  /**
   * Creates a program, attaches shaders, binds attrib locations, links the
   * program and calls useProgram.
   * @param {!Array.<!WebGLShader>} shaders The shaders to attach
   * @param {!Array.<string>} opt_attribs The attribs names.
   * @param {!Array.<number>} opt_locations The locations for the attribs.
   */
  var loadProgram = function(gl, shaders, opt_attribs, opt_locations) {
    var program = gl.createProgram();

    for (var ii = 0; ii < shaders.length; ++ii) {
      gl.attachShader(program, shaders[ii]);
    }
    if (opt_attribs) {
      for (var ii = 0; ii < opt_attribs.length; ++ii) {
        gl.bindAttribLocation(
          program,
          opt_locations ? opt_locations[ii] : ii,
          opt_attribs[ii]);
      }
    }
    gl.linkProgram(program);

    // Check the link status
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
      // something went wrong with the link
      lastError = gl.getProgramInfoLog (program);
      error("Error in program linking:" + lastError);

      gl.deleteProgram(program);
      return null;
    }
    return program;
  };

  /**
   * Loads a shader from a script tag.
   * @param {!WebGLContext} gl The WebGLContext to use.
   * @param {string} scriptId The id of the script tag.
   * @param {number} opt_shaderType The type of shader. If not passed in it will
   *     be derived from the type of the script tag.
   * @param {function(string): void) opt_errorCallback callback for errors.
 * @return {!WebGLShader} The created shader.
   */
  var createShaderFromScript = function(
    gl, scriptId, opt_shaderType, opt_errorCallback) {
    var shaderSource = "";
    var shaderType;
    var shaderScript = document.getElementById(scriptId);
    if (!shaderScript) {
      throw("*** Error: unknown script element" + scriptId);
    }
    shaderSource = shaderScript.text;

    if (!opt_shaderType) {
      if (shaderScript.type == "x-shader/x-vertex") {
        shaderType = gl.VERTEX_SHADER;
      } else if (shaderScript.type == "x-shader/x-fragment") {
        shaderType = gl.FRAGMENT_SHADER;
      } else if (shaderType != gl.VERTEX_SHADER && shaderType != gl.FRAGMENT_SHADER) {
        throw("*** Error: unknown shader type");
        return null;
      }
    }

    return loadShader(
      gl, shaderSource, opt_shaderType ? opt_shaderType : shaderType,
      opt_errorCallback);
  };

  /* export functions */
  this.createProgram = loadProgram;
  this.createShaderFromScriptElement = createShaderFromScript;
  this.getWebGLContext = getWebGLContext;
  this.updateCSSIfInIFrame = updateCSSIfInIFrame;

  /**
   * Provides requestAnimationFrame in a cross browser way.
   */
  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
        return window.setTimeout(callback, 1000/60);
      };
  })();

  /**
   * Provides cancelRequestAnimationFrame in a cross browser way.
   */
  window.cancelRequestAnimFrame = (function() {
    return window.cancelCancelRequestAnimationFrame ||
      window.webkitCancelRequestAnimationFrame ||
      window.mozCancelRequestAnimationFrame ||
      window.oCancelRequestAnimationFrame ||
      window.msCancelRequestAnimationFrame ||
      window.clearTimeout;
  })();

}());


},{}],30:[function(require,module,exports){
'use strict';

var toFloat32 = require('../utils/toFloat32');

function merge(parent, child) {
  var childKeys = Object.keys(child);
  for (var i = 0, l = childKeys.length; i < l; i++) {
    var childKey = childKeys[i];
    var value = child[childKey];
    parent[childKey] = !isNaN(value) ? toFloat32(value) : value;
  }
  return parent;
}

module.exports = merge;

},{"../utils/toFloat32":31}],31:[function(require,module,exports){
var helperArray = new Float32Array(1);

module.exports = function(nr) {helperArray[0] = +nr; return helperArray[0];};

},{}],32:[function(require,module,exports){
/*global define:false require:false */
module.exports = (function(){
	// Import Events
	var events = require('events')

	// Export Domain
	var domain = {}
	domain.createDomain = domain.create = function(){
		var d = new events.EventEmitter()

		function emitError(e) {
			d.emit('error', e)
		}

		d.add = function(emitter){
			emitter.on('error', emitError)
		}
		d.remove = function(emitter){
			emitter.removeListener('error', emitError)
		}
		d.bind = function(fn){
			return function(){
				var args = Array.prototype.slice.call(arguments)
				try {
					fn.apply(null, args)
				}
				catch (err){
					emitError(err)
				}
			}
		}
		d.intercept = function(fn){
			return function(err){
				if ( err ) {
					emitError(err)
				}
				else {
					var args = Array.prototype.slice.call(arguments, 1)
					try {
						fn.apply(null, args)
					}
					catch (err){
						emitError(err)
					}
				}
			}
		}
		d.run = function(fn){
			try {
				fn()
			}
			catch (err) {
				emitError(err)
			}
			return this
		};
		d.dispose = function(){
			this.removeAllListeners()
			return this
		};
		d.enter = d.exit = function(){
			return this
		}
		return d
	};
	return domain
}).call(this)
},{"events":33}],33:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],34:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],35:[function(require,module,exports){
'use strict';

module.exports = require('./lib')

},{"./lib":40}],36:[function(require,module,exports){
'use strict';

var asap = require('asap/raw');

function noop() {}

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
var LAST_ERROR = null;
var IS_ERROR = {};
function getThen(obj) {
  try {
    return obj.then;
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}
function tryCallTwo(fn, a, b) {
  try {
    fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

module.exports = Promise;

function Promise(fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('not a function');
  }
  this._37 = 0;
  this._12 = null;
  this._59 = [];
  if (fn === noop) return;
  doResolve(fn, this);
}
Promise._99 = noop;

Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise) {
    return safeThen(this, onFulfilled, onRejected);
  }
  var res = new Promise(noop);
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};

function safeThen(self, onFulfilled, onRejected) {
  return new self.constructor(function (resolve, reject) {
    var res = new Promise(noop);
    res.then(resolve, reject);
    handle(self, new Handler(onFulfilled, onRejected, res));
  });
};
function handle(self, deferred) {
  while (self._37 === 3) {
    self = self._12;
  }
  if (self._37 === 0) {
    self._59.push(deferred);
    return;
  }
  asap(function() {
    var cb = self._37 === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      if (self._37 === 1) {
        resolve(deferred.promise, self._12);
      } else {
        reject(deferred.promise, self._12);
      }
      return;
    }
    var ret = tryCallOne(cb, self._12);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}
function resolve(self, newValue) {
  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self) {
    return reject(
      self,
      new TypeError('A promise cannot be resolved with itself.')
    );
  }
  if (
    newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    var then = getThen(newValue);
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }
    if (
      then === self.then &&
      newValue instanceof Promise
    ) {
      self._37 = 3;
      self._12 = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  self._37 = 1;
  self._12 = newValue;
  finale(self);
}

function reject(self, newValue) {
  self._37 = 2;
  self._12 = newValue;
  finale(self);
}
function finale(self) {
  for (var i = 0; i < self._59.length; i++) {
    handle(self, self._59[i]);
  }
  self._59 = null;
}

function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, promise) {
  var done = false;
  var res = tryCallTwo(fn, function (value) {
    if (done) return;
    done = true;
    resolve(promise, value);
  }, function (reason) {
    if (done) return;
    done = true;
    reject(promise, reason);
  })
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}

},{"asap/raw":44}],37:[function(require,module,exports){
'use strict';

var Promise = require('./core.js');

module.exports = Promise;
Promise.prototype.done = function (onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this;
  self.then(null, function (err) {
    setTimeout(function () {
      throw err;
    }, 0);
  });
};

},{"./core.js":36}],38:[function(require,module,exports){
'use strict';

//This file contains the ES6 extensions to the core Promises/A+ API

var Promise = require('./core.js');

module.exports = Promise;

/* Static Functions */

var TRUE = valuePromise(true);
var FALSE = valuePromise(false);
var NULL = valuePromise(null);
var UNDEFINED = valuePromise(undefined);
var ZERO = valuePromise(0);
var EMPTYSTRING = valuePromise('');

function valuePromise(value) {
  var p = new Promise(Promise._99);
  p._37 = 1;
  p._12 = value;
  return p;
}
Promise.resolve = function (value) {
  if (value instanceof Promise) return value;

  if (value === null) return NULL;
  if (value === undefined) return UNDEFINED;
  if (value === true) return TRUE;
  if (value === false) return FALSE;
  if (value === 0) return ZERO;
  if (value === '') return EMPTYSTRING;

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then;
      if (typeof then === 'function') {
        return new Promise(then.bind(value));
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex);
      });
    }
  }
  return valuePromise(value);
};

Promise.all = function (arr) {
  var args = Array.prototype.slice.call(arr);

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([]);
    var remaining = args.length;
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof Promise && val.then === Promise.prototype.then) {
          while (val._37 === 3) {
            val = val._12;
          }
          if (val._37 === 1) return res(i, val._12);
          if (val._37 === 2) reject(val._12);
          val.then(function (val) {
            res(i, val);
          }, reject);
          return;
        } else {
          var then = val.then;
          if (typeof then === 'function') {
            var p = new Promise(then.bind(val));
            p.then(function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
      }
      args[i] = val;
      if (--remaining === 0) {
        resolve(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

Promise.race = function (values) {
  return new Promise(function (resolve, reject) {
    values.forEach(function(value){
      Promise.resolve(value).then(resolve, reject);
    });
  });
};

/* Prototype Methods */

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};

},{"./core.js":36}],39:[function(require,module,exports){
'use strict';

var Promise = require('./core.js');

module.exports = Promise;
Promise.prototype['finally'] = function (f) {
  return this.then(function (value) {
    return Promise.resolve(f()).then(function () {
      return value;
    });
  }, function (err) {
    return Promise.resolve(f()).then(function () {
      throw err;
    });
  });
};

},{"./core.js":36}],40:[function(require,module,exports){
'use strict';

module.exports = require('./core.js');
require('./done.js');
require('./finally.js');
require('./es6-extensions.js');
require('./node-extensions.js');

},{"./core.js":36,"./done.js":37,"./es6-extensions.js":38,"./finally.js":39,"./node-extensions.js":41}],41:[function(require,module,exports){
'use strict';

// This file contains then/promise specific extensions that are only useful
// for node.js interop

var Promise = require('./core.js');
var asap = require('asap');

module.exports = Promise;

/* Static Functions */

Promise.denodeify = function (fn, argumentCount) {
  argumentCount = argumentCount || Infinity;
  return function () {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 0,
        argumentCount > 0 ? argumentCount : 0);
    return new Promise(function (resolve, reject) {
      args.push(function (err, res) {
        if (err) reject(err);
        else resolve(res);
      })
      var res = fn.apply(self, args);
      if (res &&
        (
          typeof res === 'object' ||
          typeof res === 'function'
        ) &&
        typeof res.then === 'function'
      ) {
        resolve(res);
      }
    })
  }
}
Promise.nodeify = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    var callback =
      typeof args[args.length - 1] === 'function' ? args.pop() : null;
    var ctx = this;
    try {
      return fn.apply(this, arguments).nodeify(callback, ctx);
    } catch (ex) {
      if (callback === null || typeof callback == 'undefined') {
        return new Promise(function (resolve, reject) {
          reject(ex);
        });
      } else {
        asap(function () {
          callback.call(ctx, ex);
        })
      }
    }
  }
}

Promise.prototype.nodeify = function (callback, ctx) {
  if (typeof callback != 'function') return this;

  this.then(function (value) {
    asap(function () {
      callback.call(ctx, null, value);
    });
  }, function (err) {
    asap(function () {
      callback.call(ctx, err);
    });
  });
}

},{"./core.js":36,"asap":42}],42:[function(require,module,exports){
"use strict";

// rawAsap provides everything we need except exception management.
var rawAsap = require("./raw");
// RawTasks are recycled to reduce GC churn.
var freeTasks = [];
// We queue errors to ensure they are thrown in right order (FIFO).
// Array-as-queue is good enough here, since we are just dealing with exceptions.
var pendingErrors = [];
var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

function throwFirstError() {
    if (pendingErrors.length) {
        throw pendingErrors.shift();
    }
}

/**
 * Calls a task as soon as possible after returning, in its own event, with priority
 * over other events like animation, reflow, and repaint. An error thrown from an
 * event will not interrupt, nor even substantially slow down the processing of
 * other events, but will be rather postponed to a lower priority event.
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
module.exports = asap;
function asap(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawAsap(rawTask);
}

// We wrap tasks with recyclable task objects.  A task object implements
// `call`, just like a function.
function RawTask() {
    this.task = null;
}

// The sole purpose of wrapping the task is to catch the exception and recycle
// the task object after its single use.
RawTask.prototype.call = function () {
    try {
        this.task.call();
    } catch (error) {
        if (asap.onerror) {
            // This hook exists purely for testing purposes.
            // Its name will be periodically randomized to break any code that
            // depends on its existence.
            asap.onerror(error);
        } else {
            // In a web browser, exceptions are not fatal. However, to avoid
            // slowing down the queue of pending tasks, we rethrow the error in a
            // lower priority turn.
            pendingErrors.push(error);
            requestErrorThrow();
        }
    } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
    }
};

},{"./raw":43}],43:[function(require,module,exports){
(function (global){
"use strict";

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
var BrowserMutationObserver = global.MutationObserver || global.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],44:[function(require,module,exports){
(function (process){
"use strict";

var domain; // The domain module is executed on demand
var hasSetImmediate = typeof setImmediate === "function";

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including network IO events in Node.js.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Avoids a function call
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory excaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

rawAsap.requestFlush = requestFlush;
function requestFlush() {
    // Ensure flushing is not bound to any domain.
    // It is not sufficient to exit the domain, because domains exist on a stack.
    // To execute code outside of any domain, the following dance is necessary.
    var parentDomain = process.domain;
    if (parentDomain) {
        if (!domain) {
            // Lazy execute the domain module.
            // Only employed if the user elects to use domains.
            domain = require("domain");
        }
        domain.active = process.domain = null;
    }

    // `setImmediate` is slower that `process.nextTick`, but `process.nextTick`
    // cannot handle recursion.
    // `requestFlush` will only be called recursively from `asap.js`, to resume
    // flushing after an error is thrown into a domain.
    // Conveniently, `setImmediate` was introduced in the same version
    // `process.nextTick` started throwing recursion errors.
    if (flushing && hasSetImmediate) {
        setImmediate(flush);
    } else {
        process.nextTick(flush);
    }

    if (parentDomain) {
        domain.active = process.domain = parentDomain;
    }
}

}).call(this,require('_process'))
},{"_process":34,"domain":32}]},{},[2]);
