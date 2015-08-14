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
