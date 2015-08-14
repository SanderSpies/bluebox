/**
 * @flow
 */
'use strict';

var EventHandling = require('../events/EventHandling');

var isArray          = Array.isArray;
var keys             = Object.keys;
var BIG_ARRAY        = 100;

function createKeyMap(value) {
  var keyMap = {};
  var children = value.children;
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

  var difference2 = diff(newValue[k], oldNodeChildren ? oldNodeChildren[k] : null, newNode, oldNode);
  if (oldValue && oldValue[k] !== difference2) {
    isDifferent = true;
  }
  if (!skipKeys && isDifferent && difference2 && difference2.props) {
    var key2 = difference2.props.key;
    if (key2 && oldNodeChildren) {
      difference2 = keyMap[key2] || difference2;
    }
    else {
      skipKeys = true;
    }
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
        isDifferent = isDifferent || __ret;
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
  if (!isDifferent) {
    for (var i = 0; i < newNodeKeysLength; i++) {
      isDifferent = isDifferent || handleProperty(newNode, oldNode, newNodeKeys, i, isDifferent, parent, oldParent);
    }
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
    isDifferent = isDifferent || diffArray(newNode, oldNode, parent, oldParent);
  }
  else if (newNodeType === 'object') {
    isDifferent = isDifferent ||  diffObject(newNode, oldNode, parent, oldParent);
  }
  else if (newNodeType === 'function') {
    isDifferent = isDifferent || diffFunction(newNode, oldNode, parent, oldParent);
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
