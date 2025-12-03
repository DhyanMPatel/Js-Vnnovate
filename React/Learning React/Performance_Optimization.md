# React Performance Optimization

Performance optimization is crucial for creating fast, responsive React applications. This guide covers techniques to optimize your React apps for production.

## Understanding React Performance

### Virtual DOM and Reconciliation

React uses a Virtual DOM to efficiently update the real DOM. Understanding this helps optimize performance:

```js
// React creates virtual representation
const element = <h1>Hello, world!</h1>;

// Compares with previous version
const prevElement = <h1>Hello, world!</h1>;
const nextElement = <h1>Hello, React!</h1>;

// Only updates what changed
// Real DOM: "world" -> "React"
```

### When React Re-renders

React components re-render when:

1. **State changes**: `setState` or state hook updates
2. **Props change**: Parent component re-renders
3. **Context changes**: Context value updates
4. **Force update**: `forceUpdate()` (rarely used)

## Memoization Techniques

### React.memo

Prevents unnecessary re-renders of functional components.

```js
import React from "react";

// Without memo - re-renders when parent re-renders
const UserCard = ({ user, onClick }) => {
  console.log("UserCard rendered");
  return (
    <div onClick={() => onClick(user.id)}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

// With memo - only re-renders when props change
const MemoizedUserCard = React.memo(({ user, onClick }) => {
  console.log("MemoizedUserCard rendered");
  return (
    <div onClick={() => onClick(user.id)}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
});

// Custom comparison function
const CustomMemoizedCard = React.memo(
  ({ user, onClick }) => {
    return (
      <div onClick={() => onClick(user.id)}>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return prevProps.user.id === nextProps.user.id;
  }
);
```

### useMemo

Memoizes expensive calculations.

```js
import { useMemo } from "react";

function ExpensiveComponent({ items, filter }) {
  // Without useMemo - recalculates on every render
  const expensiveValue = items
    .filter((item) => item.category === filter)
    .reduce((sum, item) => sum + item.price, 0);

  // With useMemo - only recalculates when dependencies change
  const memoizedValue = useMemo(() => {
    console.log("Expensive calculation running...");
    return items
      .filter((item) => item.category === filter)
      .reduce((sum, item) => sum + item.price, 0);
  }, [items, filter]);

  return <div>Total: {memoizedValue}</div>;
}

// Memoizing objects/arrays to prevent reference changes
function DataTable({ data }) {
  const columns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
    ],
    []
  ); // Empty dependency array - never changes

  return <Table data={data} columns={columns} />;
}
```

### useCallback

Memoizes functions to prevent reference changes.

```js
import { useCallback, useState } from "react";

function ParentComponent() {
  const [count, setCount] = useState(0);

  // Without useCallback - new function on every render
  const handleClick = () => {
    console.log("Button clicked");
  };

  // With useCallback - same function reference
  const memoizedHandleClick = useCallback(() => {
    console.log("Button clicked");
  }, []); // Empty dependency array

  // With dependencies
  const handleCountClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // No dependencies - stable function

  const handleCountWithDependency = useCallback((value) => {
    setCount((prev) => prev + value);
  }, []); // Dependencies in closure

  return (
    <div>
      <ChildComponent onClick={memoizedHandleClick} />
      <ChildComponent onClick={handleCountClick} />
      <p>Count: {count}</p>
    </div>
  );
}

// Child component that benefits from memoized callback
const ChildComponent = React.memo(({ onClick }) => {
  console.log("ChildComponent rendered");
  return <button onClick={onClick}>Click me</button>;
});
```

## Component Optimization

### Component Splitting

Break large components into smaller, focused ones.

```js
// Before - Large component
function UserProfile({ user }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const handleEdit = () => setEditing(true);
  const handleSave = () => {
    // Save logic
    setEditing(false);
  };

  return (
    <div>
      <div className="user-header">
        <img src={user.avatar} alt={user.name} />
        <h2>{user.name}</h2>
        <button onClick={handleEdit}>Edit</button>
      </div>

      {editing && (
        <div className="user-form">
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}

      <div className="user-details">
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Address: {user.address}</p>
      </div>

      <div className="user-posts">
        {user.posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// After - Split into smaller components
function UserProfile({ user }) {
  return (
    <div>
      <UserHeader user={user} />
      <UserDetails user={user} />
      <UserPosts posts={user.posts} />
    </div>
  );
}

const UserHeader = React.memo(({ user }) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className="user-header">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <button onClick={() => setEditing(true)}>Edit</button>
      {editing && <UserEditForm user={user} />}
    </div>
  );
});

const UserDetails = React.memo(({ user }) => (
  <div className="user-details">
    <p>Email: {user.email}</p>
    <p>Phone: {user.phone}</p>
    <p>Address: {user.address}</p>
  </div>
));

const UserPosts = React.memo(({ posts }) => (
  <div className="user-posts">
    {posts.map((post) => (
      <PostItem key={post.id} post={post} />
    ))}
  </div>
));
```

### Lazy Loading

Code-split components to reduce initial bundle size.

```js
import { lazy, Suspense } from "react";

// Lazy load components
const LazyComponent = lazy(() => import("./LazyComponent"));
const AdminPanel = lazy(() => import("./AdminPanel"));
const ChartComponent = lazy(() => import("./ChartComponent"));

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div>
      <h1>My App</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />

        {showAdmin && (
          <Suspense fallback={<div>Loading admin panel...</div>}>
            <AdminPanel />
          </Suspense>
        )}

        <ChartComponent />
      </Suspense>

      <button onClick={() => setShowAdmin(true)}>Show Admin Panel</button>
    </div>
  );
}

// Route-based code splitting
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

function AppRouter() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  );
}
```

## State Management Optimization

### State Colocation

Keep state close to where it's used.

```js
// Bad - Global state for local concerns
function App() {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div>
      <SearchInput
        value={inputValue}
        onChange={setInputValue}
        onDropdownToggle={setIsDropdownOpen}
        onSelect={setSelectedOption}
      />
      <OtherComponents />
    </div>
  );
}

// Good - Local state management
function SearchInput() {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsDropdownOpen(true)}
      />
      {isDropdownOpen && (
        <Dropdown
          onSelect={setSelectedOption}
          onClose={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}
```

### Derived State

Avoid redundant state by computing values from existing state.

```js
// Bad - Redundant state
function ShoppingCart({ items }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const newTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const newCount = items.reduce((sum, item) => sum + item.quantity, 0);
    setTotal(newTotal);
    setItemCount(newCount);
  }, [items]);

  return (
    <div>
      <p>Items: {itemCount}</p>
      <p>Total: ${total}</p>
    </div>
  );
}

// Good - Derived state
function ShoppingCart({ items }) {
  const [items, setItems] = useState([]);

  // Derived values - no extra state needed
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  return (
    <div>
      <p>Items: {itemCount}</p>
      <p>Total: ${total}</p>
    </div>
  );
}
```

## List Rendering Optimization

### Virtualization

For large lists, use windowing to render only visible items.

```js
import { FixedSizeList as List } from "react-window";

// Basic virtualized list
function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ListItem item={items[index]} />
    </div>
  );

  return (
    <List height={600} itemCount={items.length} itemSize={50} width="100%">
      {Row}
    </List>
  );
}

// Custom virtualized implementation
function VirtualList({ items, itemHeight, containerHeight }) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(visibleStart, visibleEnd);

  return (
    <div
      style={{ height: containerHeight, overflow: "auto" }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: "relative" }}>
        {visibleItems.map((item, index) => (
          <div
            key={visibleStart + index}
            style={{
              position: "absolute",
              top: (visibleStart + index) * itemHeight,
              height: itemHeight,
              width: "100%",
            }}
          >
            <ListItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Key Optimization

Use stable, unique keys for list items.

```js
// Bad - Using index as key
function BadList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
}

// Good - Using unique ID
function GoodList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// Best - Composite key for uniqueness
function BestList({ items, category }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={`${category}-${item.id}`}>{item.name}</li>
      ))}
    </ul>
  );
}
```

## Context Optimization

### Context Splitting

Split contexts to prevent unnecessary re-renders.

```js
// Bad - Single large context
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState([]);
  const [cart, setCart] = useState([]);

  const value = {
    user,
    setUser,
    theme,
    setTheme,
    notifications,
    setNotifications,
    cart,
    setCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Good - Split contexts
const UserContext = createContext();
const ThemeContext = createContext();
const NotificationContext = createContext();
const CartContext = createContext();

function AppProviders({ children }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <NotificationProvider>
          <CartProvider>{children}</CartProvider>
        </NotificationProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

// Components only subscribe to needed context
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

### Memoized Context Values

```js
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [colors, setColors] = useState({});

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      colors,
      setColors,
    }),
    [theme, colors]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
```

## Image and Asset Optimization

### Image Lazy Loading

```js
import { useState, useRef, useEffect } from "react";

function LazyImage({ src, alt, placeholder }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="image-container">
      {isInView ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      ) : (
        <div className="image-placeholder">{placeholder}</div>
      )}
    </div>
  );
}
```

### Image Optimization Component

```js
function OptimizedImage({
  src,
  alt,
  width,
  height,
  loading = "lazy",
  sizes = "(max-width: 768px) 100vw, 50vw",
}) {
  // Generate responsive image sources
  const generateSrcSet = (baseSrc) => {
    const sizes = [400, 800, 1200, 1600];
    return sizes.map((size) => `${baseSrc}?w=${size} ${size}w`).join(", ");
  };

  return (
    <img
      src={`${src}?w=${width}`}
      srcSet={generateSrcSet(src)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
    />
  );
}
```

## Bundle Optimization

### Tree Shaking

```js
// Bad - Import entire library
import * as _ from "lodash";

// Good - Import specific functions
import { debounce, throttle } from "lodash-es";

// Best - Use individual packages
import debounce from "lodash-es/debounce";
import throttle from "lodash-es/throttle";
```

### Dynamic Imports

```js
// Load heavy libraries only when needed
function loadChartLibrary() {
  return import("chart.js").then((module) => {
    const { Chart } = module.default;
    return Chart;
  });
}

function ChartComponent({ data }) {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    loadChartLibrary().then((Chart) => {
      const chartInstance = new Chart(canvasRef.current, {
        type: "bar",
        data,
      });
      setChart(chartInstance);
    });
  }, [data]);

  return <canvas ref={canvasRef} />;
}
```

## Performance Monitoring

### React DevTools Profiler

```js
import { Profiler } from "react";

function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  console.log("Component render info:", {
    id,
    phase, // 'mount' or 'update'
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Navigation />
      <MainContent />
      <Footer />
    </Profiler>
  );
}
```

### Custom Performance Hooks

```js
function useRenderCount() {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return renderCount.current;
}

function usePerformanceMonitor(componentName) {
  const renderCount = useRenderCount();

  useEffect(() => {
    console.log(`${componentName} rendered ${renderCount} times`);
  });
}

function ExpensiveComponent() {
  usePerformanceMonitor("ExpensiveComponent");

  // Component logic
  return <div>...</div>;
}
```

## Best Practices Summary

1. **Use React.memo** for components that re-render with same props
2. **Memoize expensive calculations** with useMemo
3. **Memoize callbacks** with useCallback
4. **Split large components** into smaller, focused ones
5. **Lazy load components** and routes
6. **Keep state local** when possible
7. **Use derived state** instead of redundant state
8. **Virtualize large lists** instead of rendering all items
9. **Use stable, unique keys** for list items
10. **Split contexts** to prevent unnecessary re-renders
11. **Optimize images** with lazy loading and responsive sources
12. **Use tree shaking** for smaller bundles
13. **Monitor performance** with React DevTools and custom hooks

## Common Performance Pitfalls

1. **Over-memoization**: Don't memoize everything
2. **Inline object/array creation**: Creates new references
3. **Missing dependencies**: Causes stale closures
4. **Large context objects**: Causes widespread re-renders
5. **Unnecessary re-renders**: Profile to identify bottlenecks

## External Resources

- **React DevTools**: Performance profiling
- **Web Vitals**: Core performance metrics
- **Lighthouse**: Performance auditing
- **Bundle Analyzer**: Analyze bundle size
- **React Window**: Virtual scrolling library
