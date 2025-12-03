# TypeScript with React Best Practices

## Project Setup and Configuration

### Recommended tsconfig.json

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
    "jsx": "react-jsx",
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"],
      "@/components/*": ["components/*"],
      "@/hooks/*": ["hooks/*"],
      "@/utils/*": ["utils/*"],
      "@/types/*": ["types/*"],
      "@/services/*": ["services/*"]
    },
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "build", "dist"]
}
```

### ESLint and Prettier Configuration

```json
// .eslintrc.json
{
  "extends": [
    "react-app",
    "react-app/jest",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## Component Architecture Best Practices

### 1. Component Typing Patterns

```typescript
// ✅ Good: Use interface for component props
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  size = "md",
  className = "",
}) => {
  const baseClasses = "btn";
  const variantClasses = `btn-${variant}`;
  const sizeClasses = `btn-${size}`;

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// ✅ Also good: Inline type annotation for simple components
const IconButton = ({
  icon,
  onClick,
  title,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  title?: string;
}) => (
  <button onClick={onClick} title={title}>
    {icon}
  </button>
);

// ❌ Avoid: Using any for props
const BadButton = (props: any) => {
  return <button {...props}>Click me</button>;
};
```

### 2. Generic Components

```typescript
// ✅ Good: Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
  className?: string;
}

function List<T>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = "No items found",
  className = "",
}: ListProps<T>) {
  if (items.length === 0) {
    return <div className={className}>{emptyMessage}</div>;
  }

  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}

// Usage
interface User {
  id: string;
  name: string;
  email: string;
}

const UserList = () => {
  const users: User[] = [
    { id: "1", name: "John", email: "john@example.com" },
    { id: "2", name: "Jane", email: "jane@example.com" },
  ];

  return (
    <List
      items={users}
      renderItem={(user) => (
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      )}
      keyExtractor={(user) => user.id}
      emptyMessage="No users found"
    />
  );
};
```

### 3. Children Typing

```typescript
// ✅ Good: Specific children typing
interface CardProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ header, children, footer, className }) => {
  return (
    <div className={`card ${className}`}>
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

// ✅ Good: Function as children pattern
interface TabsProps {
  children: (
    activeTab: string,
    setActiveTab: (tab: string) => void
  ) => React.ReactNode;
  defaultTab?: string;
}

const Tabs: React.FC<TabsProps> = ({ children, defaultTab = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return <>{children(activeTab, setActiveTab)}</>;
};
```

## State Management Best Practices

### 1. Type-Safe useState

```typescript
// ✅ Good: Explicit typing for complex state
interface UserFormState {
  name: string;
  email: string;
  age: number;
  errors: {
    name?: string;
    email?: string;
    age?: string;
  };
}

const UserForm = () => {
  const [state, setState] = useState<UserFormState>({
    name: "",
    email: "",
    age: 18,
    errors: {},
  });

  const updateField = (field: keyof UserFormState, value: string | number) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const setError = (field: keyof UserFormState["errors"], error: string) => {
    setState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        [field]: error,
      },
    }));
  };

  return <form>{/* Form fields */}</form>;
};

// ✅ Good: Use discriminated unions for state
type LoadingState = { status: "loading" };
type SuccessState<T> = { status: "success"; data: T };
type ErrorState = { status: "error"; error: string };

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

const useAsyncOperation = <T>() => {
  const [state, setState] = useState<AsyncState<T>>({ status: "loading" });

  const execute = async (operation: () => Promise<T>) => {
    setState({ status: "loading" });
    try {
      const data = await operation();
      setState({ status: "success", data });
    } catch (error) {
      setState({
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return { state, execute };
};
```

### 2. Type-Safe Context

```typescript
// ✅ Good: Create typed context with default value
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ✅ Good: Custom hook with type checking
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

// ✅ Good: Provider with proper typing
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark";
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "light",
}) => {
  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
```

### 3. Type-Safe Reducers

```typescript
// ✅ Good: Discriminated union for actions
type CounterAction =
  | { type: "INCREMENT"; payload?: number }
  | { type: "DECREMENT"; payload?: number }
  | { type: "RESET" }
  | { type: "SET_VALUE"; payload: number };

interface CounterState {
  value: number;
  history: number[];
}

const counterReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case "INCREMENT":
      const incrementAmount = action.payload ?? 1;
      return {
        value: state.value + incrementAmount,
        history: [...state.history, state.value],
      };
    case "DECREMENT":
      const decrementAmount = action.payload ?? 1;
      return {
        value: state.value - decrementAmount,
        history: [...state.history, state.value],
      };
    case "RESET":
      return {
        value: 0,
        history: [],
      };
    case "SET_VALUE":
      return {
        value: action.payload,
        history: [...state.history, state.value],
      };
    default:
      // Exhaustive checking
      const _exhaustiveCheck: never = action;
      return state;
  }
};

// ✅ Good: Typed useReducer hook
const useCounter = (initialValue: number = 0) => {
  const [state, dispatch] = useReducer(counterReducer, {
    value: initialValue,
    history: [],
  });

  const increment = (amount?: number) =>
    dispatch({ type: "INCREMENT", payload: amount });
  const decrement = (amount?: number) =>
    dispatch({ type: "DECREMENT", payload: amount });
  const reset = () => dispatch({ type: "RESET" });
  const setValue = (value: number) =>
    dispatch({ type: "SET_VALUE", payload: value });

  return {
    ...state,
    increment,
    decrement,
    reset,
    setValue,
  };
};
```

## Event Handling Best Practices

### 1. Type-Safe Event Handlers

```typescript
// ✅ Good: Proper event typing
const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ✅ Good: Specific event types
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Button clicked");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Enter pressed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleInputChange}
      />
      <button type="submit" onClick={handleButtonClick}>
        Submit
      </button>
    </form>
  );
};
```

### 2. Custom Event Handlers

```typescript
// ✅ Good: Custom event handler types
type EventHandler<T = void> = (event: T) => void;

interface CustomButtonProps {
  onClick: EventHandler<{ type: "click"; timestamp: number }>;
  onDoubleClick?: EventHandler<{ type: "double-click"; count: number }>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  onDoubleClick,
}) => {
  const handleClick = () => {
    onClick({ type: "click", timestamp: Date.now() });
  };

  const handleDoubleClick = () => {
    onDoubleClick?.({ type: "double-click", count: 2 });
  };

  return (
    <button onClick={handleClick} onDoubleClick={handleDoubleClick}>
      Click me
    </button>
  );
};
```

## API Integration Best Practices

### 1. Type-Safe API Calls

```typescript
// ✅ Good: Type-safe API client
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.message || "API request failed");
      }

      const result: ApiResponse<T> = await response.json();
      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unknown error occurred");
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }
}

// ✅ Good: Typed service layer
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
  role?: "admin" | "user";
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: "admin" | "user";
}

class UserService {
  private apiClient: ApiClient;

  constructor(baseURL: string) {
    this.apiClient = new ApiClient(baseURL);
  }

  async getUsers(): Promise<User[]> {
    return this.apiClient.get<User[]>("/users");
  }

  async getUser(id: number): Promise<User> {
    return this.apiClient.get<User>(`/users/${id}`);
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    return this.apiClient.post<User>("/users", userData);
  }

  async updateUser(id: number, userData: UpdateUserRequest): Promise<User> {
    return this.apiClient.put<User>(`/users/${id}`, userData);
  }

  async deleteUser(id: number): Promise<void> {
    return this.apiClient.delete<void>(`/users/${id}`);
  }
}
```

### 2. Type-Safe React Query

```typescript
// ✅ Good: Type-safe hooks with React Query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getUsers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

const useUser = (id: number) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => userService.getUser(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: CreateUserRequest) =>
      userService.createUser(userData),
    onSuccess: (newUser) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });

      // Or update cache directly
      queryClient.setQueryData(["users"], (oldUsers: User[] | undefined) => {
        return oldUsers ? [...oldUsers, newUser] : [newUser];
      });
    },
    onError: (error) => {
      console.error("Failed to create user:", error);
    },
  });
};
```

## Testing Best Practices

### 1. Type-Safe Test Utilities

```typescript
// ✅ Good: Type-safe test utilities
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

interface AllTheProvidersProps {
  children: React.ReactNode;
  queryClient?: QueryClient;
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({
  children,
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  }),
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// ✅ Good: Type-safe mocking
const mockUser: User = {
  id: 1,
  name: "Test User",
  email: "test@example.com",
  role: "user",
  createdAt: "2023-01-01",
};

jest.mock("../services/userService", () => ({
  getUsers: jest.fn(),
  getUser: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

import * as userService from "../services/userService";

// ✅ Good: Type-safe test
describe("UserList", () => {
  beforeEach(() => {
    (userService.getUsers as jest.Mock).mockResolvedValue([mockUser]);
  });

  it("should display user information", async () => {
    customRender(<UserList />);

    await waitFor(() => {
      expect(screen.getByText("Test User")).toBeInTheDocument();
      expect(screen.getByText("test@example.com")).toBeInTheDocument();
    });
  });

  it("should handle loading state", () => {
    (userService.getUsers as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    customRender(<UserList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should handle error state", async () => {
    (userService.getUsers as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );

    customRender(<UserList />);

    await waitFor(() => {
      expect(screen.getByText("Error loading users")).toBeInTheDocument();
    });
  });
});
```

## File Organization Best Practices

### 1. Directory Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   └── Input/
│   ├── forms/
│   └── layout/
├── hooks/
│   ├── useApi.ts
│   ├── useLocalStorage.ts
│   └── index.ts
├── services/
│   ├── api.ts
│   ├── userService.ts
│   └── index.ts
├── types/
│   ├── api.ts
│   ├── user.ts
│   └── index.ts
├── utils/
│   ├── formatters.ts
│   ├── validators.ts
│   └── index.ts
├── pages/
├── contexts/
└── styles/
```

### 2. Type Organization

```typescript
// ✅ Good: Centralized type definitions
// types/api.ts
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

// types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role?: "admin" | "user";
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: "admin" | "user";
}

// types/index.ts
export * from "./api";
export * from "./user";
```

### 3. Barrel Exports

```typescript
// ✅ Good: Use barrel exports for clean imports
// components/index.ts
export { Button } from "./common/Button";
export { Input } from "./Input";
export { Card } from "./Card";

// hooks/index.ts
export { useApi } from "./useApi";
export { useLocalStorage } from "./useLocalStorage";
export { useDebounce } from "./useDebounce";

// Usage in other files
import { Button, Input } from "@/components";
import { useApi, useLocalStorage } from "@/hooks";
```

## Performance Best Practices

### 1. Memoization with TypeScript

```typescript
// ✅ Good: Type-safe memoization
interface ExpensiveComponentProps {
  data: User[];
  onItemClick: (user: User) => void;
  filter: string;
}

const ExpensiveComponent = React.memo<ExpensiveComponentProps>(
  ({ data, onItemClick, filter }) => {
    // Memoize expensive computation
    const filteredData = useMemo(() => {
      return data.filter((user) =>
        user.name.toLowerCase().includes(filter.toLowerCase())
      );
    }, [data, filter]);

    // Memoize event handler
    const handleClick = useCallback(
      (user: User) => {
        onItemClick(user);
      },
      [onItemClick]
    );

    return (
      <div>
        {filteredData.map((user) => (
          <div key={user.id} onClick={() => handleClick(user)}>
            {user.name}
          </div>
        ))}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function
    return (
      prevProps.filter === nextProps.filter &&
      prevProps.data.length === nextProps.data.length &&
      prevProps.onItemClick === nextProps.onItemClick
    );
  }
);
```

### 2. Lazy Loading with TypeScript

```typescript
// ✅ Good: Type-safe lazy loading
const LazyComponent = React.lazy(() => import("./LazyComponent"));

// Type-safe route-based code splitting
const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => import("../pages/About"));
const Contact = React.lazy(() => import("../pages/Contact"));

// Type-safe dynamic imports
const loadComponent = async (componentName: string) => {
  switch (componentName) {
    case "Home":
      return import("../pages/Home");
    case "About":
      return import("../pages/About");
    default:
      throw new Error(`Unknown component: ${componentName}`);
  }
};
```

## Common Pitfalls to Avoid

### 1. Type Assertions

```typescript
// ❌ Avoid: Excessive type assertions
const user = response.data as User;

// ✅ Better: Type guards
const isUser = (obj: any): obj is User => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string"
  );
};

if (isUser(response.data)) {
  // Now TypeScript knows this is a User
  console.log(response.data.name);
}
```

### 2. any Type Usage

```typescript
// ❌ Avoid: Using any
const handleData = (data: any) => {
  console.log(data.someProperty);
};

// ✅ Better: Generic types
const handleData = <T extends Record<string, any>>(data: T) => {
  console.log(data.someProperty);
};

// ✅ Even better: Specific interfaces
interface DataWithProperty {
  someProperty: string;
}

const handleData = (data: DataWithProperty) => {
  console.log(data.someProperty);
};
```

### 3. Optional Chaining Overuse

```typescript
// ❌ Avoid: Excessive optional chaining
const userName = user?.profile?.name?.firstName;

// ✅ Better: Proper null checks
if (user && user.profile && user.profile.name) {
  const userName = user.profile.name.firstName;
}

// ✅ Or use default values
const userName = user?.profile?.name?.firstName ?? "Unknown";
```

These best practices will help you create maintainable, type-safe React applications that are easier to debug, refactor, and scale. Remember that TypeScript is a tool to help you write better code, not to prevent you from writing code at all.
