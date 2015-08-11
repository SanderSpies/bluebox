'use strict';

var Bluebox = require('../../lib');
var View = Bluebox.Components.View;
var Text = Bluebox.Components.Text;

var TodoItem = Bluebox.create('TodoItem', function(props) {
  return View(props, {height: 50, flexDirection: 'row', backgroundColor: props.selected? 'red' : 'black', color: 'white'}, [Text('A todo item...')]);
});

function onTodoItemClick(todoItemComponent, e) {
  todoItemComponent.props.onClick(todoItemComponent, e);
}

module.exports = TodoItem;
