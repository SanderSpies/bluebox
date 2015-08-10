'use strict';

function handleEvent(component, fn) {
  // TODO: during dev mode component should be non-changeable
  return function(e) {
    fn.call(null, component, e);
  }
}

function handleEvents(component, props) {
  if (props.onClick) {
    props.onClick = handleEvent(component, props.onClick);
    //addEventListener('click', component, props.onClick);
    document.addEventListener('click', props.onClick);
  }
  if (props.onKeyPress) {

  }
  if (props.onKeyUp) {

  }

  // TODO: virtual event system (only one listener of each etc.)
}

module.exports = handleEvents;