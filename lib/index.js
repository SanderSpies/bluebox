'use strict';

var diff = require('./diff');
var layoutNode = require('./layoutNode');
var viewPortDimensions = require('./viewPortDimensions');
var optimizeDiff = require('./optimizeDiff');
var renderer = require('./renderers/DOM/renderer');

var BlueBox = {

  renderFromTop(definition, oldComponentTree, hasParentWidthChanged, el) {
    var result = layoutNode(diff(definition, oldComponentTree), oldComponentTree);
    //console.log('testing:', result);
    renderer(el, result, oldComponentTree, 0);
    return result;
  }

};

var doms = [require('./testdom'), require('./testdom2'), require('./testdom3')];
var previousDom;
var i = 0;
var count = 0;

console.profile('rendering');
function renderMe() {
  if (i === 3) {
    //console.log('reset to 0');
    i = 0;
  }
  console.log(i);
  var newDom = BlueBox.renderFromTop(doms[i], previousDom, false, document.getElementById('app'));
  if (previousDom) {
    // debugger;
  }
  previousDom = newDom;
  i++;
  count++;

  if (count < 10) {
    requestAnimationFrame(renderMe);
  } else {
    console.profileEnd('rendering');
  }
}

renderMe();

module.exports = BlueBox;
