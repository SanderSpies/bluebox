'use strict';

// non optimized renderer

function setStyle(el, props, oldProps) {
  var keys = Object.keys(props);
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    var value = props[key];
    if (!oldProps || oldProps[key] !== value) {
      el.style[key] = value;
    }
  }
}

function removeStyle(el, oldStyle, newStyle) {
  var keys = Object.keys(oldStyle);
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    var value = newStyle[key];
    if (!value) {
      el.style[key] = '';
    }
  }
}

function setAttributesNewProps(newProps, el) {
// add all attributes
  var newPropsKeys = Object.keys(newProps);
  for (var i = 0, l = newPropsKeys.length; i < l; i++) {
    var newPropsKey = newPropsKeys[i];
    if (newPropsKey === 'style') {
      setStyle(el, newProps[newPropsKey], null);
    }
    else {
      el.setAttribute(newPropsKey, newProps[newPropsKey]);
    }
  }
}
function setAttributesNoNewProps(oldProps, el) {
// remove all attributes
  var oldPropsKeys = Object.keys(oldProps);
  for (var i = 0, l = oldPropsKeys.length; i < l; i++) {
    el.removeAttribute(oldPropsKeys[i])
  }
}
function setAttributesMerged(newProps, oldProps, el, newPropsKeys, oldPropsKeys) {
  var i = 0, l = 0, key;
  for (i = 0, l = newPropsKeys.length; i < l; i++) {
    key = newPropsKeys[i];
    var oldProp = oldProps[key];
    var newProp = newProps[key];
    if (newProp === oldProp) {
      continue;
    }
    if (key === 'style') {
      setStyle(el, newProps[key], oldProps[key]);
    }
    else {
      el.setAttribute(key, newProps[key]);
    }

  }
  for (i = 0, l = oldPropsKeys.length; i < l; i++) {
    key = oldPropsKeys[i];
    if (!key in newProps) {
      el.removeAttribute(key);
    }
    else if (key === 'style') {
      removeStyle(el, oldProps[key], newProps[key]);
    }
  }
}
function setAttributes(el, newProps, oldProps, oldDOM) {
  var newPropsKeys;
  if (newProps) {
    newPropsKeys = Object.keys(newProps);
  }
  var oldPropsKeys;
  if (oldProps) {
    oldPropsKeys = Object.keys(oldProps);
  }
  if (newProps !== oldProps || (oldDOM && !isVisible(oldDOM, oldViewPortDimensions))) {
    if (!oldProps && newProps) {
      setAttributesNewProps(newProps, el);
    }
    else if (oldProps && !newProps) {
      setAttributesNoNewProps(oldProps, el);
    }
    else {
      setAttributesMerged(newProps, oldProps, el, newPropsKeys, oldPropsKeys);
    }
  }
}

function setAttributesNotVisible(el, newProps, oldProps) {
  if (!oldProps || !oldProps.style) {
    setStyle(el, newProps.style);
  }
}

function isVisible(newLayout, viewPortDimensions) {
  var layout = newLayout.layout;
  return (layout.top >= viewPortDimensions.top && layout.top <= (viewPortDimensions.top + viewPortDimensions.height)) ||
    ((layout.top + layout.height) <= (viewPortDimensions.top + viewPortDimensions.height) && (layout.top + layout.height) >= viewPortDimensions.top) ||
    layout.top < viewPortDimensions.top && (layout.top + layout.height) > (viewPortDimensions.top + viewPortDimensions.height);
}
var oldViewPortDimensions;
function render(el, newDOM, oldDOM, X, viewPortDimensions, hasViewPortChanged) {
  if (oldViewPortDimensions !== viewPortDimensions) {
    hasViewPortChanged = true;
    oldViewPortDimensions = viewPortDimensions;
  }
  if (newDOM === oldDOM && !hasViewPortChanged) {
    return;
  }

  if (newDOM && !oldDOM) {
    if (typeof newDOM === 'string') {
      var text = document.createTextNode(newDOM);
      el.appendChild(text);
    }
    else {
      var element = document.createElement(newDOM.type);
      var isVisibleX = isVisible(newDOM, viewPortDimensions);
      if (isVisibleX) {
        setAttributes(element, newDOM.props, null, null);
        var children = newDOM.children;
        if (children) {
          for (var i = children.length - 1; i > -1; i--) {
            render(element, children[i], null, i, viewPortDimensions)
          }
        }
      }
      else {
        setAttributesNotVisible(element, newDOM.props, null);
      }

      el.insertBefore(element, el.childNodes[0]);

    }
  }
  else if (!newDOM && oldDOM) {
    el.removeChild(el.childNodes[X]);
  }
  else {
    var element = el.childNodes[X];
    if (typeof newDOM === 'string') {
      el.innerText = newDOM;
    }
    else {
      if (!element) {
        element = document.createElement(newDOM.type);
        el.appendChild(element);
      }
      var isVisibleX = isVisible(newDOM, viewPortDimensions);
      if (isVisibleX) {
        setAttributes(element, newDOM.props, oldDOM.props, oldDOM);

        var children = newDOM.children;
        var oldChildren = oldDOM.children;
        if (children !== oldChildren || hasViewPortChanged) {
          var length = children ? children.length : 0;
          if (length === 0 && oldChildren && oldChildren.length > 0) {
            element.innerHTML = '';
          }
          else if (children && !oldChildren) {
            if (isVisibleX) {
              var fragment = document.createDocumentFragment();
              for (var i = length - 1; i > -1; i--) {
                render(fragment, children ? children[i] : null, null, i, viewPortDimensions, hasViewPortChanged);
              }
              element.appendChild(fragment);
            }
          }
          else {
            if (oldChildren && length < oldChildren.length) {
              length = oldChildren.length;
            }
            if (isVisibleX) {
              for (var i = length - 1; i > -1; i--) {
                render(element, children ? children[i] : null, oldChildren ? oldChildren[i] : null, i, viewPortDimensions, hasViewPortChanged);
              }
            }
          }
        }
      }
      else {
        setAttributesNotVisible(element, newDOM.props, oldDOM.props);
      }
    }
  }
  oldViewPortDimensions = viewPortDimensions;
}

module.exports = render;
