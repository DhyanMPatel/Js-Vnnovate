# React Router

React Router is the standard routing library for React. It enables navigation among different components in a React application, allows changing the browser URL, and keeps the UI in sync with the URL.

## Installation

```bash
# npm
npm install react-router-dom

# yarn
yarn add react-router-dom
```

## Core Concepts

### 1. BrowserRouter

Uses HTML5 history API to keep UI in sync with URL.

```js
import { BrowserRouter } from "react-router-dom";

function App() {
  return <BrowserRouter>{/* Your app components */}</BrowserRouter>;
}
```

### 2. Routes and Route

Define which component renders for which URL path.

```js
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 3. Link and NavLink

Create navigation links.

```js
import { Link, NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>

      {/* NavLink adds active styling */}
      <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Contact
      </NavLink>
    </nav>
  );
}
```

## Basic Setup

```js
// App.js
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## Dynamic Routes

### Route Parameters

```js
// User profile page
function UserProfile() {
  const { userId } = useParams();

  return <div>User Profile: {userId}</div>;
}

// In routes
<Route path="/users/:userId" element={<UserProfile />} />;

// User posts page
function UserPosts() {
  const { userId, postId } = useParams();

  return (
    <div>
      Post {postId} by User {userId}
    </div>
  );
}

// Nested routes
<Route path="/users/:userId/posts/:postId" element={<UserPosts />} />;
```

### Query Parameters

```js
import { useSearchParams } from "react-router-dom";

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q");
  const page = searchParams.get("page") || "1";

  const handleSearch = (newQuery) => {
    setSearchParams({ q: newQuery, page: "1" });
  };

  return (
    <div>
      <input
        value={query || ""}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      <p>Searching for: {query}</p>
      <p>Page: {page}</p>
    </div>
  );
}
```

## Nested Routes

### Route Nesting

```js
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="users" element={<UsersLayout />}>
            <Route index element={<UsersList />} />
            <Route path=":userId" element={<UserProfile />} />
            <Route path=":userId/posts" element={<UserPosts />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Layout component with Outlet
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/users">Users</Link>
        </nav>
      </header>

      <main>
        <Outlet /> {/* Nested routes render here */}
      </main>

      <footer>
        <p>© 2024 My App</p>
      </footer>
    </div>
  );
}

function UsersLayout() {
  return (
    <div>
      <h2>Users Section</h2>
      <Outlet />
    </div>
  );
}
```

## Navigation

### Programmatic Navigation

```js
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform login
    const success = await login(formData);

    if (success) {
      navigate("/dashboard"); // Navigate to dashboard
    } else {
      navigate("/login?error=invalid"); // Navigate with query param
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Login</button>
    </form>
  );
}

// Navigation with state
function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/product", {
      state: { product },
    });
  };

  return (
    <div onClick={handleClick}>
      <h3>{product.name}</h3>
    </div>
  );
}
```

### Navigation History

```js
import { useNavigate, useLocation } from "react-router-dom";

function NavigationControls() {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1); // Go back one page
  };

  const goForward = () => {
    navigate(1); // Go forward one page
  };

  const refresh = () => {
    navigate(0); // Refresh current page
  };

  return (
    <div>
      <p>Current path: {location.pathname}</p>
      <button onClick={goBack}>Back</button>
      <button onClick={goForward}>Forward</button>
      <button onClick={refresh}>Refresh</button>
    </div>
  );
}
```

## Route Guards and Authentication

### Protected Routes

```js
// ProtectedRoute component
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Usage in routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

// Login component with redirect
function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (credentials) => {
    await login(credentials);
    // Navigation will happen in useEffect
  };

  return <form onSubmit={handleSubmit}>{/* Login form */}</form>;
}
```

### Role-based Access

```js
function RoleBasedRoute({ children, requiredRole }) {
  const { user } = useAuth();

  if (!user || user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

// Usage
<Route
  path="/admin"
  element={
    <RoleBasedRoute requiredRole="admin">
      <AdminPanel />
    </RoleBasedRoute>
  }
/>;
```

## Advanced Patterns

### Custom Routes

```js
// AnimatedRoute component
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function AnimatedRoute({ children }) {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// Usage with Routes
function App() {
  return (
    <BrowserRouter>
      <AnimatePresence>
        <Routes>
          <Route
            path="/"
            element={
              <AnimatedRoute>
                <Home />
              </AnimatedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
```

### Route-based Code Splitting

```js
import { lazy, Suspense } from "react";

// Lazy load components
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Search and Filter Routes

```js
function ProductList() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page") || "1";

  const { products, loading } = useProducts({
    category,
    sort,
    page: parseInt(page),
  });

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    navigate(`/products?${params.toString()}`);
  };

  return (
    <div>
      <FilterForm filters={{ category, sort }} onChange={updateFilters} />

      {loading ? <div>Loading...</div> : <ProductGrid products={products} />}

      <Pagination currentPage={page} />
    </div>
  );
}
```

## Error Handling

### 404 Not Found

```js
function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

// In routes
<Route path="*" element={<NotFound />} />;
```

### Error Boundary for Routes

```js
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>Something went wrong!</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>{/* Your routes */}</Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
```

## Performance Optimization

### Route Preloading

```js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function RoutePreloader() {
  const location = useLocation();

  useEffect(() => {
    // Preload components based on current route
    if (location.pathname === "/") {
      import("./components/About");
      import("./components/Contact");
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <RoutePreloader />
      <Routes>{/* Your routes */}</Routes>
    </BrowserRouter>
  );
}
```

## Testing React Router

```js
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navigation } from "./Navigation";

test("renders navigation links", () => {
  render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );

  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("About")).toBeInTheDocument();
});

test("navigates to correct route", async () => {
  render(
    <MemoryRouter initialEntries={["/about"]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText("About Page")).toBeInTheDocument();
});
```

## Best Practices

1. **Use descriptive route paths**: `/users/:userId` instead of `/u/:id`
2. **Implement proper error handling**: 404, 500 pages
3. **Use route guards**: Protect authenticated routes
4. **Optimize bundle size**: Lazy load route components
5. **Handle browser back/forward**: Test navigation behavior
6. **Use semantic HTML**: Proper nav and main elements
7. **Implement loading states**: Better UX during navigation

## Common Pitfalls

1. **Missing BrowserRouter**: Routes won't work without it
2. **Incorrect path matching**: Exact vs partial matching
3. **State loss on navigation**: Preserve state when needed
4. **Performance issues**: Too many route components
5. **SEO concerns**: Client-side routing limitations

## External Resources

- **React Router Docs**: Official documentation
- **React Router v6 Migration Guide**: Upgrading from v5
- **React Patterns**: Advanced routing patterns
- **Testing Library**: Testing router components
