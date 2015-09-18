'use strict';

var Bluebox = require('../index');

var keys = Object.keys;
var isArray = Array.isArray;
var registeredAbsoluteTransitions = [];
var registeredAbsoluteSprings = [];

var ensureTreeCorrectness = require('../diff/ensureTreeCorrectness');
var isInTree = require('../diff/isInTree');

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

function setAnimationValues(newChild, oldChild) {

}

function quickClone(node) {
  var newNode = {};
  var _keys = keys(node);
  for (var i = 0, l = _keys.length; i < l; i++) {
    var _key = _keys[i];
    newNode[_key] = node[_key];
  }
  return newNode;
}


function clone(node) {
  var newNode = quickClone(node);
  newNode.children = [];
  return newNode;
}

function cloneWithChildren(node) {
  var newNode = clone(node);
  for (var i = 0, l = node.children.length; i < l; i++) {
    var child = node.children[i];
    newNode.children[i] = child;
    child.parent = newNode;
  }
  return newNode;
}

function cloneWithClonedStyle(node) {
  var newNode = quickClone(node);
  newNode.style = quickClone(newNode.style);
  return newNode;
}


var recalculationQueue = [];
function reconstructTree(node) {
  var currentNode = node;
  var children = currentNode.children;
  if (children) {
    var newNode = cloneWithChildren(currentNode);

    for (var i = 0, l = newNode.children.length; i < l; i++) {
      var child = newNode.children[i];
      if (child.isAnimating) {
        newNode.children[i] = reconstructTree(child.newRef);
        child.newRef = newNode.children[i];
        newNode.children[i].parent = newNode;
        newNode.children[i].oldRef = child;
        recalculationQueue.push(newNode.children[i]);
      }

      if (child.isChildAnimating) {
        newNode.children[i] = reconstructTree(child);
        newNode.children[i].parent = newNode;
      }

    }
    return newNode;
  }
  return node;
}


var rootNode;
var startTime = Date.now();
function onAnimate() {
  var i, j, l, l2;
  var currentTime = Date.now() - startTime;
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
    newNode.children = node.children.slice(0);
    for (j = 0, l2 = keys.length; j < l2; j++) {
      var key = keys[j];
      newNode.style[key] = easings[easing](currentTime, start[key], end[key], duration);

    }

    node.newRef = newNode;
    absoluteTransition.node = node;
  }

  if (!rootNode) {
    if (registeredAbsoluteTransitions.length) {
      rootNode = registeredAbsoluteTransitions[0].node;
      while (rootNode.parent) {
        rootNode = rootNode.parent;
      }
    }
  }

 var newRootNode = reconstructTree(rootNode, false);

  // todo: make an assert (for dev purposes only)

  for (i = 0, l = registeredAbsoluteTransitions.length; i < l; i++) {
    var absoluteTransition = registeredAbsoluteTransitions[i];
    if (!isInTree(newRootNode, absoluteTransition.node.newRef)) {
      console.warn('absolute transition node CANNOT be found in the tree');
    }
    absoluteTransition.node = absoluteTransition.node.newRef;
  }

  rootNode = newRootNode;
  Bluebox.relayout(rootNode, recalculationQueue);
  recalculationQueue = [];
  //oldRecalculationQueue = [];
  //console.info('A1');

  ensureTreeCorrectness(newRootNode);

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
