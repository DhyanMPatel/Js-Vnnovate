# Mouse Events

## Mouse event types

- `mousedown/mouseup` - Mouse button is clicked/released over an Element
- `mouseover/mouseout` - Mouse pointer comes over/out from an element.
- `mousemove`- Every mouse move over an element triggers that event.
- `click` - Triggers after `mousedown` and then `mouseup` over the same element if the left mouse button was used.
- `dblclick` - Triggers after two clicks on the same element within a short timeframe.
- `contextmenu` - Triggers when the right mouse button is pressed.

## Mouse button

- Click-related events always have the button property, which allows to get the exact mouse button.
- We can get mouse button using `event.button` property.

  ![Mouse Button State](./Button%20State.png)

## Modifiers: shift, alt, ctrl and meta

- All mouse events include the information about pressed modifier keys.
- Event properties:
  - `shiftKey`: Shift
  - `altKey`: Alt (or Opt for Mac)
  - `ctrlKey`: Ctrl
  - `metaKey`: Cmd for Mac
- There are also mobile devices

```html

```

## Coordinates: clientX/Y, pageX/Y

- All mouse events provide coordinates in two flavours:

  - `Window-relative`: clientX and clientY.
  - `Document-relative`: pageX and pageY.

- Priventing Copy

  ```html
  <div oncopy="alert('Copying forbidden!');return false">
    Dear user, The copying is forbidden for you. If you know JS or HTML, then
    you can get everything from the page source though.
  </div>
  ```

## Go back to Custom Events of intro of Events topic

- [Custom Events](../15_intro%20of%20Events/05%20Custom_Events.md)

## Now Learn about Moving Mouse

- [Moving Mouse](./02%20Moving_mouse.md)