'use strict';

var registeredTransitions = [];
var registeredAbsoluteTransitions = [];
var registeredSprings = [];

var Animator = {

  isAnimating: false,

  registerTransition: function(start, end, opts, node) {

  },

  registerSpring: function() {

  },

  _startAnimating: function() {
    if (!Animator.isAnimating) {
      Animator.isAnimating = true;
    }
  }

};

module.exports = Animator;
