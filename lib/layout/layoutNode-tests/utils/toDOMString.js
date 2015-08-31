'use strict';

function toDOMString(node, indent) {
  indent = indent || 0;
  var result = '';
  var children = node.children;
  var spaceBefore = '  ';
  result += spaceBefore + '<div ';
  result += '  style="';
  var styleKeys = Object.keys(node.style);
  for(var i = 0, l = styleKeys.length; i < l; i++) {
    var styleKey = styleKeys[i];
    var value = node.style[styleKey];
    styleKey = styleKey.replace(/([A-Z])/g, '-$1').toLowerCase();
    if (!isNaN(value) || value) {
      if (!isNaN(value) && styleKey !== 'opacity' && styleKey !== 'flex-grow') {
        if (value > 0) {
          value = value + 'px';
        }
        else if(styleKey === 'width' && value === 0) {
          value = 'initial';
        }
        else {
          value = '';
        }
      }

      result += styleKey + ':' + value + ';';
    }
  }
  result +='">';
  indent++;
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    if (typeof child !== 'string') {
      result += toDOMString(child, indent);
    }
  }
  result += spaceBefore + '</div>\n';
  return result;
}


module.exports = toDOMString;
