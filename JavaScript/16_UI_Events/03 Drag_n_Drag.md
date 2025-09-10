# Drag’n’Drop algorithm

- The basic Drag’n’Drop algorithm looks like this:

  - On `mousedown` – prepare the element for moving, if needed (maybe create a clone of it, add a class to it or whatever).
  - Then on `mousemove` move it by changing left/top with position:absolute.
  - On `mouseup` – perform all actions related to finishing the drag’n’drop.

- In Morden HTML Standerd, there is special Events like `dragstart` & `dragend`.
- There is good Functionality which should i watch in future.

- [Limitation]
  - There we not privent only `Horizontal` & `Vertical` drag only.
  - Also, mobile device support for such events is very weak.


## Go back to Moving Mouse

- [Moving Mouse](./02%20Moving_mouse.md)

## Now Learn about another Event which is Pointer Event

- [Pointer Event](./04%20Pointer%20Event.md)