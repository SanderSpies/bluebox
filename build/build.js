(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    View({}, {height: 100, backgroundColor: 'red', color:'blue', flexGrow: 4}, [Text('a', { fontSize: 100, fontFamily: 'San Francisco'})]),
    View({}, {height: 100, backgroundColor: 'blue', flexGrow: 1}, [Text('b')])
  ]),
  View({}, {flexDirection: 'row'}, [
    View({}, {width: 600, height: 400, backgroundColor: 'black', overflow: 'hidden'}, [
      View({}, {flexDirection: 'row', marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20}, [
        View({}, sharedStyle, [Text('foobar123')]),
        View({}, sharedStyle, [Text('a', {textAlign: 'right'})]),
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
        View({}, sharedStyle, [Image({src: 'images/foo.png'},sharedImageStyle)]),
        View({}, sharedStyle, [Text('foobar')]),
        View({}, sharedStyle, [Text('a')]),
        View({}, {width: 300, height: 100, backgroundColor: 'red', color:'white', marginTop: 5, marginBottom: 5, marginLeft: 5, marginRight: 5, opacity: 0.8}, [Text('a')]),
        View({}, sharedStyle, [Image({src: 'images/grumpy2.jpg'}, sharedImageStyle)]),
        View({}, sharedStyle, [Image({src: 'images/grumpy1.jpg'}, sharedImageStyle)]),
        View({}, sharedStyle, [Image({src: 'images/cat_tardis.jpg'}, sharedImageStyle)]),
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
},{"./../../lib/components/C":3,"./../../lib/index":10}],2:[function(require,module,exports){
var Bluebox = require('./../../lib/index');

var doms = [require('./CategoriesView')]; //, require('./testdom2'), require('./testdom3')];
var i = 0;

//console.profile('rendering');
function renderMe() {
  if (i === 2) {
    i = 0;
  }

  Bluebox.renderFromTop(doms[0], document.getElementById('canvas'));

  //setTimeout(function(){
  //  console.log('again!');
  //  Bluebox.renderFromTop(doms[0], document.getElementById('canvas'));
  //},2000);

  i++;
}



renderMe();

},{"./../../lib/index":10,"./CategoriesView":1}],3:[function(require,module,exports){
'use strict';

function merge(parent, child) {
  var childKeys = Object.keys(child);
  for (var i = 0, l = childKeys.length; i < l; i++) {
    var childKey = childKeys[i];
    parent[childKey] = child[childKey];
  }
  return parent;
}
var UNDEFINED = 7000;
var __DEV__ = true;
function Component(type, props, style, children) {
  var component = {
    customType: null,
    layout: {left: 0, width: undefined, right: 0, top: 0, height: undefined, bottom: 0, lineIndex: 0},
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
      fontSize: 12,
      fontFamily: 'Arial',
      textAlign: 'left'
    }, style || {}),
    parent: null,
    type: type,
    props: props,
    children: children,
    lineIndex: 0
  };
  if (__DEV__) {
    Object.freeze(component.style);
    Object.seal(component.layout)
  }

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    if (child.type) {
      child.parent = component;
    }
  }
  return component;
}

module.exports = Component;

},{}],4:[function(require,module,exports){
'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./C');

var Image = Bluebox.create('image', function render(props, style, children) {
  props.isLoaded = false;
  return C('image', props, style, []);
});

module.exports = Image;

},{"./../../lib/index":10,"./C":3}],5:[function(require,module,exports){
'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./C');

var Text = Bluebox.create('text', function(props, style, children) {
    return C('text', {}, style, [props]);
});

module.exports = Text;

},{"./../../lib/index":10,"./C":3}],6:[function(require,module,exports){
'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./C');

var View = Bluebox.create('view', function render(props, style, children) {
  return C('view', props, style, children || []);
});

module.exports = View;

},{"./../../lib/index":10,"./C":3}],7:[function(require,module,exports){
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
  if (key !== 'layout' && key !== 'parent') {
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

},{"../events/EventHandling":8}],8:[function(require,module,exports){
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

},{"../events/handleEvents":9}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
(function (process,global){
'use strict';

var diff            = require('./diff/diff');
var layoutNode      = require('./layout/layoutNode');
var render        = require('./renderers/GL/render');
var ViewPortHelper  = require('./renderers/DOM/ViewPortHelper');
var toDOMString = require('./layout/layoutNode-tests/utils/toDOMString');
var oldComponentTree    = null;
var oldDOMElement       = null;
var viewPortDimensions  = null;
var registeredComponentTypes = {};
var AXIS = require('./layout/AXIS');
var keys = Object.keys;

global.__DEV__ = process.env.NODE_ENV !== 'production';

function registerComponentType(type, structure) {
  registeredComponentTypes[type] = structure;
}

function rerenderComponent(type, props, style, children) {
  var componentType = registeredComponentTypes[type];
  return componentType(props, style, children);
}

function updateTree(component, newComponent) {
  // go up the tree and replace all the nodes
  var parent = component.parent;
  if (parent) {
    var parentChildren = parent.children;
    for (var i = 0, l = parentChildren.length; i < l; i++) {
      var child = parentChildren[i];
      if (child === component) {
        parent.children[i] = newComponent;
        break;
      }
    }
    // TODO: recreate the parents in an optimal way + return the parent
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
      props = mergeProperties(props, component.props);
      var newComponent = rerenderComponent(component.customType, props, component.style, component.children);
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

  update: function(component) {
    return withProperties(component);
  },

  renderFromTop: function(componentTree, domElement) {
    if (!componentTree) {
      componentTree = oldComponentTree;
    }
    if (!domElement) {
      domElement = oldDOMElement;
    }
    oldDOMElement = domElement;
    var newComponentTree = diff(componentTree, oldComponentTree, null, 'ltr');


    var hasChanged = false;
    if (viewPortDimensions !== ViewPortHelper.getDimensions()) {
      viewPortDimensions = ViewPortHelper.getDimensions();
      hasChanged = true;
    }
    if (newComponentTree.layout.width === undefined) {
      console.log('foo:', AXIS);
      newComponentTree = layoutNode(newComponentTree, null, AXIS.column, AXIS.row, false);
      // oldComponentTree, true, viewPortDimensions.width, viewPortDimensions.height, 'ltr');
    }

    console.log(newComponentTree);
    //console.log(toDOMString(newComponentTree));

    if (newComponentTree !== oldComponentTree || hasChanged) {
      viewPortDimensions = ViewPortHelper.getDimensions();
    }

    render(domElement, newComponentTree, oldComponentTree, null, 0, viewPortDimensions, 0, 0);

    oldComponentTree = newComponentTree;
    return newComponentTree;
  }

};

module.exports = Bluebox;

Bluebox.Components.View = require('./components/View');
Bluebox.Components.Text = require('./components/Text');
Bluebox.Components.Image = require('./components/Image');

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./components/Image":4,"./components/Text":5,"./components/View":6,"./diff/diff":7,"./layout/AXIS":11,"./layout/layoutNode":13,"./layout/layoutNode-tests/utils/toDOMString":12,"./renderers/DOM/ViewPortHelper":14,"./renderers/GL/render":15,"_process":20}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
'use strict';

var UNDEFINED = 7000;
function toDOMString(node, indent) {
  indent = indent || 0;
  var result = '';
  var children = node.children;
  var spaceBefore = '  ';
  result += spaceBefore + '<div ';
  result += '  style="';
  var styleKeys = Object.keys(node.style);
  for(var i = 0, l = styleKeys.length; i < l; i++) {
    var styleKey = styleKeys[i];
    var value = node.style[styleKey];
    styleKey = styleKey.replace(/([A-Z])/g, '-$1').toLowerCase();
    if (!isNaN(value) || value) {
      if (!isNaN(value) && styleKey !== 'opacity' && styleKey !== 'flex-grow') {
        if (value === UNDEFINED) {
          value = '';
        }
        else if (value > 0) {
          value = value + 'px';
        }
        else if(styleKey === 'width' && value === 0) {
          value = 'initial';
        }

      }

      result += styleKey + ':' + value + ';';
    }
  }
  result +='">';
  indent++;
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    if (typeof child !== 'string') {
      result += toDOMString(child, indent);
    }
  }
  result += spaceBefore + '</div>\n';
  return result;
}


module.exports = toDOMString;

},{}],13:[function(require,module,exports){
'use strict';

var __DEV__ = true;
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
var WRAP = 'wrap';
var UNDEFINED = 7000;

function justifyContentFn(child, previousChild, mainAxis, justifyContentX, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute) {
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
    childLayout[mainAxis.START] += remainingSpaceMainAxis;
    childLayout[mainAxis.END] += remainingSpaceMainAxis;

  }
  else if (justifyContent === SPACE_AROUND) {
    if (!previousChild) {
      childLayout[mainAxis.START] += remainingSpaceMainAxis + childStyle[mainAxis.MARGIN_LEADING];
    }
    else {
      childLayout[mainAxis.START] = previousChild.layout[mainAxis.END] + childStyle[mainAxis.MARGIN_LEADING] + remainingSpaceMainAxis * 2;
    }
    childLayout[mainAxis.END] = childLayout[mainAxis.START] + childLayout[mainAxis.DIMENSION];

  }
  else if (justifyContent === SPACE_BETWEEN && previousChild) {
    childLayout[mainAxis.START] = previousChild.layout[mainAxis.END] + remainingSpaceMainAxis + previousChild.style[mainAxis.MARGIN_TRAILING] + childStyle[mainAxis.MARGIN_LEADING];
    childLayout[mainAxis.END] = childLayout[mainAxis.START] + childLayout[mainAxis.DIMENSION];
  }
  else if (justifyContent === STRETCH) {
    if (childLayout[mainAxis.DIMENSION] === 0) {
      childLayout[mainAxis.START] = 0;
      childLayout[mainAxis.DIMENSION] = mainAxis === AXIS.row ? parentWidth : parentHeight;
      childLayout[mainAxis.END] = childLayout[mainAxis.DIMENSION];
    }

  }
}

function absolutePosition(node, previousSibling, mainAxis, crossAxis) {
  var parent = node.parent;
  var nodeLayout = node.layout;
  var nodeStyle = node.style;
  var parentLayout = parent.layout;

  nodeLayout[mainAxis.START] = parentLayout[mainAxis.START];
  nodeLayout[crossAxis.START] = parentLayout[crossAxis.START];
  if (nodeStyle[mainAxis.START] !== UNDEFINED) {
    nodeLayout[mainAxis.START] += nodeStyle[mainAxis.START];
    nodeLayout[mainAxis.END] += nodeStyle[mainAxis.START];

  }
  else if (nodeStyle[mainAxis.END] !== UNDEFINED && nodeStyle[mainAxis.DIMENSION] !== UNDEFINED) {
    nodeLayout[mainAxis.START] = parentLayout[mainAxis.END] - nodeStyle[mainAxis.DIMENSION] - nodeStyle[mainAxis.END];
  }
  else if (previousSibling) {
    nodeLayout[mainAxis.START] = previousSibling.layout[mainAxis.END] + previousSibling.style[mainAxis.MARGIN_TRAILING];
  }


  if (nodeStyle[crossAxis.START] !== UNDEFINED) {
    nodeLayout[crossAxis.START] += nodeStyle[crossAxis.START];
    nodeLayout[crossAxis.END] += nodeStyle[crossAxis.START];

  }
  else if (nodeStyle[crossAxis.END] !== UNDEFINED && nodeStyle[crossAxis.DIMENSION] !== UNDEFINED) {
    nodeLayout[crossAxis.START] = parentLayout[crossAxis.END] - nodeStyle[crossAxis.DIMENSION] - nodeStyle[crossAxis.END];
  }
  else {
    nodeLayout[crossAxis.START] = parent ? parentLayout[crossAxis.START] : 0;
  }

  if (nodeStyle[mainAxis.END] !== UNDEFINED) {
    nodeLayout[mainAxis.END] = parentLayout[mainAxis.END] - nodeStyle[mainAxis.END];
    nodeLayout[mainAxis.DIMENSION] = nodeLayout[mainAxis.END] - nodeLayout[mainAxis.START];
  }
  if (nodeStyle[crossAxis.END] !== UNDEFINED) {
    nodeLayout[crossAxis.END] = parentLayout[crossAxis.END] - nodeStyle[crossAxis.END];
    nodeLayout[crossAxis.DIMENSION] = nodeLayout[crossAxis.END] - nodeLayout[crossAxis.START];
  }


  if (!nodeLayout.height && nodeStyle.height !== UNDEFINED) {
    nodeLayout.height = nodeStyle.height;
}
  if (!nodeLayout.width && nodeStyle.width  !== UNDEFINED) {
    nodeLayout.width = nodeStyle.width;
  }

  if (nodeLayout.height < (nodeLayout.bottom - nodeLayout.top)) {
    nodeLayout.bottom = nodeLayout.top + nodeLayout.height;
  }

  if (nodeLayout.width < (nodeLayout.right - nodeLayout.left)) {
    nodeLayout.right = nodeLayout.left + nodeLayout.width;
  }

}

function alignItemsFn(child, previousChild, mainAxis, alignItems, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute) {
  justifyContentFn(child, previousChild, mainAxis, alignItems, remainingSpaceMainAxis, parentHeight, parentWidth, isPositionAbsolute);
}

function correctChildren(node, top, left, mainAxis, crossAxis) {
  var previousChild = null;
  for (var i = 0, l = node.children.length; i < l; i++) {
    var child = node.children[i];
    var childStyle = child.style;
    var childLayout = child.layout;
    if (child.children) {
      var isAbsolutePosition = childStyle.position === ABSOLUTE;
      if (isAbsolutePosition) {
        absolutePosition(child, previousChild, mainAxis, crossAxis);
      }
      else {
        childLayout.left += left;
        childLayout.right += left;
        childLayout.top += top;
        childLayout.bottom += top;
        correctChildren(child, top, left, mainAxis, crossAxis);
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
      childLayout.left = previousChild.layout.right;
    }
    childLayout.width = childStyle.flexGrow / totalFlexGrow * remainingSpaceMainAxis + (childStyle.width !== UNDEFINED ? childStyle.width : 0);
    childLayout.right = childLayout.left + childLayout.width;
  }
  else {
    if (previousChild) {
      childLayout.top = previousChild.layout.bottom;
    }
    childLayout.height = childStyle.flexGrow / totalFlexGrow * remainingSpaceMainAxis + (childStyle.height !== UNDEFINED ? childStyle.height : 0);
    childLayout.bottom = childLayout.top + childLayout.height;
  }
}
function processChildren(node, parentMainAxis, parentCrossAxis, shouldProcessAbsolute) {
  var parent = node.parent;
  var parentLayout = parent ? parent.layout : null;
  var parentWidth = parentLayout ? parentLayout.width : document.body.clientWidth;
  var parentHeight = parentLayout ? parentLayout.height : document.body.clientHeight;
  var nodeLayout = node.layout;
  var nodeStyle = node.style;
  var nodeChildren = node.children;
  if (nodeChildren.length && typeof nodeChildren[0] !== 'string') {
    var newMainAxisDirection = nodeStyle && nodeStyle.flexDirection ? nodeStyle.flexDirection : COLUMN;
    var newCrossAxisDirection = newMainAxisDirection === COLUMN ? ROW : COLUMN;
    var mainAxis = AXIS[newMainAxisDirection];
    var crossAxis = AXIS[newCrossAxisDirection];
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
    for (i = 0, l = nodeChildren.length; i < l; i++) {
      child = nodeChildren[i];
      childStyle = child.style;
      childLayout = child.layout;
      layoutNode(child, previousChild, mainAxis, crossAxis, shouldProcessAbsolute);

      var skipPrevious = false;

      if (childStyle.position !== ABSOLUTE) {

        if (i === 0) {
          childLayout[parentMainAxis.START] += nodeStyle[parentMainAxis.PADDING_LEADING];
          childLayout[parentMainAxis.END] += nodeStyle[parentMainAxis.PADDING_TRAILING];
        }
        childLayout[parentCrossAxis.START] += nodeStyle[parentCrossAxis.PADDING_LEADING];
        childLayout[parentCrossAxis.DIMENSION] -= nodeStyle[parentCrossAxis.PADDING_LEADING] + nodeStyle[parentCrossAxis.PADDING_TRAILING];
        childLayout[parentCrossAxis.END] -= nodeStyle[parentCrossAxis.PADDING_TRAILING];

        var newSize = childStyle[mainAxis.DIMENSION] !== UNDEFINED ? (childStyle[mainAxis.DIMENSION] + childStyle[crossAxis.MARGIN_LEADING] + childStyle[crossAxis.MARGIN_TRAILING]) || 0 : 0;

        if (isFlexWrap) {

          if ((totalChildrenSize + newSize) > nodeLayout[mainAxis.DIMENSION]) {
            lineLengths.push(totalChildrenSize);
            crossLineLengths.push(maxCrossDimension);
            lineNrOfChildren.push(currNrOfChildren);
            lineIndex++;
            currNrOfChildren = 0;
            additional += maxCrossDimension;
            maxCrossDimension = 0;

            childLayout[mainAxis.START] = nodeLayout[mainAxis.START]  + childStyle[mainAxis.MARGIN_LEADING];
            childLayout[mainAxis.END] = childLayout[mainAxis.START] + childLayout[mainAxis.DIMENSION];

            totalChildrenSize = 0;

          }
          childLayout.lineIndex = lineIndex;
        }
        currNrOfChildren++;
        totalChildrenSize += newSize;

        childLayout[crossAxis.START] += additional;
        childLayout[crossAxis.END] += additional;

        if (childLayout[parentMainAxis.END] > maxSize) {
          maxSize = childLayout[parentMainAxis.END] + childStyle[parentMainAxis.MARGIN_TRAILING];
        }

        totalFlexGrow += childStyle.flexGrow;

        if (skipPrevious) {
          previousChild = null;
        } else {
          previousChild = child;
        }

        if ((childLayout[crossAxis.DIMENSION] + childStyle[crossAxis.MARGIN_TRAILING] + childStyle[crossAxis.MARGIN_LEADING])> maxCrossDimension) {
          maxCrossDimension = childLayout[crossAxis.DIMENSION] + childStyle[crossAxis.MARGIN_TRAILING] + childStyle[crossAxis.MARGIN_LEADING];
        }
      }

    }

    additional += maxCrossDimension;
    lineLengths.push(totalChildrenSize);
    crossLineLengths.push(maxCrossDimension);
    lineNrOfChildren.push(currNrOfChildren);

    if (nodeLayout[parentMainAxis.DIMENSION] === 0) {
      nodeLayout[parentMainAxis.END] = maxSize + nodeStyle[parentMainAxis.PADDING_TRAILING];
      nodeLayout[parentMainAxis.DIMENSION] = maxSize + nodeStyle[parentMainAxis.PADDING_TRAILING] - nodeLayout[parentMainAxis.START];
    }

    var newParentHeight = nodeLayout.height;
    var newParentWidth = nodeLayout.width;


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
      if (currentLineIndex !== childLayout.lineIndex) {
        currentLineIndex = childLayout.lineIndex;
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

      var initialTop = childLayout.top;
      var initialLeft = childLayout.left;

      if (totalFlexGrow) {
        flexSize(child, previousChild, totalFlexGrow, remainingSpaceMainAxis, newMainAxisDirection);
      }
      else {
        justifyContentFn(child, previousChild, mainAxis, justifyContent, remainingSpaceMainAxis, undefined, undefined, isPositionAbsolute);
      }

      if (isPositionAbsolute) {
        absolutePosition(child, previousChild, mainAxis, crossAxis);
      }
      var alignSelf = (!isFlexWrap ? childStyle.alignSelf : alignItems) || alignItems;
      var addSpace = crossLineLengths[currentLineIndex] - childLayout[crossAxis.DIMENSION] - childStyle[crossAxis.MARGIN_TRAILING] - childStyle[crossAxis.MARGIN_LEADING];
      if (addSpace) {
        remainingSpaceCrossAxisSelf += addSpace;
      }
      if (alignSelf === CENTER) {
        remainingSpaceCrossAxisSelf = (remainingSpaceCrossAxisSelf / 2);
      }

      // TODO: fix flexWrap line heights
      //if (lineLengths.length > 1) {
      //  var foo = node.layout[xNewCrossAxisDirection.START] + (crossDimensionSize / (lineLengths.length - 1) * currentLineIndex);
      //
      //  childLayout[xNewCrossAxisDirection.START] = foo - childLayout[xNewCrossAxisDirection.DIMENSION] - childStyle[xNewCrossAxisDirection.MARGIN_TRAILING] - childStyle[xNewCrossAxisDirection.MARGIN_LEADING] - addSpace;
      //  childLayout[xNewCrossAxisDirection.END] = foo - addSpace;
      //}
      alignItemsFn(child, previousChild, crossAxis, alignSelf, remainingSpaceCrossAxisSelf, parentHeight, parentWidth, isPositionAbsolute);
      if (isPositionAbsolute) {
        processChildren(child, mainAxis, crossAxis, isPositionAbsolute);
      }
      else if ((childLayout.top - initialTop) !== 0 || (childLayout.left - initialLeft) !== 0) {
        correctChildren(child, childLayout.top - initialTop, childLayout.left - initialLeft, mainAxis, crossAxis);
      }
      if (!isPositionAbsolute){
        previousChild = child;
      }
    }
  }
}

//window.testing = [];
function layoutNode(node, previousSibling, mainAxis, crossAxis, shouldProcessAbsolute) {

  var nodeLayout = node.layout;
  var nodeStyle = node.style;

  var parent = node.parent;
  if (parent && parent.style.position === ABSOLUTE && !shouldProcessAbsolute) {
    return node;
  }

  //if (testing.indexOf(node) > -1) {
  //  console.warn('duplicate layoutNode call:', node, testing.indexOf(node));
  //  console.trace();
  //}
  //testing.push(node);

  var parentLayout = parent ? parent.layout : null;
  var parentWidth = parentLayout ? parentLayout.width : document.body.clientWidth;


  if (previousSibling && nodeStyle.position !== ABSOLUTE) {
    nodeLayout[mainAxis.START] = previousSibling.layout[mainAxis.END] + previousSibling.style[mainAxis.MARGIN_TRAILING];
    nodeLayout[crossAxis.START] = parentLayout[crossAxis.START];

  }
  else {
    nodeLayout.left = parent ? parentLayout.left : 0;
    nodeLayout.top = parent ? parentLayout.top : 0;
  }


  nodeLayout.left += nodeStyle.marginLeft;
  nodeLayout.top += nodeStyle.marginTop;

  nodeLayout.width = (nodeStyle.width !== UNDEFINED ? nodeStyle.width : 0) || (!nodeStyle.flexGrow ? parentWidth : 0) || 0;
  nodeLayout.height = (nodeStyle.height !== UNDEFINED ? nodeStyle.height : 0);

  nodeLayout.bottom = nodeLayout.top + nodeLayout.height;
  nodeLayout.right = nodeLayout.left + nodeLayout.width;
  if (nodeStyle.position !== ABSOLUTE) {
    processChildren(node, mainAxis, crossAxis, false);
  }

  return node;
}

module.exports = layoutNode;

},{"./AXIS":11}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
'use strict';

var webGLContext;
require('./temp-utils');
var renderView = require('./renderView');
var Promise = require('promise');

function isVisible(node, viewPortDimensions) {
  var nodeLayout = node.layout;
  return (nodeLayout.top >= viewPortDimensions.top && nodeLayout.top <= (viewPortDimensions.top + viewPortDimensions.height)) ||
    ((nodeLayout.top + nodeLayout.height) <= (viewPortDimensions.top + viewPortDimensions.height) && (nodeLayout.top + nodeLayout.height) >= viewPortDimensions.top) ||
    nodeLayout.top < viewPortDimensions.top && (nodeLayout.top + nodeLayout.height) > (viewPortDimensions.top + viewPortDimensions.height);
}



var loadedImages = {

};

function loadImage(src) {
  return new Promise(function(resolve, reject){
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

function loadImageDirectly(src) {
  return loadedImages[src];
}

function _renderImage(image, element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight) {
  //return function(image) {
    webGLContext.useProgram(imageProgram);

    iTextLocation = webGLContext.getAttribLocation(imageProgram, "a_position");
    webGLContext.blendFunc(webGLContext.ONE, webGLContext.ONE_MINUS_SRC_ALPHA);
    var texCoordBuffer = webGLContext.createBuffer();
    webGLContext.uniform4f(webGLContext.getUniformLocation(imageProgram, 'u_dimensions'), parentLeft, parentTop, parentLeft + parentWidth, parentTop + parentHeight);
    webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, texCoordBuffer);
    webGLContext.bufferData(webGLContext.ARRAY_BUFFER, new Float32Array([
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0]), webGLContext.STATIC_DRAW);
    webGLContext.enableVertexAttribArray(iTextLocation);
    webGLContext.vertexAttribPointer(iTextLocation, 2, webGLContext.FLOAT, false, 0, 0);


    // Create a texture.
    var texture = webGLContext.createTexture();
    webGLContext.bindTexture(webGLContext.TEXTURE_2D, texture);
    // Upload the image into the texture.
    webGLContext.texImage2D(webGLContext.TEXTURE_2D, 0, webGLContext.RGBA, webGLContext.RGBA, webGLContext.UNSIGNED_BYTE, image);
    //webGLContext.activeTexture(webGLContext.TEXTURE0);
    // Set the parameters so we can render any size image.
    webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_WRAP_S, webGLContext.CLAMP_TO_EDGE);
    webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_WRAP_T, webGLContext.CLAMP_TO_EDGE);
    webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_MIN_FILTER, webGLContext.NEAREST);

    webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_MAG_FILTER, webGLContext.NEAREST);

    var dstX = left;
    var dstY = top;
    var dstWidth = width;
    var dstHeight = height;

    // convert dst pixel coords to clipspace coords
    var clipX = dstX / webGLContext.canvas.width  *  2 - 1;
    var clipY = dstY / webGLContext.canvas.height * -2 + 1;
    var clipWidth = dstWidth  / webGLContext.canvas.width  *  2;
    var clipHeight = dstHeight / webGLContext.canvas.height * -2;

    // build a matrix that will stretch our
    // unit quad to our desired size and location
    webGLContext.uniformMatrix3fv(u_matrixLoc, false, [
      clipWidth, 0, 0,
      0, clipHeight, 0,
      clipX, clipY, 1
    ]);

    webGLContext.drawArrays(webGLContext.TRIANGLES, 0, 6);

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
      parent,
      position,
      viewPortDimensions,
      top,
      left);
  }
}

function renderImage(domElement, newComponentTree, oldComponentTree, element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight) {
  if (element.props && element.props.src) {
    if (!element.props.isLoaded) {
      loadImage(element.props.src)
        .then(setLoaded(element), _rejectedImageLoad)
        .then(rerender(domElement, newComponentTree, oldComponentTree, null, 0, viewPortDimensions, 0, 0));
    } else {
      var image = loadImageDirectly(element.props.src);
      _renderImage(image, element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight);
    }
  }
}

var textCanvas = document.createElement('canvas');
var textCanvasCtx = textCanvas.getContext('2d');
function drawTextOnCanvas(newElement, width, height, inheritedOpacity, inheritedColor) {
  //textCanvasCtx.clearRect(0, 0, 1000, 1000);
  textCanvasCtx.canvas.width = width;
  textCanvasCtx.canvas.height = height;
  textCanvasCtx.font = newElement.style.fontSize + 'px ' + newElement.style.fontFamily;
  textCanvasCtx.textAlign = newElement.style.textAlign;
  textCanvasCtx.textBaseline = "middle";
  textCanvasCtx.fillStyle = inheritedColor || "black";
  textCanvasCtx.fillText(newElement.children[0], 2, 12);
  return textCanvasCtx.canvas;
}

function renderText(newElement, inheritedOpacity, inheritedColor) {
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

  webGLContext.useProgram(imageProgram);
  u_matrixLoc = webGLContext.getUniformLocation(imageProgram, "u_matrix");
  var foo = drawTextOnCanvas(newElement, parentWidth, parentHeight, inheritedOpacity, inheritedColor);


  var texCoordBuffer = webGLContext.createBuffer();
  webGLContext.uniform4f(webGLContext.getUniformLocation(imageProgram, 'u_dimensions'), parentLeft, parentTop, parentRight, parentBottom);
  webGLContext.pixelStorei(webGLContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  webGLContext.blendFunc(webGLContext.ONE, webGLContext.ONE_MINUS_SRC_ALPHA);
  webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, texCoordBuffer);
  webGLContext.bufferData(webGLContext.ARRAY_BUFFER, new Float32Array([
    0.0,  0.0,
    1.0,  0.0,
    0.0,  1.0,
    0.0,  1.0,
    1.0,  0.0,
    1.0,  1.0]), webGLContext.STATIC_DRAW);
  webGLContext.enableVertexAttribArray(iTextLocation);
  webGLContext.vertexAttribPointer(iTextLocation, 2, webGLContext.FLOAT, false, 0, 0);


  // Create a texture.
  var texture = webGLContext.createTexture();

  webGLContext.bindTexture(webGLContext.TEXTURE_2D, texture);
  // Upload the image into the texture.
  webGLContext.texImage2D(webGLContext.TEXTURE_2D, 0, webGLContext.RGBA, webGLContext.RGBA, webGLContext.UNSIGNED_BYTE, foo);
  //webGLContext.activeTexture(webGLContext.TEXTURE0);
  // Set the parameters so we can render any size image.
  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_WRAP_S, webGLContext.CLAMP_TO_EDGE);
  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_WRAP_T, webGLContext.CLAMP_TO_EDGE);
  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_MIN_FILTER, webGLContext.NEAREST);

  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_MAG_FILTER, webGLContext.NEAREST);

  var dstX = parentLeft;
  var dstY = parentTop;
  var dstWidth = parentWidth;
  var dstHeight = parentHeight;

  // convert dst pixel coords to clipspace coords
  var clipX = dstX / webGLContext.canvas.width  *  2 - 1;
  var clipY = dstY / webGLContext.canvas.height * -2 + 1;
  var clipWidth = dstWidth  / webGLContext.canvas.width  *  2;
  var clipHeight = dstHeight / webGLContext.canvas.height * -2;

  // build a matrix that will stretch our
  // unit quad to our desired size and location
  webGLContext.uniformMatrix3fv(u_matrixLoc, false, [
    clipWidth, 0, 0,
    0, clipHeight, 0,
    clipX, clipY, 1
  ]);

  webGLContext.drawArrays(webGLContext.TRIANGLES, 0, 6);
}

function calculatePosition(scale, px) {
  return -1 + (2 / scale * px);
}
var vertexShader;
var vertexShader2;
var fragmentShader;
var imageShader;
var imageProgram;
var viewProgram;
var colorLocation;
var positionLocation;
var iPositionLocation;
var iResolutionLocation;
var resolutionLocation;
var textCoord;
var iTextLocation;
var u_matrixLoc;
var topElement;
var topOldElement;
var topDOMElement;
function render(domElement,
  newElement,
  oldElement,
  parent,
  position,
  viewPortDimensions,
  top,
  left,
  parentLeft,
  parentWidth,
  parentTop,
  parentHeight,
  inheritedOpacity,
  inheritedZoom,
  inheritedFontSize,
  inheritedColor,
  inheritedFilter) {
  if (!webGLContext) {
    topDOMElement = domElement;
    webGLContext = domElement.getContext('webgl');
    if(webGLContext == null){
      webGLContext = domElement.getContext('experimental-webgl');
    }


    vertexShader = createShaderFromScriptElement(webGLContext, "2d-vertex-shader");
    vertexShader2 = createShaderFromScriptElement(webGLContext, "2d-vertex-shader2");
    fragmentShader = createShaderFromScriptElement(webGLContext, "2d-fragment-shader");
    imageShader = createShaderFromScriptElement(webGLContext, "2d-image-shader");

    viewProgram = createProgram(webGLContext, [vertexShader, fragmentShader]);
    imageProgram = createProgram(webGLContext, [vertexShader2, imageShader]);


    webGLContext.useProgram(viewProgram);

    positionLocation = webGLContext.getAttribLocation(viewProgram, "a_position");
    textCoord = webGLContext.getAttribLocation(viewProgram, "a_textCoord");
    resolutionLocation = webGLContext.getUniformLocation(viewProgram, "u_resolution");
    colorLocation = webGLContext.getUniformLocation(viewProgram, "u_color");

    webGLContext.uniform4f(webGLContext.getUniformLocation(viewProgram, 'u_dimensions'), parentLeft, parentTop, parentLeft + parentWidth, parentTop + parentHeight);
    webGLContext.uniform2f(resolutionLocation, viewPortDimensions.width, viewPortDimensions.height);

    webGLContext.useProgram(imageProgram);

    var u_imageLoc = webGLContext.getUniformLocation(imageProgram, "u_image");
    u_matrixLoc = webGLContext.getUniformLocation(imageProgram, "u_matrix");
    iPositionLocation = webGLContext.getAttribLocation(imageProgram, "a_position");

    iResolutionLocation = webGLContext.getUniformLocation(imageProgram, "u_resolution");

    webGLContext.uniform2f(iResolutionLocation, viewPortDimensions.width, viewPortDimensions.height);
  }
  if (!newElement.parent) {
    topElement = newElement;
    topOldElement = oldElement;
  }

  //webGLContext.clearColor(0.0, 0.0, 0.0, 1.0);                      // Set clear color to black, fully opaque
  //webGLContext.enable(webGLContext.DEPTH_TEST);                               // Enable depth testing
  //webGLContext.depthFunc(webGLContext.LEQUAL);                                // Near things obscure far things
  //  webGLContext.clear(webGLContext.COLOR_BUFFER_BIT|webGLContext.DEPTH_BUFFER_BIT);
  domElement.width = viewPortDimensions.width;
  domElement.height = viewPortDimensions.height;
  webGLContext.viewport(0, 0, viewPortDimensions.width, viewPortDimensions.height);
  webGLContext.enable(webGLContext.BLEND);
  if (!parentWidth) {
    parentWidth = viewPortDimensions.width;
    parentLeft = 0;
    parentHeight = viewPortDimensions.height;
    parentTop = 0;
  }

  if (typeof newElement === 'string' || !isVisible(newElement, viewPortDimensions))  {
    return;
  }

  if (newElement === oldElement) {
    return;
  }
 // fixme: if (newElement && !oldElement) {
    if (!newElement.layout) {
      return;
    }

    if (newElement.type === 'view') {

      renderView(webGLContext, viewProgram, newElement, viewPortDimensions, top, left, colorLocation, positionLocation, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity || 1);
        var style = newElement.style;
        if ('opacity' in style) {
          inheritedOpacity = (inheritedOpacity || 1) * style.opacity;
        }
        if (style.fontSize) {
          inheritedFontSize = style.fontSize;
        }
        if (style.zoom) {
          inheritedZoom = (inheritedZoom || 1) * style.zoom;
        }
        if (style.color) {
          inheritedColor = style.color;
        }
        if (style.filter) {
          // complex...
        }



      var children = newElement.children;
      if (children) {
        for (var i = 0, l = children.length; i < l; i++) {
          var child = children[i];
          if (newElement.style.overflow === 'hidden') {
            parentWidth = newElement.layout.width;
            parentLeft = newElement.layout.left;
            parentHeight = newElement.layout.height;
            parentTop = newElement.layout.top;
          }
          render(domElement, child, null, newElement, i, viewPortDimensions, newElement.layout.top, newElement.layout.left, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity,
            inheritedZoom,
            inheritedFontSize,
            inheritedColor,
            inheritedFilter);
        }
      }
    }
    else if (newElement.type === 'text') {

      renderText(newElement, inheritedOpacity || 1, inheritedColor);
    }
    else if (newElement.type === 'image') {
      renderImage(topDOMElement, topElement, topOldElement, newElement, top, left, newElement.layout.width, newElement.layout.height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity || 1, inheritedColor);
    }
  //}
}



module.exports = render;

},{"./renderView":16,"./temp-utils":17,"promise":21}],16:[function(require,module,exports){
'use strict';

var WebGLColors = {
  black: [0, 0, 0],
  silver: [],
  gray: [],
  white: [1, 1, 1],
  maroon: [],
  red: [1, 0, 0],
  purple: [],
  fuchsia: [],
  green: [0, .5, 0],
  lime: [],
  olive: [],
  yellow: [],
  navy: [],
  blue: [0, 0, 1],
  teal: [],
  acqua: []

};


function setBackgroundColor(webGLContext, element, colorLocation, inheritedOpacity) {
  if (element.style.backgroundColor !== '') {
    var backgroundColor = WebGLColors[element.style.backgroundColor];
    var opacity = 1;
    var opacityProp = element.style.opacity;
    if (!isNaN(opacityProp)) {
      opacity = opacityProp * inheritedOpacity;
    }
    else if (inheritedOpacity) {
      opacity = inheritedOpacity;
    }

    webGLContext.uniform4f(colorLocation, backgroundColor[0], backgroundColor[1], backgroundColor[2], opacity);
  }
}

function setBorder(element) {
  if (element.props && element.props.style && element.props.style.border) {
    console.warn('not implemented yet');
  }
}

function isViewVisible(element) {
  return element.style && element.style.backgroundColor ||
    element.style && element.style.border;
}

function renderView(webGLContext, viewProgram, element, viewPortDimensions, top, left, colorLocation, positionLocation, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity) {
  if (isViewVisible(element)) {

    webGLContext.useProgram(viewProgram);
    //webGLContext.blendEquationSeparate(webGLContext.FUNC_ADD, webGLContext.FUNC_ADD);
    //webGLContext.blend
    webGLContext.blendFuncSeparate(webGLContext.SRC_ALPHA, webGLContext.ONE_MINUS_SRC_ALPHA, webGLContext.ONE, webGLContext.ONE_MINUS_SRC_ALPHA);

    var buffer = webGLContext.createBuffer();
    webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, buffer);
    webGLContext.enableVertexAttribArray(positionLocation);
    webGLContext.vertexAttribPointer(positionLocation, 2, webGLContext.FLOAT, false, 0, 0);

    webGLContext.uniform4f(webGLContext.getUniformLocation(viewProgram, 'u_dimensions'), parentLeft, parentTop, parentLeft + parentWidth, parentTop + parentHeight);

    var x1 = element.layout.left;
    var x2 = element.layout.right;
    var y1 = element.layout.top;

    var y2 = element.layout.bottom;

    setBackgroundColor(webGLContext, element, colorLocation, inheritedOpacity);
    setBorder(element);

    webGLContext.bufferData(webGLContext.ARRAY_BUFFER, new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2]), webGLContext.STATIC_DRAW);

    webGLContext.drawArrays(webGLContext.TRIANGLES, 0, 6);
  }
}

module.exports = renderView;

},{}],17:[function(require,module,exports){
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


},{}],18:[function(require,module,exports){
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
},{"events":19}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
'use strict';

module.exports = require('./lib')

},{"./lib":26}],22:[function(require,module,exports){
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

},{"asap/raw":30}],23:[function(require,module,exports){
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

},{"./core.js":22}],24:[function(require,module,exports){
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

},{"./core.js":22}],25:[function(require,module,exports){
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

},{"./core.js":22}],26:[function(require,module,exports){
'use strict';

module.exports = require('./core.js');
require('./done.js');
require('./finally.js');
require('./es6-extensions.js');
require('./node-extensions.js');

},{"./core.js":22,"./done.js":23,"./es6-extensions.js":24,"./finally.js":25,"./node-extensions.js":27}],27:[function(require,module,exports){
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

},{"./core.js":22,"asap":28}],28:[function(require,module,exports){
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

},{"./raw":29}],29:[function(require,module,exports){
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
},{}],30:[function(require,module,exports){
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
},{"_process":20,"domain":18}]},{},[2]);
