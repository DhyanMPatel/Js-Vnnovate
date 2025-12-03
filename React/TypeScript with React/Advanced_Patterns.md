# Advanced TypeScript Patterns with React

## Advanced Component Patterns

### Higher-Order Components with TypeScript

```typescript
import React from "react";

// Generic HOC with props injection
interface WithLoadingProps {
  loading: boolean;
  error?: string;
}

function withLoading<P extends object>(
  Component: React.ComponentType<P & WithLoadingProps>
) {
  return function WithLoadingComponent(props: P & WithLoadingProps) {
    const { loading, error, ...rest } = props;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return <Component {...(rest as P)} />;
  };
}

// Usage
interface UserDataProps {
  user: { id: number; name: string; email: string };
}

const UserProfile = ({ user }: UserDataProps) => (
  <div>
    <h1>{user.name}</h1>
    <p>{user.email}</p>
  </div>
);

const UserProfileWithLoading = withLoading(UserProfile);

// Component usage
<UserProfileWithLoading
  user={{ id: 1, name: "John", email: "john@example.com" }}
  loading={false}
/>;
```

### Render Props with TypeScript

```typescript
interface RenderProps<T> {
  data: T;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface DataFetcherProps<T> {
  url: string;
  children: (props: RenderProps<T>) => React.ReactNode;
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((jsonData: T) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  const refetch = () => {
    setLoading(true);
    setError(null);
    // Refetch logic
  };

  return <>{children({ data: data!, loading, error, refetch })}</>;
}

// Usage
interface User {
  id: number;
  name: string;
}

const UserComponent = () => (
  <DataFetcher<User> url="/api/user">
    {({ data, loading, error, refetch }) => (
      <div>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {data && (
          <div>
            <h1>{data.name}</h1>
            <button onClick={refetch}>Refetch</button>
          </div>
        )}
      </div>
    )}
  </DataFetcher>
);
```

### Compound Components with TypeScript

```typescript
interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  defaultActiveTab?: string;
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> & {
  Tab: typeof Tab;
  TabPanel: typeof TabPanel;
} = ({ defaultActiveTab, children }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || "");

  const value: TabsContextType = {
    activeTab,
    setActiveTab,
  };

  return (
    <TabsContext.Provider value={value}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

interface TabProps {
  tabId: string;
  children: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ tabId, children }) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("Tab must be used within Tabs");

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === tabId;

  return (
    <button
      className={`tab ${isActive ? "active" : ""}`}
      onClick={() => setActiveTab(tabId)}
    >
      {children}
    </button>
  );
};

interface TabPanelProps {
  tabId: string;
  children: React.ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({ tabId, children }) => {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabPanel must be used within Tabs");

  const { activeTab } = context;
  const isActive = activeTab === tabId;

  return isActive ? <div className="tab-panel">{children}</div> : null;
};

Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

// Usage
const ExampleTabs = () => (
  <Tabs defaultActiveTab="profile">
    <Tabs.Tab tabId="profile">Profile</Tabs.Tab>
    <Tabs.Tab tabId="settings">Settings</Tabs.Tab>

    <Tabs.TabPanel tabId="profile">
      <div>Profile content</div>
    </Tabs.TabPanel>
    <Tabs.TabPanel tabId="settings">
      <div>Settings content</div>
    </Tabs.TabPanel>
  </Tabs>
);
```

## Advanced Hook Patterns

### Generic Custom Hooks

```typescript
// Generic useLocalStorage hook
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
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
      console.error("Error saving to localStorage:", error);
    }
  };

  return [storedValue, setValue];
}

// Usage
interface UserSettings {
  theme: "light" | "dark";
  language: string;
  notifications: boolean;
}

const SettingsComponent = () => {
  const [settings, setSettings] = useLocalStorage<UserSettings>(
    "user-settings",
    {
      theme: "light",
      language: "en",
      notifications: true,
    }
  );

  return (
    <div>
      <p>Theme: {settings.theme}</p>
      <button onClick={() => setSettings({ ...settings, theme: "dark" })}>
        Set Dark Theme
      </button>
    </div>
  );
};
```

### Type-Safe Event Handling

```typescript
// Type-safe event handler hook
function useEvent<T extends (...args: any[]) => any>(handler: T): T {
  const handlerRef = useRef<T>(handler);
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: Parameters<T>) => {
    return handlerRef.current(...args);
  }, []) as T;
}

// Usage
const ButtonComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useEvent((increment: number) => {
    setCount((prev) => prev + increment);
  });

  return <button onClick={() => handleClick(1)}>Count: {count}</button>;
};
```

### Type-Safe API Hook

```typescript
interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

interface ApiConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
}

function useApi<T>(url: string, config?: ApiConfig): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          method: config?.method || "GET",
          headers: {
            "Content-Type": "application/json",
            ...config?.headers,
          },
          body: config?.body ? JSON.stringify(config.body) : undefined,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData: T = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, config?.method, config?.body, config?.headers]);

  return { data: data!, loading, error };
}

// Type-safe API endpoints
interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

const UserManagement = () => {
  const { data: users, loading, error } = useApi<User[]>("/api/users");
  const {
    data: createdUser,
    loading: creating,
    error: createError,
  } = useApi<User, CreateUserRequest>("/api/users", {
    method: "POST",
    body: { name: "John", email: "john@example.com" },
  });

  return (
    <div>
      {loading && <div>Loading users...</div>}
      {error && <div>Error: {error}</div>}
      {users && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

## Advanced Type Patterns

### Branded Types

```typescript
// Branded types for type safety
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<number, "UserId">;
type Email = Brand<string, "Email">;

// Type-safe constructors
const createUserId = (id: number): UserId => {
  if (id <= 0) throw new Error("Invalid user ID");
  return id as UserId;
};

const createEmail = (email: string): Email => {
  if (!email.includes("@")) throw new Error("Invalid email");
  return email as Email;
};

// Usage
interface User {
  id: UserId;
  email: Email;
  name: string;
}

const user: User = {
  id: createUserId(1),
  email: createEmail("john@example.com"),
  name: "John",
};

// Type-safe functions
const getUserById = async (id: UserId): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};
```

### Template Literal Types

```typescript
// CSS-in-JS with template literal types
type CSSProperties = {
  [K in keyof CSSStyleDeclaration as K extends string
    ? K extends `webkit${string}`
      ? never
      : K
    : never]: CSSStyleDeclaration[K];
};

// Type-safe CSS classes
type ThemeColors = "primary" | "secondary" | "accent";
type Sizes = "sm" | "md" | "lg";

type ButtonClass = `btn-${ThemeColors}-${Sizes}`;

const getButtonClass = (color: ThemeColors, size: Sizes): ButtonClass => {
  return `btn-${color}-${size}` as ButtonClass;
};

// Usage
const className = getButtonClass("primary", "md"); // 'btn-primary-md'
```

### Recursive Types

```typescript
// Recursive type for nested data structures
interface TreeNode<T> {
  value: T;
  children?: TreeNode<T>[];
}

// Recursive utility type
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

// Usage
interface User {
  id: number;
  profile: {
    name: string;
    address: {
      street: string;
      city: string;
    };
  };
}

type PartialUser = DeepPartial<User>;

const partialUser: PartialUser = {
  profile: {
    address: {
      city: "New York",
    },
  },
};
```

## Type-Safe State Management

### Type-Safe Redux

```typescript
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Type-safe actions
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null
  } as UserState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

// Type-safe store
const store = configureStore({
  reducer: {
    users: userSlice.reducer
  }
});

// Type-safe hooks
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector = <T>(selector: (state: RootState) => T) => {
  return useSelector(selector);
};

// Usage
const UserList = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(userSlice.actions.setLoading(true));
    // Fetch users...
  }, [dispatch]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

### Type-Safe Context with Reducer

```typescript
// Type-safe context with useReducer
interface AppState {
  user: User | null;
  theme: "light" | "dark";
  notifications: Notification[];
}

type AppAction =
  | { type: "SET_USER"; payload: User }
  | { type: "SET_THEME"; payload: "light" | "dark" }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "REMOVE_NOTIFICATION"; payload: string };

const appReducer = (state: AppState, action: AppAction): AppState => {
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
          (n) => n.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    theme: "light",
    notifications: [],
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
```

## Testing with TypeScript

### Type-Safe Testing

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Type-safe test utilities
interface RenderOptions {
  initialEntries?: string[];
  wrapper?: React.ComponentType<any>;
}

const customRender = (ui: React.ReactElement, options: RenderOptions = {}) => {
  const { wrapper, ...rest } = options;
  return render(ui, { wrapper, ...rest });
};

// Type-safe component testing
describe("Button Component", () => {
  it("should render with correct text", () => {
    customRender(<Button text="Click me" onClick={() => {}} />);

    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    customRender(<Button text="Click me" onClick={handleClick} />);

    await user.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// Type-safe hook testing
import { renderHook, act } from "@testing-library/react";

describe("useCounter Hook", () => {
  it("should increment count", () => {
    const { result } = renderHook(() => useCounter(0));

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

## Performance Optimization with TypeScript

### Memoized Components with Types

```typescript
import React, { memo, useMemo, useCallback } from "react";

interface ExpensiveComponentProps {
  data: number[];
  onItemClick: (id: number) => void;
  filter: string;
}

const ExpensiveComponent = memo<ExpensiveComponentProps>(
  ({ data, onItemClick, filter }) => {
    // Memoize expensive computation
    const filteredData = useMemo(() => {
      return data.filter((item) => item.toString().includes(filter));
    }, [data, filter]);

    // Memoize event handler
    const handleClick = useCallback(
      (id: number) => {
        onItemClick(id);
      },
      [onItemClick]
    );

    return (
      <div>
        {filteredData.map((item) => (
          <div key={item} onClick={() => handleClick(item)}>
            {item}
          </div>
        ))}
      </div>
    );
  }
);

// Type-safe memo comparison
const areEqual = (
  prevProps: ExpensiveComponentProps,
  nextProps: ExpensiveComponentProps
): boolean => {
  return (
    prevProps.filter === nextProps.filter &&
    prevProps.data.length === nextProps.data.length &&
    prevProps.onItemClick === nextProps.onItemClick
  );
};

const OptimizedComponent = memo(ExpensiveComponent, areEqual);
```

## Best Practices for Advanced TypeScript

### Type Guards

```typescript
// Type guard functions
function isUser(obj: any): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string"
  );
}

// Discriminated union type guard
type LoadingState = { type: "loading" };
type SuccessState<T> = { type: "success"; data: T };
type ErrorState = { type: "error"; error: string };

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

function isLoading<T>(state: AsyncState<T>): state is LoadingState {
  return state.type === "loading";
}

function isSuccess<T>(state: AsyncState<T>): state is SuccessState<T> {
  return state.type === "success";
}

function isError<T>(state: AsyncState<T>): state is ErrorState {
  return state.type === "error";
}

// Usage
const handleAsyncState = <T>(state: AsyncState<T>) => {
  if (isLoading(state)) {
    console.log("Loading...");
  } else if (isSuccess(state)) {
    console.log("Data:", state.data);
  } else if (isError(state)) {
    console.log("Error:", state.error);
  }
};
```

### Type-Safe Error Handling

```typescript
// Result pattern for error handling
type Result<T, E = Error> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: E;
    };

// Type-safe async function
async function safeFetch<T>(url: string): Promise<Result<T>> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        success: false,
        error: new Error(`HTTP error! status: ${response.status}`),
      };
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error("Unknown error"),
    };
  }
}

// Usage
const loadUser = async (id: number) => {
  const result = await safeFetch<User>(`/api/users/${id}`);

  if (result.success) {
    console.log("User:", result.data);
  } else {
    console.error("Error:", result.error.message);
  }
};
```

These advanced patterns demonstrate TypeScript's power in creating type-safe, maintainable React applications. They provide the foundation for building robust, scalable applications that catch errors at compile time and provide excellent developer experience.
