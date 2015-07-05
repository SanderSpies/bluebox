'use strict';

const diff = require('./diff');
const computeLayout = require('./computeLayout');
const getViewPortDimensions = require('./getViewPortDimensions');
const optimizeDiff = require('./optimizeDiff');

const BlueBox = {

  renderFromTop(newNode, oldNode, oldLayout) {
    let diffResult = diff(newNode, oldNode);
    let newLayout = computeLayout(diffResult, oldLayout);
    let viewPortDimensions = getViewPortDimensions();
    let optimalDiffResult = optimizeDiff(diffResult, newLayout, viewPortDimensions);

    return {
      diffResult: diffResult,
      optimalDiffResult: optimalDiffResult,
      __layout: newLayout
    }
  }

};



BlueBox.renderFromTop({
  type: 'div',
  children: [
    {
      type: 'span',
      children: ['oh hai there']
    }
  ]
}, {


});

module.export = BlueBox;
