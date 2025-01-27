```html
<div onclick="alert('The handler!')">
  <em
    >If you click on <code>EM</code>, the handler on <code>DIV</code> runs.</em
  >
</div>
```

# Bubbling

- When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.

  ![Bubbling Effect](./bubbling%20Effect.png)

## event.target

- <b>The most deeply nested element that caused the event is called a target element, accessible as</b> `event.target`.

  - `event.target` – is the “target” element that initiated the event, it doesn’t change through the bubbling process.
  - `this (= event.currentTarget)` – is the “current” element, the one that has a currently running handler on it.
  - `event.eventPhase` - the current phase (capturing=1, target=2, bubbling=3).

## Stopping bubbling

- Normally it goes upwards till `<html>`, and then to `document` object, and some events even reach `window`.
- Method: `event.stopPropagation()`.

  ```html
  <body onclick="alert(`the bubbling doesn't reach here`)">
    <button onclick="event.stopPropagation()">Click me</button>
  </body>
  ```

- `event.stopPropagation()` stops the move upwards, but on the current element all other handlers will run.
- `event.stopPropagation()` will stop only one event if any element have multiple events then `event.stopImmediatePropagation()` that stop all events
- Don’t stop bubbling without a need!

# Capturing

- There are second argument in `addEventListener()` which is use for bubbling(Default) or capturing. byDefault it is false.
- 3 phases of event propagation:

  - `Capturing phase` – the event goes down to the element.
  - `Target phase` – the event reached the target element.
  - `Bubbling phase` – the event bubbles up from the element.

    ```html
    <style>
      body * {
        margin: 10px;
        border: 1px solid blue;
      }
    </style>

    <form>
      FORM
      <div>
        DIV
        <p>P</p>
      </div>
    </form>

    <script>
      for (let elem of document.querySelectorAll("*")) {
        elem.addEventListener(
          "click",
          (e) => alert(`Capturing: ${elem.tagName}`),
          true
        );
        elem.addEventListener("click", (e) =>
          alert(`Bubbling: ${elem.tagName}`)
        );
      }
    </script>
    ```

## note

- To remove the handler, `removeEventListener` needs the same phase, means if we mention `true` then `removeEventListener(..., true)`.
- Listeners on the same element and same phase run in their set order

  ```js
  elem.addEventListener("click", (e) => alert(1)); // guaranteed to trigger first
  elem.addEventListener("click", (e) => alert(2));
  ```
