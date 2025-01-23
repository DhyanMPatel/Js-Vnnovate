# Modify the Document

# Creating an element

- `document.createElement(tag)` - Creates a new element node with the given tag

  ```js
  let div = document.createElement("div");
  ```

- `document.createTextNode(text)` - Creates a new text node with the given text

  ```js
  let text = document.createTextNode("This is only Text");
  ```

## instertion Method

- There’s a special method `append` for that: `document.body.append(div)`.
- here More Insertion Method.
  - `node.append(...nodes or strings)` – append nodes or strings at the end of node,
  - `node.prepend(...nodes or strings)` – insert nodes or strings at the beginning of node,
  - `node.before(...nodes or strings)` –- insert nodes or strings before node,
  - `node.after(...nodes or strings)` –- insert nodes or strings after node,
  - `node.replaceWith(...nodes or strings)` –- replaces node with the given nodes or strings.

## insertAdjacentHTML/Text/Element

- Syntax - `elem.insertAdjacentHTML(where, html)`.
- Where:
  - `"beforebegin"` – insert html immediately before elem,
  - `"afterbegin"` – insert html into elem, at the beginning,
  - `"beforeend"` – insert html into elem, at the end,
  - `"afterend"` – insert html immediately after elem.

## Node Removal

- To remove a node, there’s a method `node.remove()`.

  ```js
  let div = document.createElement("div");
  div.className = "alert";
  div.innerHTML =
    "<strong>Hi there!</strong> You've read an important message.";

  document.body.append(div);
  setTimeout(() => div.remove(), 1000);
  ```

## Cloning nodes: cloneNode

- The call `elem.cloneNode(true)` creates a “deep” clone of the element – with all attributes and subelements. If we call `elem.cloneNode(false)`, then the clone is made without child elements.

  ```html
  <div class="alert" id="div">
    <strong>Hi there!</strong> You've read an important message.
  </div>

  <script>
    let div2 = div.cloneNode(true); // clone the message
    div2.querySelector("strong").innerHTML = "Bye there!"; // change the clone

    div.after(div2); // show the clone after the existing div
  </script>
  ```

## DocumentFragment

## document.write

- The call to `document.write` only works while the page is loading.

```html
<p>After one second the contents of this page will be replaced...</p>
<script>
  // document.write after 1 second
  // that's after the page loaded, so it erases the existing content
  setTimeout(() => document.write("<b>...By this.</b>"), 1000);
</script>
```
