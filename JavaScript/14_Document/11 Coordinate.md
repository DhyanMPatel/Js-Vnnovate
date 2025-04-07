# Coordinate

- Most JavaScript methods deal with one of two coordinate systems:

  - `Relative to the window` – similar to `position:fixed`, calculated from the window top/left edge.
    - we’ll denote these coordinates as clientX/clientY, the reasoning for such name will become clear later, when we study event properties.
  - `Relative to the document` – similar to `position:absolute` in the document root, calculated from the document top/left edge.
    - we’ll denote them pageX/pageY.

## Element coordinates: getBoundingClientRect

- returns window coordinates for a minimal rectangle that encloses `elem` as an object.
- Main DOMRect Properties:
  - `x/y`: X/Y-coordinates of the rectangle origin relative to window.
  - `width/height`: width/height of the rectangle (can be negative).
- Additionally, there are derived properties:
  - `top/bottom` – Y-coordinate for the top/bottom rectangle edge, Note:-`bottom` can’t be 0
  - `left/right` – X-coordinate for the left/right rectangle edge.

## elementFromPoint(x, y)

- The call to `document.elementFromPoint(x, y)` returns the most nested element at window coordinates (x, y).
- Syntax:

  ```js
  let elem = document.elementFromPoint(x, y);
  ```

- Example:

```js
let centerX = document.documentElement.clientwidth / 2;
let centerY = document.documentElement.clientHeight / 2;

let elem = document.elemenetFromPoint(centerX, ceterY);
alert(elem.tagName);
```

- For out-of-window coordinates the elementFromPoint returns null

## Document Coordinates

- document coordinates are similar to `position:absolute` on top.
- The two coordinate systems are connected by the formula:

  - `pageY` = `clientY` + height of the scrolled-out vertical part of the document.
  - `pageX` = `clientX` + width of the scrolled-out horizontal part of the document.

```js
function getCoords(elem) {
  let box = elem.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
  };
}
```
