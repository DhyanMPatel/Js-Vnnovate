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
