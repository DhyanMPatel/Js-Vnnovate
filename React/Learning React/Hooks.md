# React Hooks

- Hooks let you use React features (state, lifecycle, context, refs, memoization) inside **function components** without writing classes.
- Introduced in React 16.8 to solve three key problems: logic reuse, complex class lifecycles, and growing component trees.
- Hooks are **composable**: combine multiple hooks to build highly testable, declarative UI logic — essential for FAANG-scale systems.

> **FAANG Tip:** Interviewers expect not only syntax knowledge but also _why_ a hook exists, trade-offs, and how to avoid unnecessary renders or stale closures.

---

## Core Rules of Hooks

1. **Only call hooks at the top level** of a function component or another custom hook.
2. **Only call hooks from React functions** — never from regular JS functions or inside loops/conditions.

Breaking these rules leads to inconsistent hook order and runtime errors.

---

## Foundational Hooks

### 1. `useState`

- **Definition:** Provides reactive local state.
- **Use case:** Track primitive or complex values that affect rendering.
- **FAANG-ready detail:** Prefer functional updates (`setState(prev => ...)`) when next state depends on the previous one; it prevents stale reads when React batches updates.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((prev) => prev + 1)}>Count: {count}</button>
  );
}
```

### 2. `useEffect`

- **Definition:** Runs side effects after render (data fetches, subscriptions, imperative DOM ops).
- **Dependency array:** Controls when the effect runs. `[]` = run once, `[dep]` = re-run when `dep` changes.
- **Cleanup:** Return a function to release resources (unsubscribe/clear timers).

```jsx
useEffect(() => {
  const controller = new AbortController();
  fetch("/api/profile", { signal: controller.signal })
    .then((res) => res.json())
    .then(setProfile)
    .catch((err) => {
      if (err.name !== "AbortError") console.error(err);
    });

  return () => controller.abort();
}, []);
```

> **Pitfall:** Forgetting dependencies causes stale data; over-specifying dependencies can create infinite loops. Extract async logic outside the effect to keep the callback synchronous.

### 3. `useContext`

- **Definition:** Reads the current value of a React context.
- **Use case:** Share data (e.g., auth, theming) without prop drilling.
- **Scaling tip:** Avoid putting frequently changing values (like large mutable objects) in context; it re-renders all consumers.

```jsx
const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);
```

### 4. `useReducer`

- **Definition:** Alternate state container driven by reducers (`state + action → newState`).
- **When to choose over `useState`:** When state transitions are complex or need auditing (e.g., logging, undo, deterministic updates).

```jsx
const initialState = { cart: [], total: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        cart: [...state.cart, action.payload],
        total: state.total + action.payload.price,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);
```

### 5. `useRef`

- **Definition:** Holds a mutable `.current` value that survives re-renders without causing re-renders when updated.
- **Usage:** Imperative DOM access, storing timers, caching previous values.

```jsx
const inputRef = useRef(null);

function focusInput() {
  inputRef.current?.focus();
}
```

### 6. `useMemo`

- **Definition:** Memoizes expensive computations and recomputes when dependencies change.
- **Interview insight:** Use sparingly; overuse increases complexity. Focus on measurable performance issues.

```jsx
const sortedUsers = useMemo(() => heavySort(users), [users]);
```

### 7. `useCallback`

- **Definition:** Memoizes function references to keep referential equality between renders (helpful for child components relying on `React.memo`).
- **Common mistake:** Wrapping every function — only memoize when passing callbacks to memoized children or dependency arrays.

```jsx
const handleSearch = useCallback((term) => fetchUsers(term), [fetchUsers]);
```

---

## Real-Time Example: Live Order Health Dashboard

**Scenario:** Build a component that tracks live food-delivery orders, highlights stalled deliveries, and lets operations engineers triage issues — the kind of challenge discussed in FAANG system design interviews.

Key requirements:

1. Poll backend every 10 seconds (network side-effect → `useEffect`).
2. Complex state (loading, success, error, filters) → `useReducer`.
3. Avoid recalculating KPIs for every render → `useMemo`.
4. Keep stable callbacks for child table rows → `useCallback`.
5. Persist WebSocket connection reference → `useRef`.

```jsx
import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";

const initialState = {
  orders: [],
  statusFilter: "ALL",
  isLoading: false,
  error: null,
};

function dashboardReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, orders: action.payload };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "SET_FILTER":
      return { ...state, statusFilter: action.payload };
    default:
      return state;
  }
}

export default function OrderHealthDashboard({ apiClient }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const pollTimerRef = useRef(null);

  const fetchOrders = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const data = await apiClient.fetchLiveOrders();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  }, [apiClient]);

  useEffect(() => {
    fetchOrders();
    pollTimerRef.current = setInterval(fetchOrders, 10_000);
    return () => clearInterval(pollTimerRef.current);
  }, [fetchOrders]);

  const stalledOrders = useMemo(
    () => state.orders.filter((order) => order.minutesPending > 30),
    [state.orders]
  );

  const handleFilterChange = useCallback(
    (status) => dispatch({ type: "SET_FILTER", payload: status }),
    []
  );

  const visibleOrders = useMemo(() => {
    if (state.statusFilter === "ALL") return state.orders;
    return state.orders.filter((order) => order.status === state.statusFilter);
  }, [state.orders, state.statusFilter]);

  return (
    <section>
      <header>
        <h2>Live Order Health</h2>
        <p>Stalled orders: {stalledOrders.length}</p>
        <FilterChips
          selected={state.statusFilter}
          onChange={handleFilterChange}
        />
      </header>

      {state.isLoading && <p>Loading latest telemetry…</p>}
      {state.error && <p role="alert">{state.error}</p>}
      <OrderTable orders={visibleOrders} />
    </section>
  );
}
```

**Why interviewers like this example:**

- Demonstrates understanding of side-effect lifecycles.
- Shows state normalization via reducers instead of scattered `useState` calls.
- Uses memoization only where it prevents real re-render costs.
- Handles cleanup (clearing intervals) to avoid memory leaks.

---

## Additional Hooks (Mention-worthy)

| Hook                                 | When to Use                                              | Interview Soundbite                                                           |
| ------------------------------------ | -------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `useLayoutEffect`                    | Need to measure DOM before paint                         | Runs synchronously _after_ DOM mutations but before paint; avoid blocking UI. |
| `useImperativeHandle`                | Customize refs exposed by `forwardRef` components        | Hides internal DOM structure, useful for reusable libraries.                  |
| `useTransition` / `useDeferredValue` | Separate urgent vs non-urgent updates (Concurrent React) | Keeps UI responsive under heavy data transforms.                              |
| `useId`                              | Generate unique IDs for accessibility                    | Prevents hydration mismatches in SSR apps.                                    |

---

## Crafting Custom Hooks

- Extract shared logic into reusable functions prefixed with `use`.
- Accept dependencies/params to keep hooks pure.
- Return state + actions to follow React conventions.

```jsx
function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
```

**Interview framing:** “To prevent firing a search query on each keystroke, I extracted debouncing into `useDebouncedValue`, making it easy to reuse across dashboards.”

---

## Checklist for FAANG Interviews

1. **Explain the problem a hook solves** (historical context: classes, mixins, render props).
2. **Discuss performance guards**: memoization, dependency correctness, cleanup strategies.
3. **Surface edge cases:** stale closures, race conditions, effect order, hydration issues.
4. **Show architectural thinking:** combine hooks to build deterministic, testable, and resilient UI modules.
5. **Link to system design:** Hooks manage browser concerns while integrating with larger data/infra layers.

Mastering hooks with this depth showcases not just API familiarity, but the reasoning and rigor expected in FAANG interviews.
