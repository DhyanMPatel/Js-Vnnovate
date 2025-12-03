# React Context API

Context API provides a way to pass data through the component tree without having to pass props down manually at every level. It's React's built-in solution for prop drilling.

## What is Context API?

Context API is designed to share data that can be considered "global" for a tree of React components, such as:

- User authentication status
- Theme preferences
- Language settings
- Application configuration

## When to Use Context API

**Use Context when:**

- Multiple components need access to the same data
- Data changes frequently and needs to trigger re-renders
- You want to avoid prop drilling through many levels
- Data is truly global (auth, theme, settings)

**Avoid Context when:**

- Data is only needed by a few components
- Data doesn't change frequently
- You can solve the problem with component composition
- Data is local to a specific component subtree

## Creating Context

```js
import { createContext } from "react";

// Create context with default value
const ThemeContext = createContext("light");
const UserContext = createContext(null);
const AppContext = createContext({
  user: null,
  theme: "light",
  loading: false,
});
```

## Provider Component

The Provider component makes the context value available to all descendant components.

```js
import { createContext, useState } from "react";

const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Main />
        <Footer />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}
```

## Consuming Context

### 1. Using useContext Hook

```js
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Button() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      className={`btn-${theme}`}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      Toggle Theme
    </button>
  );
}
```

### 2. Using Consumer Component

```js
import { ThemeContext } from "./ThemeContext";

function Button() {
  return (
    <ThemeContext.Consumer>
      {({ theme, setTheme }) => (
        <button
          className={`btn-${theme}`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}
```

## Advanced Context Patterns

### 1. Custom Context Hook

```js
import { useContext, createContext, useState } from "react";

// Create context
const AuthContext = createContext();

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Usage
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return children;
}
```

### 2. Context with Reducer

```js
import { createContext, useContext, useReducer } from "react";

// Initial state
const initialState = {
  user: null,
  theme: "light",
  notifications: [],
  loading: false,
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

// Context
const AppContext = createContext();

// Provider
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setUser: (user) => dispatch({ type: "SET_USER", payload: user }),
    setTheme: (theme) => dispatch({ type: "SET_THEME", payload: theme }),
    addNotification: (notification) =>
      dispatch({ type: "ADD_NOTIFICATION", payload: notification }),
    removeNotification: (id) =>
      dispatch({ type: "REMOVE_NOTIFICATION", payload: id }),
    setLoading: (loading) =>
      dispatch({ type: "SET_LOADING", payload: loading }),
  };

  const value = {
    ...state,
    ...actions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}

// Usage
function NotificationSystem() {
  const { notifications, removeNotification } = useApp();

  return (
    <div className="notifications">
      {notifications.map((notification) => (
        <div key={notification.id} className="notification">
          {notification.message}
          <button onClick={() => removeNotification(notification.id)}>×</button>
        </div>
      ))}
    </div>
  );
}
```

### 3. Multiple Contexts

```js
import { createContext, useContext } from "react";

// Separate contexts for different concerns
const ThemeContext = createContext();
const AuthContext = createContext();
const NotificationContext = createContext();

// Combine contexts in custom hook
export function useAppContext() {
  const theme = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const notifications = useContext(NotificationContext);

  return {
    theme,
    auth,
    notifications,
  };
}
```

## Performance Optimization

### 1. Memoized Context Value

```js
import { createContext, useContext, useState, useMemo } from "react";

const ExpensiveContext = createContext();

function ExpensiveProvider({ children }) {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      count,
      setCount,
      user,
      setUser,
      expensiveValue: count * 1000, // Expensive calculation
    }),
    [count, user]
  );

  return (
    <ExpensiveContext.Provider value={contextValue}>
      {children}
    </ExpensiveContext.Provider>
  );
}
```

### 2. Splitting Context

```js
// Split context to prevent unnecessary re-renders
const UserContext = createContext();
const ThemeContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Header />
        <Main />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// Components only subscribe to context they need
function UserAvatar() {
  const { user } = useContext(UserContext);
  // Only re-renders when user changes
  return <img src={user.avatar} alt={user.name} />;
}

function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  // Only re-renders when theme changes
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle Theme
    </button>
  );
}
```

## Context vs Redux

| Feature        | Context API  | Redux         |
| -------------- | ------------ | ------------- |
| Learning Curve | Low          | Medium        |
| Boilerplate    | Minimal      | More          |
| DevTools       | Basic        | Advanced      |
| Middleware     | No           | Yes           |
| Time Travel    | No           | Yes           |
| Performance    | Good         | Excellent     |
| Use Case       | Simple state | Complex state |

## Best Practices

1. **Keep context focused**: Each context should handle one concern
2. **Use custom hooks**: Create custom hooks for each context
3. **Provide default values**: Always provide meaningful defaults
4. **Split contexts**: Don't put everything in one context
5. **Memoize values**: Use useMemo for expensive context values
6. **Type safety**: Use TypeScript for better type checking

## Common Pitfalls

1. **Overusing context**: Don't use context for everything
2. **Performance issues**: Large context objects cause re-renders
3. **Missing default values**: Can cause undefined errors
4. **Nested providers**: Can make code hard to follow
5. **Immutable updates**: Always return new objects/arrays

## Real-World Example: E-commerce App

```js
// contexts/CartContext.js
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.price,
          itemCount: state.itemCount + 1,
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
        itemCount: state.itemCount + 1,
      };
    }

    case "REMOVE_ITEM": {
      const item = state.items.find((item) => item.id === action.payload);
      if (!item) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total - item.price * item.quantity,
        itemCount: state.itemCount - item.quantity,
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (!item) return state;

      const quantityDiff = quantity - item.quantity;

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
        total: state.total + item.price * quantityDiff,
        itemCount: state.itemCount + quantityDiff,
      };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const actions = {
    addItem: (product) => dispatch({ type: "ADD_ITEM", payload: product }),
    removeItem: (productId) =>
      dispatch({ type: "REMOVE_ITEM", payload: productId }),
    updateQuantity: (productId, quantity) =>
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: productId, quantity },
      }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
  };

  const value = {
    ...state,
    ...actions,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

// components/CartIcon.js
import { useCart } from "../contexts/CartContext";

function CartIcon() {
  const { itemCount } = useCart();

  return (
    <div className="cart-icon">
      🛒
      {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
    </div>
  );
}

// components/ProductCard.js
import { useCart } from "../contexts/CartContext";

function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addItem(product)}>Add to Cart</button>
    </div>
  );
}
```

## External Resources

- **React Docs**: Official Context API documentation
- **React Patterns**: Advanced context patterns
- **Kent C. Dodds**: Context API best practices
- **Testing Context**: Testing strategies for context
