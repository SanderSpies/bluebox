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
    for (var j = 0, l2 = keys.length; j < l2; j++) {
      var key = keys[j];
      node.style[key] = easings[easing](currentTime, start[key], end[key], duration);
    }

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
