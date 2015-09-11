'use strict';

var registeredTransitions = [];
var registeredSprings = [];

var Animator = {

  isAnimating: false,

  registerTransition: function() {

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
