# Events

- this Events on Data

## Event: Change

- The `change` event triggers when the element has finished changing.
  ```html
  <select onchange="alert(this.value)">
    <option value="">Select something</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
  ```

## Event: Input

- The `input` event triggers every time after a value is modified by the user.

```html
<input type="text" id="input" /> oninput: <span id="result"></span>
<script>
  input.oninput = function () {
    result.innerHTML = input.value;
  };
</script>
```

## Event: Cut, Copy, Paste

- We also can use `event.preventDefault()` to abort the action, then nothing gets `copied/pasted`. Means if we use at `onpaste` then input tag will not get any value inside their that we copied from any where.
- `clipboardData` implements DataTransfer interface, commonly used for `drag’n’drop` and `copy/pasting` use to copy/paste on just Text but every thing. for instance, we can copy a file in the OS file manager, and paste it

```html
<input type="text" id="input" />
<script>
  input.onpaste = function (event) {
    alert("paste: " + event.clipboardData.getData("text/plain"));
    event.preventDefault(); // will not paste any text inside input
  };

  input.oncut = input.oncopy = function (event) {
    alert(event.type + "-" + document.getSelection());
    event.preventDefault();
  };
</script>
```

- `document.getSelection()` to get the selected text.
- `event.clipboardData.getData(...)` contain plain text of copied thing.
