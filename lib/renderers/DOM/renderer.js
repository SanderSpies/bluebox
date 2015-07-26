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

function setAttributesNewProps(newProps, oldProps, el) {
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
function setAttributes(el, newProps, oldProps) {
  var newPropsKeys;
  if (newProps) {
    newPropsKeys = Object.keys(newProps);
  }
  var oldPropsKeys;
  if (oldProps) {
    oldPropsKeys = Object.keys(oldProps);
  }
  if (newProps !== oldProps) {
    //console.log('setAttributes for:', newProps)
    if (!oldProps && newProps) {
      setAttributesNewProps(newProps, oldProps, el);
    }
    else if (oldProps && !newProps) {
      setAttributesNoNewProps(oldProps, el);
    }
    else {
      setAttributesMerged(newProps, oldProps, el, newPropsKeys, oldPropsKeys);
    }
  }
}

function render(el, newDOM, oldDOM, X) {
  if (newDOM === oldDOM) {
    return;
  }
  if (newDOM && !oldDOM) {
    if (typeof newDOM === 'string') {
      var text = document.createTextNode(newDOM);
      el.appendChild(text);
    }
    else {
      var element = document.createElement(newDOM.type);
      setAttributes(element, newDOM.props, null);
      var children = newDOM.children;
      if (children) {
        for (var i = children.length - 1; i > -1; i--) {
          render(element, children[i], null, i)
        }
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
      setAttributes(element, newDOM.props, oldDOM.props);
      var children = newDOM.children;
      var oldChildren = oldDOM.children;
      if (children !== oldChildren) {

        var length = children ? children.length : 0;
        if (length === 0 && oldChildren.length > 0) {
          element.innerHTML = '';
        }
        else if (children && !oldChildren) {
          var fragment = document.createDocumentFragment();
          for (var i = length - 1; i > -1; i--) {
            render(fragment, children ? children[i] : null, null, i);
          }
          element.appendChild(fragment);
        }
        else {
          if (length < oldChildren.length) {
            length = oldChildren.length;
          }
          for (var i = length - 1; i > -1; i--) {
            render(element, children ? children[i] : null, oldChildren ? oldChildren[i] : null, i);
          }
        }
      }
    }
  }
}

module.exports = render;
