- tag is `<body id="page">`, the DOM object has `body.id="page"`

# DOM Properties

- DOM nodes are regular JavaScript objects

```js
document.body.myData = {
  name: "Caesar",
  title: "Imperator",
};
alert(document.body.myData.title); // Return - Imperator

document.body.sayTagName = function () {
  alert(this.tagName);
};

document.body.sayTagName(); // Return - BODY (the value of "this" in the method is document.body)
```

- We can also modify built-in Prototype

```js
Element.prototype.sayHi = function () {
  alert(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi(); // Hello, I'm BODY
```

- `input.checked` property (for checkboxes) is a boolean

# HTML Attributes

- All attributes are accessible by using the following methods:

  - `elem.hasAttribute(name)` – checks for existence.
  - `elem.getAttribute(name)` – gets the value.
  - `elem.setAttribute(name, value)` – sets the value.
  - `elem.removeAttribute(name)` – removes the attribute.

    ```html
    <body something="non-standard">
      <script>
        alert(document.body.getAttribute("something")); // non-standard
      </script>
    </body>
    ```

# Property-attribute Syncronization

- When a standard attribute changes, the corresponding property is auto-updated, and (with some exceptions) vice versa.

```html
<input />

<script>
  let input = document.querySelector("input");

  // attribute => property
  input.setAttribute("id", "id");
  alert(input.id); // id (updated)

  // property => attribute
  input.id = "newId";
  alert(input.getAttribute("id")); // newId (updated)
</script>
```

# Experiment

- Attributes – is what’s written in HTML.
- Properties – is what’s in DOM objects.

- get Attribute
```html
<!DOCTYPE html>
<html>
<body>

  <div data-widget-name="menu">Choose the genre</div>

  <script>
    /* your code */
    let div = document.querySelector('[data-widget-name]')

    alert(div.getAttributes('data-widget-name'))
  </script>
</body>
</html>
```

- Make External link orange
```js
let a = document.queryselectorAll('a')
for(let link of a){
  let href = a.getAttribute('href')
  if(href.includes("://")) continue;
  if(href.startsWith('http://internal.com')) continue;
  link.style.color = 'orange';
}