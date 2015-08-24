'use strict';

function isLayoutEqual(dom, computed, path) {
  path = path || '';
  if (dom.layout.top !== computed.layout.top ||
    dom.layout.left !== computed.layout.left ||
    dom.layout.bottom !== computed.layout.bottom ||
    dom.layout.height !== computed.layout.height ||
    dom.layout.right !== computed.layout.right ||
    dom.layout.width !== computed.layout.width
  ) {
    throw new Error(path + ' > \n\t DOM properties ' + JSON.stringify(dom.layout) + ' are different from calculated ' + JSON.stringify(computed.layout));
  }

  path += ' > ' + dom.customType;
  for (var i = 0, l = dom.children.length; i < l; i++){
    var child = dom.children[i];
    if (!child) {
      continue;
    }

    isLayoutEqual(child, computed.children[i], path);
  }
}

module.exports = isLayoutEqual;
