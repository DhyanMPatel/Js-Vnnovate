## SASS with React Integration

### Overview

Integrating SASS with React provides powerful styling capabilities while maintaining component-based architecture. This guide covers the best practices and different approaches for using SASS in React applications.

### Setup Methods

#### Method 1: Create React App with SASS

```bash
# Create React App with SASS template
npx create-react-app my-app --template typescript
cd my-app

# Install SASS
npm install sass

# Rename CSS files to SCSS
mv src/App.css src/App.scss
mv src/index.css src/index.scss
```

#### Method 2: Vite + React + SASS

```bash
# Create Vite React app
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app

# Install SASS
npm install -D sass

# Configure vite.config.ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  }
});
```

#### Method 3: Next.js with SASS

```bash
# Create Next.js app
npx create-next-app@latest my-app --typescript
cd my-app

# Install SASS
npm install -D sass

# Next.js automatically handles .scss files
```

### File Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.scss
│   │   └── index.ts
│   └── Card/
│       ├── Card.tsx
│       ├── Card.module.scss
│       └── index.ts
├── styles/
│   ├── globals.scss
│   ├── variables.scss
│   ├── mixins.scss
│   └── themes/
│       ├── light.scss
│       └── dark.scss
├── hooks/
│   └── useTheme.ts
└── types/
    └── theme.ts
```

### CSS Modules Approach (Recommended)

#### Component with CSS Modules

```tsx
// components/Button/Button.tsx
import styles from './Button.module.scss';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  className,
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    disabled && styles['button--disabled'],
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
```

```scss
// components/Button/Button.module.scss
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  // Variants
  &--primary {
    background-color: var(--color-primary);
    color: var(--color-primary-foreground);
    
    &:hover:not(:disabled) {
      background-color: var(--color-primary-hover);
    }
  }
  
  &--secondary {
    background-color: transparent;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    
    &:hover:not(:disabled) {
      background-color: var(--color-primary);
      color: var(--color-primary-foreground);
    }
  }
  
  // Sizes
  &--small {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  
  &--medium {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  &--large {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }
  
  // States
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
```

### Global Styles Approach

#### Global SASS Setup

```scss
// styles/globals.scss
@import 'variables';
@import 'mixins';
@import 'themes/light';
@import 'themes/dark';

// Base styles
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-family-base);
  line-height: 1.5;
  color: var(--text-primary);
  background-color: var(--background-primary);
}

// Utility classes
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.text-center {
  text-align: center;
}
```

#### Import in Application

```tsx
// App.tsx
import './styles/globals.scss';

function App() {
  return (
    <div className="container">
      <h1 className="text-center">My React App</h1>
    </div>
  );
}
```

### Theme System

#### Theme Variables

```scss
// styles/variables.scss
:root {
  // Light theme
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-foreground: #ffffff;
  --background-primary: #ffffff;
  --text-primary: #1f2937;
  --font-family-base: 'Inter', system-ui, sans-serif;
}

[data-theme="dark"] {
  // Dark theme
  --color-primary: #60a5fa;
  --color-primary-hover: #3b82f6;
  --color-primary-foreground: #ffffff;
  --background-primary: #1f2937;
  --text-primary: #f9fafb;
}
```

#### Theme Hook

```tsx
// hooks/useTheme.ts
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};
```

#### Theme Provider Component

```tsx
// components/ThemeProvider/ThemeProvider.tsx
import { createContext, useContext, ReactNode } from 'react';
import { useTheme } from '../../hooks/useTheme';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const themeState = useTheme();

  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
```

### Styled Components Pattern

#### Higher-Order Component

```tsx
// utils/styled.ts
import { CSSProperties } from 'react';

type StylesFunction<T = {}> = (props: T) => string;

export const styled = <T extends Record<string, any> = {}>(
  tagName: keyof JSX.IntrinsicElements,
  styles: StylesFunction<T>
) => {
  return (props: T & JSX.IntrinsicElements[keyof JSX.IntrinsicElements]) => {
    const { className, ...rest } = props;
    const generatedStyles = styles(props);
    const finalClassName = [className, generatedStyles].filter(Boolean).join(' ');
    
    const Component = tagName as React.ComponentType<any>;
    return <Component className={finalClassName} {...rest} />;
  };
};
```

#### Usage Example

```tsx
// components/StyledCard/StyledCard.tsx
import { styled } from '../../utils/styled';

interface StyledCardProps {
  variant?: 'default' | 'elevated';
  padding?: 'small' | 'medium' | 'large';
}

export const StyledCard = styled<'div', StyledCardProps>('div', (props) => {
  const { variant = 'default', padding = 'medium' } = props;
  
  return `
    background-color: var(--background-card);
    border-radius: 0.5rem;
    padding: var(--spacing-${padding});
    
    ${variant === 'elevated' ? `
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    ` : ''}
    
    border: 1px solid var(--border-color);
  `;
});
```

### Responsive Design

#### Responsive Mixins

```scss
// styles/mixins.scss
$breakpoints: (
  'sm': 640px,
  'md': 768px,
  'lg': 1024px,
  'xl': 1280px,
  '2xl': 1536px
);

@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}

@mixin mobile-first($property, $values...) {
  $length: length($values);
  
  @if $length > 0 {
    #{$property}: nth($values, 1);
  }
  
  @each $breakpoint, $value in zip(map-keys($breakpoints), slice($values, 2)) {
    @include respond-to($breakpoint) {
      #{$property}: $value;
    }
  }
}
```

#### Responsive Component

```tsx
// components/Grid/Grid.tsx
import styles from './Grid.module.scss';

interface GridProps {
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  columns = 1,
  gap = 'medium',
  className,
  children
}) => {
  const gridClasses = [
    styles.grid,
    styles[`grid--cols-${columns}`],
    styles[`grid--gap-${gap}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
};
```

```scss
// components/Grid/Grid.module.scss
.grid {
  display: grid;
  
  &--gap-small {
    gap: 0.5rem;
  }
  
  &--gap-medium {
    gap: 1rem;
  }
  
  &--gap-large {
    gap: 2rem;
  }
  
  // Responsive columns
  &--cols-1 {
    grid-template-columns: 1fr;
  }
  
  &--cols-2 {
    grid-template-columns: 1fr;
    
    @include respond-to('md') {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  &--cols-3 {
    grid-template-columns: 1fr;
    
    @include respond-to('sm') {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @include respond-to('lg') {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
```

### Performance Optimization

#### Code Splitting

```tsx
// utils/loadStyles.ts
export const loadStyles = async (stylePath: string) => {
  if (typeof window !== 'undefined') {
    const { default: styles } = await import(`../styles/${stylePath}.scss`);
    return styles;
  }
  return null;
};

// Usage in component
const [styles, setStyles] = useState(null);

useEffect(() => {
  loadStyles('heavy-component').then(setStyles);
}, []);
```

#### PurgeCSS Configuration

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html'
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: [
        /^data-theme-/,
        /^bg-/,
        /^text-/
      ]
    })
  ]
};
```

### Best Practices

#### 1. Component Co-location

```
components/
├── Button/
│   ├── Button.tsx
│   ├── Button.module.scss
│   ├── Button.test.tsx
│   ├── Button.stories.tsx
│   └── index.ts
```

#### 2. Design Token Usage

```scss
// ❌ Avoid hardcoded values
.button {
  background-color: #3b82f6; // Hardcoded
  padding: 12px 24px;       // Hardcoded
}

// ✅ Use design tokens
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-md) var(--spacing-lg);
}
```

#### 3. Consistent Naming

```scss
// ✅ Use BEM with CSS Modules
.card {
  &__header {
    &--featured {
      // styles
    }
  }
}

// Generated class names: .card__header--featured
```

#### 4. Type Safety

```tsx
// types/styles.ts
export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

### Testing

#### Styled Component Testing

```tsx
// components/Button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct variant class', () => {
    render(<Button variant="primary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(/button--primary/);
  });

  it('applies disabled styles', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass(/button--disabled/);
  });
});
```

### Troubleshooting

#### Common Issues

**Issue:** CSS Modules not working
```bash
# Solution: Rename files to .module.scss
# Ensure webpack/vite configuration supports CSS modules
```

**Issue:** Global styles not applying
```bash
# Solution: Import global styles in your main entry point
import './styles/globals.scss';
```

**Issue:** Theme variables not working
```bash
# Solution: Ensure variables are defined before usage
# Check that CSS custom properties are properly scoped
```

---

**Next:** [Vue Integration](../07_integration/vue.md) - Learn how to use SASS with Vue.js! 🚀
