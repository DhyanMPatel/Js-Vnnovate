### Mouse events:

- `click` – when the mouse clicks on an element (touchscreen devices generate it on a tap).
- `contextmenu` – when the mouse right-clicks on an element.
- `mouseover / mouseout` – when the mouse cursor comes over / leaves an element.
- `mousedown / mouseup` – when the mouse button is pressed / released over an element.
- `mousemove` – when the mouse is moved.

### Keyboard events:

- `keydown` and `keyup` – when a keyboard key is pressed and released.

### Form element events:

- `submit` – when the visitor submits a `<form>`.
- `focus` – when the visitor focuses on an element, e.g. on an `<input>`.

### Document events:

DOMContentLoaded – when the HTML is loaded and processed, DOM is fully built.

### CSS events:

transitionend – when a CSS-animation finishes.

# Event Handler

- As there’s only one `onclick` property, we can’t assign more than one event handler.

- The value of `this` inside a handler is the element. The one which has the handler on it.

  ```html
  <button onclick="alert(this.innerHTML)">Click me</button>
  <!-- // Return - Click me -->
  ```

- For document-level handlers – always `addEventListener`

## Remember

- the function should be assigned as sayThanks, not sayThanks().

  ```js
  function sayThanks() {
    alert("Thanks!");
  }
  // Right
  elem.onclick = sayThanks;

  // Wrong
  elem.onclick = sayThanks();
  ```

- Possible
  ```html
  <input type="button" id="button" onclick="sayThanks()" />
  ```

# elem.addEventListener()

- Syntax:

  ```js
  element.addEventListener(event, handler, [options]);
  ```

- Example:

  ```html
  <input id="elem" type="button" value="Click me" />

  <script>
    function handler1() {
      alert("Thanks!");
    }

    function handler2() {
      alert("Thanks again!");
    }

    elem.onclick = () => alert("Hello");
    elem.addEventListener("click", handler1); // Thanks!
    elem.addEventListener("click", handler2); // Thanks again!
  </script>
  ```

# Event Object

- When an event happens, the `browser` creates an `event object`, puts details into it and passes it as an argument to the handler.
- Property of Event:
  - `event.type` -
  - `event.currentTarget` - That’s exactly the same as `this`, unless the handler is an arrow function, or its this is bound to something else, then we can get the element from `event.currentTarget`.
  - `event.clientX` / `event.clientY` - Window-relative coordinates of the cursor, for pointer events.

# handleEvent

- We can assign not just a function, but an object as an event handler using `addEventListener`. When an event occurs, its `handleEvent` method is called.

  ```js
  <button id="elem">Click me</button>
  <script>
    let obj = {
        handleEvent(event) {
        alert(event.type + " at " + event.currentTarget);
        }
    };
    elem.addEventListener('click', obj);
  </script>
  ```
