'use strict';

const isArray = Array.isArray;
const keys = Object.keys;

function createKeyMap(value) {
  let keyMap = new Map();
  const children = value.children;
  for (let i = 0, l = children.length; i < l; i++) {
    const child = children[i];
    const key = child.props ? child.props.key : null;
    if (key) {
      keyMap.set(key, child);
    }
  }
  return keyMap;
}

function diff(newNode, oldNode) {
  const newNodeType = typeof newNode;
  const oldNodeType = typeof oldNode;
  let isDifferent = false;
  if (newNodeType !== oldNodeType) {
    return newNode;
  }
  else if (isArray(newNode)) {
    for (let i = 0, l = newNode.length; i < l; i++) {
      const oldNodeChild = oldNode[i];
      const difference = diff(newNode[i], oldNodeChild);
      if (oldNodeChild !== difference) {
        newNode[i] = difference;
        isDifferent = true;
      }
    }
  }
  else if (newNodeType === 'object') {
    const newNodeKeys = keys(newNode);
    const newNodeKeysLength = newNodeKeys.length;
    const oldNodeKeysLength = keys(oldNode).length;
    if (newNodeKeysLength !== oldNodeKeysLength) {
      isDifferent = true;
    }
    for (let i = 0; i < newNodeKeysLength; i++) {
      const key = newNodeKeys[i];
      const newValue = newNode[key];
      const oldValue = oldNode[key];
      if (key === 'children' && isArray(newValue)) {
        const keyMap = createKeyMap(oldValue);
        for (let k = 0, j = newValue.length; k < j; k++) {
          let difference2 = diff(newValue[k], oldNode.children ? oldNode.children[k]: null);
          if (oldValue && oldValue[k] !== difference2) {
            isDifferent = true;
          }
          if (isDifferent && difference2 &&  difference2.props && difference2.props.key && oldNode.children) {
            difference2 = keyMap.get(difference2.props.key) || difference2;
          }
          newNode.children[k] = difference2;
        }
      }
      else {
        const difference3 = diff(newValue, oldValue);
        newNode[key] = difference3;
        if (difference3 !== oldValue) {
          isDifferent = true;
        }
      }
    }
  }
  else if (newNodeType === 'function') {
    if (newNode.toString() !== oldNode.toString()) {
      isDifferent = true;
    }
  }
  else if (newNode !== oldNode) {
    isDifferent = true;
  }

  if (isDifferent) {
    return newNode;
  }

  return oldNode;
}

module.export = diff;
