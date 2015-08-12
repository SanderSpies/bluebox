(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Bluebox = require('../../lib');
var View = Bluebox.Components.View;
var Text = Bluebox.Components.Text;

var TodoItem = Bluebox.create('TodoItem', function render(props) {
  props.onMouseEnter = onMouseEnter;
  props.onMouseLeave = onMouseLeave;
  return View(props, {height: 50, flexDirection: 'row', backgroundColor: props.selected? 'green' : 'black', color: 'white'}, [Text('A todo item...')]);
});

function onMouseEnter(todoItemComponent, e) {
  document.body.style.cursor = 'pointer';
}

function onMouseLeave(todoItemComponent, e) {
  document.body.style.cursor = '';
}

function onTodoItemClick(todoItemComponent, e) {
  todoItemComponent.props.onClick(todoItemComponent, e);
}

module.exports = TodoItem;

},{"../../lib":9}],2:[function(require,module,exports){
'use strict';

var Bluebox = require('../../lib');
var View = Bluebox.Components.View;

var TodoItem = require('./TodoItem');

var TodoList = Bluebox.create('TodoList', function render(props) {
  return View(props, {padding:20, backgroundColor: 'red'}, [
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

},{"../../lib":9,"./TodoItem":1}],3:[function(require,module,exports){
'use strict';

var ObjectPool = require('../utils/ObjectPool');

ObjectPool.prealloc('layout', {width: undefined, height: undefined, top: 0, left: 0, right: 0, bottom: 0}, 1000);
ObjectPool.prealloc('components', {
  customType: null,
  layout: null,
  style: null,
  parent: null,
  type: '',
  props: null,
  children: null,
  lineIndex: 0
}, 1000);
var styleObj = {
  backgroundColor: '',
  color: '',
  margin: '',
  marginLeft: -1,
  marginRight: -1,
  marginTop: -1,
  marginBottom: -1,
  minHeight: -1,
  minWidth: -1,
  padding: '',
  paddingLeft: -1,
  paddingRight: -1,
  paddingTop: -1,
  paddingBottom: -1,
  opacity: 1,
  overflow: 'inherit',
  width: -1,
  height: -1
};
ObjectPool.prealloc('style', styleObj, 1000);
var styleKeys = Object.keys(styleObj);
function merge(parent, child) {
  var childKeys = Object.keys(child);
  for (var i = 0, l = childKeys.length; i < l; i++) {
    var childKey = childKeys[i];
    parent[childKey] = child[childKey];
  }
  return parent;
}

function Component(type, props, style, children) {
  var layout = ObjectPool.getInstance('layout');
  var component = ObjectPool.getInstance('components');
  var baseStyle = ObjectPool.getInstance('style');
  component.layout = layout;
  component.style = style ? merge(baseStyle, style) : baseStyle;
  component.type = type;
  component.props = props;
  component.children = children;

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    if (child.type) {
      child.parent = component;
    }
  }
  return component;
}

module.exports = Component;

},{"../utils/ObjectPool":22}],4:[function(require,module,exports){
'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./C');

var Image = Bluebox.create('image', function render(props, style, children) {
  return C('image', props, style, []);
});

module.exports = Image;

},{"./../../lib/index":9,"./C":3}],5:[function(require,module,exports){
'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./C');

var Text = Bluebox.create('text', function(props, style, children) {
    return C('text', {}, null, [props]);
});

module.exports = Text;

},{"./../../lib/index":9,"./C":3}],6:[function(require,module,exports){
'use strict';

var Bluebox = require('./../../lib/index');
var C = require('./C');

var View = Bluebox.create('view', function render(props, style, children) {
  return C('view', props, style, children || []);
});

module.exports = View;

},{"./../../lib/index":9,"./C":3}],7:[function(require,module,exports){
'use strict';

var handleEvents = require('../events/handleEvents');
var handleEvent = handleEvents.handleEvent;

var isArray = Array.isArray;
var keys = Object.keys;
var BIG_ARRAY = 100;

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

function handleProperty(newNode, oldNode, newNodeKeys, i, isDifferent, parent, oldParent) {
  var key = newNodeKeys[i];
  if (key !== 'layout' && key !== 'parent') {
    var newValue = newNode[key];
    var oldValue = oldNode[key];
    if (newNode.props) {
      addEventListeners(newNode, oldNode);
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
      var length = newValue.length;
      var isEligible = false;
      if (length > BIG_ARRAY) {
        var flexDirection = newNode.props.style.flexDirection;
        isEligible = true;
        if (!flexDirection) {
          flexDirection = 'column';
        }
        var style = newValue[0].props.style;

        for (var i = 1, l = length; i < l; i++) {
          var otherStyle = newValue[i].props.style;
          if (otherStyle !== style) {
            isEligible = false;
            break;
          }
        }
      }

      //  TODO: if (!isEligible) {
      for (var k = 0, j = newValue.length; k < j; k++) {
        var __ret = handleChildItem(oldNode, newValue, k, oldValue, isDifferent, skipKeys, keyMap, newNode);
        isDifferent = isDifferent || __ret.isDifferent;
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

  return {
    isDifferent: isDifferent
  };
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
      isDifferent = isDifferent || handleProperty(newNode, oldNode, newNodeKeys, i, isDifferent, parent, oldParent).isDifferent  ;
    }
  }

  return isDifferent;
}

function addEventListeners(node, oldNode) {
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
        addEventListeners(node.children[i], oldNode ? oldNode.children[i]: null);
      }
    }
  }
}

function diff(newNode, oldNode, parent, oldParent, direction) {
  var isDifferent = false;
  if (newNode === oldNode) {
    return oldNode;
  }
  if (!oldNode || !newNode) {
    if (newNode) {

      addEventListeners(newNode);
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
    isDifferent = isDifferent || diffArray(newNode, oldNode, parent, oldParent, direction);
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

},{"../events/handleEvents":8}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
'use strict';

var diff            = require('./diff/diff');
var layoutNode      = require('./layout/layoutNode');
var renderer        = require('./renderers/GL/renderer');
var ViewPortHelper  = require('./renderers/DOM/ViewPortHelper');
var oldComponentTree    = null;
var oldDOMElement       = null;
var viewPortDimensions  = null;
var registeredComponentTypes = {};
var keys = Object.keys;

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
      newComponentTree = layoutNode(newComponentTree, oldComponentTree, true, viewPortDimensions.width, viewPortDimensions.height, 'ltr');
    }
    if (newComponentTree !== oldComponentTree || hasChanged) {
      viewPortDimensions = ViewPortHelper.getDimensions();
    }

    renderer(domElement, newComponentTree, oldComponentTree, null, 0, viewPortDimensions, 0, 0);

    oldComponentTree = newComponentTree;
    return newComponentTree;
  }

};

module.exports = Bluebox;

Bluebox.Components.View = require('./components/View');
Bluebox.Components.Text = require('./components/Text');
Bluebox.Components.Image = require('./components/Image');



},{"./components/Image":4,"./components/Text":5,"./components/View":6,"./diff/diff":7,"./layout/layoutNode":17,"./renderers/DOM/ViewPortHelper":18,"./renderers/GL/renderer":20}],10:[function(require,module,exports){
'use strict';

var CSSAlign = {
  AUTO:       '',
  FLEX_START: 'flex-start',
  CENTER:     'center',
  FLEX_END:   'flex-end',
  STRETCH:    'stretch'
};

module.exports = CSSAlign;

},{}],11:[function(require,module,exports){
'use strict';

var CSSConstants = {
  UNDEFINED: undefined
};

module.exports = CSSConstants;

},{}],12:[function(require,module,exports){
'use strict';

var CSSDirection = {
  INHERIT: 'inherit',
  LTR: 'ltr',
  RTL: 'rtl'
};

module.exports = CSSDirection;


},{}],13:[function(require,module,exports){
'use strict';

var CSSFlexDirection = {
  COLUMN: 'column',
  COLUMN_REVERSE: 'column-reverse',
  ROW: 'row',
  ROW_REVERSE: 'row-reverse'
};

module.exports = CSSFlexDirection;
},{}],14:[function(require,module,exports){
'use strict';

var CSSJustify = {
  FLEX_START: 'flex-start',
  CENTER: 'center',
  FLEX_END: 'flex-end',
  SPACE_BETWEEN: 'space-between',
  SPACE_AROUND: 'space-around'
};

module.exports = CSSJustify;

},{}],15:[function(require,module,exports){
'use strict';

var CSSPositionType = {
  RELATIVE: 'relative',
  ABSOLUTE: 'absolute'
};

module.exports = CSSPositionType;

},{}],16:[function(require,module,exports){
'use strict';

var CSSWrap = {
  NOWRAP: 'nowrap',
  WRAP: 'wrap'
};

module.exports = CSSWrap;
},{}],17:[function(require,module,exports){
/**
 * @flow
 */
'use strict';

var CSSAlign = require('./CSSAlign');
var CSSConstants = require('./CSSConstants');
var CSSDirection = require('./CSSDirection');
var CSSFlexDirection = require('./CSSFlexDirection');
var CSSJustify = require('./CSSJustify');
var CSSPositionType = require('./CSSPositionType');
var CSSWrap = require('./CSSWrap');

var POSITION_INDEX = {
  TOP: 'top',
  LEFT: 'left',
  BOTTOM: 'bottom',
  RIGHT: 'right',
  START: 'left',
  END: 'right'
};

var DIMENSION_INDEX = {
  WIDTH: 'width',
  HEIGHT: 'height'
};

function fmaxf(a, b) {
  if (a > b) {
    return a;
  }
  return b;
}

function setLayoutPosition(node, position, value) {
  if (position === POSITION_INDEX.TOP) {
    if (value === 200) {
      debugger;
    }
    node.layout.top = value;
  }
  else if (position === POSITION_INDEX.LEFT) {
    node.layout.left = value;
  }
  else if (position === POSITION_INDEX.RIGHT) {
    node.layout.right = value;
  }
  else if (position === POSITION_INDEX.BOTTOM) {
    node.layout.bottom = value;
  }
  else {
    throw new Error('should not happen');
  }
}

function getLayoutPosition(node, position) {
  if (position === POSITION_INDEX.TOP) {
    return node.layout.top;
  }
  else if (position === POSITION_INDEX.LEFT) {
    return node.layout.left;
  }
  else if (position === POSITION_INDEX.RIGHT) {
    return node.layout.right;
  }
  else if (position === POSITION_INDEX.BOTTOM) {
    return node.layout.bottom;
  }
  else {
    throw new Error('should not happen');
  }
}

function setLayoutDimension(node, dimension, value) {
  if (dimension === DIMENSION_INDEX.WIDTH) {
    node.layout.width = value;
  }
  else if (dimension === DIMENSION_INDEX.HEIGHT) {
    node.layout.height = value;

  }
  else {
    throw new Error('should not happen');
  }

}

function getLayoutDimension(node, dimension) {
  if (dimension === DIMENSION_INDEX.WIDTH) {
    return node.layout.width;
  }
  else if (dimension === DIMENSION_INDEX.HEIGHT) {
    return node.layout.height;
  }
  throw new Error('should not happen');
}

function setLayoutDirection(node, direction) {
  node.layout.direction = direction;
}

function getStylePosition(node, position) {
  if (!node || !node.style) {
    return 0;
  }
  if (position === POSITION_INDEX.TOP) {
    return node.style.top;
  }
  else if (position === POSITION_INDEX.LEFT) {
    return node.style.left;
  }
  else if (position === POSITION_INDEX.RIGHT) {
    return node.style.right;
  }
  else if (position === POSITION_INDEX.BOTTOM) {
    return node.style.bottom;
  }
}

function getStyleDimension(node, dimension) {
  if (dimension === DIMENSION_INDEX.WIDTH) {
    return node.style.width;
  }
  else if (dimension === DIMENSION_INDEX.HEIGHT) {
    return node.style.height;
  }
  throw new Error('should not happen');
}

var leading = {
  column: POSITION_INDEX.TOP,
  'column-reverse': POSITION_INDEX.BOTTOM,
  row: POSITION_INDEX.LEFT,
  'row-reverse': POSITION_INDEX.RIGHT
};

var trailing = {
  column: POSITION_INDEX.BOTTOM,
  'column-reverse': POSITION_INDEX.TOP,
  row: POSITION_INDEX.RIGHT,
  'row-reverse': POSITION_INDEX.LEFT
};

var pos = leading;

var dim = {
  column: DIMENSION_INDEX.HEIGHT,
  'column-reverse': DIMENSION_INDEX.HEIGHT,
  row: DIMENSION_INDEX.WIDTH,
  'row-reverse': DIMENSION_INDEX.WIDTH
};

function isDimDefined(node, axis) {
  var value = getStyleDimension(node, dim[axis]);
  return value && value > 0;
}

function isPosDefined(node, position) {
  return getStylePosition(node, position) !== undefined;
}

function getPosition(node, position) {
  var pos = getStylePosition(node, position);
  return pos === undefined ? 0 : pos;
}

function getMarginTop(node) {
  return node.style.marginTop !== -1 ? node.style.marginTop : getDimension(node.style.margin).top;
}

function getMarginLeft(node) {
  return node.style.marginLeft !== -1 ? node.style.marginLeft : getDimension(node.style.margin).left;
}

function getMarginRight(node) {
  return node.style.marginRight !== -1 ? node.style.marginRight : getDimension(node.style.margin).right;
}

function getMarginBottom(node) {
  return node.style.marginBottom !== -1 ? node.style.marginBottom : getDimension(node.style.margin).bottom;
}

function getMargin(node, position) {
  if (position === POSITION_INDEX.TOP) {
    return getMarginTop(node);
  }
  else if (position === POSITION_INDEX.LEFT) {
    return getMarginLeft(node);
  }
  else if (position === POSITION_INDEX.RIGHT) {
    return getMarginRight(node);
  }
  else if (position === POSITION_INDEX.BOTTOM) {
    return getMarginBottom(node);
  }
  throw new Error('should not happen');
}

function getLeadingMargin(node, axis) {
  if (isRowDirection(axis)) {
    var leadingMargin = getMargin(node, POSITION_INDEX.START);
    if (leadingMargin !== undefined) {
      return leadingMargin;
    }
  }

  return getMargin(node, leading[axis]) || 0;
}

function getTrailingMargin(node, axis) {
  if (isRowDirection(axis)) {
    var leadingMargin = getMargin(node, POSITION_INDEX.END);
    if (leadingMargin !== undefined) {
      return leadingMargin;
    }
  }

  return getMargin(node, trailing[axis]) || 0;
}

function getDimension(obj) {
  if (!obj || obj === '') {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0};
  }

  if (typeof obj === 'number') {
    return {
      top: obj,
      right: obj,
      bottom: obj,
      left: obj
    };
  }

  var items = obj.split(' ');
  if (items.length === 1) {
    return {
      top: parseInt(items[0], 10),
      right: parseInt(items[0], 10),
      bottom: parseInt(items[0], 10),
      left: parseInt(items[0], 10)
    }
  }
  else if (items.length === 2) {
    return {
      top: parseInt(items[0], 10),
      right: parseInt(items[1], 10),
      bottom: parseInt(items[0], 10),
      left: parseInt(items[1], 10)
    }
  }
  else if (items.length === 3) {
    return {
      top: parseInt(items[0], 10),
      right: parseInt(items[1], 10),
      bottom: parseInt(items[2], 10),
      left: parseInt(items[1], 10)
    }
  }
  else if (items.length === 4) {
    return {
      top: parseInt(items[0], 10),
      right: parseInt(items[1], 10),
      bottom: parseInt(items[2], 10),
      left: parseInt(items[3], 10)
    }
  }

}

function getPaddingTop(node) {
  return  node.style.paddingTop !== -1 ? node.style.paddingTop : getDimension(node.style.padding).top;
}

function getPaddingBottom(node) {
  return  node.style.paddingBottom !== -1 ? node.style.paddingBottom : getDimension(node.style.padding).bottom;
}

function getPaddingLeft(node) {
  return  node.style.paddingLeft !== -1 ? node.style.paddingLeft : getDimension(node.style.padding).left;
}

function getPaddingRight(node) {
  return  node.style.paddingRight !== -1 ? node.style.paddingRight : getDimension(node.style.padding).right;
}

function getPadding(node, position) {
  if (position === POSITION_INDEX.TOP) {
    return getPaddingTop(node);
  }
  else if (position === POSITION_INDEX.LEFT) {
    return getPaddingLeft(node);
  }
  else if (position === POSITION_INDEX.RIGHT) {
    return getPaddingRight(node);
  }
  else if (position === POSITION_INDEX.BOTTOM) {
    return getPaddingBottom(node);
  }
  throw new Error('should not happen');
}

function getLeadingPadding(node, axis) {
  if (isRowDirection(axis)) {
    var leadingPadding = getPadding(node, POSITION_INDEX.START);
    if (leadingPadding !== undefined) {
      return leadingPadding;
    }
  }

  return getPadding(node, leading[axis]) || 0;
}

function getTrailingPadding(node, axis) {
  if (isRowDirection(axis)) {
    var trailingPadding = getPaddingRight(node);
    if (trailingPadding !== undefined) {
      return trailingPadding;
    }
  }

  return getPadding(node, trailing[axis]) || 0;
}

function getBorderTop(node) {
  return  node.style.borderTop !== -1 ? node.style.borderTop : getDimension(node.style.border).top;
}

function getBorderBottom(node) {
  return  node.style.borderBottom !== -1 ? node.style.borderBottom : getDimension(node.style.border).bottom;
}

function getBorderLeft(node) {
  return  node.style.borderLeft !== -1 ? node.style.borderLeft : getDimension(node.style.border).left;
}

function getBorderRight(node) {
  return  node.style.borderRight !== -1 ? node.style.borderRight : getDimension(node.style.border).right;
}

function getBorder(node, position) {
  if (position === POSITION_INDEX.TOP) {
    return getBorderTop(node);
  }
  else if (position === POSITION_INDEX.BOTTOM) {
    return getBorderBottom(node);
  }
  else if (position === POSITION_INDEX.LEFT) {
    return getBorderLeft(node);
  }
  else if (position === POSITION_INDEX.RIGHT) {
    return getBorderRight(node);
  }
}

function getLeadingBorder(node, axis) {
  if (isRowDirection(axis)) {
    var leadingBorder = getBorderLeft(node);
    if (leadingBorder !== undefined) {
      return leadingBorder;
    }
  }
  return getBorder(node, leading[axis]) || 0;
}

function getTrailingBorder(node, axis) {
  if (isRowDirection(axis)) {
    var trailingBorder = getBorderRight(node);
    if (trailingBorder !== undefined) {
      return trailingBorder;
    }
  }

  return getBorder(node, trailing[axis]) || 0;
}

function getLeadingPaddingAndBorder(node, axis) {
  return getLeadingPadding(node, axis) + getLeadingBorder(node, axis);
}

function getTrailingPaddingAndBorder(node, axis) {
  return getTrailingPadding(node, axis) + getTrailingBorder(node, axis);
}

function getBorderAxis(node, axis) {
  return getLeadingBorder(node, axis) + getTrailingBorder(node, axis);
}

function getMarginAxis(node, axis) {
  return getLeadingMargin(node, axis) + getTrailingMargin(node, axis);
}

function getPaddingAndBorderAxis(node, axis) {
  return getLeadingPaddingAndBorder(node, axis) + getTrailingPaddingAndBorder(node, axis);
}

function boundAxis(node, axis, value) {
  var min = undefined;
  var max = undefined;
  if ( node.style) {
    if (isColumnDirection(axis)) {
      min = node.style.minHeight;
      max = node.style.maxHeight;
    }
    else if (isRowDirection(axis)) {
      min = node.style.minWidth;
      max = node.style.maxWidth;
    }
  }

  var boundValue = value;

  if (max !== undefined && max > 0 && boundValue > max) {
    boundValue = max;
  }

  if (min !== undefined && min > 0 && boundValue < min) {
    boundValue = min;
  }

  return boundValue;
}

function setDimensionFromStyle(node, axis) {
  if (getLayoutDimension(node, dim[axis]) !== undefined) {
    return;
  }

  if (!isDimDefined(node, axis)) {
    return;
  }

  var maxLayoutDimension = fmaxf(boundAxis(node, axis, getStyleDimension(node, dim[axis])),
    getPaddingAndBorderAxis(node, axis));
  setLayoutDimension(node, dim[axis], maxLayoutDimension);
}

function setTrailingPosition(node, child, axis) {
  setLayoutPosition(node,
    trailing[axis],
    (getLayoutDimension(node, dim[axis]) || 0) -
    (getLayoutDimension(child, dim[axis]) || 0) -
    getLayoutPosition(child, pos[axis]));
}

function getRelativePosition(node, axis) {
  var lead = getStylePosition(node, leading[axis]);
  if (lead !== undefined) {
    return lead;
  }
  return -getPosition(node, trailing[axis]);
}

function getFlex(node) {
  return  node.style ? node.style.flex : undefined;
}

function isRowDirection(flexDirection) {
  return flexDirection === CSSFlexDirection.ROW || flexDirection === CSSFlexDirection.ROW_REVERSE;
}

function isColumnDirection(flexDirection) {
  return flexDirection === CSSFlexDirection.COLUMN || flexDirection === CSSFlexDirection.COLUMN_REVERSE;
}

function resolveAxis(axis, direction) {
  if (direction === CSSDirection.RTL) {
    if (axis === CSSFlexDirection.ROW) {
      return CSSFlexDirection.ROW_REVERSE;
    }
    else if (axis === CSSFlexDirection.ROW_REVERSE) {
      return CSSFlexDirection.ROW;
    }
  }
  return axis;
}

function resolveDirection(node, parentDirection) {
  var direction = parentDirection || CSSDirection.INHERIT;
    var style = node.style;
    if ('direction' in style) {
      direction = style.direction;
    }

  return direction;
}

function getFlexDirection(node) {
  return  node.style && 'flexDirection' in node.style ? node.style.flexDirection : CSSFlexDirection.COLUMN;
}

function getCrossFlexDirection(flexDirection, direction) {
  if (isColumnDirection(flexDirection)) {
    return resolveAxis(CSSFlexDirection.ROW, direction);
  }
  return CSSFlexDirection.COLUMN;
}

function getPositionType(node) {
  return  node.style && 'position' in node.style ? node.style.position : 'relative'
}

function getAlignItem(node, child) {
  if (child.style.alignSelf !== CSSAlign.AUTO) {
    return child.style.alignSelf;
  }
  return  node.style ? node.style.alignItems : 'stretch';
}

function getAlignContent(node) {
  return  node.style ? node.style.alignContent : 'flex-start';
}

function getJustifyContent(node) {
  return  node.style ? node.style.justifyContent : 'flex-start';
}

function isFlexWrap(node) {
  return  node.style && node.style.flexWrap === CSSWrap.WRAP;
}

function isFlex(node) {
  return getPositionType(node) === CSSPositionType.RELATIVE && getFlex(node) > 0;
}

function isMeasureDefined(node) {
  // WAT
}

function getDimWithMargin(node, axis) {
  return getLayoutDimension(node, dim[axis]) +
    getLeadingMargin(node, axis) +
    getTrailingMargin(node, axis);
}

function cloneObject(node) {
  var result = {};
  var keys = Object.keys(node);
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    result[key] = node[key];
  }
  return result;
}




function getChildCount(node) {
  return node.children.length;
}

function getChildAt(node, i) {
  return node.children[i];
}

function layoutNode(node, oldNode, parentWidthChanged, parentMaxWidth, parentMaxHeight, parentDirection) {

    node.layout.width = undefined;
    node.layout.height = undefined;
    node.layout.top = 0;
    node.layout.left = 0;
    node.layout.right = 0;
    node.layout.bottom = 0;

    var hasOnlyTextChildren = true;
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      if (typeof child !== 'string') {
        hasOnlyTextChildren = false;
        break;
      }
    }


    // alright, we really need to recalculate the layout...
    var direction = resolveDirection(node, parentDirection);
    var mainAxis = resolveAxis(getFlexDirection(node), direction);
    var crossAxis = getCrossFlexDirection(mainAxis, direction);
    var resolvedRowAxis = resolveAxis(CSSFlexDirection.ROW, direction);

    setDimensionFromStyle(node, mainAxis);
    setDimensionFromStyle(node, crossAxis);

    setLayoutDirection(node, direction);

    // The position is set by the parent, but we need to complete it with a
    // delta composed of the margin and left/top/right/bottom
    var leadingMainAxis = leading[mainAxis];
    var leadingCrossAxis = leading[crossAxis];
    var trailingMainAxis = trailing[mainAxis];
    var trailingCrossAxis = trailing[crossAxis];
    var mainRelativePosition = getRelativePosition(node, mainAxis);
    var crossRelativePosition = getRelativePosition(node, crossAxis);
    setLayoutPosition(node, leadingMainAxis, getLayoutPosition(node, leadingMainAxis) + getLeadingMargin(node, mainAxis) +
    mainRelativePosition);
    setLayoutPosition(node, trailingMainAxis, getLayoutPosition(node, trailingMainAxis) + getTrailingMargin(node, mainAxis) +
    mainRelativePosition);
    setLayoutPosition(node, leadingCrossAxis, getLayoutPosition(node, leadingCrossAxis) + getLeadingMargin(node, crossAxis) +
    crossRelativePosition);
    setLayoutPosition(node, trailingCrossAxis, getLayoutPosition(node, trailingCrossAxis) + getTrailingMargin(node, crossAxis) +
    crossRelativePosition);

    //if (isMeasureDefined(node)) {
    var width = CSSConstants.UNDEFINED;
    if (isDimDefined(node, resolvedRowAxis)) {
      width = node.style.width;
    }
    else if (getLayoutDimension(node, dim[resolvedRowAxis]) !== undefined) {
      width = getLayoutDimension(node, dim[resolvedRowAxis]);
    }
    else {
      width = parentMaxWidth -
        getMarginAxis(node, resolvedRowAxis);
    }
    width -= getPaddingAndBorderAxis(node, resolvedRowAxis);

    // We only need to give a dimension for the text if we haven't got any
    // for it computed yet. It can either be from the style attribute or because
    // the element is flexible.
    var isRowUndefined = !isDimDefined(node, resolvedRowAxis) &&
      getLayoutDimension(node, dim[resolvedRowAxis]) === undefined;
    var isColumnUndefined = !isDimDefined(node, CSSFlexDirection.COLUMN) &&
      getLayoutDimension(node, dim[CSSFlexDirection.COLUMN]) === undefined;

    // Let's not measure the text if we already know both dimensions
    if (isRowUndefined || isColumnUndefined) {

      if (isRowUndefined) {
        node.layout.width = width +
          getPaddingAndBorderAxis(node, resolvedRowAxis);
      }
    }

    // }

    var i;
    var ii;
    var child;
    var axis;

    // Pre-fill some dimensions straight from the parent
    //console.log('A loop through children:', node.children);
    if (!hasOnlyTextChildren) {
      var childCount = getChildCount(node);
      for (i = 0; i < childCount; ++i) {
        child = getChildAt(node, i);
        if (typeof child === 'string') {
          continue;
        }
        // Pre-fill cross axis dimensions when the child is using stretch before
        // we call the recursive layout pass
        var crossAxisDim = dim[crossAxis];
        var layoutDimensionCrossAxis = getLayoutDimension(node, crossAxisDim);
        var childPositionType = getPositionType(child);
        if (getAlignItem(node, child) === CSSAlign.STRETCH &&
          childPositionType === CSSPositionType.RELATIVE &&
          layoutDimensionCrossAxis !== undefined && !isDimDefined(child, crossAxis)) {
          setLayoutDimension(child, crossAxisDim, fmaxf(
            boundAxis(child, crossAxis, layoutDimensionCrossAxis -
            getPaddingAndBorderAxis(node, crossAxis) -
            getMarginAxis(child, crossAxis)),
            // You never want to go smaller than padding
            getPaddingAndBorderAxis(child, crossAxis)
          ));
        }
        else if (childPositionType === CSSPositionType.ABSOLUTE) {
          // Pre-fill dimensions when using absolute position and both offsets for the axis are defined (either both
          // left and right or top and bottom).
          for (ii = 0; ii < 2; ii++) {
            axis = (ii !== 0) ? CSSFlexDirection.ROW : CSSFlexDirection.COLUMN;
            if (getLayoutDimension(node, dim[axis]) !== undefined && !isDimDefined(child, axis) &&
              isPosDefined(child, leading[axis]) &&
              isPosDefined(child, trailing[axis])) {
              setLayoutDimension(child, dim[axis], fmaxf(
                boundAxis(child, axis, getLayoutDimension(node, dim[axis]) -
                getPaddingAndBorderAxis(node, axis) -
                getMarginAxis(child, axis) -
                getPosition(child, leading[axis]) -
                getPosition(child, trailing[axis])),
                // You never want to go smaller than padding
                getPaddingAndBorderAxis(child, axis)
              ));
            }
          }
        }
      }
    }
    var definedMainDim = CSSConstants.UNDEFINED;
    if (getLayoutDimension(node, dim[mainAxis]) !== undefined) {
      definedMainDim = getLayoutDimension(node, dim[mainAxis]) -
      getPaddingAndBorderAxis(node, mainAxis);
    }

    // We want to execute the next two loops one per line with flex-wrap
    var startLine = 0;
    var endLine = 0;
    // var nextOffset = 0;
    var alreadyComputedNextLayout = 0;
    // We aggregate the total dimensions of the container in those two variables
    var linesCrossDim = 0;
    var linesMainDim = 0;
    var linesCount = 0;

    if (!hasOnlyTextChildren) {
      while (endLine < getChildCount(node)) {

        // <Loop A> Layout non flexible children and count children by type

        // mainContentDim is accumulation of the dimensions and margin of all the
        // non flexible children. This will be used in order to either set the
        // dimensions of the node if none already exist, or to compute the
        // remaining space left for the flexible children.
        var mainContentDim = 0;

        // There are three kind of children, non flexible, flexible and absolute.
        // We need to know how many there are in order to distribute the space.
        var flexibleChildrenCount = 0;
        var totalFlexible = 0;
        var nonFlexibleChildrenCount = 0;

        var maxWidth;
        for (i = startLine; i < getChildCount(node); ++i) {
          child = getChildAt(node, i);
          if (typeof child === 'string') {
            endLine = i + 1;
            break;
          }
          var nextContentDim = 0;

          // It only makes sense to consider a child flexible if we have a computed
          // dimension for the node.
          if (getLayoutDimension(node, dim[mainAxis]) !== undefined && isFlex(child)) {
            flexibleChildrenCount++;
            totalFlexible = totalFlexible + getFlex(child);

            // Even if we don't know its exact size yet, we already know the padding,
            // border and margin. We'll use this partial information, which represents
            // the smallest possible size for the child, to compute the remaining
            // available space.
            nextContentDim = getPaddingAndBorderAxis(child, mainAxis) +
            getMarginAxis(child, mainAxis);

          }
          else {
            maxWidth = CSSConstants.UNDEFINED;
            if (!isRowDirection(mainAxis)) {
              maxWidth = parentMaxWidth -
              getMarginAxis(node, resolvedRowAxis) -
              getPaddingAndBorderAxis(node, resolvedRowAxis);

              if (isDimDefined(node, resolvedRowAxis)) {
                maxWidth = getLayoutDimension(node, dim[resolvedRowAxis]) -
                getPaddingAndBorderAxis(node, resolvedRowAxis);
              }
            }
            var maxHeight = 1; // TODO
            // This is the main recursive call. We layout non flexible children.
            if (alreadyComputedNextLayout === 0) {
              node.children[i] = layoutNode(child, oldNode && oldNode.children ? getChildAt(oldNode, i) : null, oldNode ? node.layout.width !== oldNode.layout.width : true, maxWidth, maxHeight, direction);
            }

            // Absolute positioned elements do not take part of the layout, so we
            // don't use them to compute mainContentDim
            if (getPositionType(child) === CSSPositionType.RELATIVE) {
              nonFlexibleChildrenCount++;
              // At this point we know the final size and margin of the element.
              nextContentDim = getDimWithMargin(child, mainAxis);
            }
          }

          // The element we are about to add would make us go to the next line
          if (isFlexWrap(node) &&
            getLayoutDimension(node, dim[mainAxis]) !== undefined &&
            mainContentDim + nextContentDim > definedMainDim &&
              // If there's only one element, then it's bigger than the content
              // and needs its own line
            i !== startLine) {
            nonFlexibleChildrenCount--;
            alreadyComputedNextLayout = 1;
            break;
          }
          alreadyComputedNextLayout = 0;
          mainContentDim = mainContentDim + nextContentDim;
          endLine = i + 1;
        }

        // <Loop B> Layout flexible children and allocate empty space

        // In order to position the elements in the main axis, we have two
        // controls. The space between the beginning and the first element
        // and the space between each two elements.
        var leadingMainDim = 0;
        var betweenMainDim = 0;

        // The remaining available space that needs to be allocated
        var remainingMainDim = 0;
        if (getLayoutDimension(node, dim[mainAxis]) !== undefined) {
          remainingMainDim = definedMainDim - mainContentDim;
        }
        else {
          remainingMainDim = fmaxf(mainContentDim, 0) - mainContentDim;
        }

        // If there are flexible children in the mix, they are going to fill the
        // remaining space
        if (flexibleChildrenCount !== 0) {
          var flexibleMainDim = remainingMainDim / totalFlexible;
          var baseMainDim;
          var boundMainDim;

          // Iterate over every child in the axis. If the flex share of remaining
          // space doesn't meet min/max bounds, remove this child from flex
          // calculations.
          for (i = startLine; i < endLine; ++i) {
            child = getChildAt(node, i);

            if (isFlex(child)) {
              baseMainDim = flexibleMainDim * getFlex(child) +
              getPaddingAndBorderAxis(child, mainAxis);
              boundMainDim = boundAxis(child, mainAxis, baseMainDim);

              if (baseMainDim !== boundMainDim) {
                remainingMainDim -= boundMainDim;
                totalFlexible -= getFlex(child);
              }
            }
          }
          flexibleMainDim = remainingMainDim / totalFlexible;

          // The non flexible children can overflow the container, in this case
          // we should just assume that there is no space available.
          if (flexibleMainDim < 0) {
            flexibleMainDim = 0;
          }
          // We iterate over the full array and only apply the action on flexible
          // children. This is faster than actually allocating a new array that
          // contains only flexible children.
          for (i = startLine; i < endLine; ++i) {
            child = getChildAt(node, i);

            if (typeof child === 'string') {
              continue;
            }

            if (isFlex(child)) {
              // At this point we know the final size of the element in the main
              // dimension
              setLayoutDimension(child, dim[mainAxis], boundAxis(child, mainAxis,
                flexibleMainDim * getFlex(child) + getPaddingAndBorderAxis(child, mainAxis)
              ));

              maxWidth = CSSConstants.UNDEFINED;
              if (isDimDefined(node, resolvedRowAxis)) {
                maxWidth = getLayoutDimension(node, dim[resolvedRowAxis]) -
                getPaddingAndBorderAxis(node, resolvedRowAxis);
              }
              else if (!isRowDirection(mainAxis)) {
                maxWidth = parentMaxWidth -
                getMarginAxis(node, resolvedRowAxis) -
                getPaddingAndBorderAxis(node, resolvedRowAxis);
              }

              // And we recursively call the layout algorithm for this child
              //debugger;
              //var top = node.layout.top;
              //var left = node.layout.left;

              node.children[i] = layoutNode(child, oldNode ? getChildAt(oldNode, i) : null, oldNode ? node.layout.width !== oldNode.layout.width : true, maxWidth, maxHeight, direction);
            }
          }

          // We use justifyContent to figure out how to allocate the remaining
          // space available
        }
        else {
          var justifyContent = getJustifyContent(node);
          if (justifyContent === CSSJustify.CENTER) {
            leadingMainDim = remainingMainDim / 2;
          }
          else if (justifyContent === CSSJustify.FLEX_END) {
            leadingMainDim = remainingMainDim;
          }
          else if (justifyContent === CSSJustify.SPACE_BETWEEN) {
            remainingMainDim = fmaxf(remainingMainDim, 0);
            if (flexibleChildrenCount + nonFlexibleChildrenCount - 1 !== 0) {
              betweenMainDim = remainingMainDim /
              (flexibleChildrenCount + nonFlexibleChildrenCount - 1);
            }
            else {
              betweenMainDim = 0;
            }
          }
          else if (justifyContent === CSSJustify.SPACE_AROUND) {
            // Space on the edges is half of the space between elements
            betweenMainDim = remainingMainDim /
            (flexibleChildrenCount + nonFlexibleChildrenCount);
            leadingMainDim = betweenMainDim / 2;
          }
        }

        // <Loop C> Position elements in the main axis and compute dimensions

        // At this point, all the children have their dimensions set. We need to
        // find their position. In order to do that, we accumulate data in
        // variables that are also useful to compute the total dimensions of the
        // container!
        var crossDim = 0;
        //debugger;
        var mainDim = leadingMainDim +
          getLeadingPaddingAndBorder(node, mainAxis);

        //console.log('mainDim:', mainDim);

        for (i = startLine; i < endLine; ++i) {
          child = getChildAt(node, i);
          if (typeof child === 'string') {
            break;
          }
          child.lineIndex = linesCount;

          var leadingMainAxisChild = leading[mainAxis];
          var posMainAxisChild = pos[mainAxis];
          var posTypeChild = getPositionType(child);
          if (posTypeChild === CSSPositionType.ABSOLUTE &&
            isPosDefined(child, leadingMainAxisChild)) {
            // In case the child is position absolute and has left/top being
            // defined, we override the position to whatever the user said
            // (and margin/border).
            setLayoutPosition(child, posMainAxisChild, getPosition(child, leadingMainAxisChild) +
            getLeadingBorder(node, mainAxis) +
            getLeadingMargin(child, mainAxis));
          }
          else {
            // If the child is position absolute (without top/left) or relative,
            // we put it at the current accumulated offset.
            setLayoutPosition(child, posMainAxisChild, getLayoutPosition(child, posMainAxisChild) + mainDim);

            // Define the trailing position accordingly.
            if (getLayoutDimension(node, dim[mainAxis]) !== undefined) {
              setTrailingPosition(node, child, mainAxis);
            }
          }

          // Now that we placed the element, we need to update the variables
          // We only need to do that for relative elements. Absolute elements
          // do not take part in that phase.
          if (posTypeChild === CSSPositionType.RELATIVE) {
            //console.log('new main dim:', mainDim, betweenMainDim, getDimWithMargin(child, mainAxis));
            // The main dimension is the sum of all the elements dimension plus
            // the spacing.
            mainDim = mainDim + betweenMainDim + getDimWithMargin(child, mainAxis);
            // The cross dimension is the max of the elements dimension since there
            // can only be one element in that cross dimension.
            crossDim = fmaxf(crossDim, boundAxis(child, crossAxis, getDimWithMargin(child, crossAxis)));
          }
        }

        var containerCrossAxis = getLayoutDimension(node, dim[crossAxis]);
        if (containerCrossAxis === undefined) {
          containerCrossAxis = fmaxf(
            // For the cross dim, we add both sides at the end because the value
            // is aggregate via a max function. Intermediate negative values
            // can mess this computation otherwise
            boundAxis(node, crossAxis, crossDim + getPaddingAndBorderAxis(node, crossAxis)),
            getPaddingAndBorderAxis(node, crossAxis)
          );
        }

        // <Loop D> Position elements in the cross axis

        for (i = startLine; i < endLine; ++i) {
          child = getChildAt(node, i);

          if (typeof child === 'string') {
            break;
          }
          var childPosition = getPositionType(child);
          if (childPosition === CSSPositionType.ABSOLUTE &&
            isPosDefined(child, leading[crossAxis])) {
            // In case the child is absolutely positionned and has a
            // top/left/bottom/right being set, we override all the previously
            // computed positions to set it correctly.
            setLayoutPosition(child, pos[crossAxis], getPosition(child, leading[crossAxis]) +
            getLeadingBorder(node, crossAxis) +
            getLeadingMargin(child, crossAxis));

          }
          else {
            var leadingCrossDim = getLeadingPaddingAndBorder(node, crossAxis);

            // For a relative children, we're either using alignItems (parent) or
            // alignSelf (child) in order to determine the position in the cross axis
            if (childPosition === CSSPositionType.RELATIVE) {
              var alignItem = getAlignItem(node, child);
              if (alignItem === CSSAlign.STRETCH) {
                // You can only stretch if the dimension has not already been set
                // previously.
                if (!isDimDefined(child, crossAxis)) {
                  setLayoutDimension(child, dim[crossAxis], fmaxf(
                    boundAxis(child, crossAxis, containerCrossAxis -
                    getPaddingAndBorderAxis(node, crossAxis) -
                    getMarginAxis(child, crossAxis)),
                    // You never want to go smaller than padding
                    getPaddingAndBorderAxis(child, crossAxis)
                  ));
                }
              }
              else if (alignItem !== CSSAlign.FLEX_START) {
                // The remaining space between the parent dimensions+padding and child
                // dimensions+margin.
                var remainingCrossDim = containerCrossAxis -
                  getPaddingAndBorderAxis(node, crossAxis) -
                  getDimWithMargin(child, crossAxis);

                if (alignItem === CSSAlign.CENTER) {
                  leadingCrossDim = leadingCrossDim + remainingCrossDim / 2;
                }
                else { // CSSAlign.FLEX_END
                  leadingCrossDim = leadingCrossDim + remainingCrossDim;
                }
              }
            }

            // And we apply the position
            setLayoutPosition(child, pos[crossAxis], getLayoutPosition(child, pos[crossAxis]) + linesCrossDim + leadingCrossDim);

            // Define the trailing position accordingly.
            if (getLayoutDimension(node, dim[crossAxis]) !== undefined) {
              setTrailingPosition(node, child, crossAxis);
            }
          }
        }

        linesCrossDim = linesCrossDim + crossDim;
        linesMainDim = fmaxf(linesMainDim, mainDim);
        linesCount = linesCount + 1;
        startLine = endLine;
      }
    }
    // <Loop E>

    //
    // Note(prenaux): More than one line, we need to layout the crossAxis
    // according to alignContent.
    //
    // Note that we could probably remove <Loop D> and handle the one line case
    // here too, but for the moment this is safer since it won't interfere with
    // previously working code.
    //
    // See specs:
    // http://www.w3.org/TR/2012/CR-css3-flexbox-20120918/#layout-algorithm
    // section 9.4
    //
    if (linesCount > 1 &&
      getLayoutDimension(node, dim[crossAxis]) !== undefined) {
      var nodeCrossAxisInnerSize = getLayoutDimension(node, dim[crossAxis]) -
        getPaddingAndBorderAxis(node, crossAxis);
      var remainingAlignContentDim = nodeCrossAxisInnerSize - linesCrossDim;

      var crossDimLead = 0;
      var currentLead = getLeadingPaddingAndBorder(node, crossAxis);

      var alignContent = getAlignContent(node);
      if (alignContent === CSSAlign.FLEX_END) {
        currentLead = currentLead + remainingAlignContentDim;
      }
      else if (alignContent === CSSAlign.CENTER) {
        currentLead = currentLead + remainingAlignContentDim / 2;
      }
      else if (alignContent === CSSAlign.STRETCH) {
        if (nodeCrossAxisInnerSize > linesCrossDim) {
          crossDimLead = (remainingAlignContentDim / linesCount);
        }
      }

      var endIndex = 0;
      for (i = 0; i < linesCount; ++i) {
        var startIndex = endIndex;

        // compute the line's height and find the endIndex
        var lineHeight = 0;
        //console.log('D loop through children:', node.children);
        if (!hasOnlyTextChildren) {
          for (ii = startIndex; ii < getChildCount(node); ++ii) {
            child = getChildAt(node, ii);

            if (getPositionType(child) !== CSSPositionType.RELATIVE) {
              continue;
            }
            if (child.lineIndex !== i) {
              break;
            }
            if (getLayoutDimension(child, dim[crossAxis]) !== undefined) {
              lineHeight = fmaxf(
                lineHeight,
                getLayoutDimension(child, dim[crossAxis]) + getMarginAxis(child, crossAxis)
              );
            }
          }
        }
        endIndex = ii;
        lineHeight = lineHeight + crossDimLead;

        for (ii = startIndex; ii < endIndex; ++ii) {
          child = getChildAt(node, ii);

          if (typeof child === 'string') {
            continue;
          }

          if (getPositionType(child) !== CSSPositionType.RELATIVE) {
            continue;
          }

          var alignContentAlignItem = getAlignItem(node, child);
          if (alignContentAlignItem === CSSAlign.FLEX_START) {
            setLayoutPosition(child, pos[crossAxis], currentLead + getLeadingMargin(child, crossAxis));
          }
          else if (alignContentAlignItem === CSSAlign.FLEX_END) {
            setLayoutPosition(child, pos[crossAxis], currentLead + lineHeight - getTrailingMargin(child, crossAxis) - getLayoutDimension(child, dim[crossAxis]));
          }
          else if (alignContentAlignItem === CSSAlign.CENTER) {
            var childHeight = getLayoutDimension(child, dim[crossAxis]);
            setLayoutPosition(child, pos[crossAxis], currentLead + (lineHeight - childHeight) / 2);
          }
          else if (alignContentAlignItem === CSSAlign.STRETCH) {
            setLayoutPosition(child, pos[crossAxis], currentLead + getLeadingMargin(child, crossAxis));
            // TODO(prenaux): Correctly set the height of items with undefined
            //                (auto) crossAxis dimension.
          }
        }

        currentLead = currentLead + lineHeight;
      }
    }

    var needsMainTrailingPos = false;
    var needsCrossTrailingPos = false;

    // If the user didn't specify a width or height, and it has not been set
    // by the container, then we set it via the children.

    if (getLayoutDimension(node, dim[mainAxis]) === undefined) {
      //console.log('A');
      setLayoutDimension(node, dim[mainAxis], fmaxf(
        // We're missing the last padding at this point to get the final
        // dimension
        boundAxis(node, mainAxis, linesMainDim + getTrailingPaddingAndBorder(node, mainAxis)),
        // We can never assign a width smaller than the padding and borders
        getPaddingAndBorderAxis(node, mainAxis)
      ));

      needsMainTrailingPos = true;
    }

    if (getLayoutDimension(node, dim[crossAxis]) === undefined) {
      setLayoutDimension(node, dim[crossAxis], fmaxf(
        // For the cross dim, we add both sides at the end because the value
        // is aggregate via a max function. Intermediate negative values
        // can mess this computation otherwise
        boundAxis(node, crossAxis, linesCrossDim + getPaddingAndBorderAxis(node, crossAxis)),
        getPaddingAndBorderAxis(node, crossAxis)
      ));

      needsCrossTrailingPos = true;
    }
    // <Loop F> Set trailing position if necessary
    if ((needsMainTrailingPos || needsCrossTrailingPos) && !hasOnlyTextChildren) {
      //console.log('E loop through children:', node.children);
      for (i = 0; i < getChildCount(node); ++i) {
        child = getChildAt(node, i);
        if (typeof child === 'string') {
          continue;
        }
        if (needsMainTrailingPos) {
          setTrailingPosition(node, child, mainAxis);
        }

        if (needsCrossTrailingPos) {
          setTrailingPosition(node, child, crossAxis);
        }
      }
    }

    // <Loop G> Calculate dimensions for absolutely positioned elements
    // console.log('F loop through children:', node.children);
    if (!hasOnlyTextChildren) {
      for (i = 0; i < getChildCount(node); ++i) {
        child = getChildAt(node, i);

        if (getPositionType(child) === CSSPositionType.ABSOLUTE) {
          // Pre-fill dimensions when using absolute position and both offsets for the axis are defined (either both
          // left and right or top and bottom).
          for (ii = 0; ii < 2; ii++) {
            axis = (ii !== 0) ? CSSFlexDirection.ROW : CSSFlexDirection.COLUMN;
            if (getLayoutDimension(node, dim[axis]) !== undefined && !isDimDefined(child, axis) &&
              isPosDefined(child, leading[axis]) &&
              isPosDefined(child, trailing[axis])) {
              setLayoutDimension(child, dim[axis], fmaxf(
                boundAxis(child, axis, getLayoutDimension(node, dim[axis]) -
                  getBorderAxis(node, axis) -
                  getMarginAxis(child, axis) -
                  getPosition(child, leading[axis]) -
                  getPosition(child, trailing[axis])
                ),
                // You never want to go smaller than padding
                getPaddingAndBorderAxis(child, axis)
              ));
            }
          }
          for (ii = 0; ii < 2; ii++) {
            axis = (ii !== 0) ? CSSFlexDirection.ROW : CSSFlexDirection.COLUMN;
            if (isPosDefined(child, trailing[axis]) && !isPosDefined(child, leading[axis])) {
              setLayoutPosition(child, leading[axis], getLayoutDimension(node, dim[axis]) -
              getLayoutDimension(child, dim[axis]) -
              getPosition(child, trailing[axis]));
            }
          }
        }
      }
    }


  return node;
}

module.exports = layoutNode;

},{"./CSSAlign":10,"./CSSConstants":11,"./CSSDirection":12,"./CSSFlexDirection":13,"./CSSJustify":14,"./CSSPositionType":15,"./CSSWrap":16}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

    var x1 = element.layout.left + left;
    var x2 = x1 + element.layout.width;
    var y1 = element.layout.top + top;

    var y2 = y1 + element.layout.height;

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

},{}],20:[function(require,module,exports){
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



function loadImage(src) {
  return new Promise(function(resolve, reject){
    // TODO: pool this
    var image = new Image();

    image.onload = function() {
      resolve(image);
    };
    image.onerror = function() {
      reject(image);
    };
    image.src = src;
  });
}

function _renderImage(element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight) {
  return function(image) {
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
  }
}

function _rejectedImageLoad() {
  // TODO
}

function renderImage(element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight) {
  if (element.props && element.props.src) {
    loadImage(element.props.src)
      .then(_renderImage(element, top, left, width, height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight), _rejectedImageLoad);
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

  iTextLocation = webGLContext.getAttribLocation(imageProgram, "a_position");

  var texCoordBuffer = webGLContext.createBuffer();
  webGLContext.uniform4f(webGLContext.getUniformLocation(imageProgram, 'u_dimensions'), parentLeft, parentTop, parentLeft + parentWidth, parentTop + parentHeight);
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
    webGLContext = domElement.getContext('webgl');// {preserveDrawingBuffer: true });
    if(webGLContext == null){
      webGLContext = domElement.getContext('experimental-webgl');//  {preserveDrawingBuffer: true });
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
            parentLeft = left + newElement.layout.left;
            parentHeight = newElement.layout.height;
            parentTop = top + newElement.layout.top;
          }
          render(domElement, child, null, newElement, i, viewPortDimensions, top + newElement.layout.top, left + newElement.layout.left, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity,
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
      //FIXME: renderImage(newElement, top, left, newElement.layout.width, newElement.layout.height, viewPortDimensions, parentLeft, parentWidth, parentTop, parentHeight, inheritedOpacity || 1, inheritedColor);
    }
  //}
}



module.exports = render;

},{"./renderView":19,"./temp-utils":21}],21:[function(require,module,exports){
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


},{}],22:[function(require,module,exports){
'use strict';

var ObjectPools = {};
var index = {};

function clone(def, keys) {
  var clone = {};
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    clone[key] = def[key];
  }
  return clone;
}

function clean(def) {
  var keys = Object.keys(def);
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    var value = def[key];
    if (!isNaN(value)) {
      def[key] = -1;
    }
    else if (typeof value === 'boolean') {
      def[key] = false;
    }
    else if (typeof value === 'object') {
      def[key] = null;
    }
  }
  return def;
}

function growalloc(poolName, size) {
  var pool = ObjectPools[poolName];
  var lastItem = pool[pool.length - 1];
  var keys = Object.keys(lastItem);
  for (var i = pool.length, l = pool.length + size; i < l; i++) {
    pool[i] = clone(lastItem, keys);
  }
  console.warn('grew pool ', poolName, ' by ', size, ' to ', pool.length);
}

function prealloc(poolName, def, size) {
  var pool = ObjectPools[poolName] = [];
  index[poolName] = 0;
  var keys = Object.keys(def);
  for (var i = 0, l = size; i < l; i++) {
    pool[i] = clone(def, keys);
  //  console.log('prealloc:', poolName, i, pool[i]);
  }
}

function getInstance(poolName) {
  var pool = ObjectPools[poolName];
  var i = index[poolName];
  if (i < pool.length - 1) {
    index[poolName]++;
    var component = pool[i];
    if (component) {
      pool[i] = null;
      return component;
    }
  }
  growalloc(poolName, 10);
  return getInstance(poolName);
}

function release(poolName, obj) {
  var pool = ObjectPools[poolName];
  for (var i = 0, l = pool.length; i < l - 1; i++) {
    var component = pool[i];
    if (!component) {
      pool[i] = clean(obj);
    }
  }
}

module.exports = {
  prealloc: prealloc,
  getInstance: getInstance,
  release: release
};



},{}]},{},[2]);
