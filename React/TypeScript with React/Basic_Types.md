# Basic TypeScript Types with React

## TypeScript Fundamentals

### Basic Types

```typescript
// Primitive types
const name: string = "John";
const age: number = 25;
const isActive: boolean = true;
const data: any = {
  /* anything */
};
const value: unknown = "could be anything";
const nothing: null = null;
const notDefined: undefined = undefined;

// Arrays
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];
const mixed: (string | number)[] = [1, "two", 3];

// Objects
interface User {
  id: number;
  name: string;
  email?: string; // Optional property
  readonly createdAt: Date; // Read-only property
}

const user: User = {
  id: 1,
  name: "John",
  createdAt: new Date(),
};
```

## React Component Types

### Functional Components

```typescript
import React from "react";

// Basic functional component
const Greeting: React.FC = () => {
  return <h1>Hello, World!</h1>;
};

// Component with props
interface GreetingProps {
  name: string;
  age?: number;
}

const GreetingWithProps: React.FC<GreetingProps> = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>Age: {age}</p>}
    </div>
  );
};

// Destructuring props with types
const UserCard = ({
  user,
  onClick,
}: {
  user: User;
  onClick: (id: number) => void;
}) => {
  return (
    <div onClick={() => onClick(user.id)}>
      <h3>{user.name}</h3>
    </div>
  );
};
```

### Class Components

```typescript
import React, { Component } from "react";

interface CounterState {
  count: number;
}

interface CounterProps {
  initialCount?: number;
}

class Counter extends Component<CounterProps, CounterState> {
  state: CounterState = {
    count: this.props.initialCount || 0,
  };

  increment = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```

## Props and State Typing

### Interface vs Type Alias

```typescript
// Interface (preferred for objects)
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

// Type alias (can be used for primitives, unions, etc.)
type ButtonVariant = "primary" | "secondary" | "danger";
type ClickHandler = () => void;
type ButtonPropsType = {
  text: string;
  onClick: ClickHandler;
  variant?: ButtonVariant;
};
```

### Complex Props

```typescript
interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  required?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  required,
  validation,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};
```

## Event Handling Types

### Common Event Types

```typescript
import React, { useState } from "react";

const EventExamples: React.FC = () => {
  const [text, setText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  // Input events
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // Button click events
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Button clicked");
  };

  // Form events
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  // Mouse events
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
  };

  // Keyboard events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Enter pressed");
    }
  };

  return (
    <div>
      <input
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleClick}>Submit</button>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ backgroundColor: isHovered ? "lightblue" : "white" }}
      >
        Hover me
      </div>
    </div>
  );
};
```

## Generic Components

### Generic Props

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
const UserList = () => {
  const users = [
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
    />
  );
};
```

### Generic Hooks

```typescript
import { useState, useEffect } from "react";

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useApi<T>(url: string): UseApiResult<T> {
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

  return { data, loading, error };
}

// Usage
interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile = ({ userId }: { userId: number }) => {
  const { data: user, loading, error } = useApi<User>(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

## Advanced Type Patterns

### Utility Types

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Pick - select specific properties
type UserPublicInfo = Pick<User, "id" | "name" | "email">;

// Omit - remove specific properties
type UserWithoutPassword = Omit<User, "password">;

// Partial - make all properties optional
type PartialUser = Partial<User>;

// Required - make all properties required
type RequiredUser = Required<PartialUser>;

// Record - create object type with specific keys
type UserRoles = Record<string, boolean>;

// Usage
const updateUser = (user: Partial<User>) => {
  // Update user with partial data
};

const publicUser: UserPublicInfo = {
  id: 1,
  name: "John",
  email: "john@example.com",
};
```

### Conditional Types

```typescript
// Conditional type based on prop
type NonNullable<T> = T extends null | undefined ? never : T;

// Extract component props type
type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

// Usage
const Button: React.FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => <button onClick={onClick}>{text}</button>;

type ButtonProps = ComponentProps<typeof Button>; // { text: string; onClick: () => void }
```

### Discriminated Unions

```typescript
interface LoadingState {
  type: "loading";
}

interface SuccessState<T> {
  type: "success";
  data: T;
}

interface ErrorState {
  type: "error";
  error: string;
}

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

const DataComponent = <T>({ state }: { state: AsyncState<T> }) => {
  switch (state.type) {
    case "loading":
      return <div>Loading...</div>;
    case "success":
      return <div>Data: {JSON.stringify(state.data)}</div>;
    case "error":
      return <div>Error: {state.error}</div>;
  }
};
```

## Best Practices

### Component Typing

```typescript
// Good - Explicit interface
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
}) => {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

// Also good - Inline type annotation
const Button2 = ({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
}) => {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
```

### Type Assertions

```typescript
// Avoid type assertions when possible
const element = document.getElementById("my-element") as HTMLInputElement;

// Better - Type guard
function getElement<T extends HTMLElement>(id: string): T | null {
  const element = document.getElementById(id);
  return element instanceof T ? element : null;
}

const input = getElement<HTMLInputElement>("my-input");
```

### Never Type

```typescript
// Exhaustive checking
type Action = { type: "INCREMENT" } | { type: "DECREMENT" } | { type: "RESET" };

const reducer = (state: number, action: Action): number => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return 0;
    default:
      // If we add a new action type, TypeScript will error here
      const _exhaustiveCheck: never = action;
      return _exhaustiveCheck;
  }
};
```

## Common TypeScript Patterns in React

### Children Typing

```typescript
interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, header, footer }) => {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

// More specific children typing
interface ListProps {
  children: React.ReactElement<typeof ListItem>[];
}

interface ListItemProps {
  children: string;
}

const ListItem: React.FC<ListItemProps> = ({ children }) => <li>{children}</li>;
```

### ForwardRef Typing

```typescript
import React, { forwardRef } from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, placeholder }, ref) => {
    return (
      <input
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    );
  }
);

Input.displayName = "Input";
```

### Context Typing

```typescript
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

const useTheme = (): ThemeContextType => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
```
