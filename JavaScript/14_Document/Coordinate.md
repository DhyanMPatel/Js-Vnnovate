# Coordinate

- Most JavaScript methods deal with one of two coordinate systems:

  - `Relative to the window` – similar to `position:fixed`, calculated from the window top/left edge.
    - we’ll denote these coordinates as clientX/clientY, the reasoning for such name will become clear later, when we study event properties.
  - `Relative to the document` – similar to `position:absolute` in the document root, calculated from the document top/left edge.
    - we’ll denote them pageX/pageY.

## Element coordinates: getBoundingClientRect

## elementFromPoint(x, y)

- The call to `document.elementFromPoint(x, y)` returns the most nested element at window coordinates (x, y).
- Syntax:
  ```js
  let elem = document.elementFromPoint(x, y);
  ```
