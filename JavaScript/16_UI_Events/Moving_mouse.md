## Events mouseover/mouseout, relatedTarget

- These events are special, because they have property relatedTarget. This property complements target. When a mouse leaves one element for another, one of them becomes target, and the other one – relatedTarget.

- For `mouseover`:

  - `event.target` – is the element where the mouse came over.
  - `event.relatedTarget` – is the element from which the mouse came (relatedTarget → target).

- For `mouseout` the reverse:

  - `event.target` – is the element that the mouse left.
  - `event.relatedTarget` – is the new under-the-pointer element, that mouse left for (target → relatedTarget).

- The `mousemove` event triggers when the mouse moves. But that doesn’t mean that every pixel leads to an event.

- An important feature of `mouseout` – it triggers, when the pointer moves from an element to its descendant, e.g. from #parent to #child in this HTML:

  ```html
  <div id="parent">
    <div id="child">...</div>
  </div>
  ```

- `relatedTarget` can be null.
- According to the browser logic, the mouse cursor may be `only over a single element at any time` – the most nested one and top by z-index.

## Event MouseEnter and MouseLeave

- Events `mouseenter/mouseleave` are like `mouseover/mouseout`. hey [trigger when the mouse pointer enters/leaves] the element.
- When the pointer enters an element – `mouseenter` triggers. exect location not metter.
- When the pointer leave an element - `mouseleave` triggers.
- we can't Event Delegation with `mouseenter`/`mouseleave`.
