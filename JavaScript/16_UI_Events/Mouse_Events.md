# Mouse Events

## Mouse event types

- mousedown/mouseup
- mouseover/mouseout
- mousemove
- click
- dblclick
- contextmenu

## Mouse button

- Click-related events always have the button property, which allows to get the exact mouse button.

  ![Mouse Button State](./Button%20State.png)

## Modifiers: shift, alt, ctrl and meta

- All mouse events include the information about pressed modifier keys.
- Event properties:
  - `shiftKey`: Shift
  - `altKey`: Alt (or Opt for Mac)
  - `ctrlKey`: Ctrl
  - `metaKey`: Cmd for Mac
- There are also mobile devices

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
