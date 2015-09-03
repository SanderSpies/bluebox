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
  if (Math.ceil(dom.layout.top) !== Math.ceil(round(computed.layout.top)) ||
    Math.ceil(dom.layout.left) !== Math.ceil(round(computed.layout.left) ||
    Math.ceil(dom.layout.bottom) !== Math.ceil(round(computed.layout.bottom)) ||
    Math.ceil(dom.layout.height) !== Math.ceil(round(computed.layout.height)) ||
    Math.ceil(dom.layout.right) !== Math.ceil(round(computed.layout.right)) ||
    Math.ceil(dom.layout.width) !== Math.ceil(round(computed.layout.width)))
  ) {
    throw new Error(path + ' >> \n\t DOM properties\n ' + JSON.stringify(dom.layout) + ' are different from calculated\n ' + JSON.stringify(computed.layout));
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
