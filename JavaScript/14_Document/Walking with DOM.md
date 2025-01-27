# DOM 
- We can’t replace a child by something else by assigning `childNodes[i] = ...`. there are other methods to do this.


## top Node
- `<html> = document.documentElement`
- `<head> = document.head`
- `<body> = document.body`
- There’s a catch: `document.body` can be `null`. because `Script` can't access an element that doesn't exist at moment of running 

## Children
- The `childNodes` collection lists all child nodes, including text nodes. also include `<script>` node.
- Properties `firstChild` and `lastChild` give fast access to the first and last children.

  ```js
  elem.childNodes[0] === elem.firstChild;
  elem.childNodes[elem.childNodes.length - 1] === elem.lastChild;
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
- The `parentElement` property returns the “element” parent, while `parentNode` returns “any node” parent

  ```js
  alert(document.body.parentNode); // document
  alert(document.body.parentElement); // null
  ```

## Element-only Navigation

- `children` – only those children that are element nodes.
- `firstElementChild`, `lastElementChild` – first and last element children.
- `previousElementSibling`, `nextElementSibling` – neighbor elements.
- `parentElement` – parent element.


## Table

- `table.rows` – the collection of `<tr>` elements of the table.
- `table.caption/tHead/tFoot` – references to elements `<caption>, <thead>, <tfoot>`.
- `table.tBodies` – the collection of `<tbody>` elements

- `tbody.rows` – the collection of `<tr>` inside

- `tr.cells` – the collection of `<td>` and `<th>` cells inside the given `<tr>`.
- `tr.sectionRowIndex` – the position (index) of the given `<tr>` inside the enclosing `<thead>/<tbody>/<tfoot>`.
- `tr.rowIndex` – the number of the `<tr>` in the table as a whole

- `td.cellIndex` – the number of the cell inside the enclosing `<tr>`.

## Experiment

- `elem.lastChild.nextSibling` is always `null`
- `elem.children[0].previousSibling` is not always `null`. because some time it may be `text Node`

- Select all Diagonal Cells

```js
let table = document.body.firstElementChild;

for (let i = 0; i < table.rows.length; i++) {
  let row = table.rows[i];

  row.cells[i].style.backgroundColor = "red";
}
```