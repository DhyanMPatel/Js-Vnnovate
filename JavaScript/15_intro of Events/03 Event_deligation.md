# Event Deligation

- Capturing and bubbling allow us to implement one of the most powerful event handling patterns called event delegation.
- [Benefits]:

  - save Memory through using single handler
  - less code
  - DOM menipulation esily

- [Limitation]:

  - all events are not bubbled up like blur, focus, resizing of window, scrolling are not bubbled up.
  - If we use `event.stopPropagation()` then we can't bubbled up any event.

# Actions in markup

- We can add a handler for the whole menu and `data-action` attributes for buttons that has the method to call.

```html
<div id="menu">
  <button data-action="save">Save</button>
  <button data-action="load">Load</button>
  <button data-action="search">Search</button>
</div>
<script>
  class Menu {
    constructor(elem) {
      this.elem = elem;
      elem.onclick = this.onClick.bind(this);
    }
    save() {
      alert("Saving");
    }
    load() {
      alert("Loading");
    }
    search() {
      alert("Searching");
    }
    onClick(event) {
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
    }
  }
  new Menu(menu);
</script>
```

# The “behavior” pattern

- The pattern has two parts:
  - We add a custom attribute to an element that describes its behavior.
  - A document-wide handler tracks events, and if an event happens on an attributed element – performs the action.
- here the attribute `data-counter` adds a behavior: “increase value on click” to buttons:

  ```html
  Counter: <input type="button" value="1" data-counter /> One Mode Counter:
  <input type="button" value="2" data-counter />

  <script>
    document.addEventListener("click", function (event) {
      if (event.target.dataset.counter != undefined) {
        event.target.value++;
      }
    });
  </script>
  ```

- A click on an element with the attribute `data-toggle-id` will show/hide the element with the given id:

```html
<button data-toggle-id="subscribe-mail">Show the subscription form</button>

<form id="subscribe-mail" hidden>Your mail: <input type="email" /></form>

<script>
  document.addEventListener("click", function (event) {
    let id = event.target.dataset.toggleId;
    if (!id) return;

    let elem = document.getElementById(id);

    elem.hidden = !elem.hidden;
  });
</script>
```

## Go back to Event Propagation

- [Event Propagation](./02%20Bubbling_Capturing.md)

## Now Learn about Browser Default Actions

- [Browser Default Actions](./04%20Browser%20Default%20Action.md)