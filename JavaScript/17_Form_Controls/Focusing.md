# Focusing

- there is `autofocus` HTML attribute which autometically focus on that elem when page loaded.

## Events focus/blur

- The `focus` event is called on focusing, and `blur` – when the element loses the focus.
- The `blur` handler checks if the field has an email entered, and if not – shows an error.
- The `focus` handler hides the error message (on blur it will be checked again):

```html
<style>
  .invalid {
    border-color: red;
  }
  #error {
    color: red;
  }
</style>

Your email please: <input type="email" id="input" />

<div id="error"></div>

<script>
  input.onblur = function () {
    if (!input.value.includes("@")) {
      // not email
      input.classList.add("invalid");
      error.innerHTML = "Please enter a correct email.";
    }
  };

  input.onfocus = function () {
    if (this.classList.contains("invalid")) {
      // remove the "error" indication, because the user wants to re-enter something
      this.classList.remove("invalid");
      error.innerHTML = "";
    }
  };
</script>
```

## focus()/blur()

- We can use Methods `focus()` and `blur()` that use to focus on that Element

```js
input.onblur = function () {
  if (!input.value.includes("@")) {
    this.classList.add("invalid"); // 'this' will refer to that input tag
    error.innerHTML = "Please Correct that.";
    setTimeout(() => input.focus(), 1000); // after an 1s it will focus automatically
  }
};
```

## tabIndex

- tabIndex is interact elements like: `<button>`, `<input>`, `<select>`, `<a>` and so on.
- such as `<div>`, `<span>`, `<table>` – are unfocusable by default. and not focusable anyway.
- Any element becomes focusable if it has `tabindex`. omcluding `div`, `span`, `table`, so on.
- if we have two elements, the first has `tabindex="1"`, and the second has `tabindex="2"`, then pressing Tab while in the first element – moves the focus into the second one.
- If there elem has not any tabIndex then they focused at last of `tabindex` order.
- There are two special values:

  - `tabindex="0"` puts an element among those without tabindex. That is, when we switch elements, elements with `tabindex=0` go after elements with `tabindex ≥ 1` and `default without tabindex` then this will focus.

    - All elem behave acoording to above including button, input, select, a, div, span, table all...
    - Usually it’s used to make an element focusable, but keep the default switching order. To make an element a part of the form on par with `<input>`.

  - `tabindex="-1"` allows only programmatic focusing on an element. The Tab key ignores such elements, but method elem.focus() works.

    - Means focus using only `.focus()` and skipped by tabbing.

```html
<button tabindex="2">Button 1</button>
<div tabindex="0">Focusable Div</div>
<!-- Last -->
<input type="text" tabindex="1" />
<!-- First focus -->
```

## Delegation

- Events `focus` and `blur` do not bubble. Can use capturing state `true`.
- But using `focusin` & `focusout` events – exactly the same as `focus/blur`, but they bubble.
