# Browser Default Action

- Many events automatically lead to certain actions performed by the browser.

- For instance:

  - `A click on a link` – initiates navigation to its URL.
  - `A click on a form submit button` – initiates its submission to the server.
  - `Pressing a mouse button over a text and moving it` – selects the text.

- There are 2 Methods to tall browser that we don't want action:

  - `event.preventDefault()`
  - If the handler is assigned using `on<event>`, then returning `false` also work same.

- `event.stopPropagation()` and `event.preventDefault()` (also known as return false) are two different things. They are not related to each other.
- use either event.preventDefault() or return false. The second method works only for handlers assigned with `on<event>`.

## "Passive" handler Option

- The optional `passive: true` option of `addEventListener` signals the browser that the handler is not going to call `preventDefault()`.
- The `passive: true` options tells the browser that the handler is not going to cancel scrolling.
- For browser (Firefox, Chrome), `passive` is `true` by default for `toughstart` and `toughmove`.
- That’s useful for some mobile events, like `touchstart` and `touchmove`, to tell the browser that it should not wait for all handlers to finish before scrolling.

## event.defaultPrevented

- The property `event.defaultPrevented` is `true` if the default action was prevented, and `false` otherwise.

```html
<p>Right-click for the document menu</p>
<button id="elem">
  Right-click for the button menu (fixed with event.stopPropagation)
</button>

<script>
  elem.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    alert("Button context menu");
  };

  document.oncontextmenu = function (event) {
    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

- OR

```html
<p>
  Right-click for the document menu (added a check for event.defaultPrevented)
</p>
<button id="elem">Right-click for the button menu</button>

<script>
  elem.oncontextmenu = function (event) {
    event.preventDefault();
    alert("Button context menu");
  };

  document.oncontextmenu = function (event) {
    if (event.defaultPrevented) return;

    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

# Experiment

- using `event.preventDefault()`.

```html
<script>
  function handler(event) {
    alert("...");
    event.preventDefault();
  }
</script>

<a href="https://w3.org" onclick="handler(event)">w3.org</a>
```

- Another Method

```html
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="https://w3.org" onclick="return handler()">w3.org</a>
```

## Go back to Event Delegation

- [Event Delegation](./03%20Event_deligation.md)

## Now Learn about Custom Events

- [Custom Events](./05%20Custom_Events.md)