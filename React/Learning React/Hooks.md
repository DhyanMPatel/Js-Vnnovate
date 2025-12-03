# React Hooks

Hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8 and revolutionized how we write React components.

## Why Hooks?

- **No more class components**: Write cleaner, more readable code
- **Better composition**: Reuse stateful logic between components
- **Easier testing**: Functional components are easier to test
- **Better TypeScript support**: Stronger type inference

## Rules of Hooks

1. **Only call hooks at the top level**: Never inside loops, conditions, or nested functions
2. **Only call hooks from React functions**: Call them from React functional components or custom hooks

```js
// ❌ Wrong - calling hook inside condition
if (someCondition) {
  const [state, setState] = useState(0);
}

// ✅ Correct - hook at top level
const [state, setState] = useState(0);
if (someCondition) {
  // use state here
}
```

## Built-in Hooks

### 1. useState

Manages state in functional components.

```js
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0); // Initial state: 0
  const [user, setUser] = useState({ name: "John", age: 25 });

  const increment = () => {
    setCount((prevCount) => prevCount + 1); // Functional update
  };

  const updateUser = () => {
    setUser((prevUser) => ({ ...prevUser, age: prevUser.age + 1 }));
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <p>
        User: {user.name}, Age: {user.age}
      </p>
    </div>
  );
}
```

**Key Points:**

- State updates are asynchronous
- Multiple state updates in same event are batched
- Use functional updates for current state dependency

### 2. useEffect

Handles side effects in functional components.

```js
import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Runs after every render (no dependency array)
  useEffect(() => {
    console.log("Component rendered");
  });

  // Runs only once (empty dependency array)
  useEffect(() => {
    console.log("Component mounted");

    // Cleanup function
    return () => {
      console.log("Component will unmount");
    };
  }, []);

  // Runs when userId changes
  useEffect(() => {
    setLoading(true);
    fetchUser(userId).then((userData) => {
      setUser(userData);
      setLoading(false);
    });

    // Cleanup for previous userId
    return () => {
      setUser(null);
    };
  }, [userId]); // Dependency array

  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}
```

**Use Cases:**

- Data fetching
- DOM manipulation
- Subscriptions
- Timers

### 3. useContext

Access React Context without nesting Consumer components.

```js
import { createContext, useContext } from "react";

// Create context
const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>I am a {theme} button</button>;
}
```

### 4. useReducer

Alternative to useState for complex state logic.

```js
import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
```

**When to use useReducer:**

- Complex state logic
- State depends on previous state
- Multiple state values that change together

### 5. useCallback & useMemo

Optimize performance by memoizing functions and values.

```js
import { useState, useCallback, useMemo } from "react";

function ExpensiveComponent({ data, onItemClick }) {
  // Memoize function to prevent recreation on every render
  const handleClick = useCallback(
    (item) => {
      onItemClick(item.id);
    },
    [onItemClick]
  );

  // Memoize expensive calculation
  const processedData = useMemo(() => {
    console.log("Processing data...");
    return data.map((item) => ({
      ...item,
      processed: item.value * 2,
    }));
  }, [data]);

  return (
    <div>
      {processedData.map((item) => (
        <div key={item.id} onClick={() => handleClick(item)}>
          {item.processed}
        </div>
      ))}
    </div>
  );
}
```

**useCallback vs useMemo:**

- `useCallback`: Memoizes function
- `useMemo`: Memoizes value (can memoize function too)

### 6. useRef

Access DOM elements and persist values without causing re-renders.

```js
import { useRef, useEffect } from "react";

function InputFocus() {
  const inputRef = useRef(null);
  const renderCount = useRef(0);

  useEffect(() => {
    inputRef.current.focus(); // Access DOM element
    renderCount.current += 1; // Persist value without re-render
  }, []);

  return (
    <div>
      <input ref={inputRef} type="text" />
      <p>Render count: {renderCount.current}</p>
    </div>
  );
}
```

**Use Cases:**

- DOM manipulation
- Storing mutable values
- Accessing previous values

### 7. Custom Hooks

Create reusable stateful logic.

```js
import { useState, useEffect } from "react";

// Custom hook for data fetching
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useApi(`/api/users/${userId}`);
  const [theme, setTheme] = useLocalStorage("theme", "light");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={theme}>
      <h1>{user.name}</h1>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
}
```

## Advanced Hooks Patterns

### useLayoutEffect

Similar to useEffect but runs synchronously after DOM mutation.

```js
import { useLayoutEffect, useRef } from "react";

function Tooltip({ content, target }) {
  const tooltipRef = useRef();

  useLayoutEffect(() => {
    const tooltip = tooltipRef.current;
    const rect = target.getBoundingClientRect();

    // Position tooltip before paint
    tooltip.style.top = `${rect.top - tooltip.offsetHeight}px`;
    tooltip.style.left = `${rect.left}px`;
  });

  return <div ref={tooltipRef}>{content}</div>;
}
```

### useImperativeHandle

Customize instance value exposed to parent components.

```js
import { useRef, useImperativeHandle, forwardRef } from "react";

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    getValue: () => {
      return inputRef.current.value;
    },
  }));

  return <input ref={inputRef} {...props} />;
});

// Usage
function Form() {
  const inputRef = useRef();

  const handleSubmit = () => {
    inputRef.current.focus();
    console.log(inputRef.current.getValue());
  };

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```

## Best Practices

1. **Keep hooks simple**: Each hook should have a single responsibility
2. **Use custom hooks for shared logic**: Extract common patterns
3. **Optimize with useCallback/useMemo**: But don't over-optimize
4. **Understand dependency arrays**: Be explicit about dependencies
5. **Use TypeScript**: Get better type safety with hooks

## Common Pitfalls

1. **Missing dependencies**: Can cause stale closures
2. **Over-memoization**: Can hurt performance
3. **Infinite loops**: Incorrect dependency arrays
4. **Stale state**: Using old state values

## External Resources to Study

- **React Docs**: Official documentation
- **useHooks**: Collection of custom hooks
- **React Patterns**: Advanced patterns and best practices
- **Clean Code**: Writing maintainable React code
