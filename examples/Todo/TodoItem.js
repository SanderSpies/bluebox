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
