Bluebox
===
An experimental component library

Take as a given:
- ES6
- "pure" functions only

Goals
---
- start application
- create several workers to distribute work
  -> let workers do work before it's actually needed
  -> 


- enabling fast 60fps rendering

// how do I render from any position?!




// object without variables? -> make it a constant during build time


  // styling
  // - objects only
  // - separate layout blocks like react-style-layout
  // - need to be able to determine if something is or isn't on screen
  // - display: none -> do nothing here
  // - outside current screen -> don't go deeper
  // styles' style should be a limited set of CSS:
  //

  // try to update the dom a lot here (think complex animations)
  // -> where does it go wrong? fix it!

  // -> can we determine if something isn't visible?!
  // -> everything box-sizing: box
  // ->

  // run in a separate web worker -> forces no DOM etc. \o/
  // fast way of syncing with web workers and the DOM

  // not allowed to touch the dom in the render method

  // decide what needs to be placed inside the DOM
  // animate at 60fps always:
  // - read values at beginning
  // - set values at end
  //
  // 60fps cycle - get from dom, set to dom
  //
  // event system - execute events at the right moment
  // events should be left alone for now

// embed:
// - inline styling
// - routing => look at react-router