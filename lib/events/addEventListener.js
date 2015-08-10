'use strict';

var eventListenerRegistry = {
  onClick: [],
  onKeyPress: [],
  onKeyUp: []
};

function handleEvent(e) {
  //var listeners = eventListenerRegistry;
}

function addEventListener(component, event, callback) {
  if (eventListenerRegistry[event].length === 0) {
    document.addEventListener(event, handleEvent(event));
  }

  eventListenerRegistry.push({
    component: component,
    event: event
  })
}

module.exports = addEventListener;