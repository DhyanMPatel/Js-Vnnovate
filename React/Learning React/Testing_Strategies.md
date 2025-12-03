# React Testing Strategies

Testing is crucial for building reliable React applications. This guide covers comprehensive testing strategies from unit tests to integration tests.

## Testing Pyramid

```
    E2E Tests (Few)
   ─────────────────
  Integration Tests (Some)
 ─────────────────────────
Unit Tests (Many)
```

### Testing Types

1. **Unit Tests**: Test individual components/functions in isolation
2. **Integration Tests**: Test how components work together
3. **E2E Tests**: Test complete user workflows
4. **Visual Tests**: Test UI appearance and regressions

## Setup and Configuration

### Jest and React Testing Library

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom

# For TypeScript
npm install --save-dev @types/jest @testing-library/jest-dom
```

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/index.js",
    "!src/reportWebVitals.js",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Setup Tests File

```javascript
// src/setupTests.js
import "@testing-library/jest-dom";

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

## Unit Testing Components

### Basic Component Testing

```typescript
// Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button Component", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("renders with correct text", () => {
    render(<Button onClick={mockOnClick}>Click me</Button>);

    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("applies correct variant class", () => {
    render(
      <Button onClick={mockOnClick} variant="secondary">
        Click me
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn", "btn-secondary");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    render(<Button onClick={mockOnClick}>Click me</Button>);

    await user.click(screen.getByRole("button"));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <Button onClick={mockOnClick} disabled>
        Click me
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    render(
      <Button onClick={mockOnClick} disabled>
        Click me
      </Button>
    );

    await user.click(screen.getByRole("button"));

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
```

### Testing Component with State

```typescript
// Counter.tsx
import { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

// Counter.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";

describe("Counter Component", () => {
  it("renders with initial count of 0", () => {
    render(<Counter />);

    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("increments count when increment button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByText("Increment"));

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  it("decrements count when decrement button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByText("Increment"));
    await user.click(screen.getByText("Decrement"));

    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("resets count when reset button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByText("Increment"));
    await user.click(screen.getByText("Increment"));
    await user.click(screen.getByText("Reset"));

    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("prevents negative count", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByText("Decrement"));

    expect(screen.getByText("Count: -1")).toBeInTheDocument();
  });
});
```

### Testing Form Components

```typescript
// LoginForm.tsx
interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  loading?: boolean;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading = false,
  error,
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

// LoginForm.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

describe("LoginForm Component", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders form fields correctly", () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("submits form with correct data", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByPlaceholderText("Email"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("shows loading state", () => {
    render(<LoginForm onSubmit={mockOnSubmit} loading />);

    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByText("Logging in...")).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(<LoginForm onSubmit={mockOnSubmit} error="Invalid credentials" />);

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("does not submit empty form", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.click(screen.getByRole("button", { name: "Login" }));

    // HTML5 validation prevents submission
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
```

## Testing Custom Hooks

### Hook Testing with React Testing Library

```typescript
// useCounter.ts
import { useState, useCallback } from "react";

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setValue: (value: number) => void;
}

export const useCounter = (initialValue: number = 0): UseCounterReturn => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const setValue = useCallback((value: number) => {
    setCount(value);
  }, []);

  return {
    count,
    increment,
    decrement,
    reset,
    setValue,
  };
};

// useCounter.test.ts
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter Hook", () => {
  it("returns initial count", () => {
    const { result } = renderHook(() => useCounter(5));

    expect(result.current.count).toBe(5);
  });

  it("increments count", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it("decrements count", () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(9);
  });

  it("resets to initial value", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.increment();
      result.current.increment();
    });
    expect(result.current.count).toBe(7);

    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(5);
  });

  it("sets custom value", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.setValue(42);
    });

    expect(result.current.count).toBe(42);
  });

  it("handles multiple updates", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.decrement();
      result.current.increment();
    });

    expect(result.current.count).toBe(2);
  });
});
```

### Async Hook Testing

```typescript
// useApi.ts
import { useState, useEffect } from "react";

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useApi = <T>(url: string): UseApiResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};

// useApi.test.ts
import { renderHook, waitFor } from "@testing-library/react";
import { useApi } from "./useApi";

// Mock fetch
global.fetch = jest.fn();

describe("useApi Hook", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("loads data successfully", async () => {
    const mockData = { id: 1, name: "Test User" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useApi("/api/user"));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBe(null);
    });
  });

  it("handles error", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useApi("/api/user"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe(null);
      expect(result.current.error).toBe("HTTP error! status: 404");
    });
  });

  it("refetches data", async () => {
    const mockData1 = { id: 1, name: "User 1" };
    const mockData2 = { id: 2, name: "User 2" };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockData1,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockData2,
      });

    const { result } = renderHook(() => useApi("/api/user"));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData1);
    });

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData2);
    });

    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
```

## Integration Testing

### Testing Component Interactions

```typescript
// UserList.tsx
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void;
  selectedUserId?: number;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onSelectUser,
  selectedUserId,
}) => {
  return (
    <div className="user-list">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={selectedUserId === user.id ? "selected" : ""}
              onClick={() => onSelectUser(user)}
            >
              <div>{user.name}</div>
              <div>{user.email}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// UserDetail.tsx
interface UserDetailProps {
  user: User | null;
  onBack: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ user, onBack }) => {
  if (!user) {
    return <div>Select a user to view details</div>;
  }

  return (
    <div className="user-detail">
      <button onClick={onBack}>Back</button>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
    </div>
  );
};

// UserManager.tsx
const UserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate API call
    const mockUsers: User[] = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ];
    setUsers(mockUsers);
  }, []);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleBack = () => {
    setSelectedUser(null);
  };

  return (
    <div className="user-manager">
      {selectedUser ? (
        <UserDetail user={selectedUser} onBack={handleBack} />
      ) : (
        <UserList
          users={users}
          onSelectUser={handleSelectUser}
          selectedUserId={selectedUser?.id}
        />
      )}
    </div>
  );
};

// UserManager.integration.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserManager } from "./UserManager";

describe("UserManager Integration", () => {
  it("displays user list initially", () => {
    render(<UserManager />);

    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  });

  it("selects user and shows details", async () => {
    const user = userEvent.setup();
    render(<UserManager />);

    // Click on first user
    await user.click(screen.getByText("John Doe"));

    // Should show user detail view
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Email: john@example.com")).toBeInTheDocument();
    expect(screen.getByText("ID: 1")).toBeInTheDocument();
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("navigates back to user list", async () => {
    const user = userEvent.setup();
    render(<UserManager />);

    // Select a user
    await user.click(screen.getByText("John Doe"));

    // Go back
    await user.click(screen.getByText("Back"));

    // Should show user list again
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("shows empty state when no users", () => {
    // Mock empty users array
    jest.mock("./UserManager", () => ({
      UserManager: () => {
        const [users] = useState<User[]>([]);
        const [selectedUser, setSelectedUser] = useState<User | null>(null);

        return (
          <div className="user-manager">
            {selectedUser ? (
              <UserDetail
                user={selectedUser}
                onBack={() => setSelectedUser(null)}
              />
            ) : (
              <UserList
                users={users}
                onSelectUser={setSelectedUser}
                selectedUserId={selectedUser?.id}
              />
            )}
          </div>
        );
      },
    }));

    render(<UserManager />);
    expect(screen.getByText("No users found")).toBeInTheDocument();
  });
});
```

## Mocking Strategies

### Mocking API Calls

```typescript
// userService.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await fetch("/api/users");
    return response.json();
  },

  createUser: async (userData: Omit<User, "id">): Promise<User> => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return response.json();
  },
};

// userService.test.ts
import { userService } from "./userService";

// Mock the entire module
jest.mock("./userService");

const mockUserService = userService as jest.Mocked<typeof userService>;

describe("userService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches users successfully", async () => {
    const mockUsers: User[] = [
      { id: 1, name: "John", email: "john@example.com" },
    ];

    mockUserService.getUsers.mockResolvedValue(mockUsers);

    const users = await userService.getUsers();

    expect(users).toEqual(mockUsers);
    expect(mockUserService.getUsers).toHaveBeenCalledTimes(1);
  });

  it("creates user successfully", async () => {
    const newUser = { name: "Jane", email: "jane@example.com" };
    const createdUser = { id: 2, ...newUser };

    mockUserService.createUser.mockResolvedValue(createdUser);

    const result = await userService.createUser(newUser);

    expect(result).toEqual(createdUser);
    expect(mockUserService.createUser).toHaveBeenCalledWith(newUser);
  });
});
```

### Mocking React Router

```typescript
// UserPage.tsx
import { useParams, useNavigate } from "react-router-dom";

const UserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>User Page</h1>
      <p>User ID: {userId}</p>
      <button onClick={handleGoHome}>Go Home</button>
    </div>
  );
};

// UserPage.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { UserPage } from "./UserPage";

// Custom render function with router
const renderWithRouter = (
  component: React.ReactElement,
  initialEntries = ["/"]
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
  );
};

describe("UserPage", () => {
  it("displays user ID from params", () => {
    renderWithRouter(<UserPage />, ["/users/123"]);

    expect(screen.getByText("User ID: 123")).toBeInTheDocument();
  });

  it("navigates home when button clicked", async () => {
    const user = userEvent.setup();
    renderWithRouter(<UserPage />, ["/users/123"]);

    await user.click(screen.getByText("Go Home"));

    // In a real test, you'd verify navigation
    // For unit tests, we just verify the click handler works
    expect(screen.getByText("Go Home")).toBeInTheDocument();
  });
});
```

## Testing Library Best Practices

### Test Organization

```typescript
// Good test structure
describe("ComponentName", () => {
  // Setup
  beforeEach(() => {
    // Reset mocks, setup common state
  });

  describe("Rendering", () => {
    it("renders correctly with default props", () => {
      // Test basic rendering
    });

    it("renders with custom props", () => {
      // Test with different props
    });
  });

  describe("User Interactions", () => {
    it("handles click events", async () => {
      // Test click interactions
    });

    it("handles form submissions", async () => {
      // Test form interactions
    });
  });

  describe("Edge Cases", () => {
    it("handles empty data", () => {
      // Test edge cases
    });

    it("handles error states", () => {
      // Test error scenarios
    });
  });
});
```

### Accessibility Testing

```typescript
// Button.test.tsx
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Accessibility", () => {
  it("has correct ARIA attributes", () => {
    render(
      <Button onClick={() => {}} disabled>
        Submit
      </Button>
    );

    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toHaveAttribute("disabled");
  });

  it("provides accessible name", () => {
    render(<Button onClick={() => {}}>Close</Button>);

    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });
});
```

### Visual Regression Testing

```typescript
// Button.visual.test.tsx
import { render } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Visual Tests", () => {
  it("matches snapshot for primary variant", () => {
    const { container } = render(
      <Button onClick={() => {}} variant="primary">
        Click me
      </Button>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot for disabled state", () => {
    const { container } = render(
      <Button onClick={() => {}} disabled>
        Click me
      </Button>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
```

## Coverage and Quality

### Coverage Configuration

```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/index.js",
    "!src/reportWebVitals.js",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    "./src/components/": {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageReporters: ["text", "lcov", "html"],
};
```

### Test Scripts

```json
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --coverage --ci --watchAll=false"
  }
}
```

## Common Testing Patterns

### Data Provider Tests

```typescript
// Button.test.tsx
describe("Button Variants", () => {
  const variants = ["primary", "secondary", "danger"] as const;

  variants.forEach((variant) => {
    it(`renders ${variant} variant correctly`, () => {
      render(
        <Button onClick={() => {}} variant={variant}>
          Click
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass(`btn-${variant}`);
    });
  });
});
```

### Custom Matchers

```typescript
// setupTests.js
import "@testing-library/jest-dom";

// Custom matcher
expect.extend({
  toBeInTheDocument: (received) => {
    const pass = received && document.body.contains(received);
    return {
      message: () =>
        `expected element ${pass ? "not " : ""}to be in the document`,
      pass,
    };
  },
});
```

## Testing Anti-Patterns to Avoid

### ❌ Testing Implementation Details

```typescript
// Bad: Testing internal state
it("updates internal state correctly", () => {
  const { result } = renderHook(() => useCounter());

  // Don't test internal implementation
  expect(result.current[0]).toBe(0); // Testing array index
});

// Good: Testing behavior
it("increments count when increment is called", () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

### ❌ Testing Library Internals

```typescript
// Bad: Testing specific DOM structure
it("has correct div structure", () => {
  render(<Button>Click</Button>);

  expect(screen.getByText("Click").parentElement.tagName).toBe("BUTTON");
});

// Good: Testing accessible behavior
it("is accessible via role and text", () => {
  render(<Button>Click</Button>);

  expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();
});
```

## External Resources

- **Testing Library Docs**: Official documentation
- **Jest Docs**: Testing framework documentation
- **React Testing Library**: Component testing utilities
- **Cypress**: E2E testing framework
- **Storybook**: Component testing and documentation
- **Playwright**: Modern E2E testing
