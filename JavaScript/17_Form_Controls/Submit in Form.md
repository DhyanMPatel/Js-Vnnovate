# Submit Event in Form

- The submit event triggers when the form is submitted

```html
<form onsubmit="alert('submit!');return false">
  First: Enter in the input field <input type="text" value="text" /><br />
  Second: Click "submit": <input type="submit" value="Submit" />
</form>
```

# Submit method in Form

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
