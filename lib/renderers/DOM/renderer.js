'use strict';

function setStyle(el, props) {
  var keys = Object.keys(props);
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    var value = props[key];
    el.style[key] = value;
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

function setAttributes(el, newProps, oldProps){
  if (newProps !== oldProps) {
    if (!oldProps && newProps) {
      // add all attributes
      var newPropsKeys = Object.keys(newProps);
      for (var i = 0, l = newPropsKeys.length; i < l; i++) {
        var newPropsKey = newPropsKeys[i];
        if (newPropsKey === 'style') {
          if(!oldProps || (newProps[newPropsKey] !== oldProps[newPropsKey])){
            setStyle(el, newProps[newPropsKey]);
          }
        }
        else {
          el.setAttribute(newPropsKey, newProps[newPropsKey]);
        }
      }
    }
    else if (oldProps && !newProps) {
      // remove all attributes
      var oldPropsKeys = Object.keys(oldProps);
      for (var i = 0, l = oldPropsKeys.length; i < l; i++) {
        el.removeAttribute(oldPropsKeys[i])
      }
    }
    else {
      var newPropsKeys = Object.keys(newProps);
      var oldPropsKeys = Object.keys(oldProps);
      for (var i = 0, l = newPropsKeys.length; i < l; i++) {
        var key = newPropsKeys[i];
        if (newProps[key] !== oldProps[key]) {
          if (key === 'style') {
            setStyle(el, newProps[key]);
          }
          else {
            el.setAttribute(key, newProps[key]);
          }
        }
      }
      for (var i = 0, l = oldPropsKeys.length; i < l; i++) {
        var key = oldPropsKeys[i];
        if (key === 'style') {
          removeStyle(el, oldProps[key], newProps[key]);
        }
        else if (!key in newProps) {
          el.removeAttribute(key);
        }
      }
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
        for (var i = 0, l = children.length; i < l; i++) {
          render(element, children[i], null, i)
        }
      }
      el.appendChild(element);
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
          for (var i = length - 1; i > -1; i--) {
            render(element, children ? children[i] : null, null, i);
          }
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
