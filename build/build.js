(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Bluebox = require('../../lib');
var View = Bluebox.Components.View;
var Text = Bluebox.Components.Text;
var Image = Bluebox.Components.Image;

var imageStyle = {
  width: 50,
  height: 50
};

var TodoItem = Bluebox.create('TodoItem', function render(props) {
  props.onMouseEnter = onMouseEnter;
  props.onMouseLeave = onMouseLeave;
  return View(props, {height: 50, flexDirection: 'row', backgroundColor: props.selected? 'green' : 'black', color: 'white'}, [
    Image({src: 'images/foo.png'}, imageStyle),
    Text('A todo item...')
  ]);
});

function onMouseEnter(todoItemComponent, e) {
  document.body.style.cursor = 'pointer';
}

function onMouseLeave(todoItemComponent, e) {
  document.body.style.cursor = '';
}

module.exports = TodoItem;

},{"../../lib":10}],2:[function(require,module,exports){
'use strict';

var Bluebox = require('../../lib');
var View = Bluebox.Components.View;

var TodoItem = require('./TodoItem');

var TodoList = Bluebox.create('TodoList', function render(props) {
  return View(props, {paddingTop:20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, backgroundColor: 'red'}, [
    TodoItem({onClick:onTodoItemClick, selected: props.selected[0], key: 0}),
    TodoItem({onClick:onTodoItemClick, selected: props.selected[1], key: 1}),
    TodoItem({onClick:onTodoItemClick, selected: props.selected[2], key: 2})
  ]);
});

function onTodoItemClick(todoItemComponent, e) {
  var selected = [false, false, false];
  selected[todoItemComponent.props.key] = true;
  Bluebox.update(todoItemComponent.parent).withProperties({selected: selected});
}

function onTodoItemListKeyUp(todoItemList, e) {
  var selected = [false, false, false];
  var selectedIndex =  todoItemList.props.selected.indexOf(true);
  if (e.which === 40) {
    selected[selectedIndex < 2 ? selectedIndex + 1 : 2] = true;
  }
  else if (e.which === 38) {
    selected[selectedIndex > 0 ? selectedIndex - 1 : 0] = true;
  }
  Bluebox.update(todoItemList).withProperties({selected: selected});
}

Bluebox.renderFromTop(TodoList({onKeyUp: onTodoItemListKeyUp, selected:[false, false, false]}), document.getElementById('canvas'));

module.exports = TodoList;

},{"../../lib":10,"./TodoItem":1}],3:[function(require,module,exports){
'use strict';

function merge(parent, child) {
  var childKeys = Object.keys(child);
  for (var i = 0, l = childKeys.length; i < l; i++) {
    var childKey = childKeys[i];
    parent[childKey] = child[childKey];
  }
  return parent;
}

function Component(type, props, style, children) {
  var component = {
    customType: null,
    layout: {left: 0, width: undefined, right: 0, top: 0, height: undefined, bottom: 0},
    style: merge({
      backgroundColor: '',
      color: '',
      margin: '',
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      minHeight: 0,
      minWidth: 0,
      padding: '',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      opacity: 1,
      overflow: 'inherit',
      width: 0,
      height: 0,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'column'
    }, style || {}),
    parent: null,
    type: type,
    props: props,
    children: children,
    lineIndex: 0
  };

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    if (child.type) {
      child.parent = component;
    }
  }
  return component;
}

module.exports = Component;

},{}],4:[function(require,module,exports){
'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./C');

var Image = Bluebox.create('image', function render(props, style, children) {
  props.isLoaded = false;
  return C('image', props, style, []);
});

module.exports = Image;

},{"./../../lib/index":10,"./C":3}],5:[function(require,module,exports){
'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./C');

var Text = Bluebox.create('text', function(props, style, children) {
    return C('text', {}, null, [props]);
});

module.exports = Text;

},{"./../../lib/index":10,"./C":3}],6:[function(require,module,exports){
'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./C');

var View = Bluebox.create('view', function render(props, style, children) {
  return C('view', props, style, children || []);
});

module.exports = View;

},{"./../../lib/index":10,"./C":3}],7:[function(require,module,exports){
/**
 * @flow
 */
'use strict';

var EventHandling = require('../events/EventHandling');

var isArray          = Array.isArray;
var keys             = Object.keys;
var BIG_ARRAY        = 100;

function createKeyMap(value) {
  var keyMap = {};
  var children = value.children;
  if (children) {
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var key = child.props ? child.props.key : null;
      if (key) {
        keyMap[key] = child;
      }
    }
  }
  return keyMap;
}

function diffArray(newNode, oldNode, parent, oldParent) {
  var isDifferent = false;
  for (var i = 0, l = newNode.length; i < l; i++) {
    var oldNodeChild = oldNode[i];
    var difference = diff(newNode[i], oldNodeChild, parent, oldParent);
    if (oldNodeChild !== difference) {
      newNode[i] = difference;
      isDifferent = true;
    }
  }

  return isDifferent;
}

function diffFunction(newNode, oldNode) {
  var isDifferent = false;
  if (newNode.toString() !== oldNode.toString()) {
    isDifferent = true;
  }
  return isDifferent;
}
function handleChildItem(oldNode, newValue, k, oldValue, isDifferent, skipKeys, keyMap, newNode) {
  var oldNodeChildren = oldNode.children;

  var difference2 = diff(newValue[k], oldNodeChildren ? oldNodeChildren[k] : null, newNode, oldNode);
  if (oldValue && oldValue[k] !== difference2) {
    isDifferent = true;
  }
  if (!skipKeys && isDifferent && difference2 && difference2.props) {
    var key2 = difference2.props.key;
    if (key2 && oldNodeChildren) {
      difference2 = keyMap[key2] || difference2;
    }
    else {
      skipKeys = true;
    }
  }

  newNode.children[k] = difference2;

  return {
    isDifferent: isDifferent,
    skipKeys: skipKeys
  };
}


function handleProperty(newNode, oldNode, newNodeKeys, i, isDifferent, parent, oldParent) {
  var key = newNodeKeys[i];
  if (key !== 'layout' && key !== 'parent') {
    var newValue = newNode[key];
    var oldValue = oldNode[key];
    if (newNode.props) {
      EventHandling.setEventListeners(newNode, oldNode);
    }
    if (key === 'children' && isArray(newValue)) {
      if (!oldValue) {
        isDifferent = true;
        return {
          isDifferent: isDifferent
        };
      }
      var keyMap = createKeyMap(oldValue);
      var skipKeys = false;
      for (var k = 0, j = newValue.length; k < j; k++) {
        var __ret = handleChildItem(oldNode, newValue, k, oldValue, isDifferent, skipKeys, keyMap, newNode);
        isDifferent = isDifferent || __ret;
        skipKeys = __ret.skipKeys;
      }
    }
    else {
      var difference3 = diff(newValue, oldValue, newNode, oldNode);
      newNode[key] = difference3;
      if (difference3 !== oldValue) {
        isDifferent = true;
      }

    }
  }

  return isDifferent;
}

function diffObject(newNode, oldNode, parent, oldParent) {
  var isDifferent = false;
  var newNodeKeys = keys(newNode);
  var newNodeKeysLength = newNodeKeys.length;
  var oldNodeKeysLength = keys(oldNode).length;

  if (newNodeKeysLength !== oldNodeKeysLength) {
    isDifferent = true;
  }
  if (!isDifferent) {
    for (var i = 0; i < newNodeKeysLength; i++) {
      isDifferent = isDifferent || handleProperty(newNode, oldNode, newNodeKeys, i, isDifferent, parent, oldParent);
    }
  }

  return isDifferent;
}



function diff(newNode, oldNode, parent, oldParent) {
  var isDifferent = false;
  if (newNode === oldNode) {
    return oldNode;
  }
  if (!oldNode || !newNode) {
    if (newNode && newNode.props) {
      EventHandling.setEventListeners(newNode, oldNode);
    }
    return newNode;
  }
  var newNodeType = typeof newNode;
  var oldNodeType = typeof oldNode;
  if (newNodeType !== oldNodeType) {
    isDifferent = true;
    return newNode;
  }
  if (isDifferent) {
    return newNode;
  }
  if (isArray(newNode)) {
    isDifferent = isDifferent || diffArray(newNode, oldNode, parent, oldParent);
  }
  else if (newNodeType === 'object') {
    isDifferent = isDifferent ||  diffObject(newNode, oldNode, parent, oldParent);
  }
  else if (newNodeType === 'function') {
    isDifferent = isDifferent || diffFunction(newNode, oldNode, parent, oldParent);
  }
  else if (newNode !== oldNode) {
    isDifferent = true;
  }

  var returnNode = isDifferent ? newNode : oldNode;
  if (returnNode && returnNode.props && returnNode.props.style) {
    var style = returnNode.props.style;
    if (style.display === 'none' && returnNode.children && returnNode.children.length) {
      returnNode.children = [];
    }
  }

  return returnNode;
}

module.exports = diff;

},{"../events/EventHandling":8}],8:[function(require,module,exports){
'use strict';

var handleEvents = require('../events/handleEvents');
var handleEvent = handleEvents.handleEvent;

function handleEventProperty(newComponent, oldComponent, key, fn) {
  if (key === 'onClick' || key === 'onMouseEnter' || key === 'onMouseLeave' || key === 'onKeyUp' || key === 'onKeyPress')  {
    if (!oldComponent) {
      handleEvents.addEventListener(newComponent, key, handleEvents.handleEvent(fn));
    }
    else if (oldComponent !== newComponent) {
      handleEvents.updateComponents(oldComponent, newComponent);
    }
    else if (oldComponent && !newComponent){
      console.warn('TODO: remove event listeners for this and also the children...');
    }
  }
}

function setEventListeners(node, oldNode) {
  if (node.props.onClick) {
    handleEventProperty(node, oldNode, 'onClick', node.props.onClick);
  }
  if (node.props.onKeyUp) {
    handleEventProperty(node, oldNode, 'onKeyUp', node.props.onKeyUp);
  }
  if (node.props.onMouseEnter) {
    handleEventProperty(node, oldNode, 'onMouseEnter', node.props.onMouseEnter);
  }
  if (node.props.onMouseLeave) {
    handleEventProperty(node, oldNode, 'onMouseLeave', node.props.onMouseLeave);
  }
  if (node.children) {
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      if (typeof child !== 'string') {
        setEventListeners(node.children[i], oldNode ? oldNode.children[i]: null);
      }
    }
  }
}

module.exports = {
  setEventListeners: setEventListeners
};

},{"../events/handleEvents":9}],9:[function(require,module,exports){
'use strict';

// TODO: make it all virtual
var attachedEventListeners = {
  onClick: [],
  onKeyUp: [],
  onMouseEnter: [],
  onMouseMove: [],
  onMouseLeave: []
};

var map = {
  onClick: 'click',
  onKeyUp: 'keyup',
  onMouseMove: 'mousemove'
};

// TODO: ensure components stay correct after diffing

function addEventListener(component, event, fn) {
  if ((event === 'onMouseEnter' || event === 'onMouseLeave') && !attachedEventListeners.onMouseMove.length) {
    document.addEventListener('mousemove', handleMouseMove(component));
  }
  else if (!attachedEventListeners[event].length) {
    document.addEventListener(map[event], handleEvents2(component, event));
  }
  attachedEventListeners[event].push({component: component, fn: fn});
}

var mouseLeaveComponent = null;
function handleMouseMove(component, fn) {
  return function(e) {
    if (mouseLeaveComponent && mouseLeaveComponent.component.props.onMouseLeave && !(e.clientY >= mouseLeaveComponent.component.layout.top && e.clientY <= (mouseLeaveComponent.component.layout.top + mouseLeaveComponent.component.layout.height) && e.clientX >= mouseLeaveComponent.component.layout.left && e.clientX <= (mouseLeaveComponent.component.layout.left + mouseLeaveComponent.component.layout.width) )) {
      mouseLeaveComponent.component.props.onMouseLeave(mouseLeaveComponent.component, e);
      mouseLeaveComponent = null;
    }

    var mouseEnterComponents = attachedEventListeners.onMouseEnter;
    for (var i = 0, l = mouseEnterComponents.length; i < l; i++) {
      var mouseEnterComponent = mouseEnterComponents[i];
      if (mouseLeaveComponent !== mouseEnterComponent) {
        if (e.clientY >= mouseEnterComponent.component.layout.top && e.clientY <= (mouseEnterComponent.component.layout.top + mouseEnterComponent.component.layout.height)
          && e.clientX >= mouseEnterComponent.component.layout.left && e.clientX <= (mouseEnterComponent.component.layout.left + mouseEnterComponent.component.layout.width)) {
          mouseEnterComponent.fn(mouseEnterComponent.component, e);
          mouseLeaveComponent = mouseEnterComponent;
        }
      }
    }

  };
}

function handleEvents2(component, type) {
  return function(e) {
    var listeners = attachedEventListeners[type];
    for (var i = 0, l = listeners.length; i < l; i++) {
      var listener = listeners[i];
      listener.fn(listener.component, e);
    }
  }
}

function handleEvent(fn) {
  // TODO: during dev mode component should be non-changeable
  return function(component, e) {
    if(e instanceof MouseEvent) {
      // TODO: improve more...
      if (e.clientY > component.layout.top && e.clientY < (component.layout.top + component.layout.height)) {
        fn(component, e);
      }
    }
    if (e instanceof KeyboardEvent) {
      fn(component, e);
    }
  }
}

function handleEvents(component) {
  var props = component.props;
  if (props.onClick) {
    addEventListener(component, 'click', handleEvent(component, props.onClick));
  }
  if (props.onMouseEnter) {
    addEventListener(component, 'mouseenter', props.onMouseEnter);
  }
  if (props.onKeyPress) {
    addEventListener(component, 'keypress', handleEvent(component, props.onKeyPress));
  }
  if (props.onKeyUp) {
    addEventListener(component, 'keyup', handleEvent(component, props.onKeyUp));
  }
}

function updateComponents(oldComponent, newComponent) {
  var onClickListeners = attachedEventListeners.onClick;
  for (var i = 0, l = onClickListeners.length; i < l; i++) {
    var onClickListener = onClickListeners[i];
    if (onClickListener.component === oldComponent) {
      onClickListener.component = newComponent;
    }
  }
  var onKeyUpListeners = attachedEventListeners.onKeyUp;
  for (var i = 0, l = onKeyUpListeners.length; i < l; i++) {
    var onKeyUpListener = onKeyUpListeners[i];
    if (onKeyUpListener.component === oldComponent) {
      onKeyUpListener.component = newComponent;
    }
  }
}

module.exports = {
  handleEvents: handleEvents,
  addEventListener: addEventListener,
  handleEvent: handleEvent,
  updateComponents: updateComponents
};
},{}],10:[function(require,module,exports){
(function (process,global){
'use strict';

var diff            = require('./diff/diff');
var layoutNode      = require('./layout/layoutNode');
var render        = require('./renderers/GL/render');
var ViewPortHelper  = require('./renderers/DOM/ViewPortHelper');
var oldComponentTree    = null;
var oldDOMElement       = null;
var viewPortDimensions  = null;
var registeredComponentTypes = {};
var keys = Object.keys;
var toDOMString = require('./layout/layoutNode-tests/utils/toDOMString');

global.__DEV__ = process.env.NODE_ENV !== 'production';

function registerComponentType(type, structure) {
  registeredComponentTypes[type] = structure;
}

function rerenderComponent(type, props, style, children) {
  var componentType = registeredComponentTypes[type];
  return componentType(props, style, children);
}

function updateTree(component, newComponent) {
  // go up the tree and replace all the nodes
  var parent = component.parent;
  if (parent) {
    var parentChildren = parent.children;
    for (var i = 0, l = parentChildren.length; i < l; i++) {
      var child = parentChildren[i];
      if (child === component) {
        parent.children[i] = newComponent;
        break;
      }
    }
    // TODO: recreate the parents in an optimal way + return the parent
  }
  else {
    return newComponent;
  }

}

function mergeProperties(newProps, existingProps) {
  var existingPropKeys = keys(existingProps);
  for (var i = 0, l = existingPropKeys.length; i < l; i++) {
    var existingPropKey = existingPropKeys[i];
    if (!newProps[existingPropKey]) {
      newProps[existingPropKey] = existingProps[existingPropKey];
    }
  }
  return newProps;
}

function withProperties(component) {
  return {
    withProperties: function(props) {
      props = mergeProperties(props, component.props);
      //console.log(component.props, props);
      var newComponent = rerenderComponent(component.customType, props, component.style, component.children);
      var newComponentTree = updateTree(component, newComponent);
      Bluebox.renderFromTop(newComponentTree);
      newComponent.customType = component.customType;
      return newComponent;
    }
  };
}

var Bluebox = {

  create: function(type, structure) {
    registerComponentType(type, structure);
    return function(props, style, children) {
      var component =  structure(props, style, children);
      component.customType = type;
      return component;
    };
  },

  Components: {
    Image: null,
    Text: null,
    View: null
  },

  update: function(component) {
    return withProperties(component);
  },

  renderFromTop: function(componentTree, domElement) {
    if (!componentTree) {
      componentTree = oldComponentTree;
    }
    if (!domElement) {
      domElement = oldDOMElement;
    }
    oldDOMElement = domElement;
    var newComponentTree = diff(componentTree, oldComponentTree, null, 'ltr');

    var hasChanged = false;
    if (viewPortDimensions !== ViewPortHelper.getDimensions()) {
      viewPortDimensions = ViewPortHelper.getDimensions();
      hasChanged = true;
    }
    if (newComponentTree.layout.width === undefined) {
      newComponentTree = layoutNode(newComponentTree, null, 'column', oldComponentTree, true, viewPortDimensions.width, viewPortDimensions.height, 'ltr');
    }

    if (newComponentTree !== oldComponentTree || hasChanged) {
      viewPortDimensions = ViewPortHelper.getDimensions();
    }

    render(domElement, newComponentTree, oldComponentTree, null, 0, viewPortDimensions, 0, 0);

    oldComponentTree = newComponentTree;
    return newComponentTree;
  }

};

module.exports = Bluebox;

Bluebox.Components.View = require('./components/View');
Bluebox.Components.Text = require('./components/Text');
Bluebox.Components.Image = require('./components/Image');

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./components/Image":4,"./components/Text":5,"./components/View":6,"./diff/diff":7,"./layout/layoutNode":12,"./layout/layoutNode-tests/utils/toDOMString":11,"./renderers/DOM/ViewPortHelper":13,"./renderers/GL/render":14,"_process":17}],11:[function(require,module,exports){
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
    if (value) {
      if (!isNaN(value) && styleKey !== 'opacity') {
        value = value + 'px';
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

},{}],12:[function(require,module,exports){
'use strict';

var COLUMN = 'column';
var ROW = 'row';
var FLEX_START = 'flex-start';

function justifyContentFn(node, parentWidth, parentHeight, newFlexDirection) {
  var justifyContent = node.style.justifyContent;
  var remainingSpaceMainAxis;
  if (newFlexDirection === ROW) {
    remainingSpaceMainAxis = parentWidth - node.children[node.children.length - 1].layout.right;
  }
  else {
    remainingSpaceMainAxis = parentHeight - node.children[node.children.length - 1].layout.bottom;
  }


  if (justifyContent === 'center') {
    remainingSpaceMainAxis = remainingSpaceMainAxis / 2;
    justifyContent = 'flex-end';
  }

  if (justifyContent === 'flex-end') {
    // rearrange items
    if (newFlexDirection === ROW) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        var child = node.children[i];
        var childLayout = child.layout;
        childLayout.left += remainingSpaceMainAxis;
        childLayout.right += remainingSpaceMainAxis;
      }
    }
    else {
      for (var i = 0, l = node.children.length; i < l; i++) {
        var child = node.children[i];
        var childLayout = child.layout;
        childLayout.top += remainingSpaceMainAxis;
        childLayout.bottom += remainingSpaceMainAxis;
      }
    }
  }

  if (justifyContent === 'space-around') {

  }
  if (justifyContent === 'space-between') {

  }
}

function layoutNode(node, previousSibling, mainAxis) {
  var nodeLayout = node.layout;

  var parent = node.parent;
  var parentLayout = parent ? parent.layout : null;
  var parentWidth = parentLayout ? parentLayout.width : document.body.clientWidth;
  var parentHeight = parentLayout ? parentLayout.height : document.body.clientHeight;
  var alignItems = parent ? parent.style.alignItems : FLEX_START;

  var crossAxis = mainAxis === COLUMN ? ROW : COLUMN;

  if (previousSibling) {
    if (mainAxis === COLUMN) {
      nodeLayout.top = previousSibling.layout.bottom + previousSibling.style.marginBottom;

      if (alignItems === FLEX_START && parentLayout) {
        nodeLayout.left = parentLayout.left;
      }
    }
    else if (mainAxis === ROW) {
      nodeLayout.left = previousSibling.layout.right  + previousSibling.style.marginRight;

      if (alignItems === FLEX_START && parentLayout) {
        nodeLayout.top = parentLayout.top;
      }
    }
  }
  else {
    nodeLayout.left = parent ? parentLayout.left : 0;
    nodeLayout.top = parent ? parentLayout.top : 0;
  }

  nodeLayout.left += node.style.marginLeft;
  nodeLayout.top += node.style.marginTop;

  nodeLayout.width = node.style.width || parentWidth;
  nodeLayout.height = node.style.height;


  nodeLayout.bottom = nodeLayout.top + nodeLayout.height;
  nodeLayout.right = nodeLayout.left + nodeLayout.width;


  if (node.children.length && typeof node.children[0] !== 'string') {
    var newFlexDirection = node.style && node.style.flexDirection? node.style.flexDirection : COLUMN;
    var maxSize = 0;
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      var previousChild = i > 0 ? node.children[i - 1] : null;
      layoutNode(child, previousChild, newFlexDirection);

      if (mainAxis === COLUMN) {
        if (i === 0) {
          child.layout.top += node.style.paddingTop;
          child.layout.bottom += node.style.paddingTop;
        }
        child.layout.left += node.style.paddingLeft;
        child.layout.width -= node.style.paddingLeft + node.style.paddingRight;
        child.layout.right -= node.style.paddingRight;

        if (child.layout.bottom > maxSize) {
          maxSize = child.layout.bottom + child.style.marginBottom;
        }
      }
    }


    justifyContentFn(node, parentWidth, parentHeight, newFlexDirection);

    if (mainAxis === ROW) {
      if (node.layout.right < node.children[node.children.length - 1].layout.right && node.layout.width === 0) {
        node.layout.right = node.children[node.children.length - 1].layout.right;
        node.layout.width = node.children[node.children.length - 1].layout.right - node.layout.left;
      }
    }
    else {
      if (node.layout.height === 0) {
        node.layout.bottom = maxSize + node.style.paddingBottom;
        node.layout.height = maxSize + node.style.paddingBottom;
      }
    }

  }

  return node;
}

module.exports = layoutNode;

},{}],13:[function(require,module,exports){
'use strict';

var dimensions = {
  width: window.innerWidth,
  height: window.innerHeight,
  top: window.scrollY,
  left: window.scrollX
};

var isBusy = false;
var fn;
var currentRAF;
var ViewPortHelper = {

  getDimensions: function() {
    return dimensions;
  },

  onScroll: function(_fn) {
    fn = _fn;
  },

  _onScroll: function(evt) {
    if (currentRAF) {
      cancelAnimationFrame(currentRAF);
    }
    currentRAF = requestAnimationFrame(function() {
      dimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
        top: window.scrollY,
        left: window.scrollX
      };
      isBusy = false;
      if (fn) {
        fn.call();
      }
    });
  }

};

document.addEventListener('scroll', ViewPortHelper._onScroll);


module.exports = ViewPortHelper;

},{}],14:[function(require,module,exports){
'use strict';

var webGLContext;
require('./temp-utils');
var renderView = require('./renderView');

function isVisible(node, viewPortDimensions) {
  var nodeLayout = node.layout;
  return (nodeLayout.top >= viewPortDimensions.top && nodeLayout.top <= (viewPortDimensions.top + viewPortDimensions.height)) ||
    ((nodeLayout.top + nodeLayout.height) <= (viewPortDimensions.top + viewPortDimensions.height) && (nodeLayout.top + nodeLayout.height) >= viewPortDimensions.top) ||
    nodeLayout.top < viewPortDimensions.top && (nodeLayout.top + nodeLayout.height) > (viewPortDimensions.top + viewPortDimensions.height);
}



var loadedImages = {

};

function loadImage(src) {
  return new Promise(function(resolve, reject){
    // TODO: pool this
    var image = new Image();

    image.onload = function image$onload() {
      loadedImages[src] = image;
      resolve(image);
    };
    image.onerror = function image$onerror() {
      reject(image);
    };
    image.src = src;
  });
}

function loadImageDirectly(src) {
  return loadedImages[src];
}

function _renderImage(image, element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight) {
  //return function(image) {
    webGLContext.useProgram(imageProgram);

    iTextLocation = webGLContext.getAttribLocation(imageProgram, "a_position");
    webGLContext.blendFunc(webGLContext.ONE, webGLContext.ONE_MINUS_SRC_ALPHA);
    var texCoordBuffer = webGLContext.createBuffer();
    webGLContext.uniform4f(webGLContext.getUniformLocation(imageProgram, 'u_dimensions'), parentLeft, parentTop, parentLeft + parentWidth, parentTop + parentHeight);
    webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, texCoordBuffer);
    webGLContext.bufferData(webGLContext.ARRAY_BUFFER, new Float32Array([
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0]), webGLContext.STATIC_DRAW);
    webGLContext.enableVertexAttribArray(iTextLocation);
    webGLContext.vertexAttribPointer(iTextLocation, 2, webGLContext.FLOAT, false, 0, 0);


    // Create a texture.
    var texture = webGLContext.createTexture();
    webGLContext.bindTexture(webGLContext.TEXTURE_2D, texture);
    // Upload the image into the texture.
    webGLContext.texImage2D(webGLContext.TEXTURE_2D, 0, webGLContext.RGBA, webGLContext.RGBA, webGLContext.UNSIGNED_BYTE, image);
    //webGLContext.activeTexture(webGLContext.TEXTURE0);
    // Set the parameters so we can render any size image.
    webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_WRAP_S, webGLContext.CLAMP_TO_EDGE);
    webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_WRAP_T, webGLContext.CLAMP_TO_EDGE);
    webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_MIN_FILTER, webGLContext.NEAREST);

    webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_MAG_FILTER, webGLContext.NEAREST);

    var dstX = left;
    var dstY = top;
    var dstWidth = width;
    var dstHeight = height;

    // convert dst pixel coords to clipspace coords
    var clipX = dstX / webGLContext.canvas.width  *  2 - 1;
    var clipY = dstY / webGLContext.canvas.height * -2 + 1;
    var clipWidth = dstWidth  / webGLContext.canvas.width  *  2;
    var clipHeight = dstHeight / webGLContext.canvas.height * -2;

    // build a matrix that will stretch our
    // unit quad to our desired size and location
    webGLContext.uniformMatrix3fv(u_matrixLoc, false, [
      clipWidth, 0, 0,
      0, clipHeight, 0,
      clipX, clipY, 1
    ]);

    webGLContext.drawArrays(webGLContext.TRIANGLES, 0, 6);

 // }
}

function _rejectedImageLoad() {
  // TODO
}

function setLoaded(element) {
  return function() {
    element.props.isLoaded = true;
  }
}

function rerender(domElement,
  newElement,
  oldElement,
  parent,
  position,
  viewPortDimensions,
  top,
  left) {
  return function() {
    //render(domElement,
    //  newElement,
    //  oldElement,
    //  parent,
    //  position,
    //  viewPortDimensions,
    //  top,
    //  left);
  }
}

function renderImage(domElement, newComponentTree, oldComponentTree, element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight) {
  if (element.props && element.props.src) {
    if (!element.props.isLoaded) {
      loadImage(element.props.src)
        .then(setLoaded(element), _rejectedImageLoad)
        .then(rerender(domElement, newComponentTree, oldComponentTree, null, 0, viewPortDimensions, 0, 0));
    } else {
      //var image = loadImageDirectly(element.props.src);
      //_renderImage(image, element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight);
    }
  }
}

var textCanvas = document.createElement('canvas');
var textCanvasCtx = textCanvas.getContext('2d');
function drawTextOnCanvas(newElement, top, left, width, height, inheritedOpacity, inheritedColor) {
  textCanvasCtx.clearRect(0, 0, 100, 100);
  textCanvasCtx.canvas.width = width;
  textCanvasCtx.canvas.height = height;
  textCanvasCtx.font = "12px arial";
  textCanvasCtx.textAlign = "left";
  textCanvasCtx.textBaseline = "middle";
  textCanvasCtx.fillStyle = inheritedColor || "black";
  textCanvasCtx.fillText(newElement.children[0], 2, 12);
  return textCanvasCtx.canvas;
}

function renderText(newElement, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity, inheritedColor) {

  webGLContext.useProgram(imageProgram);
  u_matrixLoc = webGLContext.getUniformLocation(imageProgram, "u_matrix");
  var foo = drawTextOnCanvas(newElement, top, left, width, height, inheritedOpacity, inheritedColor);


  var texCoordBuffer = webGLContext.createBuffer();
  webGLContext.uniform4f(webGLContext.getUniformLocation(imageProgram, 'u_dimensions'), newElement.layout.left + left, newElement.layout.
    top, parentLeft + parentWidth, parentTop + parentHeight);
  webGLContext.pixelStorei(webGLContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  webGLContext.blendFunc(webGLContext.ONE, webGLContext.ONE_MINUS_SRC_ALPHA);
  webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, texCoordBuffer);
  webGLContext.bufferData(webGLContext.ARRAY_BUFFER, new Float32Array([
    0.0,  0.0,
    1.0,  0.0,
    0.0,  1.0,
    0.0,  1.0,
    1.0,  0.0,
    1.0,  1.0]), webGLContext.STATIC_DRAW);
  webGLContext.enableVertexAttribArray(iTextLocation);
  webGLContext.vertexAttribPointer(iTextLocation, 2, webGLContext.FLOAT, false, 0, 0);


  // Create a texture.
  var texture = webGLContext.createTexture();

  webGLContext.bindTexture(webGLContext.TEXTURE_2D, texture);
  // Upload the image into the texture.
  webGLContext.texImage2D(webGLContext.TEXTURE_2D, 0, webGLContext.RGBA, webGLContext.RGBA, webGLContext.UNSIGNED_BYTE, foo);
  //webGLContext.activeTexture(webGLContext.TEXTURE0);
  // Set the parameters so we can render any size image.
  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_WRAP_S, webGLContext.CLAMP_TO_EDGE);
  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_WRAP_T, webGLContext.CLAMP_TO_EDGE);
  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_MIN_FILTER, webGLContext.NEAREST);

  webGLContext.texParameteri(webGLContext.TEXTURE_2D, webGLContext.TEXTURE_MAG_FILTER, webGLContext.NEAREST);

  var dstX = newElement.layout.left + left;
  var dstY = top;
  var dstWidth = width;
  var dstHeight = height;

  // convert dst pixel coords to clipspace coords
  var clipX = dstX / webGLContext.canvas.width  *  2 - 1;
  var clipY = dstY / webGLContext.canvas.height * -2 + 1;
  var clipWidth = dstWidth  / webGLContext.canvas.width  *  2;
  var clipHeight = dstHeight / webGLContext.canvas.height * -2;

  // build a matrix that will stretch our
  // unit quad to our desired size and location
  webGLContext.uniformMatrix3fv(u_matrixLoc, false, [
    clipWidth, 0, 0,
    0, clipHeight, 0,
    clipX, clipY, 1
  ]);

  webGLContext.drawArrays(webGLContext.TRIANGLES, 0, 6);
}

function calculatePosition(scale, px) {
  return -1 + (2 / scale * px);
}
var vertexShader;
var vertexShader2;
var fragmentShader;
var imageShader;
var imageProgram;
var viewProgram;
var colorLocation;
var positionLocation;
var iPositionLocation;
var iResolutionLocation;
var resolutionLocation;
var textCoord;
var iTextLocation;
var u_matrixLoc;
var topElement;
var topOldElement;
var topDOMElement;
function render(domElement,
  newElement,
  oldElement,
  parent,
  position,
  viewPortDimensions,
  top,
  left,
  parentLeft,
  parentWidth,
  parentTop,
  parentHeight,
  inheritedOpacity,
  inheritedZoom,
  inheritedFontSize,
  inheritedColor,
  inheritedFilter) {
  if (!webGLContext) {
    topDOMElement = domElement;
    webGLContext = domElement.getContext('webgl');
    if(webGLContext == null){
      webGLContext = domElement.getContext('experimental-webgl');
    }


    vertexShader = createShaderFromScriptElement(webGLContext, "2d-vertex-shader");
    vertexShader2 = createShaderFromScriptElement(webGLContext, "2d-vertex-shader2");
    fragmentShader = createShaderFromScriptElement(webGLContext, "2d-fragment-shader");
    imageShader = createShaderFromScriptElement(webGLContext, "2d-image-shader");

    viewProgram = createProgram(webGLContext, [vertexShader, fragmentShader]);
    imageProgram = createProgram(webGLContext, [vertexShader2, imageShader]);


    webGLContext.useProgram(viewProgram);

    positionLocation = webGLContext.getAttribLocation(viewProgram, "a_position");
    textCoord = webGLContext.getAttribLocation(viewProgram, "a_textCoord");
    resolutionLocation = webGLContext.getUniformLocation(viewProgram, "u_resolution");
    colorLocation = webGLContext.getUniformLocation(viewProgram, "u_color");

    webGLContext.uniform4f(webGLContext.getUniformLocation(viewProgram, 'u_dimensions'), parentLeft, parentTop, parentLeft + parentWidth, parentTop + parentHeight);
    webGLContext.uniform2f(resolutionLocation, viewPortDimensions.width, viewPortDimensions.height);

    webGLContext.useProgram(imageProgram);

    var u_imageLoc = webGLContext.getUniformLocation(imageProgram, "u_image");
    u_matrixLoc = webGLContext.getUniformLocation(imageProgram, "u_matrix");
    iPositionLocation = webGLContext.getAttribLocation(imageProgram, "a_position");

    iResolutionLocation = webGLContext.getUniformLocation(imageProgram, "u_resolution");

    webGLContext.uniform2f(iResolutionLocation, viewPortDimensions.width, viewPortDimensions.height);
  }
  if (!newElement.parent) {
    topElement = newElement;
    topOldElement = oldElement;
  }

  //webGLContext.clearColor(0.0, 0.0, 0.0, 1.0);                      // Set clear color to black, fully opaque
  //webGLContext.enable(webGLContext.DEPTH_TEST);                               // Enable depth testing
  //webGLContext.depthFunc(webGLContext.LEQUAL);                                // Near things obscure far things
  //  webGLContext.clear(webGLContext.COLOR_BUFFER_BIT|webGLContext.DEPTH_BUFFER_BIT);
  domElement.width = viewPortDimensions.width;
  domElement.height = viewPortDimensions.height;
  webGLContext.viewport(0, 0, viewPortDimensions.width, viewPortDimensions.height);
  webGLContext.enable(webGLContext.BLEND);
  if (!parentWidth) {
    parentWidth = viewPortDimensions.width;
    parentLeft = 0;
    parentHeight = viewPortDimensions.height;
    parentTop = 0;
  }

  if (typeof newElement === 'string' || !isVisible(newElement, viewPortDimensions))  {
    return;
  }

  if (newElement === oldElement) {
    return;
  }
 // fixme: if (newElement && !oldElement) {
    if (!newElement.layout) {
      return;
    }

    if (newElement.type === 'view') {

      renderView(webGLContext, viewProgram, newElement, viewPortDimensions, top, left, colorLocation, positionLocation, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity || 1);
        var style = newElement.style;
        if ('opacity' in style) {
          inheritedOpacity = (inheritedOpacity || 1) * style.opacity;
        }
        if (style.fontSize) {
          inheritedFontSize = style.fontSize;
        }
        if (style.zoom) {
          inheritedZoom = (inheritedZoom || 1) * style.zoom;
        }
        if (style.color) {
          inheritedColor = style.color;
        }
        if (style.filter) {
          // complex...
        }



      var children = newElement.children;
      if (children) {
        for (var i = 0, l = children.length; i < l; i++) {
          var child = children[i];
          if (newElement.style.overflow === 'hidden') {
            parentWidth = newElement.layout.width;
            parentLeft = newElement.layout.left;
            parentHeight = newElement.layout.height;
            parentTop = newElement.layout.top;
          }
          render(domElement, child, null, newElement, i, viewPortDimensions, newElement.layout.top, newElement.layout.left, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity,
            inheritedZoom,
            inheritedFontSize,
            inheritedColor,
            inheritedFilter);
        }
      }
    }
    else if (newElement.type === 'text') {
      renderText(newElement, top, left, parent.layout.width, parent.layout.height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity || 1, inheritedColor);
    }
    else if (newElement.type === 'image') {
      renderImage(topDOMElement, topElement, topOldElement, newElement, top, left, newElement.layout.width, newElement.layout.height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity || 1, inheritedColor);
    }
  //}
}



module.exports = render;

},{"./renderView":15,"./temp-utils":16}],15:[function(require,module,exports){
'use strict';

var WebGLColors = {
  black: [0, 0, 0],
  white: [1, 1, 1],
  red: [1, 0, 0],
  green: [0, .5, 0],
  blue: [0, 0, 1]
};


function setBackgroundColor(webGLContext, element, colorLocation, inheritedOpacity) {
  if (element.style.backgroundColor !== '') {
    var backgroundColor = WebGLColors[element.style.backgroundColor];
    var opacity = 1;
    var opacityProp = element.style.opacity;
    if (!isNaN(opacityProp)) {
      opacity = opacityProp * inheritedOpacity;
    }
    else if (inheritedOpacity) {
      opacity = inheritedOpacity;
    }

    webGLContext.uniform4f(colorLocation, backgroundColor[0], backgroundColor[1], backgroundColor[2], opacity);
  }
}

function setBorder(element) {
  if (element.props && element.props.style && element.props.style.border) {
    console.warn('not implemented yet');
  }
}

function isViewVisible(element) {
  return element.style && element.style.backgroundColor ||
    element.style && element.style.border;
}

function renderView(webGLContext, viewProgram, element, viewPortDimensions, top, left, colorLocation, positionLocation, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity) {
  if (isViewVisible(element)) {

    webGLContext.useProgram(viewProgram);
    //webGLContext.blendEquationSeparate(webGLContext.FUNC_ADD, webGLContext.FUNC_ADD);
    //webGLContext.blend
    webGLContext.blendFuncSeparate(webGLContext.SRC_ALPHA, webGLContext.ONE_MINUS_SRC_ALPHA, webGLContext.ONE, webGLContext.ONE_MINUS_SRC_ALPHA);

    var buffer = webGLContext.createBuffer();
    webGLContext.bindBuffer(webGLContext.ARRAY_BUFFER, buffer);
    webGLContext.enableVertexAttribArray(positionLocation);
    webGLContext.vertexAttribPointer(positionLocation, 2, webGLContext.FLOAT, false, 0, 0);

    webGLContext.uniform4f(webGLContext.getUniformLocation(viewProgram, 'u_dimensions'), parentLeft, parentTop, parentLeft + parentWidth, parentTop + parentHeight);

    var x1 = element.layout.left;
    var x2 = element.layout.right;
    var y1 = element.layout.top;

    var y2 = element.layout.bottom;

    setBackgroundColor(webGLContext, element, colorLocation, inheritedOpacity);
    setBorder(element);

    webGLContext.bufferData(webGLContext.ARRAY_BUFFER, new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2]), webGLContext.STATIC_DRAW);

    webGLContext.drawArrays(webGLContext.TRIANGLES, 0, 6);
  }
}

module.exports = renderView;

},{}],16:[function(require,module,exports){
// Licensed under a BSD license. See ../license.html for license

// These funcitions are meant solely to help unclutter the tutorials.
// They are not meant as production type functions.

(function() {

  /**
   * Wrapped logging function.
   * @param {string} msg The message to log.
   */
  var log = function(msg) {
    if (window.console && window.console.log) {
      window.console.log(msg);
    }
  };

  /**
   * Wrapped logging function.
   * @param {string} msg The message to log.
   */
  var error = function(msg) {
    if (window.console) {
      if (window.console.error) {
        window.console.error(msg);
      }
      else if (window.console.log) {
        window.console.log(msg);
      }
    }
  };

  /**
   * Turn off all logging.
   */
  var loggingOff = function() {
    log = function() {};
    error = function() {};
  };

  /**
   * Check if the page is embedded.
   * @return {boolean} True of we are in an iframe
   */
  var isInIFrame = function() {
    return window != window.top;
  };

  /**
   * Converts a WebGL enum to a string
   * @param {!WebGLContext} gl The WebGLContext to use.
   * @param {number} value The enum value.
   * @return {string} The enum as a string.
   */
  var glEnumToString = function(gl, value) {
    for (var p in gl) {
      if (gl[p] == value) {
        return p;
      }
    }
    return "0x" + value.toString(16);
  };

  /**
   * Creates the HTLM for a failure message
   * @param {string} canvasContainerId id of container of th
   *        canvas.
   * @return {string} The html.
   */
  var makeFailHTML = function(msg) {
    return '' +
      '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
      '<td align="center">' +
      '<div style="display: table-cell; vertical-align: middle;">' +
      '<div style="">' + msg + '</div>' +
      '</div>' +
      '</td></tr></table>';
  };

  /**
   * Mesasge for getting a webgl browser
   * @type {string}
   */
  var GET_A_WEBGL_BROWSER = '' +
    'This page requires a browser that supports WebGL.<br/>' +
    '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

  /**
   * Mesasge for need better hardware
   * @type {string}
   */
  var OTHER_PROBLEM = '' +
    "It doesn't appear your computer can support WebGL.<br/>" +
    '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';

  /**
   * Creates a webgl context. If creation fails it will
   * change the contents of the container of the <canvas>
   * tag to an error message with the correct links for WebGL.
   * @param {Element} canvas. The canvas element to create a
   *     context from.
   * @param {WebGLContextCreationAttirbutes} opt_attribs Any
   *     creation attributes you want to pass in.
   * @return {WebGLRenderingContext} The created context.
   */
  var setupWebGL = function(canvas, opt_attribs) {
    function showLink(str) {
      var container = canvas.parentNode;
      if (container) {
        container.innerHTML = makeFailHTML(str);
      }
    };

    if (!window.WebGLRenderingContext) {
      showLink(GET_A_WEBGL_BROWSER);
      return null;
    }

    var context = create3DContext(canvas, opt_attribs);
    if (!context) {
      showLink(OTHER_PROBLEM);
    }
    return context;
  };

  /**
   * Creates a webgl context.
   * @param {!Canvas} canvas The canvas tag to get context
   *     from. If one is not passed in one will be created.
   * @return {!WebGLContext} The created context.
   */
  var create3DContext = function(canvas, opt_attribs) {
    var names = ["webgl", "experimental-webgl"];
    var context = null;
    for (var ii = 0; ii < names.length; ++ii) {
      try {
        context = canvas.getContext(names[ii], opt_attribs);
      } catch(e) {}
      if (context) {
        break;
      }
    }
    return context;
  }

  var updateCSSIfInIFrame = function() {
    if (isInIFrame()) {
      document.body.className = "iframe";
    }
  };

  /**
   * Gets a WebGL context.
   * makes its backing store the size it is displayed.
   */
  var getWebGLContext = function(canvas) {
    if (isInIFrame()) {
      updateCSSIfInIFrame();

      // make the canvas backing store the size it's displayed.
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    } else {
      var title = document.getElementsByTagName("title")[0].innerText;
      var h1 = document.createElement("h1");
      h1.innerText = title;
      document.body.insertBefore(h1, document.body.children[0]);
    }

    var gl = setupWebGL(canvas);
    return gl;
  };

  /**
   * Loads a shader.
   * @param {!WebGLContext} gl The WebGLContext to use.
   * @param {string} shaderSource The shader source.
   * @param {number} shaderType The type of shader.
   * @param {function(string): void) opt_errorCallback callback for errors.
 * @return {!WebGLShader} The created shader.
   */
  var loadShader = function(gl, shaderSource, shaderType, opt_errorCallback) {
    var errFn = opt_errorCallback || error;
    // Create the shader object
    var shader = gl.createShader(shaderType);

    // Load the shader source
    gl.shaderSource(shader, shaderSource);

    // Compile the shader
    gl.compileShader(shader);

    // Check the compile status
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
      // Something went wrong during compilation; get the error
      lastError = gl.getShaderInfoLog(shader);
      errFn("*** Error compiling shader '" + shader + "':" + lastError);
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  /**
   * Creates a program, attaches shaders, binds attrib locations, links the
   * program and calls useProgram.
   * @param {!Array.<!WebGLShader>} shaders The shaders to attach
   * @param {!Array.<string>} opt_attribs The attribs names.
   * @param {!Array.<number>} opt_locations The locations for the attribs.
   */
  var loadProgram = function(gl, shaders, opt_attribs, opt_locations) {
    var program = gl.createProgram();

    for (var ii = 0; ii < shaders.length; ++ii) {
      gl.attachShader(program, shaders[ii]);
    }
    if (opt_attribs) {
      for (var ii = 0; ii < opt_attribs.length; ++ii) {
        gl.bindAttribLocation(
          program,
          opt_locations ? opt_locations[ii] : ii,
          opt_attribs[ii]);
      }
    }
    gl.linkProgram(program);

    // Check the link status
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
      // something went wrong with the link
      lastError = gl.getProgramInfoLog (program);
      error("Error in program linking:" + lastError);

      gl.deleteProgram(program);
      return null;
    }
    return program;
  };

  /**
   * Loads a shader from a script tag.
   * @param {!WebGLContext} gl The WebGLContext to use.
   * @param {string} scriptId The id of the script tag.
   * @param {number} opt_shaderType The type of shader. If not passed in it will
   *     be derived from the type of the script tag.
   * @param {function(string): void) opt_errorCallback callback for errors.
 * @return {!WebGLShader} The created shader.
   */
  var createShaderFromScript = function(
    gl, scriptId, opt_shaderType, opt_errorCallback) {
    var shaderSource = "";
    var shaderType;
    var shaderScript = document.getElementById(scriptId);
    if (!shaderScript) {
      throw("*** Error: unknown script element" + scriptId);
    }
    shaderSource = shaderScript.text;

    if (!opt_shaderType) {
      if (shaderScript.type == "x-shader/x-vertex") {
        shaderType = gl.VERTEX_SHADER;
      } else if (shaderScript.type == "x-shader/x-fragment") {
        shaderType = gl.FRAGMENT_SHADER;
      } else if (shaderType != gl.VERTEX_SHADER && shaderType != gl.FRAGMENT_SHADER) {
        throw("*** Error: unknown shader type");
        return null;
      }
    }

    return loadShader(
      gl, shaderSource, opt_shaderType ? opt_shaderType : shaderType,
      opt_errorCallback);
  };

  /* export functions */
  this.createProgram = loadProgram;
  this.createShaderFromScriptElement = createShaderFromScript;
  this.getWebGLContext = getWebGLContext;
  this.updateCSSIfInIFrame = updateCSSIfInIFrame;

  /**
   * Provides requestAnimationFrame in a cross browser way.
   */
  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
        return window.setTimeout(callback, 1000/60);
      };
  })();

  /**
   * Provides cancelRequestAnimationFrame in a cross browser way.
   */
  window.cancelRequestAnimFrame = (function() {
    return window.cancelCancelRequestAnimationFrame ||
      window.webkitCancelRequestAnimationFrame ||
      window.mozCancelRequestAnimationFrame ||
      window.oCancelRequestAnimationFrame ||
      window.msCancelRequestAnimationFrame ||
      window.clearTimeout;
  })();

}());


},{}],17:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[2]);
