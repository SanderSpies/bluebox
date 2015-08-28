'use strict';

// taken from facebook/css-layout
function round(number) {
  var floored = Math.floor(number);
  var decimal = number - floored;
  if (decimal === 0) {
    return number;
  }
  var minDifference = Infinity;
  var minDecimal = Infinity;
  for (var i = 1; i < 64; ++i) {
    var roundedDecimal = i / 64;
    var difference = Math.abs(roundedDecimal - decimal);
    if (difference < minDifference) {
      minDifference = difference;
      minDecimal = roundedDecimal;
    }
  }
  return floored + minDecimal;
}

function isLayoutEqual(dom, computed, path) {
  path = path || 'root';
  if (Math.round(dom.layout.top) !== Math.round(round(computed.layout.top)) ||
    Math.round(dom.layout.left) !== Math.round(round(computed.layout.left) ||
    Math.round(dom.layout.bottom) !== Math.round(round(computed.layout.bottom)) ||
    Math.round(dom.layout.height) !== Math.round(round(computed.layout.height)) ||
    Math.round(dom.layout.right) !== Math.round(round(computed.layout.right)) ||
    Math.round(dom.layout.width) !== Math.round(round(computed.layout.width)))
  ) {
    throw new Error(path + ' >> \n\t DOM properties ' + JSON.stringify(dom.layout) + ' are different from calculated ' + JSON.stringify(computed.layout));
  }

  for (var i = 0, l = dom.children.length; i < l; i++){
    var child = dom.children[i];
    if (!child) {
      continue;
    }

    isLayoutEqual(child, computed.children[i], path + ' >>' + i + ' >> ');
  }
}

module.exports = isLayoutEqual;
