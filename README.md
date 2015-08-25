Bluebox
===
Work in progress.

Bluebox is a declarative components tree with inline styles experiment.

Example
---
```
    var TodoItem = Bluebox.create('TodoItem', function(props, style, children) {
        return View({onClick: onTodoItemClick}, {}, []);
    });

    function onTodoItemClick(todoItemInstance, e) {

        Bluebox
            .update(todoItemInstance)
            .withProperties({

            });
    }

    var TodoList = Bluebox.create('TodoList', function(props, style, children) {
        return View({}, {}, [
            TodoItem(),
            TodoItem(),
            TodoItem(),
            TodoItem()
        ]
    });

    Bluebox.renderFromTop(TodoList, document.getElementById('webgl-canvas'));
```


Features
---
- declarative
- inline styles
- renders to WebGL
- FlexBox layout system
- trying to avoid `this` mostly
- virtual event system

Components
---
- Image
- Text
- View
- Custom components


TODO
---
- support Text tag [in progress]
- images support [in progress]
- overflow stuff [in progress]
- proper drawing order (so opacity works correctly) [in progress]
- support in component updates
- add support for more CSS features:
  - backgroundColor [in progress]
  - border*
  - boxShadow
  - color
  - font
  - fontSize
  - outline
  - fontStyle
  - filter
    - blur, etc.
  - opacity [in progress]
  - overflow [in progress]
  - transforms
  - text-overflow: ellipsis
- add keypress etc. support


- add animation support
- add JSX support
- proper texture pooling I guess ?!
- SVG icons?

Acknowledgements
---