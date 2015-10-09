'use strict';

function isViewVisible(element) {
  return element.style && element.style.backgroundColor ||
    element.style && element.style.border;
}

module.exports = isViewVisible;