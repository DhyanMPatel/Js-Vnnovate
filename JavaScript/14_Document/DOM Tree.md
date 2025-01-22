# DOM Tree

- The backbone of an HTML document is tags.
- `document.body` is the object representing the <body> tag.

  ![tags as Document](./tag%20as%20document.png)

- The text inside elements forms text nodes, labelled as `#text`. A text node contains only a string. It may not have children and is always a leaf of the tree.
- Spaces and newlines are totally valid characters
- Spaces at string start/end and space-only text nodes are usually hidden in tools
- Tables always have <tbody>
- In the DOM world `null` means “doesn’t exist”

  ```js
    <html> = document.documentElement

    <body> = document.body

    <head> = document.head
  ```

- The `childNodes` collection lists all child nodes, including text nodes.

  ```html
  <html>
    <body>
      <div>Begin</div>

      <ul>
        <li>Information</li>
      </ul>

      <div>End</div>

      <script>
        for (let i = 0; i < document.body.childNodes.length; i++) {
          alert(document.body.childNodes[i]); // Text, DIV, Text, UL, ..., SCRIPT
        }
      </script>
      ...more stuff...
    </body>
  </html>
  ```

## DOM Collection

- DOM collections are read-only
- DOM collections are live, means they reflect the current state of DOM
- Properties `firstChild` and `lastChild` give fast access to the first and last children.

  ```js
  elem.childNodes[0] === elem.firstChild;
  elem.childNodes[elem.childNodes.length - 1] === elem.lastChild;
  ```

- We can use `for..of` to iterate over it:

  ```js
  for (let node of document.body.childNodes) {
    alert(node); // shows all nodes from the collection
  }
  ```

- Don’t use for..in to loop over collections
- The parentElement property returns the “element” parent, while parentNode returns “any node” parent

  ```js
  alert(document.body.parentNode); // document
  alert(document.body.parentElement); // null
  ```

### Table

- `table.rows` – the collection of <tr> elements of the table.
- `table.caption/tHead/tFoot` – references to elements <caption>, <thead>, <tfoot>.
- `table.tBodies` – the collection of <tbody> elements

- `tbody.rows` – the collection of <tr> inside

- `tr.cells` – the collection of <td> and <th> cells inside the given <tr>.
- `tr.sectionRowIndex` – the position (index) of the given <tr> inside the enclosing <thead>/<tbody>/<tfoot>.
- `tr.rowIndex` – the number of the <tr> in the table as a whole

- `td.cellIndex` – the number of the cell inside the enclosing <tr>.
