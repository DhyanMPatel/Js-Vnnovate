# SCSS|SASS

- SCSS is a preprocessor scripting language of CSS that is a `superset of CSS`.
- SCSS is an advanced version of CSS that introduces features such as `variables`, `nesting`, `mixins`, and `functions`. It is part of <strong>SASS (Syntactically Awesome Stylesheets)</strong>.

- SASS is `CSS Preprocessor`.
- SCSS make `.css` and `.css.map` files and add css at runtime.
- After using SCSS, no need to touch `.css` file.
- SCSS write <strong> cleaner, more Maintanable and Reusable Style</strong> using Features like `Variable`, `Functions`, `nesting`, and `mixins`.

## Installation

    npm install -g sass

## Variables

- Variable store values like colors, fonts and size to avoid repetition.

  ```scss
  $primary-color: blue;
  $font-size: 16px;
  $secondary-color: green;

  body {
    color: $primary-color;
    font-size: $font-size;
  }
  ```

## Nesting

- SCSS allow `nested style` to avoid repetition.

  ```scss
  body {
    color: $primary-color;
    font-size: $font-size;
    div {
      color: $secondary-color;

      &:hover {
        /* & - parent element (div) */
        color: yellow;
      }
    }
  }
  ```

## Partials

- We can create partial scss file something like `_partial.scss` that contain small snippets of CSS that we can include in other SCSS file.
- Partial files will not create their `.css` files
- To use Partial file do `@use '_partial.scss';` in other `.SCSS` file.

  ```scss
  /* _base.scss */
  $primary_color: crimson;

  p {
    background-color: burlywood;
    color: $primary_color;
  }
  ```

## Modules

- We should not write all css in one file. So we create Partial scss file and import in other scss file using `@use 'partial'`.

  ```scss
  @use "base";

  div {
    color: base.$primary_color;
    background-color: ;
  }
  ```

## Mixin

- Mixin store Reusable style.

  ```scss
  @mixin button-style($color) {
    background-color: $color;
    color: White;
    font-size: 15px;
    padding: 5px 10px;
  }

  #button {
    @include button-style(#00879e);
  }
  ```

## function & Operators

- SCSS allow function and Operators

  ```scss
  @function double($size) {
    @return $size * 2;
  }

  div {
    font-size: double(10px); // Return - 20px
  }
  ```

## Inheritance

- SCSS also support inheritance using `@extend` keyword.
- `@extend` allows one selector to <strong>inherit</strong> the styles of another selector. This helps in reducing code repetition and keeps styles <strong>consistent</strong>.

  ```scss
  .button {
    background-color: crimson;
    padding: 10px 20px;
  }
  .submit {
    @extend .button;
    font-waight: bold;
  }
  ```

- Use of any selector we can use placeholders `%...`. which <strong>does not generate CSS unless used</strong>.

  ```scss
  %button-style {
    background-color: crimson;
    padding: 10px 20px;
  }
  .button {
    @extend %button-style;
  }
  .submit {
    @extend %button-style;
  }
  ```

### `Note`

- Before CSS3 we use `SASS` then use `SCSS`.
