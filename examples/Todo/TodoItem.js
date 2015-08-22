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
