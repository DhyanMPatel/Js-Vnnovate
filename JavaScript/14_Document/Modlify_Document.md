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
- When we need to insert a piece of HTML somewhere, `insertAdjacentHTML` is the best fit.
- Where:

  - `"beforebegin"` – insert html immediately before elem,
  - `"afterbegin"` – insert html into elem, at the beginning,
  - `"beforeend"` – insert html into elem, at the end,
  - `"afterend"` – insert html immediately after elem.

  ```html
  <div id="div"></div>
  <script>
    div.insertAdjacentHTML("beforebegin", "<p>Hello</p>");
    div.insertAdjacentHTML("afterending", "<p>Bye</p>");
  </script>
  ```

- The method has two brothers:
  - `elem.insertAdjacentText(where, text)` – the same syntax, but a string of text is inserted “as text” instead of HTML,
  - `elem.insertAdjacentElement(where, elem)` – the same syntax, but inserts an element.

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

## Old insert/Remove Methods

- `parentElem.appendChild(node)` - append at last of parentElem
- `parentElem.removeChild(node)` - remove that node
- `parentElem.replaceChild(node,oldChild)` - replace that child with oldchild
- `parentElem.insertBefore(node,nextSibling)` - insert that node before nextSibling.

```html
<ol id="list">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>
<script>
  let list = document.getElementById("list");
  let appC = document.createElement("li");
  appC.innerHTML = "From appendChild";
  list.appendChild(appC);

  let insert = document.createElement("li");
  insert.innerHTML = "from insertBefore";
  list.insertBefore(insert, list.children[2]);

  let replace = document.createElement("li");
  replace.innerHTML = "from replaceWith";
  list.replaceWith(replace, list.children[2]);

  let remove = list.children[1];
  list.removeChild(remove);
</script>
```

## DocumentFragment

- `DocumentFragment` is a special DOM node that serves as a wrapper to pass around lists of nodes.

```html
<ul id="ul"></ul>

<script>
  function getListContent() {
    let fragment = new DocumentFragment();

    for (let i = 1; i <= 3; i++) {
      let li = document.createElement("li");
      li.append(i);
      fragment.append(li);
    }

    return fragment;
  }

  ul.append(getListContent()); // (*)
</script>
```

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

# Experiment

- Remove all chaild nodes of Element that we touch

```js
function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}

setTimeout(() => clear(elem), 10000);
```

- create Dynamic List.

```js
let ul = document.createElement("ul");
document.body.append(ul);

while (true) {
  let data = prompt("Enter data", "");

  if (!data) {
    break;
  } else {
    let li = document.createElement("li");
    li.textContent = data;
    ul.append(li);
  }
}
```

- create a list based on data Obj.

```js
let data = {
  Fish: {
    trout: {},
    salmon: {},
  },

  Tree: {
    Huge: {
      sequoia: {},
      oak: {},
    },
    Flowering: {
      "apple tree": {},
      magnolia: {},
    },
  },
};

function createTree(container, data) {
  // container.innerHTML = createTreeText(data);
  container.append(createTreeText(data));
}
function createTreeText(data) {
  /*
  /// HTML like approach
  let li = "";
  let ul;

  for (let key in data) {
    li += `<li> ${key + createTreeText(data[key])} </li>`;
  }
  if (li) {
    ul = `<ul> ${li} </ul>`;
  }
  return ul || "";
  */

  let ul = document.createElement("ul");

  for (let key of data) {
    let li = document.createElement("li");
    li.innerHTML = key;

    let childli = createTreeText(data[key]);
    if (childli) {
      li.append(childli);
    }
    ul.append(li);
  }
  return ul;
}
createTree(container, data);
```

- define list length inside list

```js
let lis = document.getElementsByTagName("li");

for (let li of lis) {
  let count = li.getElementsByTagName("li").length;

  if (!count) continue;

  li.firstChild.data += `[${count}]`;
}
```

- Create a calender

```js
function createCalendar(elem, year, month) {
  let mon = month - 1; // months in JS are 0..11, not 1..12
  let d = new Date(year, mon);

  let table =
    "<table><tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr><tr>";

  // spaces for the first row
  // from Monday till the first day of the month
  // * * * 1  2  3  4
  for (let i = 0; i < getDay(d); i++) {
    table += "<td></td>";
  }

  // <td> with actual dates
  while (d.getMonth() == mon) {
    table += "<td>" + d.getDate() + "</td>";

    if (getDay(d) % 7 == 6) {
      // sunday, last day of week - newline
      table += "</tr><tr>";
    }

    d.setDate(d.getDate() + 1);
  }

  // add spaces after last days of month for the last row
  // 29 30 31 * * * *
  // if (getDay(d) != 0) {
  //   for (let i = getDay(d); i < 7; i++) {
  //     table += '<td></td>';
  //   }
  // }

  // close the table
  table += "</tr></table>";

  elem.innerHTML = table;
}

function getDay(date) {
  // get day number from 0 (monday) to 6 (sunday)
  let day = date.getDay();
  if (day == 0) day = 7; // make Sunday (0) the last day
  return day - 1;
}

createCalendar(calendar, 2012, 9);
```

- insert HTML in list

```js
let ul = document.createElement("ul");
ul.id = "ul";

ul.insertAdjacentHTML("beforeend", "<li>1</li> <li>2</li>");

ul.insertAdjacentHTML("afterbegin", "<li>3</li>");

document.body.append(ul);
```

- color clock with setInterval

```js
let timerId;
function updateClock() {
  const clock = document.getElementById("clock");
  let date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (hours < 10) hours += `0${hours}`;
  if (minutes < 10) minutes += `0${minutes}`;
  if (seconds < 10) seconds += `0${seconds}`;

  clock.children[0].innerHTML = hours;
  clock.children[1].innerHTML = minutes;
  clock.children[2].innerHTML = seconds;
}

function clockStart() {
  if (!timerId) {
    timerId = setInterval(updateClock, 1000);
  }
  updateClock();
}
function clockStop() {
  clearInterval(timerId);
  timerId = null;
}
```

- Sort the table

```js
let sortedRows = Array.from(table.tBodies[0].rows).sort((rowA, rowB) =>
  rowA.cells[0].innerHTML.localeCompare(rowB.cells[0].innerHTML)
);

table.tBodies[0].append(...sortedRows);
```
