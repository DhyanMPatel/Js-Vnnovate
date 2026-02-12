## 9. Production Best Practices

### Overview

These best practices ensure your SASS codebase remains maintainable, performant, and scalable in production environments. Follow these guidelines to build professional-grade stylesheets.

### Code Organization

#### 1. Follow the 7-1 Architecture

```
✅ Recommended structure:
sass/
├── abstracts/           # Variables, mixins, functions
├── base/               # Reset, typography, base styles
├── components/         # Reusable UI components
├── layout/             # Layout-related styles
├── pages/              # Page-specific styles
├── themes/             # Theme-related styles
├── vendors/            # Third-party CSS
└── main.scss           # Main entry point
```

#### 2. Use Semantic File Naming

```scss
// ✅ Good: Descriptive and consistent
_components_buttons.scss
_components_forms.scss
_layout_header.scss
_pages_dashboard.scss

// ❌ Bad: Vague or inconsistent
btns.scss
form-styles.scss
header-styles.scss
dash.scss
```

#### 3. Keep Files Focused

```scss
// ✅ Good: Single responsibility per file
// _buttons.scss - Only button-related styles
// _cards.scss - Only card-related styles

// ❌ Bad: Mixed responsibilities
// _ui-components.scss - Buttons, cards, forms, modals all mixed
```

### Variable Management

#### 1. Use Design Tokens

```scss
// ✅ Good: Semantic naming with design tokens
$colors: (
  'primary': #3b82f6,
  'secondary': #64748b',
  'success': #10b981,
  'warning': #f59e0b',
  'error': #ef4444'
);

$spacing: (
  'xs': 0.25rem,
  'sm': 0.5rem,
  'md': 1rem,
  'lg': 1.5rem,
  'xl': 2rem
);

// Usage
.button {
  background-color: map-get($colors, 'primary');
  padding: map-get($spacing, 'sm') map-get($spacing, 'md');
}

// ❌ Bad: Hardcoded values
.button {
  background-color: #3b82f6;
  padding: 8px 16px;
}
```

#### 2. Group Related Variables

```scss
// ✅ Good: Organized by category
// _variables.scss
// Colors
$colors: (...);

// Typography
$font-families: (...);
$font-sizes: (...);
$font-weights: (...);

// Spacing
$spacing: (...);

// Breakpoints
$breakpoints: (...);
```

#### 3. Use CSS Custom Properties for Runtime Changes

```scss
// ✅ Good: SASS for build-time, CSS variables for runtime
:root {
  @each $name, $color in $colors {
    --color-#{$name}: #{$color};
  }
  
  @each $size, $value in $spacing {
    --spacing-#{$size}: #{$value};
  }
}

.button {
  background-color: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-md);
}
```

### Mixin Usage

#### 1. Use Mixins for Parameterized Styles

```scss
// ✅ Good: Reusable with parameters
@mixin button($bg-color, $text-color: white) {
  padding: 12px 24px;
  background-color: $bg-color;
  color: $text-color;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: darken($bg-color, 10%);
  }
}

.btn-primary {
  @include button(map-get($colors, 'primary'));
}

.btn-secondary {
  @include button(map-get($colors, 'secondary'));
}
```

#### 2. Avoid Over-Engineering

```scss
// ❌ Bad: Overly complex mixin for simple styles
@mixin simple-text($size, $weight, $color, $align, $line-height) {
  font-size: $size;
  font-weight: $weight;
  color: $color;
  text-align: $align;
  line-height: $line-height;
}

// ✅ Good: Use utility classes or direct styles
.text-large {
  font-size: 1.25rem;
  font-weight: 600;
}
```

#### 3. Create Responsive Mixins

```scss
// ✅ Good: Responsive mixin with breakpoints
@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}

.container {
  padding: 1rem;
  
  @include respond-to('md') {
    padding: 2rem;
  }
  
  @include respond-to('lg') {
    padding: 3rem;
  }
}
```

### Nesting Guidelines

#### 1. Limit Nesting Depth

```scss
// ✅ Good: Maximum 3 levels deep
.card {
  padding: 1rem;
  
  &__header {
    margin-bottom: 0.5rem;
    
    &__title {
      font-size: 1.25rem;
    }
  }
}

// ❌ Bad: Too deep nesting
.card {
  .card-header {
    .card-title {
      .card-title-text {
        .card-title-span {
          // Too deep!
        }
      }
    }
  }
}
```

#### 2. Use Parent Selector Wisely

```scss
// ✅ Good: Meaningful use of &
.button {
  padding: 12px 24px;
  
  &:hover {
    background-color: darken($primary-color, 10%);
  }
  
  &:disabled {
    opacity: 0.6;
  }
  
  &--primary {
    background-color: $primary-color;
  }
}

// ❌ Bad: Unnecessary use of &
.container {
  & .header {  // Redundant &
    & .nav {    // Redundant &
      & .item {  // Redundant &
        color: blue;
      }
    }
  }
}
```

### Performance Optimization

#### 1. Minimize @extend Usage

```scss
// ❌ Bad: @extend can create complex selector relationships
%button-base {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
}

.btn-primary {
  @extend %button-base;
  background-color: blue;
}

.btn-secondary {
  @extend %button-base;
  background-color: gray;
}

// ✅ Good: Use mixins for better control
@mixin button-base {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
}

.btn-primary {
  @include button-base;
  background-color: blue;
}
```

#### 2. Avoid Unused CSS

```scss
// ✅ Good: Conditional imports based on features
@if $enable-dark-mode {
  @import 'themes/dark';
}

@if $enable-animations {
  @import 'utilities/animations';
}

// ❌ Bad: Import everything regardless of usage
@import 'themes/dark';
@import 'themes/light';
@import 'themes/high-contrast';
@import 'utilities/animations';
@import 'utilities/transitions';
```

#### 3. Optimize Loops

```scss
// ✅ Good: Efficient loop with clear purpose
@each $breakpoint in map-keys($breakpoints) {
  @include respond-to($breakpoint) {
    .container-#{$breakpoint} {
      max-width: map-get($container-max-widths, $breakpoint);
    }
  }
}

// ❌ Bad: Excessive loop generating unused classes
@for $i from 1 through 100 {
  .margin-#{$i}px {
    margin: #{$i}px;
  }
}
```

### Naming Conventions

#### 1. Use BEM Methodology

```scss
// ✅ Good: Clear BEM structure
.card {
  padding: 1rem;
  border-radius: 0.5rem;
  
  &__header {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  &__content {
    color: #6b7280;
  }
  
  &--featured {
    border: 2px solid #3b82f6;
  }
  
  &--compact {
    padding: 0.5rem;
  }
}

// Usage in HTML
<div class="card card--featured">
  <div class="card__header">Title</div>
  <div class="card__content">Content</div>
</div>
```

#### 2. Be Consistent with Modifiers

```scss
// ✅ Good: Consistent modifier patterns
.button {
  // Size modifiers
  &--small { }
  &--medium { }
  &--large { }
  
  // Variant modifiers
  &--primary { }
  &--secondary { }
  &--outline { }
  
  // State modifiers
  &--disabled { }
  &--loading { }
  &--active { }
}
```

### Error Handling

#### 1. Use @warn and @error

```scss
// ✅ Good: Helpful error messages
@function get-color($color-name) {
  @if not map-has-key($colors, $color-name) {
    @error "Color '#{$color-name}' not found. Available colors: #{map-keys($colors)}";
  }
  @return map-get($colors, $color-name);
}

@mixin respond-to($breakpoint) {
  @if not map-has-key($breakpoints, $breakpoint) {
    @warn "Breakpoint '#{$breakpoint}' not found. Using 'md' instead.";
    $breakpoint: 'md';
  }
  
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}
```

#### 2. Validate Input Parameters

```scss
// ✅ Good: Input validation
@mixin create-shadow($level: 'base') {
  $valid-levels: ('sm', 'base', 'md', 'lg', 'xl');
  
  @if not index($valid-levels, $level) {
    @error "Invalid shadow level '#{$level}'. Valid levels: #{$valid-levels}";
  }
  
  box-shadow: map-get($shadows, $level);
}
```

### Documentation

#### 1. Document Complex Functions

```scss
// ✅ Good: Clear documentation
/// Convert pixels to rem units
/// @param {Number} $pixels - The pixel value to convert
/// @param {Number} $base - The base font size (default: 16px)
/// @return {Number} The converted value in rem
/// @example
///   font-size: rem(18px); // 1.125rem
@function rem($pixels, $base: 16px) {
  @return (strip-unit($pixels) / strip-unit($base)) * 1rem;
}
```

#### 2. Comment Architecture Decisions

```scss
// =================================================================
// COMPONENT: Button
// =================================================================
// Primary button component with multiple variants and sizes.
// Uses BEM methodology for clear class naming.
// =================================================================

.button {
  // Base button styles
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  // Variant: Primary
  &--primary {
    background-color: var(--color-primary);
  }
}
```

### Testing Strategy

#### 1. Visual Regression Testing

```scss
// ✅ Good: Test-specific classes for visual testing
.visual-test {
  &__button-primary {
    @extend .button;
    @extend .button--primary;
  }
  
  &__button-large {
    @extend .button;
    @extend .button--large;
  }
}
```

#### 2. Style Guide Generation

```scss
// ✅ Good: Style guide documentation
.style-guide {
  &__section {
    margin-bottom: 3rem;
  }
  
  &__example {
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1rem;
  }
}
```

### Build Configuration

#### 1. Environment-Specific Builds

```scss
// ✅ Good: Environment detection
$environment: 'development'; // Set via build process

@if $environment == 'production' {
  // Production optimizations
  $enable-animations: false !default;
  $enable-debug-classes: false !default;
} @else {
  // Development features
  $enable-animations: true !default;
  $enable-debug-classes: true !default;
}
```

#### 2. Optimize Output

```javascript
// webpack.config.js or similar build config
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'expanded',
                sourceMap: process.env.NODE_ENV !== 'production'
              }
            }
          }
        ]
      }
    ]
  }
};
```

### Security Considerations

#### 1. Sanitize User Input

```scss
// ✅ Good: Safe string interpolation
@function safe-class-name($string) {
  // Remove special characters and convert to lowercase
  @return to-lower-case(str-replace($string, '[^a-zA-Z0-9-]', ''));
}

// Usage
$user-input: 'My Component!';
$safe-class: safe-class-name($user-input); // 'my-component'
```

#### 2. Avoid Dynamic Imports from Untrusted Sources

```scss
// ❌ Bad: Potentially unsafe
@import '#{$user-provided-path}';

// ✅ Good: Whitelist approach
$allowed-imports: ('theme-light', 'theme-dark', 'theme-brand');

@if index($allowed-imports, $theme-name) {
  @import 'themes/#{$theme-name}';
}
```

### Accessibility

#### 1. Focus Styles

```scss
// ✅ Good: Accessible focus styles
.focusable {
  &:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
}
```

#### 2. High Contrast Support

```scss
// ✅ Good: High contrast mode support
@media (prefers-contrast: high) {
  .button {
    border: 2px solid currentColor;
  }
}
```

### Migration Strategy

#### 1. Incremental Migration

```scss
// Phase 1: Add SASS variables alongside existing CSS
:root {
  --color-primary: #3b82f6;
  --color-secondary: #64748b';
}

// Phase 2: Gradually replace with SASS
$colors: (
  'primary': #3b82f6,
  'secondary': #64748b'
);

// Phase 3: Remove old CSS variables
```

#### 2. Backward Compatibility

```scss
// ✅ Good: Maintain compatibility during migration
.old-class-name {
  // Keep existing styles
  color: blue;
  
  // Add new SASS-powered styles
  background-color: var(--color-primary);
}
```

### Monitoring and Analytics

#### 1. CSS Usage Tracking

```scss
// ✅ Good: Track component usage
.component-usage {
  &__button {
    // Used in 15 places
  }
  
  &__card {
    // Used in 8 places
  }
}
```

#### 2. Performance Metrics

```scss
// ✅ Good: Performance-focused classes
.performance-critical {
  // Above-the-fold content - optimize first
  will-change: transform;
}

.performance-secondary {
  // Below-the-fold content - can be lazy loaded
}
```

---

**Next:** [Performance Optimization](10_performance.md) - Deep dive into SASS performance techniques! ⚡
