## 2. Core Concepts (Fundamentals)

### Variables

**Simple Explanation:** Variables are like labeled containers where you store values you want to reuse.

**Technical Implementation:**
```scss
// Variables store reusable values
$primary-color: #3b82f6;
$font-size-base: 16px;
$spacing-unit: 8px;
$border-radius: 4px;

// Usage
.button {
  background-color: $primary-color;
  font-size: $font-size-base;
  padding: $spacing-unit * 2;
  border-radius: $border-radius;
}
```

### Nesting

**Simple Explanation:** Nesting lets you write CSS rules inside other rules, just like folders inside folders.

**Technical Implementation:**
```scss
// Instead of writing repeated selectors
.navigation { }
.navigation ul { }
.navigation ul li { }
.navigation ul li a { }

// Use nesting
.navigation {
  ul {
    li {
      a {
        color: $primary-color;
        
        &:hover {  // & refers to parent selector
          text-decoration: underline;
        }
      }
    }
  }
}
```

### Partials and Import System

**Simple Explanation:** Partials are small CSS files that you combine into one big file, like chapters in a book.

**Technical Implementation:**
```scss
// _variables.scss (partial files start with _)
$primary-color: #3b82f6;
$secondary-color: #ef4444;

// _mixins.scss
@mixin button-style {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
}

// main.scss
@import 'variables';
@import 'mixins';

.button {
  @include button-style;
  background-color: $primary-color;
}
```

### Mixins

**Simple Explanation:** Mixins are like reusable recipes that you can include anywhere in your CSS.

**Technical Implementation:**
```scss
// Define a mixin
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin button($bg-color, $text-color: white) {
  padding: 12px 24px;
  background-color: $bg-color;
  color: $text-color;
  border: none;
  border-radius: 4px;
  
  &:hover {
    background-color: darken($bg-color, 10%);
  }
}

// Use mixins
.header {
  @include flex-center;
}

.primary-button {
  @include button($primary-color);
}
```

### Functions

**Simple Explanation:** Functions are like calculators that take inputs and give you back results.

**Technical Implementation:**
```scss
// Built-in functions
$lighter-blue: lighten($primary-color, 20%);
$darker-blue: darken($primary-color, 20%);
$transparent-blue: rgba($primary-color, 0.5);

// Custom functions
@function rem($pixels) {
  @return ($pixels / 16px) * 1rem;
}

@function strip-unit($number) {
  @if type-of($number) == 'number' and not unitless($number) {
    @return $number / ($number * 0 + 1);
  }
  @return $number;
}

// Usage
.container {
  font-size: rem(18px);  // 1.125rem
  margin: strip-unit(24px) * 1rem;  // 1.5rem
}
```

### Inheritance (@extend)

**Simple Explanation:** @extend is like copying styles from one class to another, but more efficiently.

**Technical Implementation:**
```scss
%button-base {  // % makes it a placeholder class (won't be output)
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
}

.primary-button {
  @extend %button-base;
  background-color: $primary-color;
  color: white;
}

.secondary-button {
  @extend %button-base;
  background-color: transparent;
  color: $primary-color;
  border: 2px solid $primary-color;
}
```

### Operators

**Simple Explanation:** Operators let you do math in your CSS, like calculating spacing or colors.

**Technical Implementation:**
```scss
.container {
  width: 100% - 200px;  // Subtraction
  height: 500px / 3;    // Division
  margin: 10px * 2;     // Multiplication
  font-size: 14px + 2px; // Addition
}

$base-spacing: 8px;
$spacing-scale: (
  'small': $base-spacing * 0.5,    // 4px
  'medium': $base-spacing,          // 8px
  'large': $base-spacing * 2,       // 16px
  'xlarge': $base-spacing * 3       // 24px
);
```

### Control Directives

**Simple Explanation:** Control directives are like if-else statements and loops that help you write smarter CSS.

**Technical Implementation:**
```scss
// @if directive
@mixin button-size($size) {
  @if $size == 'small' {
    padding: 8px 16px;
    font-size: 14px;
  } @else if $size == 'large' {
    padding: 16px 32px;
    font-size: 18px;
  } @else {
    padding: 12px 24px;
    font-size: 16px;
  }
}

// @for loop
@for $i from 1 through 6 {
  h#{$i} {
    font-size: 2rem - ($i * 0.2rem);
    margin-bottom: 1rem / $i;
  }
}

// @each loop
$colors: ('primary': #3b82f6, 'secondary': #ef4444, 'success': #10b981);

@each $name, $color in $colors {
  .btn-#{$name} {
    background-color: $color;
    
    &:hover {
      background-color: darken($color, 10%);
    }
  }
}

// @while loop
$columns: 12;
$column-width: 100% / $columns;

@while $columns > 0 {
  .col-#{$columns} {
    width: $column-width * $columns;
  }
  $columns: $columns - 1;
}
```

### SCSS vs Indented SASS Syntax

**SCSS (Sassy CSS):**
```scss
// Uses braces and semicolons (like CSS)
.container {
  width: 100%;
  .child {
    color: blue;
  }
}
```

**Indented SASS:**
```sass
// Uses indentation (no braces or semicolons)
.container
  width: 100%
  .child
    color: blue
```
