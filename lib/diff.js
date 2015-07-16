'use strict';

var isArray = Array.isArray;
var keys = Object.keys;

var BIG_ARRAY = 100;

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

function diffArray(newNode, oldNode, parent) {
  var isDifferent = false;
  for (var i = 0, l = newNode.length; i < l; i++) {
    var oldNodeChild = oldNode[i];
    var difference = diff(newNode[i], oldNodeChild, parent);
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
function extracted(oldNode, newValue, k, oldValue, isDifferent, skipKeys, keyMap, newNode) {
  var oldNodeChildren = oldNode.children;

  var difference2 = diff(newValue[k], oldNodeChildren ? oldNodeChildren[k] : null, newNode);
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

function handleProperty(newNode, oldNode, newNodeKeys, i, isDifferent) {
  var key = newNodeKeys[i];
  if (key !== 'layout') {
    var newValue = newNode[key];
    var oldValue = oldNode[key];
    if (key === 'children' && isArray(newValue)) {
      if (!oldValue) {
        isDifferent = true;
        return isDifferent;
      }
      var keyMap = createKeyMap(oldValue);
      var skipKeys = false;
      var length = newValue.length;
      if (length > BIG_ARRAY) {
        newNode.props.style.flexDirection;
      }

      for (var k = 0, j = newValue.length; k < j; k++) {
        var __ret = extracted(oldNode, newValue, k, oldValue, isDifferent, skipKeys, keyMap, newNode);
        isDifferent = __ret.isDifferent;
        skipKeys = __ret.skipKeys;
      }
    }
    else {
      var difference3 = diff(newValue, oldValue, newNode);
      newNode[key] = difference3;
      if (difference3 !== oldValue) {
        isDifferent = true;
      }
    }
  }
  return isDifferent;
}

function diffObject(newNode, oldNode, parent) {
  var isDifferent = false;
  var newNodeKeys = keys(newNode);
  var newNodeKeysLength = newNodeKeys.length;
  var oldNodeKeysLength = keys(oldNode).length;

  if (newNodeKeysLength !== oldNodeKeysLength) {
    isDifferent = true;
  }
  for (var i = 0; i < newNodeKeysLength; i++) {
    isDifferent = handleProperty(newNode, oldNode, newNodeKeys, i, isDifferent)
  }

  return isDifferent;
}


function diff(newNode, oldNode, parent) {
  // TODO release objects here
  if (!oldNode || !newNode) {
    return newNode;
  }
  if (newNode === oldNode) {
    return oldNode;
  }
  var newNodeType = typeof newNode;
  var oldNodeType = typeof oldNode;
  var isDifferent = false;
  if (newNodeType !== oldNodeType) {
    return newNode;
  }
  else if (isArray(newNode)) {
    isDifferent = diffArray(newNode, oldNode, parent);
  }
  else if (newNodeType === 'object') {
    isDifferent = diffObject(newNode, oldNode, parent);
  }
  else if (newNodeType === 'function') {
    isDifferent = diffFunction(newNode, oldNode, parent);
  }
  else if (newNode !== oldNode) {
    isDifferent = true;
  }

  // completely disregard display none blocks
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
