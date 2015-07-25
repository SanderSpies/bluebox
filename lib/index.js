'use strict';

var diff = require('./diff');
var layoutNode = require('./layoutNode');
var viewPortDimensions = require('./viewPortDimensions');
var optimizeDiff = require('./optimizeDiff');
var renderer = require('./renderers/DOM/renderer');

var BlueBox = {

  renderFromTop(definition, oldComponentTree, hasParentWidthChanged, el, foo) {
    var diff2 = diff(definition, oldComponentTree, null, 'ltr');
    var result = layoutNode(diff2, oldComponentTree, foo, 500);
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
  if (i === 2 ) {
    i = 0;
  }

  var newDom = BlueBox.renderFromTop(doms[i], previousDom, false, document.getElementById('app'), count === 0);
  console.log(newDom);
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
