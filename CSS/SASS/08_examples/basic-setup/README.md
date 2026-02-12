# Basic SASS Setup Example

A complete, working example of a basic SASS project setup demonstrating core concepts and best practices.

## Project Structure

```
basic-setup/
├── scss/
│   ├── abstracts/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── _functions.scss
│   ├── base/
│   │   ├── _reset.scss
│   │   └── _typography.scss
│   ├── components/
│   │   ├── _buttons.scss
│   │   ├── _cards.scss
│   │   └── _forms.scss
│   ├── layout/
│   │   ├── _header.scss
│   │   ├── _footer.scss
│   │   └── _grid.scss
│   └── main.scss
├── css/
│   ├── main.css
│   └── main.min.css
├── index.html
├── package.json
└── README.md
```

## Features Demonstrated

- ✅ **Variables** - Colors, spacing, typography
- ✅ **Mixins** - Reusable style blocks
- ✅ **Functions** - Dynamic calculations
- ✅ **Nesting** - Clean selector organization
- ✅ **Partials** - Modular file structure
- ✅ **Import system** - Organized compilation
- ✅ **Responsive design** - Mobile-first approach
- ✅ **BEM methodology** - Consistent naming

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Compile SASS**
   ```bash
   npm run build
   ```

3. **Watch for changes**
   ```bash
   npm run watch
   ```

4. **Open in browser**
   ```bash
   npm run serve
   ```

## Key Files Explained

### Variables (`scss/abstracts/_variables.scss`)

```scss
// Color palette
$colors: (
  'primary': #3b82f6,
  'secondary': #64748b',
  'success': #10b981,
  'warning': #f59e0b',
  'error': #ef4444',
  'neutral': (
    '50': #f9fafb,
    '100': #f3f4f6',
    '200': #e5e7eb',
    '300': #d1d5db',
    '400': #9ca3af',
    '500': #6b7280',
    '600': #4b5563',
    '700': #374151',
    '800': #1f2937',
    '900': #111827'
  )
);

// Typography scale
$font-sizes: (
  'xs': 0.75rem,
  'sm': 0.875rem,
  'base': 1rem,
  'lg': 1.125rem,
  'xl': 1.25rem,
  '2xl': 1.5rem,
  '3xl': 1.875rem,
  '4xl': 2.25rem,
  '5xl': 3rem
);

// Spacing system
$spacing: (
  '0': 0,
  '1': 0.25rem,
  '2': 0.5rem,
  '3': 0.75rem,
  '4': 1rem,
  '5': 1.25rem,
  '6': 1.5rem,
  '8': 2rem,
  '10': 2.5rem,
  '12': 3rem,
  '16': 4rem,
  '20': 5rem,
  '24': 6rem
);

// Breakpoints
$breakpoints: (
  'sm': 640px,
  'md': 768px,
  'lg': 1024px,
  'xl': 1280px,
  '2xl': 1536px
);

// Border radius
$border-radius: (
  'none': 0,
  'sm': 0.125rem,
  'base': 0.25rem,
  'md': 0.375rem,
  'lg': 0.5rem,
  'xl': 0.75rem,
  'full': 9999px
);

// Shadows
$shadows: (
  'sm': 0 1px 2px 0 rgba(0, 0, 0, 0.05),
  'base': 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06),
  'md': 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06),
  'lg': 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05),
  'xl': 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
);
```

### Mixins (`scss/abstracts/_mixins.scss`)

```scss
// Responsive breakpoint mixin
@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  } @else {
    @warn "Breakpoint `#{$breakpoint}` not found in $breakpoints map.";
  }
}

// Flex center mixin
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

// Button base mixin
@mixin button-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: map-get($spacing, '3') map-get($spacing, '6');
  border: none;
  border-radius: map-get($border-radius, 'md');
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:focus {
    outline: 2px solid map-get($colors, 'primary');
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

// Card base mixin
@mixin card-base {
  background: white;
  border-radius: map-get($border-radius, 'lg');
  box-shadow: map-get($shadows, 'base');
  padding: map-get($spacing, '6');
  border: 1px solid map-get($colors, 'neutral', '200');
}

// Truncate text mixin
@mixin text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// Visually hidden mixin
@mixin visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Functions (`scss/abstracts/_functions.scss`)

```scss
// Strip unit from number
@function strip-unit($number) {
  @if type-of($number) == 'number' and not unitless($number) {
    @return $number / ($number * 0 + 1);
  }
  @return $number;
}

// Convert px to rem
@function rem($pixels) {
  @return (strip-unit($pixels) / 16) * 1rem;
}

// Convert px to em
@function em($pixels, $context: 16) {
  @return (strip-unit($pixels) / strip-unit($context)) * 1em;
}

// Get color from nested map
@function color($color-path...) {
  $color: map-get($colors, $color-path...);
  
  @if $color {
    @return $color;
  } @else {
    @warn "Color `#{inspect($color-path)}` not found in $colors map.";
    @return black;
  }
}

// Get spacing value
@function spacing($size) {
  @return map-get($spacing, $size);
}

// Calculate fluid typography
@function fluid-type($min-size, $max-size, $min-vw: 320, $max-vw: 1200) {
  @return calc(
    #{$min-size} + 
    #{strip-unit($max-size - $min-size)} * 
    ((100vw - #{$min-vw}px) / #{strip-unit($max-vw - $min-vw)})
  );
}

// Generate color variations
@function color-variant($base-color, $lightness-adjustment: 10%) {
  $new-lightness: lightness($base-color) + $lightness-adjustment;
  @return change-color($base-color, $lightness: $new-lightness);
}
```

### Buttons Component (`scss/components/_buttons.scss`)

```scss
.btn {
  @include button-base;
  
  // Variants
  &--primary {
    background-color: color('primary');
    color: white;
    
    &:hover:not(:disabled) {
      background-color: color-variant(color('primary'), -10%);
    }
    
    &:active:not(:disabled) {
      background-color: color-variant(color('primary'), -20%);
    }
  }
  
  &--secondary {
    background-color: color('secondary');
    color: white;
    
    &:hover:not(:disabled) {
      background-color: color-variant(color('secondary'), -10%);
    }
  }
  
  &--outline {
    background-color: transparent;
    color: color('primary');
    border: 1px solid color('primary');
    
    &:hover:not(:disabled) {
      background-color: color('primary');
      color: white;
    }
  }
  
  &--ghost {
    background-color: transparent;
    color: color('neutral', '600');
    
    &:hover:not(:disabled) {
      background-color: color('neutral', '100');
      color: color('neutral', '900');
    }
  }
  
  // Sizes
  &--sm {
    padding: spacing('2') spacing('4');
    font-size: map-get($font-sizes, 'sm');
  }
  
  &--lg {
    padding: spacing('4') spacing('8');
    font-size: map-get($font-sizes, 'lg');
  }
  
  // Icon button
  &--icon {
    padding: spacing('3');
    width: 2.5rem;
    height: 2.5rem;
  }
  
  // Full width on mobile
  &--full-mobile {
    width: 100%;
    
    @include respond-to('sm') {
      width: auto;
    }
  }
}

// Button group
.btn-group {
  display: flex;
  
  .btn {
    &:not(:first-child) {
      margin-left: -1px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    
    &:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    
    &:focus {
      z-index: 1;
    }
  }
}
```

### Grid Layout (`scss/layout/_grid.scss`)

```scss
// Container
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 spacing('4');
  
  @include respond-to('sm') {
    padding: 0 spacing('6');
  }
  
  @include respond-to('lg') {
    padding: 0 spacing('8');
  }
}

// Grid system
.grid {
  display: grid;
  gap: spacing('4');
  
  // Auto-fit columns
  &--auto-fit {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  &--auto-fill {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  
  // Fixed columns
  &--2-cols {
    grid-template-columns: repeat(2, 1fr);
    
    @include respond-to('sm') {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  &--3-cols {
    grid-template-columns: 1fr;
    
    @include respond-to('md') {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @include respond-to('lg') {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  &--4-cols {
    grid-template-columns: 1fr;
    
    @include respond-to('sm') {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @include respond-to('md') {
      grid-template-columns: repeat(3, 1fr);
    }
    
    @include respond-to('lg') {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

// Flexbox utilities
.flex {
  display: flex;
  
  &--center {
    @include flex-center;
  }
  
  &--between {
    justify-content: space-between;
  }
  
  &--column {
    flex-direction: column;
  }
  
  &--wrap {
    flex-wrap: wrap;
  }
  
  &--gap-sm {
    gap: spacing('2');
  }
  
  &--gap-md {
    gap: spacing('4');
  }
  
  &--gap-lg {
    gap: spacing('6');
  }
}
```

### Main Entry Point (`scss/main.scss`)

```scss
// Abstracts
@import 'abstracts/functions';
@import 'abstracts/variables';
@import 'abstracts/mixins';

// Base
@import 'base/reset';
@import 'base/typography';

// Layout
@import 'layout/grid';
@import 'layout/header';
@import 'layout/footer';

// Components
@import 'components/buttons';
@import 'components/cards';
@import 'components/forms';

// Demo styles (for this example)
.demo-section {
  margin-bottom: spacing('12');
  
  &__title {
    font-size: map-get($font-sizes, '2xl');
    font-weight: 600;
    margin-bottom: spacing('6');
    color: color('neutral', '900');
  }
  
  &__description {
    color: color('neutral', '600');
    margin-bottom: spacing('8');
    line-height: 1.6;
  }
}

// Color palette demo
.color-palette {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: spacing('4');
  margin-bottom: spacing('8');
  
  &__swatch {
    padding: spacing('4');
    border-radius: map-get($border-radius, 'lg');
    text-align: center;
    color: white;
    font-weight: 500;
    
    &--primary { background-color: color('primary'); }
    &--secondary { background-color: color('secondary'); }
    &--success { background-color: color('success'); }
    &--warning { background-color: color('warning'); }
    &--error { background-color: color('error'); }
  }
}

// Typography demo
.typography-demo {
  @each $size, $value in $font-sizes {
    .text-#{$size} {
      font-size: $value;
      margin-bottom: spacing('2');
    }
  }
}
```

## HTML Usage Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SASS Basic Setup Demo</title>
    <link rel="stylesheet" href="../css/main.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <h1>SASS Basic Setup Demo</h1>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <!-- Color Palette Section -->
            <section class="demo-section">
                <h2 class="demo-section__title">Color Palette</h2>
                <p class="demo-section__description">
                    Demonstrating SASS variables and color functions.
                </p>
                <div class="color-palette">
                    <div class="color-palette__swatch color-palette__swatch--primary">
                        Primary
                    </div>
                    <div class="color-palette__swatch color-palette__swatch--secondary">
                        Secondary
                    </div>
                    <div class="color-palette__swatch color-palette__swatch--success">
                        Success
                    </div>
                    <div class="color-palette__swatch color-palette__swatch--warning">
                        Warning
                    </div>
                    <div class="color-palette__swatch color-palette__swatch--error">
                        Error
                    </div>
                </div>
            </section>

            <!-- Typography Section -->
            <section class="demo-section">
                <h2 class="demo-section__title">Typography Scale</h2>
                <p class="demo-section__description">
                    Demonstrating SASS maps and loops for typography.
                </p>
                <div class="typography-demo">
                    <div class="text-xs">Extra Small Text (0.75rem)</div>
                    <div class="text-sm">Small Text (0.875rem)</div>
                    <div class="text-base">Base Text (1rem)</div>
                    <div class="text-lg">Large Text (1.125rem)</div>
                    <div class="text-xl">Extra Large Text (1.25rem)</div>
                    <div class="text-2xl">2X Large Text (1.5rem)</div>
                    <div class="text-3xl">3X Large Text (1.875rem)</div>
                    <div class="text-4xl">4X Large Text (2.25rem)</div>
                </div>
            </section>

            <!-- Buttons Section -->
            <section class="demo-section">
                <h2 class="demo-section__title">Button Components</h2>
                <p class="demo-section__description">
                    Demonstrating SASS mixins and component variants.
                </p>
                <div class="flex flex--gap-md flex--wrap">
                    <button class="btn btn--primary">Primary Button</button>
                    <button class="btn btn--secondary">Secondary Button</button>
                    <button class="btn btn--outline">Outline Button</button>
                    <button class="btn btn--ghost">Ghost Button</button>
                </div>
                
                <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Button Sizes</h3>
                <div class="flex flex--gap-md flex--wrap flex--center">
                    <button class="btn btn--primary btn--sm">Small</button>
                    <button class="btn btn--primary">Default</button>
                    <button class="btn btn--primary btn--lg">Large</button>
                </div>
            </section>

            <!-- Grid Section -->
            <section class="demo-section">
                <h2 class="demo-section__title">Grid System</h2>
                <p class="demo-section__description">
                    Demonstrating responsive grid with SASS mixins.
                </p>
                <div class="grid grid--3-cols">
                    <div class="card">Grid Item 1</div>
                    <div class="card">Grid Item 2</div>
                    <div class="card">Grid Item 3</div>
                    <div class="card">Grid Item 4</div>
                    <div class="card">Grid Item 5</div>
                    <div class="card">Grid Item 6</div>
                </div>
            </section>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 SASS Basic Setup Demo</p>
        </div>
    </footer>
</body>
</html>
```

## Package Scripts

```json
{
  "scripts": {
    "build": "sass scss/main.scss css/main.css --style=expanded",
    "build:min": "sass scss/main.scss css/main.min.css --style=compressed",
    "watch": "sass --watch scss:css --style=expanded",
    "serve": "live-server --port=3000 --open=index.html",
    "dev": "npm run watch & npm run serve"
  }
}
```

## Learning Outcomes

This example demonstrates:

1. **Modular Architecture** - 7-1 pattern implementation
2. **Design Tokens** - Centralized variables for colors, spacing, typography
3. **Reusable Mixins** - DRY principle with parameterized mixins
4. **Custom Functions** - Dynamic calculations and utilities
5. **Responsive Design** - Mobile-first with breakpoint mixins
6. **Component-Based Styling** - BEM methodology with variants
7. **Performance Optimization** - Efficient compilation and organization

## Next Steps

1. **[Component Library Example](../component-library/)** - Advanced component patterns
2. **[Theming System Example](../theming-system/)** - Dynamic theming implementation
3. **[Enterprise Project Example](../enterprise-project/)** - Large-scale architecture

---

**Ready to explore more advanced examples?** Check out the other example projects! 🚀
