- tag is `<body id="page">`, the DOM object has `body.id="page"`

# DOM Properties

- DOM nodes are regular JavaScript objects
- DOM properties are not always strings. For instance, the `input.checked` property (for checkboxes) is a boolean.

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

- `standard attribute` for one element can be unknown for another one. For instance, "type" is standard for `<input>`, but not for `<body>`.
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

## Non-standard attributes, dataset

- Sometimes non-standard attributes are used to <b>pass custom data from HTML to JavaScript</b>, or to “mark” HTML-elements for JavaScript

```html
<!-- mark the div to show "name" here -->
<div show-info="name"></div>
<!-- and age here -->
<div show-info="age"></div>

<script>
  // the code finds an element with the mark and shows what's requested
  let user = {
    name: "Pete",
    age: 25,
  };

  for (let div of document.querySelectorAll("[show-info]")) {
    // insert the corresponding info into the field
    let field = div.getAttribute("show-info");
    div.innerHTML = user[field]; // first Pete into "name", then 25 into "age"
  }
</script>
```

- All attributes starting with “data-” are reserved for programmers’ use. They are available in the `dataset` property.
- for instance, if an `elem` has an attribute named "data-about", it’s available as `elem.dataset.about`.

```html
<body data-about="Elephants">
  <script>
    alert(document.body.dataset.about); // Elephants
  </script>
</body>
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
      let div = document.querySelector("[data-widget-name]");

      alert(div.getAttributes("data-widget-name"));
    </script>
  </body>
</html>
```

- Make External link orange

```js
let a = document.queryselectorAll("a");
for (let link of a) {
  let href = a.getAttribute("href");
  if (href.includes("://")) continue;
  if (href.startsWith("http://internal.com")) continue;
  link.style.color = "orange";
}
```

## Go back to Node Properties

- [Node Properties](./05%20Node_Properties.md)

## Now Learn Modifying the Document

- [Modifying the Document](./07%20Modlify_Document.md)