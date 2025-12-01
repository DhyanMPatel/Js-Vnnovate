# Testing & Quality Assurance in Node.js

## Testing Fundamentals for FAANG

### Why Testing Matters

- **Code Quality**: Ensure reliability and maintainability
- **Regression Prevention**: Catch bugs before they reach production
- **Documentation**: Tests serve as living documentation
- **Refactoring Safety**: Enable confident code changes
- **Team Collaboration**: Shared understanding of expected behavior

## Unit Testing with Jest

### Comprehensive Unit Testing Setup

```javascript
// jest.config.js
module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/*.test.js",
    "!src/config/**",
    "!src/migrations/**",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  testTimeout: 10000,
};

// tests/setup.js
import { MongoMemoryServer } from "mongodb-memory-server";
import { Sequelize } from "sequelize";

// Global test setup
let mongoServer;
let sequelize;

beforeAll(async () => {
  // Setup in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;

  // Setup in-memory SQLite
  sequelize = new Sequelize("sqlite::memory:", {
    logging: false,
  });

  // Sync models
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // Cleanup
  if (mongoServer) {
    await mongoServer.stop();
  }
  if (sequelize) {
    await sequelize.close();
  }
});

beforeEach(async () => {
  // Reset database state before each test
  if (sequelize) {
    await sequelize.sync({ force: true });
  }
});
```

### Advanced Unit Testing Patterns

```javascript
// UserService.test.js
import UserService from "../src/services/UserService";
import User from "../src/models/User";
import { ValidationError, NotFoundError } from "../src/errors";

describe("UserService", () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe("createUser", () => {
    test("should create user with valid data", async () => {
      // Arrange
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "ValidPass123!",
      };

      // Mock the User model
      jest.spyOn(User, "create").mockResolvedValue({
        id: "123",
        ...userData,
        password: "hashed_password",
        createdAt: new Date(),
      });

      // Act
      const result = await userService.createUser(userData);

      // Assert
      expect(User.create).toHaveBeenCalledWith(
        expect.objectContaining({
          username: userData.username,
          email: userData.email,
          password: expect.any(String), // Password should be hashed
        })
      );

      expect(result).toEqual({
        id: "123",
        username: userData.username,
        email: userData.email,
        createdAt: expect.any(Date),
      });

      // Verify password is not returned
      expect(result.password).toBeUndefined();
    });

    test("should throw ValidationError for invalid email", async () => {
      // Arrange
      const userData = {
        username: "testuser",
        email: "invalid-email",
        password: "ValidPass123!",
      };

      // Act & Assert
      await expect(userService.createUser(userData)).rejects.toThrow(
        ValidationError
      );
    });

    test("should throw ValidationError for weak password", async () => {
      // Arrange
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "123", // Weak password
      };

      // Act & Assert
      await expect(userService.createUser(userData)).rejects.toThrow(
        "Password must be at least 8 characters long"
      );
    });

    test("should handle database errors gracefully", async () => {
      // Arrange
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "ValidPass123!",
      };

      // Mock database error
      jest
        .spyOn(User, "create")
        .mockRejectedValue(new Error("Database connection failed"));

      // Act & Assert
      await expect(userService.createUser(userData)).rejects.toThrow(
        "Failed to create user"
      );
    });
  });

  describe("findById", () => {
    test("should return user when found", async () => {
      // Arrange
      const userId = "123";
      const expectedUser = {
        id: userId,
        username: "testuser",
        email: "test@example.com",
      };

      jest.spyOn(User, "findById").mockResolvedValue(expectedUser);

      // Act
      const result = await userService.findById(userId);

      // Assert
      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedUser);
    });

    test("should throw NotFoundError when user not found", async () => {
      // Arrange
      const userId = "nonexistent";
      jest.spyOn(User, "findById").mockResolvedValue(null);

      // Act & Assert
      await expect(userService.findById(userId)).rejects.toThrow(NotFoundError);
    });
  });

  describe("updateUser", () => {
    test("should update user with valid data", async () => {
      // Arrange
      const userId = "123";
      const updateData = { username: "newusername" };
      const existingUser = { id: userId, username: "oldusername" };
      const updatedUser = { ...existingUser, ...updateData };

      jest.spyOn(User, "findById").mockResolvedValue(existingUser);
      jest.spyOn(existingUser, "save").mockResolvedValue(updatedUser);

      // Act
      const result = await userService.updateUser(userId, updateData);

      // Assert
      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(existingUser.save).toHaveBeenCalled();
      expect(result).toEqual(updatedUser);
    });

    test("should throw NotFoundError when user does not exist", async () => {
      // Arrange
      const userId = "nonexistent";
      const updateData = { username: "newusername" };

      jest.spyOn(User, "findById").mockResolvedValue(null);

      // Act & Assert
      await expect(userService.updateUser(userId, updateData)).rejects.toThrow(
        NotFoundError
      );
    });
  });
});

// Test utilities and matchers
expect.extend({
  toBeValidUser(received) {
    const pass =
      received &&
      typeof received.id === "string" &&
      typeof received.username === "string" &&
      typeof received.email === "string" &&
      !received.password; // Password should not be returned

    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid user`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid user`,
        pass: false,
      };
    }
  },

  toBeValidEmail(received) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pass = emailRegex.test(received);

    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid email`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid email`,
        pass: false,
      };
    }
  },
});
```

### Mocking and Stubbing Strategies

```javascript
// Advanced mocking examples
import UserService from "../src/services/UserService";
import EmailService from "../src/services/EmailService";
import DatabaseService from "../src/services/DatabaseService";

describe("UserService with Advanced Mocking", () => {
  let userService;
  let mockEmailService;
  let mockDatabaseService;

  beforeEach(() => {
    // Mock external dependencies
    mockEmailService = {
      sendWelcomeEmail: jest.fn(),
      sendPasswordResetEmail: jest.fn(),
    };

    mockDatabaseService = {
      transaction: jest.fn(),
      query: jest.fn(),
    };

    userService = new UserService(mockEmailService, mockDatabaseService);
  });

  describe("transactional operations", () => {
    test("should create user and send email in transaction", async () => {
      // Arrange
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "ValidPass123!",
      };

      const mockTransaction = {
        commit: jest.fn(),
        rollback: jest.fn(),
      };

      mockDatabaseService.transaction.mockImplementation(async (callback) => {
        return await callback(mockTransaction);
      });

      mockDatabaseService.query
        .mockResolvedValueOnce({ id: "123", ...userData })
        .mockResolvedValueOnce({ affectedRows: 1 });

      mockEmailService.sendWelcomeEmail.mockResolvedValue(true);

      // Act
      const result = await userService.createUserWithWelcomeEmail(userData);

      // Assert
      expect(mockDatabaseService.transaction).toHaveBeenCalled();
      expect(mockDatabaseService.query).toHaveBeenCalledWith(
        "INSERT INTO users SET ?",
        userData
      );
      expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledWith(
        userData.email
      );
      expect(mockTransaction.commit).toHaveBeenCalled();
      expect(mockTransaction.rollback).not.toHaveBeenCalled();

      expect(result).toEqual({ id: "123", ...userData });
    });

    test("should rollback transaction on email failure", async () => {
      // Arrange
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "ValidPass123!",
      };

      const mockTransaction = {
        commit: jest.fn(),
        rollback: jest.fn(),
      };

      mockDatabaseService.transaction.mockImplementation(async (callback) => {
        return await callback(mockTransaction);
      });

      mockDatabaseService.query.mockResolvedValue({ id: "123", ...userData });
      mockEmailService.sendWelcomeEmail.mockRejectedValue(
        new Error("Email service down")
      );

      // Act & Assert
      await expect(
        userService.createUserWithWelcomeEmail(userData)
      ).rejects.toThrow("Email service down");

      expect(mockTransaction.rollback).toHaveBeenCalled();
      expect(mockTransaction.commit).not.toHaveBeenCalled();
    });
  });

  describe("mocking modules", () => {
    test("should use mocked bcrypt for password hashing", async () => {
      // Mock entire bcrypt module
      jest.doMock("bcrypt", () => ({
        hash: jest.fn().mockResolvedValue("hashed_password"),
        compare: jest.fn().mockResolvedValue(true),
        genSalt: jest.fn().mockResolvedValue("salt"),
      }));

      const { hash } = await import("bcrypt");

      // Act
      const hashedPassword = await hash("password", 12);

      // Assert
      expect(hash).toHaveBeenCalledWith("password", 12);
      expect(hashedPassword).toBe("hashed_password");
    });
  });

  describe("spying on methods", () => {
    test("should spy on console logging", async () => {
      // Spy on console.log
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      await userService.someMethodThatLogs();

      expect(consoleSpy).toHaveBeenCalledWith("User created successfully");

      consoleSpy.mockRestore();
    });
  });

  describe("fake timers", () => {
    test("should handle time-based operations", () => {
      // Use fake timers to control time
      jest.useFakeTimers();

      const callback = jest.fn();
      const timeoutId = setTimeout(callback, 1000);

      // Fast-forward time
      jest.advanceTimersByTime(1000);

      expect(callback).toHaveBeenCalled();
      expect(clearTimeout).toHaveBeenCalledWith(timeoutId);

      jest.useRealTimers();
    });
  });
});
```

## Integration Testing

### Database Integration Testing

```javascript
// UserIntegration.test.js
import request from "supertest";
import app from "../src/app";
import { setupTestDatabase, cleanupTestDatabase } from "./helpers/database";

describe("User Integration Tests", () => {
  let server;
  let database;

  beforeAll(async () => {
    // Setup test database
    database = await setupTestDatabase();

    // Start test server
    server = app.listen(0); // Random port
  });

  afterAll(async () => {
    // Cleanup
    await server.close();
    await cleanupTestDatabase(database);
  });

  beforeEach(async () => {
    // Reset database before each test
    await database.reset();
  });

  describe("POST /api/users", () => {
    test("should create user successfully", async () => {
      // Arrange
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "ValidPass123!",
      };

      // Act
      const response = await request(app)
        .post("/api/users")
        .send(userData)
        .expect(201);

      // Assert
      expect(response.body).toMatchObject({
        username: userData.username,
        email: userData.email,
      });
      expect(response.body.id).toBeDefined();
      expect(response.body.password).toBeUndefined(); // Password should not be returned

      // Verify user exists in database
      const dbUser = await database.users.findById(response.body.id);
      expect(dbUser).toBeTruthy();
      expect(dbUser.username).toBe(userData.username);
    });

    test("should return 400 for invalid data", async () => {
      // Arrange
      const invalidData = {
        username: "a", // Too short
        email: "invalid-email",
        password: "123", // Too weak
      };

      // Act
      const response = await request(app)
        .post("/api/users")
        .send(invalidData)
        .expect(400);

      // Assert
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors).toContain(
        "Username must be at least 3 characters"
      );
      expect(response.body.errors).toContain("Valid email required");
      expect(response.body.errors).toContain(
        "Password must be at least 8 characters long"
      );
    });

    test("should return 409 for duplicate email", async () => {
      // Arrange
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "ValidPass123!",
      };

      // Create first user
      await request(app).post("/api/users").send(userData).expect(201);

      // Try to create duplicate
      const duplicateData = { ...userData, username: "different" };

      // Act
      const response = await request(app)
        .post("/api/users")
        .send(duplicateData)
        .expect(409);

      // Assert
      expect(response.body.error).toContain("Email already exists");
    });
  });

  describe("GET /api/users/:id", () => {
    test("should return user when found", async () => {
      // Arrange
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "ValidPass123!",
      };

      const createResponse = await request(app)
        .post("/api/users")
        .send(userData);

      const userId = createResponse.body.id;

      // Act
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .expect(200);

      // Assert
      expect(response.body).toMatchObject({
        id: userId,
        username: userData.username,
        email: userData.email,
      });
    });

    test("should return 404 when user not found", async () => {
      // Act
      const response = await request(app)
        .get("/api/users/nonexistent")
        .expect(404);

      // Assert
      expect(response.body.error).toContain("User not found");
    });
  });

  describe("PUT /api/users/:id", () => {
    test("should update user successfully", async () => {
      // Arrange
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "ValidPass123!",
      };

      const createResponse = await request(app)
        .post("/api/users")
        .send(userData);

      const userId = createResponse.body.id;
      const updateData = { username: "updateduser" };

      // Act
      const response = await request(app)
        .put(`/api/users/${userId}`)
        .send(updateData)
        .expect(200);

      // Assert
      expect(response.body.username).toBe(updateData.username);
      expect(response.body.email).toBe(userData.email); // Unchanged field
    });

    test("should return 404 when updating non-existent user", async () => {
      // Act
      const response = await request(app)
        .put("/api/users/nonexistent")
        .send({ username: "updated" })
        .expect(404);

      // Assert
      expect(response.body.error).toContain("User not found");
    });
  });
});
```

### API Testing with Supertest

```javascript
// API Integration Tests
describe("API Endpoints Integration", () => {
  describe("Authentication Flow", () => {
    test("should complete full authentication flow", async () => {
      // 1. Register user
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "ValidPass123!",
      };

      const registerResponse = await request(app)
        .post("/api/auth/register")
        .send(userData)
        .expect(201);

      expect(registerResponse.body.user).toMatchObject({
        username: userData.username,
        email: userData.email,
      });
      expect(registerResponse.body.token).toBeDefined();

      // 2. Login with credentials
      const loginResponse = await request(app)
        .post("/api/auth/login")
        .send({
          email: userData.email,
          password: userData.password,
        })
        .expect(200);

      expect(loginResponse.body.token).toBeDefined();
      expect(loginResponse.body.user).toMatchObject({
        username: userData.username,
        email: userData.email,
      });

      // 3. Use token to access protected route
      const token = loginResponse.body.token;
      const protectedResponse = await request(app)
        .get("/api/profile")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(protectedResponse.body).toMatchObject({
        username: userData.username,
        email: userData.email,
      });

      // 4. Logout
      await request(app)
        .post("/api/auth/logout")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      // 5. Verify token is invalidated
      await request(app)
        .get("/api/profile")
        .set("Authorization", `Bearer ${token}`)
        .expect(401);
    });
  });

  describe("Error Handling", () => {
    test("should handle validation errors consistently", async () => {
      const response = await request(app)
        .post("/api/users")
        .send({
          username: "", // Invalid
          email: "invalid",
          password: "123",
        })
        .expect(400);

      expect(response.body).toHaveProperty("errors");
      expect(Array.isArray(response.body.errors)).toBe(true);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });

    test("should handle rate limiting", async () => {
      // Make multiple rapid requests
      const promises = Array(10)
        .fill()
        .map(() =>
          request(app).post("/api/auth/login").send({
            email: "test@example.com",
            password: "wrongpassword",
          })
        );

      const responses = await Promise.all(promises);

      // Some requests should be rate limited
      const rateLimitedResponses = responses.filter(
        (res) => res.status === 429
      );
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });

  describe("File Upload", () => {
    test("should handle file upload successfully", async () => {
      const response = await request(app)
        .post("/api/upload")
        .attach("file", "tests/fixtures/test-image.jpg")
        .expect(200);

      expect(response.body).toHaveProperty("filename");
      expect(response.body).toHaveProperty("url");
      expect(response.body.filename).toMatch(/\.(jpg|jpeg)$/i);
    });

    test("should reject invalid file types", async () => {
      const response = await request(app)
        .post("/api/upload")
        .attach("file", "tests/fixtures/test-file.txt")
        .expect(400);

      expect(response.body.error).toContain("Invalid file type");
    });
  });
});
```

## End-to-End Testing with Playwright

### E2E Test Setup

```javascript
// e2e/tests/user-journey.spec.js
import { test, expect } from "@playwright/test";

test.describe("User Journey", () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto("/login");
    await page.fill("[data-testid=email]", "test@example.com");
    await page.fill("[data-testid=password]", "ValidPass123!");
    await page.click("[data-testid=login-button]");
    await expect(page.locator("[data-testid=dashboard]")).toBeVisible();
  });

  test("should create, edit, and delete user", async ({ page }) => {
    // Navigate to users page
    await page.click("[data-testid=users-menu]");
    await expect(page).toHaveURL("/users");

    // Create new user
    await page.click("[data-testid=create-user-button]");
    await page.fill("[data-testid=username]", "newuser");
    await page.fill("[data-testid=email]", "newuser@example.com");
    await page.fill("[data-testid=password]", "ValidPass123!");
    await page.click("[data-testid=save-button]");

    // Verify user created
    await expect(page.locator("text=newuser")).toBeVisible();
    await expect(page.locator("text=newuser@example.com")).toBeVisible();

    // Edit user
    await page.click("[data-testid=edit-user-button]");
    await page.fill("[data-testid=username]", "updateduser");
    await page.click("[data-testid=save-button]");

    // Verify user updated
    await expect(page.locator("text=updateduser")).toBeVisible();
    await expect(page.locator("text=newuser")).not.toBeVisible();

    // Delete user
    await page.click("[data-testid=delete-user-button]");
    await page.click("[data-testid=confirm-delete]");

    // Verify user deleted
    await expect(page.locator("text=updateduser")).not.toBeVisible();
  });

  test("should handle form validation", async ({ page }) => {
    await page.goto("/users/create");

    // Try to submit empty form
    await page.click("[data-testid=save-button]");

    // Check validation errors
    await expect(page.locator("[data-testid=username-error]")).toBeVisible();
    await expect(page.locator("[data-testid=email-error]")).toBeVisible();
    await expect(page.locator("[data-testid=password-error]")).toBeVisible();

    // Fill with invalid data
    await page.fill("[data-testid=username]", "a"); // Too short
    await page.fill("[data-testid=email]", "invalid-email");
    await page.fill("[data-testid=password]", "123"); // Too weak
    await page.click("[data-testid=save-button]");

    // Check specific error messages
    await expect(
      page.locator("text=Username must be at least 3 characters")
    ).toBeVisible();
    await expect(page.locator("text=Valid email required")).toBeVisible();
    await expect(
      page.locator("text=Password must be at least 8 characters")
    ).toBeVisible();
  });

  test("should handle network errors gracefully", async ({ page }) => {
    // Mock network failure
    await page.route("/api/users", (route) => route.abort());

    await page.goto("/users/create");
    await page.fill("[data-testid=username]", "testuser");
    await page.fill("[data-testid=email]", "test@example.com");
    await page.fill("[data-testid=password]", "ValidPass123!");
    await page.click("[data-testid=save-button]");

    // Check error message
    await expect(page.locator("[data-testid=error-message]")).toBeVisible();
    await expect(page.locator("text=Failed to create user")).toBeVisible();
  });

  test("should handle real-time updates", async ({ page }) => {
    // Open two browser contexts
    const context = await page.context();
    const page2 = await context.newPage();

    // Login in both pages
    for (const p of [page, page2]) {
      await p.goto("/login");
      await p.fill("[data-testid=email]", "test@example.com");
      await p.fill("[data-testid=password]", "ValidPass123!");
      await p.click("[data-testid=login-button]");
    }

    // Navigate to users page in both
    await page.goto("/users");
    await page2.goto("/users");

    // Create user in first page
    await page.click("[data-testid=create-user-button]");
    await page.fill("[data-testid=username]", "realtime-user");
    await page.fill("[data-testid=email]", "realtime@example.com");
    await page.fill("[data-testid=password]", "ValidPass123!");
    await page.click("[data-testid=save-button]");

    // Verify user appears in second page (real-time update)
    await expect(page2.locator("text=realtime-user")).toBeVisible({
      timeout: 5000,
    });
  });
});
```

## Performance Testing

### Load Testing with Artillery

```yaml
# artillery-config.yml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Warm up"
    - duration: 120
      arrivalRate: 50
      name: "Load test"
    - duration: 60
      arrivalRate: 100
      name: "Stress test"
  processor: "./test-processor.js"

scenarios:
  - name: "User Registration and Login"
    weight: 70
    flow:
      - post:
          url: "/api/auth/register"
          json:
            username: "user-{{ $randomString() }}"
            email: "user-{{ $randomString() }}@example.com"
            password: "ValidPass123!"
          capture:
            - json: "$.token"
              as: "authToken"

      - get:
          url: "/api/profile"
          headers:
            Authorization: "Bearer {{ authToken }}"

      - post:
          url: "/api/auth/logout"
          headers:
            Authorization: "Bearer {{ authToken }}"

  - name: "API Health Check"
    weight: 30
    flow:
      - get:
          url: "/api/health"

      - get:
          url: "/api/users"
          qs:
            page: "{{ $randomInt(1, 10) }}"
            limit: "10"
```

### Performance Monitoring in Tests

```javascript
// Performance Tests
describe("Performance Tests", () => {
  test("should respond within acceptable time limits", async () => {
    const startTime = Date.now();

    await request(app).get("/api/users").expect(200);

    const responseTime = Date.now() - startTime;
    expect(responseTime).toBeLessThan(1000); // Should respond within 1 second
  });

  test("should handle concurrent requests", async () => {
    const concurrentRequests = 100;
    const promises = Array(concurrentRequests)
      .fill()
      .map(() => request(app).get("/api/users"));

    const startTime = Date.now();
    const responses = await Promise.all(promises);
    const totalTime = Date.now() - startTime;

    // All requests should succeed
    responses.forEach((response) => {
      expect(response.status).toBe(200);
    });

    // Average response time should be reasonable
    const avgResponseTime = totalTime / concurrentRequests;
    expect(avgResponseTime).toBeLessThan(2000); // 2 seconds average
  });

  test("should not leak memory under load", async () => {
    const initialMemory = process.memoryUsage().heapUsed;

    // Make many requests
    for (let i = 0; i < 1000; i++) {
      await request(app).get("/api/users");
    }

    // Force garbage collection
    if (global.gc) {
      global.gc();
    }

    const finalMemory = process.memoryUsage().heapUsed;
    const memoryIncrease = finalMemory - initialMemory;

    // Memory increase should be minimal (less than 50MB)
    expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
  });
});
```

## Test-Driven Development (TDD)

### TDD Workflow Example

```javascript
// UserValidator.test.js - Write tests first
describe("UserValidator", () => {
  let validator;

  beforeEach(() => {
    validator = new UserValidator();
  });

  describe("validateEmail", () => {
    test("should return true for valid email", () => {
      expect(validator.validateEmail("test@example.com")).toBe(true);
      expect(validator.validateEmail("user.name+tag@domain.co.uk")).toBe(true);
    });

    test("should return false for invalid email", () => {
      expect(validator.validateEmail("invalid")).toBe(false);
      expect(validator.validateEmail("test@")).toBe(false);
      expect(validator.validateEmail("@example.com")).toBe(false);
      expect(validator.validateEmail("test@.com")).toBe(false);
    });
  });

  describe("validatePassword", () => {
    test("should return true for strong password", () => {
      expect(validator.validatePassword("StrongPass123!")).toBe(true);
      expect(validator.validatePassword("MyP@ssw0rd")).toBe(true);
    });

    test("should return false for weak passwords", () => {
      expect(validator.validatePassword("weak")).toBe(false);
      expect(validator.validatePassword("password")).toBe(false);
      expect(validator.validatePassword("12345678")).toBe(false);
      expect(validator.validatePassword("Password")).toBe(false); // No number
      expect(validator.validatePassword("password123")).toBe(false); // No uppercase
      expect(validator.validatePassword("PASSWORD123")).toBe(false); // No lowercase
    });
  });
});

// UserValidator.js - Implement to make tests pass
class UserValidator {
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password) {
    // At least 8 characters, uppercase, lowercase, number, special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
}

export default UserValidator;
```

## Code Quality and Coverage

### Code Coverage Configuration

```javascript
// Coverage reporting with Istanbul
const coverageConfig = {
  all: true,
  include: ["src/**/*.js"],
  exclude: [
    "src/**/*.test.js",
    "src/config/**",
    "src/migrations/**",
    "src/scripts/**",
  ],
  reporter: ["text", "lcov", "html"],
  thresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    "./src/services/": {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
```

### Static Code Analysis with ESLint

```javascript
// .eslintrc.js
module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:security/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "security", "jest"],
  rules: {
    "no-console": "warn",
    "no-unused-vars": "error",
    "prefer-const": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-arrow-callback": "error",
    "security/detect-object-injection": "warn",
    "security/detect-non-literal-fs-filename": "warn",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
  },
};
```

## Key Testing Takeaways for FAANG

### Testing Strategy

- **Pyramid Approach**: Many unit tests, fewer integration tests, minimal E2E tests
- **Test Coverage**: Aim for 80%+ coverage, focus on critical paths
- **Automation**: Integrate tests into CI/CD pipeline
- **Mocking**: Use mocks for external dependencies
- **Test Data**: Use factories and fixtures for consistent test data

### Quality Assurance

- **Code Reviews**: Mandatory peer review process
- **Static Analysis**: ESLint, TypeScript, security scanning
- **Performance Testing**: Load testing and monitoring
- **Security Testing**: Penetration testing and vulnerability scanning
- **Documentation**: Tests serve as living documentation

## External Testing Resources

- **Jest Documentation**: https://jestjs.io/docs/getting-started
- **Supertest Guide**: https://github.com/visionmedia/supertest
- **Playwright Testing**: https://playwright.dev/
- **Artillery Load Testing**: https://artillery.io/
- **Testing Best Practices**: https://github.com/goldbergyoni/javascript-testing-best-practices
