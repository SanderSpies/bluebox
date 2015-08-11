'use strict';

var Bluebox = require('../../lib');
var View = Bluebox.Components.View;

var TodoItem = require('./TodoItem');

var view;
var TodoList = Bluebox.create('TodoList', function(props) {
  view = View({}, {}, [
    TodoItem({onClick:onTodoItemClick, selected: props.selected[0], key: 0}),
    TodoItem({onClick:onTodoItemClick, selected: props.selected[1], key: 1}),
    TodoItem({onClick:onTodoItemClick, selected: props.selected[2], key: 2})
  ]);
  return view;
});

function onTodoItemClick(todoItemComponent, e) {
  var selected = [false, false, false];
  selected[todoItemComponent.props.key] = true;
  Bluebox.update(view).withProperties(selected);
}

Bluebox.renderFromTop(TodoList({selected:[false, false, false]}), document.getElementById('canvas'));

module.exports = TodoList;
