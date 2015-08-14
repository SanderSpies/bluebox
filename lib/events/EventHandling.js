'use strict';

var handleEvents = require('../events/handleEvents');
var handleEvent = handleEvents.handleEvent;

function handleEventProperty(newComponent, oldComponent, key, fn) {
  if (key === 'onClick' || key === 'onMouseEnter' || key === 'onMouseLeave' || key === 'onKeyUp' || key === 'onKeyPress')  {
    if (!oldComponent) {
      handleEvents.addEventListener(newComponent, key, handleEvents.handleEvent(fn));
    }
    else if (oldComponent !== newComponent) {
      handleEvents.updateComponents(oldComponent, newComponent);
    }
    else if (oldComponent && !newComponent){
      console.warn('TODO: remove event listeners for this and also the children...');
    }
  }
}

function setEventListeners(node, oldNode) {
  if (node.props.onClick) {
    handleEventProperty(node, oldNode, 'onClick', node.props.onClick);
  }
  if (node.props.onKeyUp) {
    handleEventProperty(node, oldNode, 'onKeyUp', node.props.onKeyUp);
  }
  if (node.props.onMouseEnter) {
    handleEventProperty(node, oldNode, 'onMouseEnter', node.props.onMouseEnter);
  }
  if (node.props.onMouseLeave) {
    handleEventProperty(node, oldNode, 'onMouseLeave', node.props.onMouseLeave);
  }
  if (node.children) {
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      if (typeof child !== 'string') {
        setEventListeners(node.children[i], oldNode ? oldNode.children[i]: null);
      }
    }
  }
}

module.exports = {
  setEventListeners: setEventListeners
};
