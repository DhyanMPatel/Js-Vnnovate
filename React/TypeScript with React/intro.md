# TypeScript with React

TypeScript adds static typing to JavaScript, providing better development experience, error catching, and code maintainability. When combined with React, it offers enhanced type safety for components, props, state, and more.

## Why TypeScript with React?

### Benefits

- **Type Safety**: Catch errors at compile time instead of runtime
- **Better IntelliSense**: Improved autocompletion and IDE support
- **Self-Documenting Code**: Types serve as documentation
- **Refactoring Safety**: Rename and refactor with confidence
- **Team Collaboration**: Clear contracts between components
- **Better Debugging**: More descriptive error messages

### When to Use TypeScript

- Large applications with multiple developers
- Long-term projects requiring maintenance
- Complex state management
- API integrations with defined data structures
- Component libraries and design systems

## Setup

### Create React App with TypeScript

```bash
# Using Create React App
npx create-react-app my-app --template typescript

# Using Vite (Recommended)
npm create vite@latest my-app --template react-ts
```

### Manual Setup

```bash
# Install dependencies
npm install --save typescript @types/node @types/react @types/react-dom

# Install type definitions for libraries
npm install --save-dev @types/jest @types/react-test-renderer
```

## TypeScript Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

### Key Compiler Options

- **strict**: Enables all strict type checking options
- **jsx**: Controls how JSX constructs are emitted
- **moduleResolution**: Determines how module imports are resolved
- **noImplicitAny**: Raises error on expressions with any type
- **strictNullChecks**: Makes null and undefined values more explicit
