# document.getElementById or just id

- don’t use id-named global variables to access elements
- In real life `document.getElementById` is the preferred method.

  ```html
  <div id="elem">
    <div id="elem-content">Element</div>
  </div>

  <script>
    // get the element
    let elem = document.getElementById("elem");

    // make its background red
    elem.style.background = "red";
  </script>
  ```

# querySelectorAll

- `elem.querySelectorAll(css)` returns all elements inside `elem` matching the given CSS selector
- Can use pseudo-classes as well

  ```html
  <ul>
    <li>The</li>
    <li>test</li>
  </ul>
  <ul>
    <li>has</li>
    <li>passed</li>
  </ul>
  <script>
    let eles = document.querySelectorAll("ul > li:last-child");

    for (let ele of eles) {
      alert(ele);
    }
  </script>
  ```

# querySelector

- `elem.querySelector(css)` returns the first element for the given CSS selector.
- It’s faster and also shorter to write

  ```html
  <a href="http://example.com/file.zip">...</a>
  <a href="http://ya.ru">...</a>

  <script>
    // can be any collection instead of document.body.children
    for (let elem of document.body.children) {
      if (elem.matches('a[href$="zip"]')) {
        alert("The archive reference: " + elem.href);
      }
    }
  </script>
  ```

# closest

- the method `closest` goes up from the element and checks each of parents. If it matches the selector, then the search stops, and the ancestor is returned.

```html
<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 2</li>
  </ul>
</div>
<script>
  let chapter = document.querySelector("chapter"); // li

  alert(chapter.closest(".book")); //  ul
  alert(chapter.closest(".contents")); //  div

  alert(chapter.closest("h1")); // null (because h1 is not an ancestor)
</script>
```

# getElementsBy

- Don’t forget the "s" letter! except `getElementById()`
- It returns a collection, not an element!

```js
// doesn't work
document.getElementsByTagName("input").value = 5;

// should work (if there's an input)
document.getElementsByTagName("input")[0].value = 5;
```

- `elem.getElementsByTagName(tag)` - looks for elements with the given tag and `returns the collection` of them. The tag parameter can also be a star "\*" for “any tags”.
- `elem.getElementsByClassName(className)` - returns elements that have the given CSS class.
- `document.getElementsByName(name)` - returns elements with the given name attribute, document-wide. Very rarely used.

```html
<table id="table">
  <tr>
    <td>Your age:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked /> less than 18
      </label>
      <label>
        <input type="radio" name="age" value="mature" /> from 18 to 50
      </label>
      <label>
        <input type="radio" name="age" value="senior" /> more than 60
      </label>
    </td>
  </tr>
</table>

<script>
  let inputs = table.getElementsByTagName("input");

  for (let input of inputs) {
    alert(input.value + ": " + input.checked);
  }
</script>
```

```Html
<form name="my-form">
  <div class="article">Article</div>
  <div class="long article">Long article</div>
</form>

<script>
  // find by name attribute
  let form = document.getElementsByName('my-form')[0];

  // find by class inside the form
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, found two elements with class "article"
</script>
```

## Live collections

- All methods `"getElementsBy*"` return a live collection. Such collections always reflect the current state of the document and “auto-update” when it changes.

```html
<div>First div</div>

<script>
  let divs = document.getElementsByTagName("div");
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
  alert(divs.length); // 2
</script>
```

- `querySelectorAll` returns a `static collection`. It’s like a fixed array of elements.

```html
<div>First div</div>

<script>
  let divs = document.querySelectorAll("div");
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
  alert(divs.length); // 1
</script>
```

### Note

- `document.getElementById("id")` and `document.querySelector("Css like Selector")` is identify Single Element
- `document.getElementsByclassName('class')`, `document.getElementsBytagName('tag')` and `document.querySelectorAll("Css like Selector")` is identify list of Elements.

# Experiment

```js
// 1. The table with `id="age-table"`.
let table = document.getElementById("age-table");

// 2. All label elements inside that table
table.getElementsByTagName("label");
// or
document.querySelectorAll("#age-table label");

// 3. The first td in that table (with the word "Age")
table.rows[0].cells[0];
// or
table.getElementsByTagName("td")[0];
// or
table.querySelector("td");

// 4. The form with the name "search"
// assuming there's only one element with name="search" in the document
let form = document.getElementsByName("search")[0];
// or, form specifically
document.querySelector('form[name="search"]');

// 5. The first input in that form.
form.getElementsByTagName("input")[0];
// or
form.querySelector("input");

// 6. The last input in that form
let inputs = form.querySelectorAll("input"); // find all inputs
inputs[inputs.length - 1]; // take the last one
```
