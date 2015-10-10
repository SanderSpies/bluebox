'use strict';

function isViewVisible(element) {
  return element.style && element.style.backgroundColor ||
    element.style && element.style.border;

//) &&
//    (!element.parent || element.parent.style.overflow !== 'hidden' ||
//    ((element.layout.left > element.parent.layout.left && element.layout.left < element.parent.layout.right) ||
//    (element.layout.right > element.parent.layout.left && element.layout.right < element.parent.layout.right) ||
//    (element.layout.top > element.parent.layout.top && element.layout.top < element.parent.layout.bottom) ||
//    (element.layout.bottom > element.parent.layout.top && element.layout.bottom < element.parent.layout.bottom)
//    ));
}

module.exports = isViewVisible;