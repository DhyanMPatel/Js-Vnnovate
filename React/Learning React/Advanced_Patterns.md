# Advanced React Patterns

Advanced patterns help build scalable, maintainable, and reusable React applications. This guide covers sophisticated techniques used in large-scale applications.

## Compound Components

Compound components allow you to create flexible APIs by sharing state between related components.

### Basic Compound Components

```typescript
// Tabs.tsx
interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within Tabs provider");
  }
  return context;
};

interface TabsProps {
  defaultActiveTab?: string;
  children: React.ReactNode;
  className?: string;
}

const Tabs: React.FC<TabsProps> & {
  Tab: typeof Tab;
  TabPanel: typeof TabPanel;
  TabList: typeof TabList;
} = ({ defaultActiveTab, children, className }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || "");

  const value: TabsContextType = {
    activeTab,
    setActiveTab,
  };

  return (
    <TabsContext.Provider value={value}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

const TabList: React.FC<TabListProps> = ({ children, className }) => {
  return <div className={`tab-list ${className || ""}`}>{children}</div>;
};

interface TabProps {
  tabId: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Tab: React.FC<TabProps> = ({
  tabId,
  children,
  disabled = false,
  className,
}) => {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === tabId;

  const handleClick = () => {
    if (!disabled) {
      setActiveTab(tabId);
    }
  };

  return (
    <button
      className={`tab ${isActive ? "active" : ""} ${
        disabled ? "disabled" : ""
      } ${className || ""}`}
      onClick={handleClick}
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

interface TabPanelProps {
  tabId: string;
  children: React.ReactNode;
  className?: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ tabId, children, className }) => {
  const { activeTab } = useTabs();
  const isActive = activeTab === tabId;

  if (!isActive) return null;

  return (
    <div
      className={`tab-panel ${className || ""}`}
      role="tabpanel"
      aria-labelledby={`tab-${tabId}`}
    >
      {children}
    </div>
  );
};

Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

// Usage
const ExampleTabs = () => {
  return (
    <Tabs defaultActiveTab="profile">
      <Tabs.TabList>
        <Tabs.Tab tabId="profile">Profile</Tabs.Tab>
        <Tabs.Tab tabId="settings">Settings</Tabs.Tab>
        <Tabs.Tab tabId="notifications" disabled>
          Notifications
        </Tabs.Tab>
      </Tabs.TabList>

      <Tabs.TabPanel tabId="profile">
        <h2>Profile Content</h2>
        <p>User profile information goes here.</p>
      </Tabs.TabPanel>

      <Tabs.TabPanel tabId="settings">
        <h2>Settings Content</h2>
        <p>Application settings go here.</p>
      </Tabs.TabPanel>

      <Tabs.TabPanel tabId="notifications">
        <h2>Notifications Content</h2>
        <p>Notification preferences go here.</p>
      </Tabs.TabPanel>
    </Tabs>
  );
};
```

### Advanced Compound Components with State Management

```typescript
// Accordion.tsx
interface AccordionItemContextType {
  isOpen: boolean;
  toggle: () => void;
  itemId: string;
}

const AccordionItemContext = React.createContext<
  AccordionItemContextType | undefined
>(undefined);

const useAccordionItem = () => {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "AccordionItem components must be used within AccordionItem"
    );
  }
  return context;
};

interface AccordionContextType {
  openItems: Set<string>;
  toggleItem: (itemId: string) => void;
  multiple?: boolean;
}

const AccordionContext = React.createContext<AccordionContextType | undefined>(
  undefined
);

const useAccordion = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion components must be used within Accordion provider"
    );
  }
  return context;
};

interface AccordionProps {
  children: React.ReactNode;
  multiple?: boolean;
  defaultOpenItems?: string[];
  className?: string;
}

const Accordion: React.FC<AccordionProps> & {
  Item: typeof AccordionItem;
  Header: typeof AccordionHeader;
  Content: typeof AccordionContent;
} = ({ children, multiple = false, defaultOpenItems = [], className }) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(defaultOpenItems)
  );

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        if (!multiple) {
          newSet.clear();
        }
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const value: AccordionContextType = {
    openItems,
    toggleItem,
    multiple,
  };

  return (
    <AccordionContext.Provider value={value}>
      <div className={`accordion ${className || ""}`}>{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  itemId: string;
  children: React.ReactNode;
  className?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  itemId,
  children,
  className,
}) => {
  const { openItems, toggleItem } = useAccordion();
  const isOpen = openItems.has(itemId);

  const toggle = () => toggleItem(itemId);

  const value: AccordionItemContextType = {
    isOpen,
    toggle,
    itemId,
  };

  return (
    <AccordionItemContext.Provider value={value}>
      <div
        className={`accordion-item ${isOpen ? "open" : ""} ${className || ""}`}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

interface AccordionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  children,
  className,
}) => {
  const { isOpen, toggle, itemId } = useAccordionItem();

  return (
    <button
      className={`accordion-header ${className || ""}`}
      onClick={toggle}
      aria-expanded={isOpen}
      aria-controls={`accordion-content-${itemId}`}
      id={`accordion-header-${itemId}`}
    >
      {children}
      <span className={`accordion-icon ${isOpen ? "open" : ""}`}>▼</span>
    </button>
  );
};

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  className,
}) => {
  const { isOpen, itemId } = useAccordionItem();

  return (
    <div
      className={`accordion-content ${isOpen ? "open" : ""} ${className || ""}`}
      role="region"
      aria-labelledby={`accordion-header-${itemId}`}
      id={`accordion-content-${itemId}`}
      hidden={!isOpen}
    >
      {children}
    </div>
  );
};

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;

// Usage
const ExampleAccordion = () => {
  return (
    <Accordion multiple defaultOpenItems={["item1"]}>
      <Accordion.Item itemId="item1">
        <Accordion.Header>Section 1</Accordion.Header>
        <Accordion.Content>
          <p>Content for section 1 goes here.</p>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item itemId="item2">
        <Accordion.Header>Section 2</Accordion.Header>
        <Accordion.Content>
          <p>Content for section 2 goes here.</p>
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item itemId="item3">
        <Accordion.Header>Section 3</Accordion.Header>
        <Accordion.Content>
          <p>Content for section 3 goes here.</p>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
```

## Render Props Pattern

Render props allow you to share code between components using a prop whose value is a function.

### Basic Render Props

```typescript
// MouseTracker.tsx
interface MousePosition {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  render: (position: MousePosition) => React.ReactNode;
  children?: (position: MousePosition) => React.ReactNode;
}

const MouseTracker: React.FC<MouseTrackerProps> = ({ render, children }) => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const renderProp = children || render;

  return <div onMouseMove={handleMouseMove}>{renderProp(position)}</div>;
};

// Usage
const MouseTrackerExample = () => {
  return (
    <MouseTracker>
      {(position) => (
        <div>
          <h1>Mouse Position</h1>
          <p>
            X: {position.x}, Y: {position.y}
          </p>
        </div>
      )}
    </MouseTracker>
  );
};

// Alternative usage with render prop
const MouseTrackerAlternative = () => {
  return (
    <MouseTracker
      render={(position) => (
        <div>
          <h1>Mouse Position (Render Prop)</h1>
          <p>
            X: {position.x}, Y: {position.y}
          </p>
        </div>
      )}
    />
  );
};
```

### Advanced Render Props with State Management

```typescript
// DataFetcher.tsx
interface DataFetcherState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface DataFetcherProps<T> {
  url: string;
  children: (state: DataFetcherState<T>) => React.ReactNode;
  render?: (state: DataFetcherState<T>) => React.ReactNode;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

function DataFetcher<T>({
  url,
  children,
  render,
  onSuccess,
  onError,
}: DataFetcherProps<T>) {
  const [state, setState] = useState<DataFetcherState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setState({ data, loading: false, error: null });
        onSuccess?.(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setState({ data: null, loading: false, error: errorMessage });
        onError?.(errorMessage);
      }
    };

    fetchData();
  }, [url, onSuccess, onError]);

  const renderProp = children || render;
  return <>{renderProp(state)}</>;
}

// Usage
interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile = ({ userId }: { userId: number }) => {
  return (
    <DataFetcher<User>
      url={`/api/users/${userId}`}
      onSuccess={(user) => console.log("User loaded:", user)}
      onError={(error) => console.error("Failed to load user:", error)}
    >
      {({ data, loading, error }) => {
        if (loading) return <div>Loading user...</div>;
        if (error) return <div>Error: {error}</div>;
        if (!data) return <div>No user found</div>;

        return (
          <div>
            <h1>{data.name}</h1>
            <p>{data.email}</p>
          </div>
        );
      }}
    </DataFetcher>
  );
};
```

## Higher-Order Components (HOCs)

HOCs are functions that take a component and return a new component with additional props or behavior.

### Basic HOC

```typescript
// withLoading.tsx
interface WithLoadingProps {
  loading: boolean;
  error?: string;
}

const withLoading = <P extends object>(
  Component: React.ComponentType<P & WithLoadingProps>
) => {
  const WithLoadingComponent = (props: P & WithLoadingProps) => {
    const { loading, error, ...rest } = props;

    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (error) {
      return <div className="error">Error: {error}</div>;
    }

    return <Component {...(rest as P)} />;
  };

  WithLoadingComponent.displayName = `withLoading(${
    Component.displayName || Component.name
  })`;

  return WithLoadingComponent;
};

// Usage
interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

const UserListWithLoading = withLoading(UserList);

// Component usage
const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers([
        { id: 1, name: "John", email: "john@example.com" },
        { id: 2, name: "Jane", email: "jane@example.com" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return <UserListWithLoading users={users} loading={loading} error={error} />;
};
```

### Advanced HOC with Configuration

```typescript
// withLogger.tsx
interface LoggerConfig {
  logProps?: boolean;
  logMount?: boolean;
  logUnmount?: boolean;
  logUpdates?: boolean;
  customLogger?: (message: string, data?: any) => void;
}

const defaultLoggerConfig: LoggerConfig = {
  logProps: true,
  logMount: true,
  logUnmount: true,
  logUpdates: true,
  customLogger: console.log,
};

const withLogger = <P extends object>(
  Component: React.ComponentType<P>,
  config: LoggerConfig = {}
) => {
  const finalConfig = { ...defaultLoggerConfig, ...config };
  const { customLogger } = finalConfig;

  const WithLoggerComponent = (props: P) => {
    const prevPropsRef = useRef<P>();

    useEffect(() => {
      if (finalConfig.logMount) {
        customLogger(`${Component.name} mounted`);
      }

      if (finalConfig.logProps) {
        customLogger(`${Component.name} initial props:`, props);
      }

      return () => {
        if (finalConfig.logUnmount) {
          customLogger(`${Component.name} unmounted`);
        }
      };
    }, []);

    useEffect(() => {
      if (prevPropsRef.current && finalConfig.logUpdates) {
        customLogger(`${Component.name} props updated:`, {
          from: prevPropsRef.current,
          to: props,
        });
      }
      prevPropsRef.current = props;
    });

    return <Component {...props} />;
  };

  WithLoggerComponent.displayName = `withLogger(${
    Component.displayName || Component.name
  })`;

  return WithLoggerComponent;
};

// Usage
const LoggedUserList = withLogger(UserList, {
  logProps: true,
  customLogger: (message, data) => {
    console.log(`[Custom Logger] ${message}`, data);
  },
});
```

### HOC Composition

```typescript
// withAuth.tsx
interface AuthUser {
  id: number;
  name: string;
  permissions: string[];
}

interface WithAuthProps {
  user: AuthUser | null;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const withAuth = <P extends object>(
  Component: React.ComponentType<P & WithAuthProps>
) => {
  const WithAuthComponent = (props: P) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    const login = async (credentials: any) => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setUser({
          id: 1,
          name: "John Doe",
          permissions: ["read", "write"],
        });
        setLoading(false);
      }, 1000);
    };

    const logout = () => {
      setUser(null);
    };

    useEffect(() => {
      // Check authentication status
      setLoading(false);
    }, []);

    return (
      <Component
        {...(props as P)}
        user={user}
        login={login}
        logout={logout}
        loading={loading}
      />
    );
  };

  WithAuthComponent.displayName = `withAuth(${
    Component.displayName || Component.name
  })`;

  return WithAuthComponent;
};

// Compose HOCs
const enhance = compose(withLoading, withLogger, withAuth);

const EnhancedUserList = enhance(UserList);

// Helper function for composing HOCs
function compose<T>(...fns: Array<(arg: T) => T>) {
  return (value: T) => fns.reduceRight((acc, fn) => fn(acc), value);
}
```

## Custom Hooks Pattern

Custom hooks allow you to extract component logic into reusable functions.

### State Management Hook

```typescript
// useLocalStorage.ts
interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  removeValue: () => void;
}

function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return { value: storedValue, setValue, removeValue };
}

// Usage
const SettingsComponent = () => {
  const { value: theme, setValue: setTheme } = useLocalStorage<
    "light" | "dark"
  >("theme", "light");

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
};
```

### API Hook with Caching

```typescript
// useApi.ts
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  cache?: boolean;
  cacheTime?: number;
  retry?: number;
  retryDelay?: number;
}

const apiCache = new Map<string, { data: any; timestamp: number }>();

function useApi<T>(
  url: string,
  options: UseApiOptions = {}
): ApiState<T> & { refetch: () => void } {
  const {
    cache = true,
    cacheTime = 5 * 60 * 1000,
    retry = 0,
    retryDelay = 1000,
  } = options;

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const retryCountRef = useRef(0);

  const fetchData = async (useCache = true) => {
    if (cache && useCache) {
      const cached = apiCache.get(url);
      if (cached && Date.now() - cached.timestamp < cacheTime) {
        setState({ data: cached.data, loading: false, error: null });
        return;
      }
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (cache) {
        apiCache.set(url, { data, timestamp: Date.now() });
      }

      setState({ data, loading: false, error: null });
      retryCountRef.current = 0;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";

      if (retryCountRef.current < retry) {
        retryCountRef.current++;
        setTimeout(() => fetchData(false), retryDelay * retryCountRef.current);
      } else {
        setState({ data: null, loading: false, error: errorMessage });
        retryCountRef.current = 0;
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = () => {
    retryCountRef.current = 0;
    fetchData(false);
  };

  return { ...state, refetch };
}

// Usage
const UserProfile = ({ userId }: { userId: number }) => {
  const {
    data: user,
    loading,
    error,
    refetch,
  } = useApi<User>(`/api/users/${userId}`, {
    cache: true,
    cacheTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
};
```

### Debounced Hook

```typescript
// useDebounce.ts
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search
      fetch(`/api/search?q=${debouncedSearchTerm}`)
        .then((response) => response.json())
        .then((data) => setResults(data));
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map((result) => (
          <li key={result}>{result}</li>
        ))}
      </ul>
    </div>
  );
};
```

## State Reducer Pattern

The state reducer pattern provides a predictable way to manage complex state.

### Custom State Reducer Hook

```typescript
// useReducerWithMiddleware.ts
interface Middleware<T, A> {
  (state: T, action: A, next: (action: A) => void): void;
}

function useReducerWithMiddleware<T, A>(
  reducer: (state: T, action: A) => T,
  initialState: T,
  middlewares: Middleware<T, A>[] = []
) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = (action: A) => {
    let index = 0;

    const next = (action: A) => {
      if (index < middlewares.length) {
        const middleware = middlewares[index++];
        middleware(state, action, next);
      } else {
        dispatch(action);
      }
    };

    next(action);
  };

  return [state, enhancedDispatch] as const;
}

// Usage with logging middleware
const loggingMiddleware: Middleware<State, Action> = (state, action, next) => {
  console.log("Before action:", state, action);
  next(action);
};

const apiMiddleware: Middleware<State, Action> = (state, action, next) => {
  if (action.type === "SAVE_DATA") {
    // Perform API call
    fetch("/api/save", {
      method: "POST",
      body: JSON.stringify(state),
    }).then(() => {
      next({ type: "SAVE_SUCCESS" });
    });
  } else {
    next(action);
  }
};

const [state, dispatch] = useReducerWithMiddleware(reducer, initialState, [
  loggingMiddleware,
  apiMiddleware,
]);
```

### Complex State Management

```typescript
// useForm.ts
interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
}

type FormAction<T> =
  | { type: "SET_VALUE"; field: keyof T; value: T[keyof T] }
  | { type: "SET_ERROR"; field: keyof T; error: string }
  | { type: "SET_TOUCHED"; field: keyof T }
  | { type: "SET_ERRORS"; errors: Partial<Record<keyof T, string>> }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean }
  | { type: "RESET_FORM" };

function formReducer<T>(
  state: FormState<T>,
  action: FormAction<T>
): FormState<T> {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      };
    case "SET_TOUCHED":
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.isSubmitting };
    case "RESET_FORM":
      return {
        ...state,
        values: {} as T,
        errors: {},
        touched: {},
        isSubmitting: false,
      };
    default:
      return state;
  }
}

function useForm<T extends Record<string, any>>(
  initialValues: T,
  validate?: (values: T) => Partial<Record<keyof T, string>>
) {
  const [state, dispatch] = useReducer(formReducer<T>, {
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  });

  const setValue = (field: keyof T, value: T[keyof T]) => {
    dispatch({ type: "SET_VALUE", field, value });

    if (validate && state.touched[field]) {
      const errors = validate({ ...state.values, [field]: value });
      dispatch({ type: "SET_ERROR", field, error: errors[field] || "" });
    }
  };

  const setError = (field: keyof T, error: string) => {
    dispatch({ type: "SET_ERROR", field, error });
  };

  const setTouched = (field: keyof T) => {
    dispatch({ type: "SET_TOUCHED", field });

    if (validate) {
      const errors = validate(state.values);
      dispatch({ type: "SET_ERROR", field, error: errors[field] || "" });
    }
  };

  const handleSubmit = async (onSubmit: (values: T) => Promise<void>) => {
    dispatch({ type: "SET_SUBMITTING", isSubmitting: true });

    if (validate) {
      const errors = validate(state.values);
      dispatch({ type: "SET_ERRORS", errors });

      if (Object.keys(errors).some((key) => errors[key as keyof T])) {
        dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
        return;
      }
    }

    try {
      await onSubmit(state.values);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
    }
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    setValue,
    setError,
    setTouched,
    handleSubmit,
    resetForm,
  };
}

// Usage
interface LoginForm {
  email: string;
  password: string;
}

const LoginFormComponent = () => {
  const validate = (values: LoginForm) => {
    const errors: Partial<Record<keyof LoginForm, string>> = {};

    if (!values.email) errors.email = "Email is required";
    if (!values.password) errors.password = "Password is required";
    if (values.password && values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    return errors;
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setError,
    setTouched,
    handleSubmit,
  } = useForm<LoginForm>({ email: "", password: "" }, validate);

  const onSubmit = async (formData: LoginForm) => {
    // Submit form
    console.log("Submitting:", formData);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit);
      }}
    >
      <div>
        <input
          type="email"
          value={values.email}
          onChange={(e) => setValue("email", e.target.value)}
          onBlur={() => setTouched("email")}
          placeholder="Email"
        />
        {touched.email && errors.email && (
          <span className="error">{errors.email}</span>
        )}
      </div>

      <div>
        <input
          type="password"
          value={values.password}
          onChange={(e) => setValue("password", e.target.value)}
          onBlur={() => setTouched("password")}
          placeholder="Password"
        />
        {touched.password && errors.password && (
          <span className="error">{errors.password}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};
```

## Provider Pattern

The provider pattern allows you to share state across the component tree without prop drilling.

### Multi-Provider Setup

```typescript
// AppProviders.tsx
interface AppContextType {
  user: User | null;
  theme: "light" | "dark";
  notifications: Notification[];
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const value: AppContextType = {
    user,
    theme,
    notifications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Composition of providers
const composeProviders = (
  ...providers: React.ComponentType<{ children: React.ReactNode }>[]
) => {
  return ({ children }: { children: React.ReactNode }) => {
    return providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children as React.ReactElement
    );
  };
};

const AppProviders = composeProviders(
  AppProvider,
  ThemeProvider,
  NotificationProvider,
  RouterProvider
);

// Usage
const App = () => {
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </AppProviders>
  );
};
```

## Performance Patterns

### Virtual Scrolling

```typescript
// useVirtualScroll.ts
interface VirtualScrollOptions {
  itemCount: number;
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

function useVirtualScroll(options: VirtualScrollOptions) {
  const { itemCount, itemHeight, containerHeight, overscan = 5 } = options;
  const [scrollTop, setScrollTop] = useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight),
    itemCount - 1
  );

  const startIndex = Math.max(0, visibleStart - overscan);
  const endIndex = Math.min(itemCount - 1, visibleEnd + overscan);

  const items = [];
  for (let i = startIndex; i <= endIndex; i++) {
    items.push({
      index: i,
      top: i * itemHeight,
      height: itemHeight,
    });
  }

  const totalHeight = itemCount * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return {
    items,
    totalHeight,
    handleScroll,
  };
}

// Usage
const VirtualList: React.FC<{
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
}> = ({ items, itemHeight, containerHeight, renderItem }) => {
  const {
    items: visibleItems,
    totalHeight,
    handleScroll,
  } = useVirtualScroll({
    itemCount: items.length,
    itemHeight,
    containerHeight,
  });

  return (
    <div
      style={{ height: containerHeight, overflow: "auto" }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map(({ index, top }) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top,
              height: itemHeight,
              width: "100%",
            }}
          >
            {renderItem(items[index], index)}
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Error Boundary Pattern

Error boundaries catch JavaScript errors in their child component tree, log errors, and display a fallback UI.

```typescript
// ErrorBoundary.tsx
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    this.props.onError?.(error, errorInfo);
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} reset={this.reset} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{ error: Error; reset: () => void }> = ({
  error,
  reset,
}) => (
  <div className="error-boundary">
    <h2>Something went wrong</h2>
    <details>
      <summary>Error details</summary>
      <pre>{error.stack}</pre>
    </details>
    <button onClick={reset}>Try again</button>
  </div>
);

// Usage
const App = () => {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error("Error caught by boundary:", error, errorInfo);
        // Send to error reporting service
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/risky" element={<RiskyComponent />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};
```

## External Resources

- **React Patterns**: Advanced patterns and techniques
- **React Docs**: Official React documentation
- **React Hooks**: Custom hooks patterns
- **Component Composition**: Advanced composition techniques
- **Performance Optimization**: React performance best practices
