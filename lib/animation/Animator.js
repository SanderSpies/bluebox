'use strict';

var Bluebox = require('../index');
var __DEV__ = require('../__DEV__');
var keys = Object.keys;
var isArray = Array.isArray;
var registeredAbsoluteTransitions = [];
var registeredAbsoluteSprings = [];
var shallowClone = require('../utils/shallowClone');
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

function cloneWithEmptyChildren(node) {
  var newNode = shallowClone(node);
  newNode.children = [];
  return newNode;
}

function copyChildren(node, newNode) {
  for (var i = 0, l = node.children.length; i < l; i++) {
    var child = node.children[i];
    newNode.children[i] = child;
    child.parent = newNode;
  }
}

function cloneWithChildren(node) {
  var newNode = cloneWithEmptyChildren(node);
  copyChildren(node, newNode);
  return newNode;
}

function cloneWithClonedStyle(node) {
  var newNode = shallowClone(node);
  newNode.style = shallowClone(newNode.style);
  return newNode;
}

var recalculationQueue = [];
function reconstructTree(node, skipAddToQueue, onlyCloneChildren) {
  var currentNode = node;
  var children = currentNode.children;
  if (children) {
    currentNode.newRef = null;
    var newNode = cloneWithChildren(currentNode);

    var newNodeChildren = newNode.children;
    for (var i = 0, l = newNodeChildren.length; i < l; i++) {
      var newChild = newNodeChildren[i];
      if (newChild.isAnimating) {
        var newRef = newChild.newRef;
        newChild.newRef = null;
        currentNode.children[i].newRef = null;
        newNodeChildren[i] = reconstructTree(newRef, true, true);
        newChild.newRef = newNodeChildren[i];
        newNodeChildren[i].oldRef = currentNode.children[i];

        if (!skipAddToQueue) {
          recalculationQueue.push(newNode.children[i]);
        }
      }
      else if (newChild.isChildAnimating) {
        newNodeChildren[i] = reconstructTree(newChild, skipAddToQueue || false);
      }
      newNodeChildren[i].parent = newNode;

    }
    currentNode.children = null;

    return newNode;
  }
  return node;
}


var rootNode;
var startTime = Date.now();
function processTransitions(currentTime) {
  for (var i = 0, l = registeredAbsoluteTransitions.length; i < l; i++) {
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
    for (var j = 0, l2 = keys.length; j < l2; j++) {
      var key = keys[j];
      newNode.style[key] = easings[easing](currentTime, start[key], end[key], duration);

    }

    node.newRef = newNode;

    absoluteTransition.node = node;
  }
  return {i: i, l: l};
}

function addRootNode() {
  if (!rootNode) {
    if (registeredAbsoluteTransitions.length) {
      rootNode = registeredAbsoluteTransitions[0].node;
      while (rootNode.parent) {
        rootNode = rootNode.parent;
      }
    }
  }
}

function correctAnimationNodeReferences(newRootNode) {
  for (var i = 0, l = registeredAbsoluteTransitions.length; i < l; i++) {
    var absoluteTransition = registeredAbsoluteTransitions[i];
    if (__DEV__) {

      if (!isInTree(newRootNode, absoluteTransition.node.newRef)) {
        console.warn('absolute transition node CANNOT be found in the tree');
        console.log(absoluteTransition.node.newRef);
      }
    }
    var newRef = absoluteTransition.node.newRef;
    absoluteTransition.node.newRef = null;
    absoluteTransition.node = newRef;
  }
  return {i: i, l: l};
}
function onAnimate() {
  var currentTime = Date.now() - startTime;

  processTransitions(currentTime);

  addRootNode();

  if (__DEV__) {
    ensureTreeCorrectness(rootNode);
  }

  var newRootNode = reconstructTree(rootNode, false);

  if (__DEV__) {
    ensureTreeCorrectness(newRootNode);
  }

  correctAnimationNodeReferences(newRootNode);

  rootNode = newRootNode;

  if (__DEV__) {
    for (var i = 0, l = recalculationQueue.length; i < l; i++) {
      var recalcNode = recalculationQueue[i];
      if (!isInTree(rootNode, recalcNode)) {
        console.warn('recalc node not found in the tree!');
      }
    }
  }

  Bluebox.relayout(rootNode, recalculationQueue);
  recalculationQueue = [];

  if (__DEV__) {
    ensureTreeCorrectness(rootNode);
  }

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
