# Event Constructor

- Custom events can be used to create `“graphical components”`.
- We can create Event like,

  ```html
  <button id="elem" onclick="alert('Click!');">Autoclick</button>
  <script>
    let myEvent = new Event(type[, options]);
    elem.dispatchEvent(myEvent)
  </script>
  ```

- Arguments:

  - `Type`: event type, a string like "click"
  - options:
    1. `Bubbles` - `true/false` – if `true`, then the event bubbles.
    2. `cancelable` - `true/false` – if `true`, then the “default action” may be prevented.
  - By default both are false: {bubbles: false, cancelable: false}.

# DispatchEvent

- After an event object is created, we should “run” it on an element using the call `elem.dispatchEvent(event)`.
- The property `event.isTrusted` is `true` for events that come from real user actions and `false` for script-generated events.

```html
<button id="elem" onclick="alert('Click!');">Autoclick</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```

# Bubbling example

- We can create a `bubbling event` with the name `"hello"` and catch it on `document`.

```html
<h1 id="elem">Hello From the Script!</h1>
<script>
  // catch on document...
  document.addEventListener("hello", function (event) {
    alert("Hello from" + event.target.tagName); // Return - Hello from H1
  });

  // ...dispatch on elem!
  let myEvent = new Event("Hello", { bubble: true });
  elem.dispatchEvent(myEvent);
  // the handler on document will activate and display the message.
</script>
```

## UI Events

- There are list of class for UI Events
  - UIEvent
  - FocusEvent
  - MouseEvent
  - WheelEvent
  - KeyboardEvent
- We should use them instead of `new Event` if we want to create such events. For instance, `new MouseEvent("click")`.
- the generic `Event constructor` does not allow anything acept `bubbles`, `cancelable`.

```js
let event = new MouseEvent("click", {
  // the generic "Event" constructor does not allow that.
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100,
});

alert(event.clientX); // 100
```

# Custom Events

- Technically `customEvent` is same as `Event` but,
- we can add an additional property detail for any custom information that we want to pass with the event.

```html
<h1 id="elem"></h1>

<script>
  // additional details come with the event to the handler
  elem.addEventListener("hello", function (event) {
    alert(event.detail.name);
    elem.innerHTML = `Hello for ${event.detail.name}`;
  });

  elem.dispatchEvent(
    new CustomEvent("hello", {
      detail: { name: "John" },
    })
  );
</script>
```

-

```html
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>
<button onclick="hide()">Hide()</button>
<script>
  function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true, // without that flag preventDefault doesn't work
    });
    if (!rabbit.dispatchEvent(event)) {
      alert("The action was prevented by a handler");
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener("hide", function (event) {
    if (confirm("Call preventDefault?")) {
      event.preventDefault();
    }
  });
</script>
```
