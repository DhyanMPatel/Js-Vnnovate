# Bubbling

- When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.

  ![Bubbling Effect](./bubbling%20Effect.png)

## event.target

- The most deeply nested element that caused the event is called a target element, accessible as `event.target`.
  - `event.target` – is the “target” element that initiated the event, it doesn’t change through the bubbling process.
  - `this` – is the “current” element, the one that has a currently running handler on it.

## Stopping bubbling

- Normally it goes upwards till `<html>`, and then to `document` object, and some events even reach `window`.
- Method: `event.stopPropagation()`.

  ```html
  <body onclick="alert(`the bubbling doesn't reach here`)">
    <button onclick="event.stopPropagation()">Click me</button>
  </body>
  ```

- `event.stopPropagation()` stops the move upwards, but on the current element all other handlers will run.
- Don’t stop bubbling without a need!

# Capturing

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
