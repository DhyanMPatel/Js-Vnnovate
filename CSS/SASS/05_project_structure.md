## 5. Project Structure & Organization

### Overview

Proper project structure is crucial for maintainable, scalable SASS projects. A well-organized codebase improves developer experience, reduces bugs, and makes collaboration easier.

### The 7-1 Architecture Pattern

The **7-1 pattern** is the industry standard for SASS project organization:
- **7 folders** for different types of files
- **1 main file** for imports

```
sass/
├── abstracts/           # 1. Variables, mixins, functions
├── base/               # 2. Reset, typography, base styles
├── components/         # 3. Reusable UI components
├── layout/             # 4. Layout-related styles
├── pages/              # 5. Page-specific styles
├── themes/             # 6. Theme-related styles
├── vendors/            # 7. Third-party CSS
└── main.scss           # Main entry point
```

### Detailed Folder Structure

#### 1. Abstracts (`abstracts/`)

Contains SASS tools and helpers used throughout the project.

```
abstracts/
├── _variables.scss      # Global variables (colors, fonts, spacing)
├── _mixins.scss         # Reusable mixins
├── _functions.scss      # Custom SASS functions
└── _placeholders.scss   # Placeholder selectors (@extend)
```

**Example:**
```scss
// _variables.scss
// Colors
$colors: (
  'primary': #3b82f6,
  'secondary': #64748b,
  'success': #10b981,
  'warning': #f59e0b,
  'error': #ef4444
);

// Typography
$font-families: (
  'sans': ('Inter', 'system-ui', 'sans-serif'),
  'mono': ('Fira Code', 'monospace')
);

// Spacing
$spacing: (
  '0': 0,
  '1': 0.25rem,
  '2': 0.5rem,
  '3': 0.75rem,
  '4': 1rem,
  '5': 1.25rem,
  '6': 1.5rem,
  '8': 2rem
);
```

#### 2. Base (`base/`)

Contains the foundational styles of your project.

```
base/
├── _reset.scss          # CSS reset or normalize
├── _typography.scss     # Font sizes, line heights, text styles
├── _global.scss         # Global styles (html, body)
└── _utilities.scss      # Base utility classes
```

**Example:**
```scss
// _typography.scss
html {
  font-size: 16px;
  line-height: 1.5;
}

body {
  font-family: map-get($font-families, 'sans');
  color: map-get($colors, 'primary');
  line-height: inherit;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 1rem;
}
```

#### 3. Components (`components/`)

Contains reusable UI components.

```
components/
├── _buttons.scss        # Button styles
├── _cards.scss          # Card components
├── _forms.scss          # Form elements
├── _modals.scss         # Modal dialogs
├── _navigation.scss     # Navigation menus
└── _tables.scss         # Table styles
```

**Example:**
```scss
// _buttons.scss
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: map-get($spacing, '3') map-get($spacing, '6');
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &--primary {
    background-color: map-get($colors, 'primary');
    color: white;
    
    &:hover {
      background-color: darken(map-get($colors, 'primary'), 10%);
    }
  }
  
  &--secondary {
    background-color: transparent;
    color: map-get($colors, 'primary');
    border: 1px solid map-get($colors, 'primary');
    
    &:hover {
      background-color: map-get($colors, 'primary');
      color: white;
    }
  }
}
```

#### 4. Layout (`layout/`)

Contains layout-related styles.

```
layout/
├── _header.scss         # Header styles
├── _footer.scss         # Footer styles
├── _sidebar.scss        # Sidebar styles
├── _grid.scss           # Grid system
└── _container.scss      # Container and wrapper styles
```

**Example:**
```scss
// _grid.scss
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 map-get($spacing, '4');
}

.grid {
  display: grid;
  gap: map-get($spacing, '4');
  
  &--2-cols {
    grid-template-columns: repeat(2, 1fr);
  }
  
  &--3-cols {
    grid-template-columns: repeat(3, 1fr);
  }
  
  &--4-cols {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

#### 5. Pages (`pages/`)

Contains page-specific styles.

```
pages/
├── _home.scss           # Homepage styles
├── _about.scss          # About page styles
├── _contact.scss        # Contact page styles
└── _dashboard.scss      # Dashboard styles
```

**Example:**
```scss
// _home.scss
.home {
  &__hero {
    padding: 5rem 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
  }
  
  &__features {
    padding: 4rem 0;
    
    .feature-card {
      text-align: center;
      padding: map-get($spacing, '6');
    }
  }
}
```

#### 6. Themes (`themes/`)

Contains theme-related styles.

```
themes/
├── _variables.scss      # Theme-specific variables
├── _light.scss          # Light theme
├── _dark.scss           # Dark theme
└── _brand.scss          # Brand variations
```

**Example:**
```scss
// _light.scss
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
}

// _dark.scss
[data-theme="dark"] {
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --border-color: #374151;
}
```

#### 7. Vendors (`vendors/`)

Contains third-party CSS and overrides.

```
vendors/
├── _normalize.scss      # Normalize.css
├── _bootstrap.scss      # Bootstrap overrides
└── _external.scss       # Other external libraries
```

### Main Entry Point

The `main.scss` file imports all partials in the correct order:

```scss
// main.scss

// 1. Abstracts
@import 'abstracts/variables';
@import 'abstracts/functions';
@import 'abstracts/mixins';
@import 'abstracts/placeholders';

// 2. Vendors
@import 'vendors/normalize';
@import 'vendors/external';

// 3. Base
@import 'base/reset';
@import 'base/typography';
@import 'base/global';

// 4. Layout
@import 'layout/container';
@import 'layout/grid';
@import 'layout/header';
@import 'layout/footer';

// 5. Components
@import 'components/buttons';
@import 'components/cards';
@import 'components/forms';
@import 'components/navigation';

// 6. Pages
@import 'pages/home';
@import 'pages/about';
@import 'pages/contact';

// 7. Themes
@import 'themes/light';
@import 'themes/dark';
```

### Alternative Structures

#### Feature-Based Structure

Good for large applications with distinct features:

```
sass/
├── core/                # Shared utilities
│   ├── variables.scss
│   ├── mixins.scss
│   └── reset.scss
├── features/            # Feature-specific styles
│   ├── authentication/
│   │   ├── login.scss
│   │   └── register.scss
│   ├── dashboard/
│   │   ├── header.scss
│   │   ├── sidebar.scss
│   │   └── widgets.scss
│   └── shared/
│       ├── buttons.scss
│       └── forms.scss
└── main.scss
```

#### Component-Based Structure

Ideal for component libraries and design systems:

```
sass/
├── tokens/              # Design tokens
│   ├── colors.scss
│   ├── spacing.scss
│   └── typography.scss
├── elements/            # Basic elements
│   ├── buttons.scss
│   ├── inputs.scss
│   └── links.scss
├── components/          # Complex components
│   ├── cards.scss
│   ├── modals.scss
│   └── navigation.scss
├── utilities/           # Utility classes
│   ├── layout.scss
│   ├── spacing.scss
│   └── typography.scss
└── main.scss
```

### Naming Conventions

#### File Naming

- **Partial files:** Start with underscore (`_variables.scss`)
- **Use kebab-case:** `button-group.scss`, `form-input.scss`
- **Be descriptive:** `user-profile-card.scss` not `card.scss`
- **Group related files:** `auth/`, `dashboard/`, `shared/`

#### Class Naming (BEM Methodology)

```scss
// Block
.card {
  padding: 1rem;
  border-radius: 0.5rem;
  
  // Element
  &__header {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  &__content {
    color: #6b7280;
  }
  
  // Modifier
  &--featured {
    border: 2px solid #3b82f6;
  }
  
  &--compact {
    padding: 0.5rem;
  }
}
```

### Import Strategy

#### Import Order Matters

1. **Abstracts first** - Variables and functions needed by other files
2. **Vendors next** - Third-party styles that might be overridden
3. **Base styles** - Foundational styles
4. **Layout** - Structure before components
5. **Components** - Reusable UI elements
6. **Pages** - Page-specific overrides
7. **Themes** - Final theme customizations

#### Conditional Imports

```scss
// Environment-specific imports
@if $environment == 'development' {
  @import 'utilities/debug';
}

// Feature flags
@if $enable-dark-mode {
  @import 'themes/dark';
}

// Platform-specific imports
@if $platform == 'mobile' {
  @import 'utilities/touch';
}
```

### Scaling Strategies

#### For Small Projects

```
sass/
├── _variables.scss
├── _mixins.scss
├── components.scss
└── main.scss
```

#### For Medium Projects

```
sass/
├── abstracts/
├── components/
├── layout/
└── main.scss
```

#### For Large Projects

```
sass/
├── core/                    # Shared across all apps
├── apps/                    # App-specific styles
│   ├── dashboard/
│   ├── admin/
│   └── public/
├── shared/                  # Shared components
└── main.scss
```

### Performance Considerations

#### Optimize Imports

```scss
// ❌ Bad: Import everything
@import 'components/*';

// ✅ Good: Import only what you need
@import 'components/buttons';
@import 'components/cards';
```

#### Use Placeholder Selectors

```scss
// ❌ Bad: Creates unused CSS
%base-button { /* styles */ }
.btn-primary { @extend %base-button; }

// ✅ Good: Use mixins for conditional styles
@mixin button-base { /* styles */ }
.btn-primary { @include button-base; }
```

#### Lazy Loading

```scss
// Load components on demand
@if $feature-enabled {
  @import 'components/advanced-features';
}
```

### Best Practices

#### File Organization

1. **Keep files small** - Single responsibility per file
2. **Use descriptive names** - Clear purpose at a glance
3. **Group related files** - Logical folder structure
4. **Maintain import order** - Prevent specificity issues
5. **Document structure** - README for complex projects

#### Development Workflow

1. **Start with structure** - Plan folders before coding
2. **Use partials** - Underscore prefix for non-output files
3. **Import strategically** - Order matters for specificity
4. **Review regularly** - Refactor as project grows
5. **Document decisions** - Why specific structure was chosen

### Tools for Organization

#### Folder Structure Generators

```bash
# Create 7-1 structure
mkdir -p sass/{abstracts,base,components,layout,pages,themes,vendors}
touch sass/{abstracts,base,components,layout,pages,themes,vendors}/_init.scss
touch sass/main.scss
```

#### Linting Configuration

```json
// .stylelintrc.json
{
  "rules": {
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": ["import", "mixin", "include", "extend"]
      }
    ]
  }
}
```

---

**Next:** [Advanced Features](06_advanced_features.md) - Dive deeper into SASS capabilities! 🚀
