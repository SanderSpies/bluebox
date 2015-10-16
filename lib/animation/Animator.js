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

var easings = require('./_easings');

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

function reconstructTreeForAnimation(node, skipAddToQueue, onlyCloneChildren) {
  var currentNode = node;
  var children = currentNode.children;
  if (children) {
    var newNode = cloneWithChildren(currentNode);

    var newNodeChildren = newNode.children;
    for (var i = 0, l = newNodeChildren.length; i < l; i++) {
      var newChild = newNodeChildren[i];
      if (newChild.isAnimating) {
        var newRef = newChild.newRef;
        newNodeChildren[i] = reconstructTreeForAnimation(newRef, true, true);
        newChild.newRef = newNodeChildren[i];

        newNodeChildren[i].oldRef = currentNode.children[i];
        if (!skipAddToQueue) {
          recalculationQueue.push(newNode.children[i]);
        }
      }
      else if (newChild.isChildAnimating) {
        newNodeChildren[i] = reconstructTreeForAnimation(newChild, skipAddToQueue || false);
      }
      currentNode.children[i].oldParent = currentNode;
      newNodeChildren[i].parent = newNode;
    }
    return newNode;
  }
  return node;
}

function dereferenceObjects(node) {
  var children = node.children;
  if (children) {
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];

      if (child.isChildAnimating) {
        dereferenceObjects(child);
        child.parent = null;
        child.oldParent = null;
        child.oldRef = null;
      }
      else if (child.isAnimating && child.oldRef) {
        child.parent = null;
        child.oldParent = null;
        child.oldRef = null;
      }
      child.oldParent = null;
    }
  }
  node.oldRef = null;
  node.oldParent = null;
}


var rootNode;
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
    var newNode = cloneWithClonedStyle(node);
    for (var j = 0, l2 = keys.length; j < l2; j++) {
      var key = keys[j];
      newNode.style[key] = easings[easing](currentTime, start[key], end[key], duration);
    }

    node.newRef = newNode;

    absoluteTransition.node = node;
  }
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

}

function onAnimate() {
  requestAnimationFrame(onAnimate);

  var currentTime = Date.now() - startTime;

  processTransitions(currentTime);

  addRootNode();

  if (__DEV__) {
    ensureTreeCorrectness(rootNode);
  }

  var newRootNode = reconstructTreeForAnimation(rootNode, false);

  if (__DEV__) {
    ensureTreeCorrectness(newRootNode);
  }

  correctAnimationNodeReferences(newRootNode);


  if (__DEV__) {
    for (var i = 0, l = recalculationQueue.length; i < l; i++) {
      var recalcNode = recalculationQueue[i];
      if (!isInTree(newRootNode, recalcNode)) {
        console.warn('recalc node not found in the tree!');
      }
    }
  }

  Bluebox.relayout(newRootNode, recalculationQueue);

  //compareOldAndNew(rootNode, newRootNode);

  // ensures no memory leaks
  dereferenceObjects(rootNode);

  rootNode = newRootNode;


  recalculationQueue = [];

  if (__DEV__) {
    ensureTreeCorrectness(rootNode);

  }
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
