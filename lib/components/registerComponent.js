'use strict';

var ComponentTypes = {};

function registerComponent(type, fn) {
  ComponentTypes[type] = fn;
}

module.exports = registerComponent;