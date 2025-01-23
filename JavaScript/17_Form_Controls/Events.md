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

```html
<input type="text" id="input" />
<script>
  input.onpaste = function (event) {
    alert("paste: " + event.clipboardData.getData("text/plain"));
    event.preventDefault();
  };

  input.oncut = input.oncopy = function (event) {
    alert(event.type + "-" + document.getSelection());
    event.preventDefault();
  };
</script>
```
