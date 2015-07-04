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
      diff: optimalDiffResult,
      __layout: newLayout
    }
  }

};



BlueBox.renderFromTop({}, {});

module.export = BlueBox;
