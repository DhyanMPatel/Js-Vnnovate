///

- It gets properties and methods as a superposition of (listed in inheritance order):

  - `HTMLInputElement` – this class provides input-specific properties, like `<input>`
  - `HTMLElement` – it provides common HTML element methods (and getters/setters). basic class for all HTML elements.
  - `Element` – provides generic element methods,
  - `Node` – provides common DOM node properties,
  - `EventTarget` – gives the support for events (to be covered),
    …and finally it inherits from Object, so “plain object” methods like hasOwnProperty are also available.

- But for DOM elements they are different:

  - `console.log(elem)` - shows the element DOM tree.
  - `console.dir(elem)` - shows the element as a DOM object.

- `elem.nodetype` property provide type of DOM node.
  - `elem.nodeType == 1` for element nodes,
  - `elem.nodeType == 3` for text nodes,
  - `elem.nodeType == 9` for the document object,
  - `elem.nodetype == 8` for comment nodes
  - and many more...
  - there are max 12 type of nodeType values
- Difference between `elem.nodeName` and `elem.tagName`
  - `nodeName` represent nodes which can be Element, text, comment.
  - `tagName` represent only Elements
  ```html
  <body>
    <!-- comment -->

    <script>
      // for comment
      alert(document.body.firstChild.tagName); // undefined (not an element)
      alert(document.body.firstChild.nodeName); // #comment

      // for document
      alert(document.tagName); // undefined (not an element)
      alert(document.nodeName); // #document
    </script>
  </body>
  ```
# innerHTML, outerHTML

- The `innerHTML` property allows to get the HTML inside the element as a string. We can also modify it.

  - “innerHTML+=” does a full overwrite

  ```html
    <body>
        <script>
            document.body.innerHTML = "<b>test"; // forgot to close the tag
            alert(document.body.innerHTML); // <b>test</b> (fixed)
        </script>
    </body>

    </body>
  ```

- The `outerHTML` property contains the full HTML of the element. That’s like innerHTML plus the element itself.

  - outerHTML does not change the element. Instead, `it replaces it in the DOM`.

  ```html
  <div id="elem">Hello <b>World</b></div>

  <script>
    alert(elem.outerHTML); // <div id="elem">Hello <b>World</b></div>

    let div = document.querySelector("div");

    // replace div.outerHTML with <p>...</p>
    div.outerHTML = "<p>A new element</p>"; // (*)

    // Wow! 'div' is still the same!
    alert(div.outerHTML); // <div id="elem">Hello <b>World</b></div> (**) it still logs the old <div>, but not longer in DOM.
  </script>
  ```

# nodeValue/data: text node content

- the `innerHTML` property is limited to elements.
- but there is more nodes, to get their values we use `nodeValue`/`data`.

```html
<body>
  Hello
  <!-- Comment -->
  <script>
    let text = document.body.firstChild;
    alert(text.data); // Hello

    let comment = text.nextSibling;
    alert(comment.data); // Comment
  </script>
</body>
```

## text-content: pure text
- The `textContent` provides access to the text inside the element: only text, minus all `<tags>`.

  - Writing to textContent is much more useful, because it allows to write text the “safe way”.

    ```html
    <div id="news">
      <h1>Headline!</h1>
      <p>Martians attack people!</p>
    </div>

    <script>
      // Headline! Martians attack people!
      alert(news.textContent);
    </script>
    ```

- `textContent` take all values as text, so bellow prompt value is also take as a text but `innerHTML` identify that `<b>` tag and bold it.
    ```html
    <div id="elem1"></div>
    <div id="elem2"></div>

    <script>
      let name = prompt("What's your name?", "<b>Winnie-the-Pooh!</b>");

      elem1.innerHTML = name; // Winnie-the-Pooh!, in Bold
      elem2.textContent = name; // <b>Winnie-the-Pooh!</b>
    </script>
    ```

## Hidden

- The “hidden” attribute and the DOM property specifies whether the element is visible or not.
  - `hidden` works the same as `style="display:none"`. But it’s shorter to write.

  ```html
  <div>Both divs below are hidden</div>

  <div hidden>With the attribute "hidden"</div>

  <div id="elem">JavaScript assigned the property "hidden"</div>

  <script>
    elem.hidden = true;
  </script>
  ```

# More Properties

- DOM Object support more properties like `value`, `id`, `type`.
  ```html
  <input type="text" id="elem" value="value">

  <script>
    alert(elem.type); // "text"
    alert(elem.id); // "elem"
    alert(elem.value); // value
  </script>
  ```

# Experiment

- count how many `li` inside that `li`

```js
for (let li of document.querySelectorAll("li")) {
  // get the title from the text node
  let title = li.firstChild.data;

  title = title.trim(); // remove extra spaces from ends

  // get the descendants count
  let count = li.getElementsByTagName("li").length;

  alert(title + ": " + count);
}
```
