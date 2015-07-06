Bluebox
===
This is a prototype for combining a VDom diff algorithm with style information. The goal is to optimize pages
with lots of content, not simple small pages (might actually be slower here).

How does it work?
---
- Diff the new vdom tree with the old vdom tree and get an immutable result
- Get layout information via CSS layout
- Optimize the diff and replace non-visible DOM nodes with empty ones (but with correct dimensions)

- [TODO] Scroll support
- [TODO] Resize support

Limitations
---
- We use CSS-Layout to determine what needs to be rendered on screen. Which means we use
  the CSS-Layout defaults
- We don't support automatic text sizing
  - ideally it should be possible to measure and cache this on the client


How does it perform?
---
Probably pretty bad for now