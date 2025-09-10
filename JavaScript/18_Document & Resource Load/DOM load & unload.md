# Page: DOMContentLoaded, load, beforeunload, unload

- The `lifecycle of an HTML page` has three important events:
  - `DOMContentLoaded` – the browser fully loaded HTML, and the DOM tree is built. but not External Resources.
  - `load` – not only HTML is loaded, but also all the external resources: images, styles etc.
  - `beforeunload`/`unload` – the user is leaving the page.

## DOMContentLoaded

- The `DOMContentLoaded` event happens on the `document` object.
- `DOMContentLoaded` wait for scripts to finish
- The `DOMContentLoaded` event fires only when:

  - The entire DOM is fully built.
  - `All synchronous scripts` have been executed.

- When `DOMContentLoaded` will not fires,

  - `script` with `async` that not block.
  - Scripts that are generated dynamically with `document.createElement('script')` and then added to the webpage also don’t block this event.

- Also `DOMContentLoaded` will not wait for Styles.
- There is pitfall, that `script` will wait to load `style` if `style` is before `script`.
- So in that setuation, `DOMContentLoaded` waits for `scripts`, it now waits for `styles` before them as well.

  ```html
  <script>
    function ready() {
      alert("DOM is ready");

      // image is not yet loaded (unless it was cached), so the size is 0x0
      alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
    }

    document.addEventListener("DOMContentLoaded", ready);
  </script>

  <img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0" />
  ```

- Scripts that don’t block DOMContentLoaded

## Window.onload

- The load event on the window object triggers when the whole page is loaded including styles, images and other resources.

  ```html
  <script>
    window.onload = function () {
      // can also use window.addEventListener('load', (event) => {
      alert("Page loaded");

      // image is loaded at this time
      alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
    };
  </script>

  <img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0" />
  ```

## Window.onunload

- Naturally, `unload` event is when the user leaves us, and we’d like to save the data on our server.
- When a visitor leaves the page, the `unload` event triggers on window

```js
let analyticsData = {
  /* object with gathered data */
};

window.addEventListener("unload", function () {
  navigator.sendBeacon("/analytics", JSON.stringify(analyticsData));
});
```

- If we want to cancel the transition to another page, we can’t do it here. But we can use another event – onbeforeunload

## Window.onbeforeunload

- If a visitor initiated navigation away from the page or tries to close the window, the `beforeunload` handler asks for additional confirmation.
- The `event.preventDefault()` doesn’t work from a `beforeunload` handler

```js
window.onbeforeunload = function () {
  return "This will privent";
};

//  OR

window.addEventListener("beforeunload", (event) => {
  // works, same as returning from window.onbeforeunload
  event.returnValue = "There are unsaved changes. Leave now?";
});
```

## ReadyState

- The `document.readyState` property tells us about the current loading state.
- There are 3 possible values:

  - `"loading"` – the document is loading.
  - `"interactive"` – the document was fully read.
  - `"complete"` – the document was fully read and all resources (like images) are loaded too.

```js
function work() {
  /*...*/
}

if (document.readyState == "loading") {
  // still loading, wait for the event
  document.addEventListener("DOMContentLoaded", work);
} else {
  // DOM is ready!
  work();
}
```

- There’s also the `readystatechange` event that [triggers when the state changes], so we can print all these states

```html
<script>
  log("initial readyState:" + document.readyState);

  document.addEventListener("readystatechange", () =>
    log("readyState:" + document.readyState)
  );
  document.addEventListener("DOMContentLoaded", () => log("DOMContentLoaded"));

  window.onload = () => log("window onload");
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="https://en.js.cx/clipart/train.gif" id="img" />
<script>
  img.onload = () => log("img onload");
</script>
```

- The typical output:

  - [1] initial readyState:loading
  - [2] readyState:interactive
  - [2] DOMContentLoaded
  - [3] iframe onload
  - [4] img onload
  - [4] readyState:complete
  - [4] window onload


## Go back to Submit in Form

- [Submit in Form](../17_Form_Controls/Submit%20in%20Form.md)

## Now Learn about Script async & defer

- [Script async & defer](./Script%20async%20&%20defer.md)