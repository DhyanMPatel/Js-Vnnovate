### Mouse events:

- `click` – when the mouse clicks on an element (touchscreen devices generate it on a tap).
- `contextmenu` – when the mouse right-clicks on an element.
- `mouseover / mouseout` – when the mouse cursor comes over / leaves an element.
- `mousedown / mouseup` – when the mouse button is pressed / released over an element.
- `mousemove` – when the mouse is moved.
- `oncontextmenu` - when right-click of mouse is clicked.

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

- to react on that event we need Event Handler
- As there’s only one `onclick` property, we can’t assign more than one event handler.
- The value of `this` inside a handler is the element. The one which has the handler on it.

  ```html
  <button onclick="alert(this.innerHTML)">Click me</button>
  <!-- // Return - Click me -->
  ```

- For document-level handlers – always `addEventListener`

## Remember

- Assign a handler to `elem.onclick`, not `elem.ONCLICK`, because DOM properties are case-sensitive.
- the function should be assigned as sayThanks, not sayThanks().

  - Dom Property:

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

  - HTML Attribute:

  ```html
  <input type="button" id="button" onclick="sayThanks()" />
  ```

- In the example below adding a handler with JavaScript overwrites the existing handler:

```html
<input type="button" id="elem" onclick="alert('Before')" value="Click me" />
<script>
  elem.onclick = function () {
    // overwrites the existing handler
    alert("After"); // only this will be shown
  };
</script>
```

- Don’t use `setAttribute` for handlers.

```js
// a click on <body> will generate errors,
// because attributes are always strings, function becomes a string
document.body.setAttribute("onclick", function () {
  alert(1);
});
```

# elem.addEventListener()

- when we use `onClick` two time then second one will override first onClick(), so we should use addEventListener() that overcome this type of override problem.
- For some events, handlers only work with addEventListener such as `DOMContentLoaded` event trigger using `addEventListener()`.
- So `addEventListener()` is universal.

- Syntax:

  ```js
  element.addEventListener(event, handler, [options]);
  element.removeEventListener(event, handler, [options]); // Removal requires the same function
  ```

  - `event`: Event Name,
  - `handler`: handler function,
  - `options`: Additional Options like once, capture, passive.
    - `once`: if `true`, then listener automatically Remove after it Triggered.
    - `capture`: the phase where handle the Event
    - `passive`: if `true`, handler will not call `preventDefault()`

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

- `DOMContentLoaded` event work with only `addEventListener()`

```js
document.onDOMContentLoaded = function () {
  console.log("will not work");
};

document.addEventListner("DOMContentLoaded", function () {
  console.log("This console the Answer.");
});
```

# Event Object

- When an event happens, the `browser` creates an `event object`, puts details into it and passes it as an argument to the handler.
- The event object is also available in HTML handlers
- Property of Event:

  - `event.type` -
  - `event.currentTarget` - That’s exactly the same as `this`, unless the handler is an arrow function, or its this is bound to something else, then we can get the element from `event.currentTarget`.
  - `event.clientX` / `event.clientY` - Window-relative coordinates of the cursor, for pointer events.

  ```html
  <input type="button" onclick="alert(event.type)" value="Event type" />
  ```

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
