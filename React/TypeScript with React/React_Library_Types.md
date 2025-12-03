# React Library Types

## Popular React Libraries with TypeScript

### React Router

```typescript
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";

// Type-safe route parameters
interface UserParams {
  userId: string;
}

const UserProfile = () => {
  const { userId } = useParams<UserParams>();
  const location = useLocation();

  return (
    <div>
      <h1>User Profile: {userId}</h1>
      <p>Current path: {location.pathname}</p>
    </div>
  );
};

// Type-safe route configuration
interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    path: "/",
    component: () => <div>Home</div>,
    exact: true,
  },
  {
    path: "/users/:userId",
    component: UserProfile,
  },
];

// Custom hook for typed navigation
import { useNavigate } from "react-router-dom";

function useTypedNavigate() {
  const navigate = useNavigate();

  const navigateToUser = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const navigateWithState = (path: string, state: any) => {
    navigate(path, { state });
  };

  return { navigateToUser, navigateWithState };
}
```

### Redux Toolkit with TypeScript

```typescript
import {
  configureStore,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

// Type-safe slice
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (
      state,
      action: PayloadAction<Partial<User> & { id: number }>
    ) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

// Type-safe async thunk
interface CreateUserRequest {
  name: string;
  email: string;
}

interface CreateUserResponse {
  user: User;
}

const createUser = createAsyncThunk<
  CreateUserResponse,
  CreateUserRequest,
  { rejectValue: string }
>("users/createUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

// Type-safe store configuration
const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["users/createUser/fulfilled"],
      },
    }),
});

// Type-safe hooks
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) => {
  return useSelector(selector);
};

// Typed selectors
export const selectUsers = (state: RootState) => state.users.users;
export const selectLoading = (state: RootState) => state.users.loading;
export const selectSelectedUser = (state: RootState) =>
  state.users.selectedUser;
```

### Form Libraries

#### React Hook Form with TypeScript

```typescript
import { useForm, SubmitHandler } from "react-hook-form";

// Type-safe form schema
interface UserFormData {
  name: string;
  email: string;
  age: number;
  preferences: {
    newsletter: boolean;
    theme: "light" | "dark";
  };
}

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>();

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      reset();
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input {...register("name", { required: "Name is required" })} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>Age:</label>
        <input
          type="number"
          {...register("age", {
            required: "Age is required",
            min: { value: 18, message: "Must be at least 18" },
            max: { value: 120, message: "Must be less than 120" },
          })}
        />
        {errors.age && <span>{errors.age.message}</span>}
      </div>

      <div>
        <label>
          <input type="checkbox" {...register("preferences.newsletter")} />
          Subscribe to newsletter
        </label>
      </div>

      <div>
        <label>Theme:</label>
        <select {...register("preferences.theme")}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

// Zod integration for runtime validation
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18).max(120),
  preferences: z.object({
    newsletter: z.boolean(),
    theme: z.enum(["light", "dark"]),
  }),
});

type UserFormData = z.infer<typeof userSchema>;

const UserFormWithZod = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  // ... rest of the component
};
```

#### Formik with TypeScript

```typescript
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Yup validation schema
const userSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  age: Yup.number().min(18).max(120).required("Age is required"),
});

interface UserFormValues {
  name: string;
  email: string;
  age: number;
}

const UserFormWithFormik = () => {
  const initialValues: UserFormValues = {
    name: "",
    email: "",
    age: 18,
  };

  const handleSubmit = async (values: UserFormValues) => {
    try {
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <div>
            <label>Name:</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <label>Email:</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label>Age:</label>
            <Field name="age" type="number" />
            <ErrorMessage name="age" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
```

### UI Libraries

#### Material-UI (MUI) with TypeScript

```typescript
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Theme,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Type-safe styled components
interface StyledButtonProps {
  variant: "primary" | "secondary";
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "variant",
})<StyledButtonProps>(({ theme, variant }) => ({
  backgroundColor:
    variant === "primary"
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor:
      variant === "primary"
        ? theme.palette.primary.dark
        : theme.palette.secondary.dark,
  },
}));

// Type-safe theme
const customTheme: Theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      dark: "#115293",
    },
    secondary: {
      main: "#dc004e",
      dark: "#9a0036",
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
  },
});

// Type-safe dialog component
interface UserDialogProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
}

const UserDialog: React.FC<UserDialogProps> = ({
  open,
  user,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<User>>(user || {});

  const handleSave = () => {
    if (formData) {
      onSave(formData as User);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{user ? "Edit User" : "Create User"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <StyledButton variant="primary" onClick={handleSave}>
          Save
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

// Usage with theme provider
const App = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Button onClick={() => setDialogOpen(true)}>Create User</Button>
        <UserDialog
          open={dialogOpen}
          user={selectedUser}
          onClose={() => setDialogOpen(false)}
          onSave={(user) => console.log("Saved:", user)}
        />
      </div>
    </ThemeProvider>
  );
};
```

#### Ant Design with TypeScript

```typescript
import {
  Table,
  Button,
  Form,
  Input,
  Modal,
  Select,
  TableProps,
  FormInstance,
} from "antd";
import { ColumnsType } from "antd/es/table";

// Type-safe table columns
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
}

const columns: ColumnsType<User> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    filters: [
      { text: "Admin", value: "admin" },
      { text: "User", value: "user" },
    ],
    onFilter: (value, record) => record.role === value,
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Button onClick={() => handleEdit(record)}>Edit</Button>
    ),
  },
];

// Type-safe form
interface UserFormData {
  name: string;
  email: string;
  role: "admin" | "user";
}

const UserForm = ({
  form,
  initialValues,
  onSubmit,
}: {
  form: FormInstance<UserFormData>;
  initialValues?: UserFormData;
  onSubmit: (values: UserFormData) => void;
}) => {
  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onSubmit}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please input name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please input email!" },
          { type: "email", message: "Invalid email!" },
        ]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        name="role"
        label="Role"
        rules={[{ required: true, message: "Please select role!" }]}
      >
        <Select>
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="user">User</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

// Type-safe table component
const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm<UserFormData>();

  const tableProps: TableProps<User> = {
    columns,
    dataSource: users,
    loading,
    rowKey: "id",
    pagination: {
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
    },
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setModalVisible(true);
  };

  const handleSubmit = async (values: UserFormData) => {
    try {
      if (editingUser) {
        // Update user
        await fetch(`/api/users/${editingUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
      } else {
        // Create user
        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
      }

      setModalVisible(false);
      setEditingUser(null);
      form.resetFields();
      // Refresh users list
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            setEditingUser(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          Create User
        </Button>
      </div>

      <Table {...tableProps} />

      <Modal
        title={editingUser ? "Edit User" : "Create User"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingUser(null);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <UserForm
          form={form}
          initialValues={editingUser || undefined}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};
```

### Data Fetching Libraries

#### React Query with TypeScript

```typescript
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";

// Type-safe query configuration
interface UseUsersOptions {
  enabled?: boolean;
  staleTime?: number;
}

const useUsers = (options: UseUsersOptions = {}) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<User[]> => {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json();
    },
    ...options,
  });
};

// Type-safe mutation
interface CreateUserVariables {
  name: string;
  email: string;
}

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, CreateUserVariables>({
    mutationFn: async (userData): Promise<User> => {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      return response.json();
    },
    onSuccess: (newUser) => {
      // Update cache
      queryClient.setQueryData(["users"], (oldUsers: User[] | undefined) => {
        return oldUsers ? [...oldUsers, newUser] : [newUser];
      });
    },
    onError: (error) => {
      console.error("Failed to create user:", error);
    },
  });
};

// Type-safe infinite query
interface UseInfiniteUsersOptions {
  limit?: number;
}

const useInfiniteUsers = (options: UseInfiniteUsersOptions = {}) => {
  const { limit = 10 } = options;

  return useInfiniteQuery({
    queryKey: ["users", "infinite"],
    queryFn: async ({
      pageParam = 0,
    }): Promise<{ users: User[]; hasMore: boolean }> => {
      const response = await fetch(
        `/api/users?page=${pageParam}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json();
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasMore) {
        return allPages.length;
      }
      return undefined;
    },
  });
};
```

#### Axios with TypeScript

```typescript
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

// Type-safe API client
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

interface ApiError {
  message: string;
  code: string;
  details?: any;
}

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        if (error.response?.status === 401) {
          // Handle unauthorized
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  // Type-safe GET request
  async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.get(url);
    return response.data.data;
  }

  // Type-safe POST request
  async post<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.post(
      url,
      data
    );
    return response.data.data;
  }

  // Type-safe PUT request
  async put<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.put(
      url,
      data
    );
    return response.data.data;
  }

  // Type-safe DELETE request
  async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.delete(
      url
    );
    return response.data.data;
  }
}

// Usage
const apiClient = new ApiClient("https://api.example.com");

const userService = {
  getUsers: (): Promise<User[]> => apiClient.get<User[]>("/users"),
  getUser: (id: number): Promise<User> => apiClient.get<User>(`/users/${id}`),
  createUser: (userData: CreateUserVariables): Promise<User> =>
    apiClient.post<User>("/users", userData),
  updateUser: (id: number, userData: Partial<User>): Promise<User> =>
    apiClient.put<User>(`/users/${id}`, userData),
  deleteUser: (id: number): Promise<void> =>
    apiClient.delete<void>(`/users/${id}`),
};
```

### Testing Libraries

#### Jest with TypeScript

```typescript
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

// Type-safe test utilities
interface TestProvidersProps {
  children: React.ReactNode;
  queryClient?: QueryClient;
}

const TestProviders: React.FC<TestProvidersProps> = ({
  children,
  queryClient = new QueryClient(),
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (ui: React.ReactElement, options: any = {}) => {
  return render(ui, { wrapper: TestProviders, ...options });
};

// Type-safe mocking
jest.mock("../services/userService", () => ({
  getUsers: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

import * as userService from "../services/userService";

// Type-safe test
describe("User Management", () => {
  const mockUsers: User[] = [
    {
      id: 1,
      name: "John",
      email: "john@example.com",
      role: "user",
      createdAt: "2023-01-01",
    },
    {
      id: 2,
      name: "Jane",
      email: "jane@example.com",
      role: "admin",
      createdAt: "2023-01-02",
    },
  ];

  beforeEach(() => {
    (userService.getUsers as jest.Mock).mockResolvedValue(mockUsers);
  });

  it("should display users correctly", async () => {
    customRender(<UserList />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    });
  });

  it("should create new user", async () => {
    const newUser: CreateUserVariables = {
      name: "Alice",
      email: "alice@example.com",
    };

    (userService.createUser as jest.Mock).mockResolvedValue({
      id: 3,
      ...newUser,
      role: "user",
      createdAt: "2023-01-03",
    });

    customRender(<UserForm />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/name/i), newUser.name);
    await user.type(screen.getByLabelText(/email/i), newUser.email);
    await user.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(userService.createUser).toHaveBeenCalledWith(newUser);
    });
  });
});
```

These examples demonstrate how to properly type popular React libraries, ensuring type safety throughout your application while maintaining excellent developer experience and catching errors at compile time.
