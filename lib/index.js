'use strict';

const diff = require('./diff');
const computeLayout = require('./computeLayout');
const viewPortDimensions = require('./viewPortDimensions');
const optimizeDiff = require('./optimizeDiff');

const BlueBox = {

  renderFromTop(newNode, oldNode, oldLayout) {
    console.profile('foo');
    let diffResult = diff(newNode, oldNode);
    let layoutNodes = computeLayout.fillNodes(diffResult);
    computeLayout.computeLayout(layoutNodes, oldLayout);
    let optimalDiffResult = optimizeDiff(diffResult, layoutNodes, viewPortDimensions);
    console.profileEnd('foo');
    return {
      diffResult: diffResult,
      optimalDiffResult: optimalDiffResult,
      __layout: layoutNodes
    }
  }

};

let toRender1 = BlueBox.renderFromTop({
  type: 'div',
  props: {
    style: {
      width: 100
    },
    children: [
      {
        type: 'span',
        props: {
          style: {
            height: 100
          },
          children: ['oh hai there']
        }
      },
      {
        type: 'span',

        props: {
          style: {
            height: 100
          },
          children: ['oh hai there']
        }
      },
      {
        type: 'span',
        props: {
          style: {
            height: 100
          },
          children: ['oh hai there']
        }
      }
    ]
  }
},
null);
console.log(toRender1);


module.export = BlueBox;
