# Submit Event in Form

- The submit event triggers when the form is submitted
- There are two main ways to submit a form:

  - The `first` – to click `<input type="submit">` or `<input type="image">`.
  - The `second` – press Enter on an input field.

```html
<form onsubmit="alert('submit!');return false">
  First: Enter in the input field <input type="text" value="text" /><br />
  Second: Click "submit": <input type="submit" value="Submit" /><br />
  Third: Click 'Image': <input type="image" src="image.png" alt="Submit" />
</form>
```

- By the way if we use `type="image"` we can pass Coordinates of `x` and `y` where we clicked.
- thats funny but it there: When a form is sent using `Enter` on an input field, a `click` event triggers on the `<input type="submit">`.

  ```html
  <form onsubmit="return false">
    <input type="text" size="30" value="Focus here and press enter" />
    <input type="submit" value="Submit" onclick="alert('click')" />
  </form>
  ```

# Submit method in Form

- To submit a form to the server manually, we can call `form.submit()`.
- The method `form.submit()` allows to initiate form sending from JavaScript. We can use it to dynamically create and send our own forms to server.

```js
let form = document.createElement("form");
form.action = "https://google.com/search";
form.method = "GET";

form.innerHTML = '<input name="q" value="test">';

// the form must be in the document to submit it
document.body.append(form);

form.submit();
```
