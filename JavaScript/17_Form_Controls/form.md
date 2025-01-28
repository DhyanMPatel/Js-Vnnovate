# Form

- Using `document.form` we can access form tag in HTML.

## Navigation: form and elements

- special collection `document.forms`, also called 'named collection', it’s both named and ordered.
- form has `forms.elements` properties to get all form elements like input, etc.
- `forms.elemName` property is use to get the Element. and `forms.elemName.name` can set name Property of that element.

```html
<form name="my">
  <input name="one" value="1" />
  <input name="two" value="2" />
</form>
<script>
  // get the form
  let form = document.forms.my; // <form name="my"> element

  // get the element
  let elem = form.elements.one; // <input name="one"> element

  alert(elem.value); // 1
</script>
```

```html
<form>
  <input type="radio" name="age" value="10" />
  <input type="radio" name="age" value="20" />
</form>

<script>
  let form = document.forms[0];

  let ageElems = form.elements.age;

  alert(ageElems[0]); // [object HTMLInputElement]
</script>
```

## Backreference: element.form

- Using `element.form` we can refer to that form

# Form elements

- Let’s talk about form controls.

## input and textarea

- We can access their value as `input.value` (string) or `input.checked` (boolean) for checkboxes and radio buttons.
- Use `textarea.value`, not `textarea.innerHTML` to access value inside textarea.

## select and option

- A `<select>` element has 3 important properties:
  - `select.options` – the collection of `<option>` subelements,
  - `select.value` – the value of the currently selected `<option>`,
  - `select.selectedIndex` – the number of the currently selected `<option>`.
- there is Zero-based indexing.
- this above Option is use for get/set the value

```html
<select id="select">
  <option value="apple">Apple</option>
  <option value="pear">Pear</option>
  <option value="banana">Banana</option>
</select>

<script>
  // all three lines do the same thing
  select.options[2].selected = true;
  select.selectedIndex = 2;
  select.value = "banana";
  // please note: options start from zero, so index 2 means the 3rd option.
</script>
```

- Also we can select multiple option like bellow

```html
<select id="select" multiple>
  <option value="blues" selected>Blues</option>
  <option value="rock" selected>Rock</option>
  <option value="classic">Classic</option>
</select>

<script>
  // get all selected values from multi-select
  let selected = Array.from(select.options)
    .filter((option) => option.selected)
    .map((option) => option.value);

  alert(selected); // blues,rock
</script>
```

## new Option

- Using new Option() we can create that options

```js
option = new Option(text, value, defaultSelected, selected);
```

- here are the parameters:

  - `text` – the text inside the option,
  - `value` – the option value,
  - `defaultSelected` – if `true`, then selected HTML-attribute is created,
  - `selected` – if `true`, then the option is selected.

  ```js
  let option = new Option("Text", "value");
  // creates <option value="value">Text</option>

  let option = new Option("Text", "value", true, true); // same, but selected
  ```

- Option Element have properties:
  - `option.selected`
  - `option.index`
  - `option.text`
