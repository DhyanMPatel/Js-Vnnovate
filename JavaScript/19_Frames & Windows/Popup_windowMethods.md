# Popup

- Still, there are tasks where `popups` are still used, e.g. for `OAuth authorization` (login with Google/Facebook/…)

- Most browsers block popups if they are called outside of user-triggered event handlers like `onclick`.

## window.open

- Syntax

  ```js
  window.open(url, name, params);
  ```

  - `url`: URL to load into new window.
  - `name`: Name of new Window.
  - `params`: configiration string for new window. there is no space between params e.g., `width=200,height=100`

- Example:

  ```js
  /// Will block
  window.open("https://javascript.info/");

  /// will Trigger in click
  button.onclick = function () {
    window.open("https://javascript.info/");
  };
  ```

- Setting for `params`,

  - Position (numeric):

    1. `width/height`:
    2. `left/top`:

  - Window Features (yes/no):
    1. `menubar`:
    2. `toolbar`:
    3. `scrollbar`:
    4. `location`:
    5. `resizable`:
    6. `status`:

- Rules for omitted settings:
  - If there are some feature are omitted then that features will consider with value `no`.
  - If we will not provide `left/top` feature then window will open near to last window opened.
  - If we will not provide `width/height` feature then window will take last opened window height & width.
  - In last, If there is no 3rd cell in `open()` means if we not provide params then default window parameters are used

### Accessing popup from window

- `open` call return reference of new window.

  ```js
  let newWindow = open(
    "https://javadcript.info",
    "example",
    "width=500,height=500"
  );
  newWindow.focus();

  alert(newWindow.location.href); // (*) about:blank, loading hasn't started yet

  newWindow.onload = function () {
    let html = `<div style="font-size:30px">Welcome!</div>`; // this will write at start
    newWindow.document.body.insertAdjacentHTML("afterbegin", html);
  };
  ```

- this Example describe that through main window we can modify content of popup window.

### Accessing window from popup

- A popup may access the `“opener”` window as well using `window.opener` reference. It is `null` for all windows except popups.

```js
let newWindow = window.open("", "Hello", "width=200,height=200");

newWindow.document.write(
  "<script>window.opener.document.body.innerHTML = 'Test'</script>" // this will change whole content of current window (not popup window) with 'text'
);
```

## window.close()

- To close window - `newWindow.close()`
- To check if window closed - `newWindow.closed`

- `window.close()` is there but window ignored if window is not created with `window.open()`. So popup window use this method only.

```js
let newWindow = open("/", "example", "width=300,height=300");

newWindow.onload = function () {
  newWindow.close();
  alert(newWindow.closed); // Return - true
};
```

## Moving/Resizing

- There are methods to move and Resize window

  - `newWindow.moveTo(x,y)` - scroll to give coordinates
  - `newWindow.moveBy(x,y)` - scroll window `Xpx` right and `Ypx` down. Nagative values are allowed.
  - `newWindow.resizeTo(w,h)` - Resize window to given size.
  - `newWindow.resizeBy(w,h)` - Resize window by given `width/height`

- There’s also `window.onresize` event.
- Note :- we can't modify and minimize the current window. These OS-level functions are hidden from Frontend-developers.

## Scrolling a window

- `newWindow.scrollBy(x,y)` - scroll window by `Xpx` right and `Ypx` down.
- `newWindow.scrollTo(x,y)` - scroll to given x,y coordinates
- `elem.scrollIntoView(top=true/false)` - scroll untill `elem` show at `top/bottom` according to `true/false`.
- There’s also `window.onscroll` event.

## focus/blue

- `newWindow.focus()` to insure that user is now on popup window.


## Go back to Resource loading: onload & onerror

- [Resource loading: onload & onerror](../18_Document%20&%20Resource%20Load/Resource%20loading.md)

## Now Learn about Cross window Communication

- [Cross window Communication](./Cross_window%20Comunication.md)