'use strict';

var Bluebox = require('../index');
var requestStyleRecalculation = require('../layout/requestStyleRecalculation');

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
  if (node.children) {
    newNode.children = [];
  }
  return newNode;
}

function cloneWithClonedStyle(node) {
  var newNode = clone(node);
  newNode.style = quickClone(newNode.style);
  return newNode;
}

function reconstructTree(node) {
  var currentNode = node;
  var newNode = clone(currentNode);
  var children = currentNode.children;

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    if (child.isAnimating) {
      // and now...
      newNode.children[i] = child.newRef;
      // this could probably be done smarter
      requestStyleRecalculation(child.newRef, child);
      //child.parentReference = null;
      child.parent = newNode;
      child.newRef = null;

    }
    if (child.isChildAnimating) {
      newNode.children[i] = reconstructTree(child);
      child.parent = newNode;
      //TODO: properly clean up: child.parentReference = null;
      //child.parentReference = null;
    }
    if (!child.isAnimating && !child.isChildAnimating) {
      newNode.children[i] = child;
    }
  }
  return newNode;
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
    //console.info('new node:', newNode);
    for (j = 0, l2 = keys.length; j < l2; j++) {
      var key = keys[j];
      //console.info(currentTime, start[key], end[key], duration);
      newNode.style[key] = easings[easing](currentTime, start[key], end[key], duration);
      node.newRef = newNode;
    }
    absoluteTransition.node = newNode;
  }

  if (!rootNode) {
    if (registeredAbsoluteTransitions.length) {
      rootNode = registeredAbsoluteTransitions[0].node;
      while (rootNode.parent) {
        rootNode = rootNode.parent;
      }
    }
  }
  var newRootNode = reconstructTree(rootNode);

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
