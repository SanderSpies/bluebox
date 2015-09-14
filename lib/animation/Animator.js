'use strict';

var Bluebox = require('../index');
var toDOMString = require('../layout/layoutNode-tests/utils/toDOMString');
var keys = Object.keys;
var isArray = Array.isArray;

var registeredAbsoluteTransitions = [];
var registeredAbsoluteSprings = [];

var easings = {

  linear: function(t, b, _c, d) {
    var c = _c - b;
    var result = t * c / d + b;
    if (t > d) {
      result = _c;
    }
    return result;
  }

};

function setAnimationValues(newChild, oldChild) {

}

function clone(node) {
  var newNode = {};
  var _keys = keys(node);
  for (var i = 0, l = _keys.length; i < l; i++) {
    var _key = _keys[i];
    newNode[_key] = node[_key];
  }
  if (node.children) {
    newNode.children = [];
  }
  return newNode;
}

function cloneWithClonedStyle(node) {
  var newNode = clone(node);
  newNode.style = clone(newNode.style);
  return newNode;
}

function reconstructTree(node) {
  var currentNode = node;
  var newNode = clone(currentNode);
  var children = currentNode.children;
  if (children.length) {
    // set all parent references at once
    children[0].parentReference.parent = newNode;
  }

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    if (child.isAnimating) {
      // and now...
      newNode.children[i] = child.newRef;
     // child.newRef = null;
      //TODO: properly clean up: child.parentReference = null;
    }
    if (child.isChildAnimating) {
      newNode.children[i] = reconstructTree(child);
      //TODO: properly clean up: child.parentReference = null;
      //child.parentReference = null;
    }
    if (!child.isAnimating && !child.isChildAnimating) {
      newNode.children[i] = child;
    }
  }
  return newNode;
}

var availableValues = [];
var rootNode;
function onAnimate() {
  var i, j, l, l2;
  var currentTime = 200;
  for (i = 0, l = registeredAbsoluteTransitions.length; i < l; i++) {
    var absoluteTransition = registeredAbsoluteTransitions[i];
    var node = absoluteTransition.node;
    var start = absoluteTransition.start;
    var end = absoluteTransition.end;
    var keys = absoluteTransition.keys;
    var opts = absoluteTransition.opts;
    var duration = opts.duration;
    var easing = opts.easing || 'linear';
    // perform calculations here
    var newNode = cloneWithClonedStyle(node);
    for (j = 0, l2 = keys.length; j < l2; j++) {
      var key = keys[j];
      newNode.style[key] = newNode.style[key] + 1;
      //console.info(newNode.style[key]);
      node.newRef = newNode;
    }
    absoluteTransition.node = newNode;
  }

  if (!rootNode) {
    if (registeredAbsoluteTransitions.length) {
      rootNode = registeredAbsoluteTransitions[0].node;
      while (rootNode.parentReference.parent) {
        rootNode = rootNode.parentReference.parent;
      }
    }
  }

  var newRootNode = reconstructTree(rootNode);

  //  debugger;

  rootNode = newRootNode;
  Bluebox.renderFromTop(rootNode, null, true);

  requestAnimationFrame(onAnimate);
}

var Animator = {

  isAnimating: false,

  registerAbsoluteTransition: function(start, end, opts, node) {
    registeredAbsoluteTransitions.push({
      keys: keys(start),
      start: start,
      end: end,
      opts: opts,
      node: node,
      startTime: Date.now()
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
