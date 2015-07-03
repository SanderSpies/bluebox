'use strict';

const keys = Object.keys;

function getChangedAttributes(newNode, oldNode) {
  // let mutations;
  const newNodeKeys = keys(newNode);
  const oldNodeKeys = keys(oldNode);
  for (let i = 0, l = newNodeKeys.length; i < l; i++) {

  }
}

const MUTATION_TYPE = {
  ADD: 0,
  REMOVE: 1,
  CHANGE: 2
};

function getDOMMutations(newNode, oldNode) {
  if (newNode !== oldNode) {
    // how do we diff this?
    // does the oldNode have the attributes?
    // does the oldNode have attributes the new one doesn't?
    //
    const newChildren = newNode.props.children;
    const oldChildren = oldNode.props.children;
    if (newChildren) {
      for (let i = 0, l = newChildren.length; i < l; i++) {

        // get oldNode via key
        renderDOM(newChildren[i], oldChildren ? oldChildren[i] : null);
      }
    }
    else if (!newChildren && oldChildren) {
      // remove subtree here
    }

  }
}

module.export = renderDOM;
