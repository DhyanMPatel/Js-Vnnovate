# API Design & GraphQL

## Modern API Design for FAANG

### Why API Design Matters

- **Scalability**: Design APIs that can handle growth
- **Maintainability**: Clean, consistent, and well-documented interfaces
- **Developer Experience**: Easy to understand and use
- **Performance**: Optimized for speed and efficiency
- **Security**: Built-in security best practices

## REST API Best Practices

### 1. RESTful Design Principles

```javascript
// RESTful resource design
class UserAPI {
  constructor(app, userService) {
    this.app = app;
    this.userService = userService;
    this.setupRoutes();
  }

  setupRoutes() {
    // Collection routes
    this.app.get("/api/users", this.getUsers.bind(this));
    this.app.post("/api/users", this.createUser.bind(this));

    // Individual resource routes
    this.app.get("/api/users/:id", this.getUserById.bind(this));
    this.app.put("/api/users/:id", this.updateUser.bind(this));
    this.app.delete("/api/users/:id", this.deleteUser.bind(this));

    // Nested resource routes
    this.app.get("/api/users/:id/posts", this.getUserPosts.bind(this));
    this.app.post("/api/users/:id/posts", this.createUserPost.bind(this));

    // Action routes (when CRUD doesn't fit)
    this.app.post("/api/users/:id/follow", this.followUser.bind(this));
    this.app.delete("/api/users/:id/follow", this.unfollowUser.bind(this));
  }

  // GET /api/users - List users with filtering and pagination
  async getUsers(req, res) {
    try {
      const {
        page = 1,
        limit = 20,
        sort = "createdAt",
        order = "desc",
        search,
        role,
        status,
      } = req.query;

      // Build filter object
      const filter = {};
      if (role) filter.role = role;
      if (status) filter.status = status;
      if (search) {
        filter.$or = [
          { username: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ];
      }

      // Build sort object
      const sortObj = {};
      sortObj[sort] = order === "desc" ? -1 : 1;

      // Pagination
      const skip = (page - 1) * limit;

      const [users, total] = await Promise.all([
        this.userService.find(filter, { skip, limit, sort: sortObj }),
        this.userService.count(filter),
      ]);

      // HATEOAS links
      const links = {
        self: `/api/users?page=${page}&limit=${limit}`,
        first: `/api/users?page=1&limit=${limit}`,
        last: `/api/users?page=${Math.ceil(total / limit)}&limit=${limit}`,
        prev: page > 1 ? `/api/users?page=${page - 1}&limit=${limit}` : null,
        next:
          page < Math.ceil(total / limit)
            ? `/api/users?page=${page + 1}&limit=${limit}`
            : null,
      };

      res.json({
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
        links,
        meta: {
          timestamp: new Date().toISOString(),
          version: "1.0.0",
        },
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  // POST /api/users - Create new user
  async createUser(req, res) {
    try {
      const userData = req.body;

      // Validate required fields
      const requiredFields = ["username", "email", "password"];
      const missingFields = requiredFields.filter((field) => !userData[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: "Validation failed",
          message: "Missing required fields",
          missingFields,
        });
      }

      // Check for duplicates
      const existingUser = await this.userService.findOne({
        $or: [{ username: userData.username }, { email: userData.email }],
      });

      if (existingUser) {
        return res.status(409).json({
          error: "Conflict",
          message: "Username or email already exists",
        });
      }

      const user = await this.userService.create(userData);

      // Remove sensitive data
      const { password, ...userResponse } = user.toJSON();

      res.status(201).json({
        user: userResponse,
        links: {
          self: `/api/users/${user.id}`,
          posts: `/api/users/${user.id}/posts`,
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  // GET /api/users/:id - Get user by ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;

      if (!this.isValidObjectId(id)) {
        return res.status(400).json({
          error: "Invalid ID format",
        });
      }

      const user = await this.userService.findById(id);

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      const { password, ...userResponse } = user.toJSON();

      res.json({
        user: userResponse,
        links: {
          self: `/api/users/${id}`,
          posts: `/api/users/${id}/posts`,
          follow: `/api/users/${id}/follow`,
        },
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  // PUT /api/users/:id - Update user
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Remove sensitive fields that shouldn't be updated directly
      delete updateData.password;
      delete updateData.id;
      delete updateData.createdAt;

      const user = await this.userService.update(id, updateData);

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      const { password, ...userResponse } = user.toJSON();

      res.json({
        user: userResponse,
        message: "User updated successfully",
        links: {
          self: `/api/users/${id}`,
        },
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  // DELETE /api/users/:id - Delete user
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const result = await this.userService.delete(id);

      if (!result) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      res.status(204).send(); // No content for successful deletion
    } catch (error) {
      this.handleError(res, error);
    }
  }

  // Utility methods
  isValidObjectId(id) {
    // MongoDB ObjectId validation
    return /^[0-9a-fA-F]{24}$/.test(id);
  }

  handleError(res, error) {
    console.error("API Error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "Validation Error",
        message: error.message,
        details: error.errors,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        error: "Invalid ID format",
      });
    }

    res.status(500).json({
      error: "Internal Server Error",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    });
  }
}
```

### 2. Advanced Middleware for REST APIs

```javascript
class APIMiddleware {
  // Request validation middleware
  static validateRequest(schema) {
    return (req, res, next) => {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          error: "Validation failed",
          message: "Invalid request data",
          details: error.details.map((detail) => ({
            field: detail.path.join("."),
            message: detail.message,
            value: detail.context.value,
          })),
        });
      }

      req.validatedBody = value;
      next();
    };
  }

  // Rate limiting middleware
  static rateLimit(options = {}) {
    const rateLimit = require("express-rate-limit");

    return rateLimit({
      windowMs: options.windowMs || 15 * 60 * 1000, // 15 minutes
      max: options.max || 100, // Limit each IP to 100 requests per windowMs
      message: {
        error: "Too many requests",
        message: "Rate limit exceeded",
        retryAfter: Math.ceil(options.windowMs / 1000),
      },
      standardHeaders: true,
      legacyHeaders: false,
      keyGenerator: (req) => {
        return req.ip + (req.user?.id || "");
      },
    });
  }

  // API versioning middleware
  static apiVersion(versions) {
    return (req, res, next) => {
      const version =
        req.headers["api-version"] || req.query.version || "1.0.0";

      if (!versions.includes(version)) {
        return res.status(400).json({
          error: "Unsupported API version",
          supportedVersions: versions,
          message: `Please use one of the supported versions: ${versions.join(
            ", "
          )}`,
        });
      }

      req.apiVersion = version;
      next();
    };
  }

  // Content negotiation middleware
  static contentNegotiation() {
    return (req, res, next) => {
      const acceptHeader = req.headers.accept || "";

      // Determine response format
      if (acceptHeader.includes("application/xml")) {
        req.responseFormat = "xml";
      } else if (acceptHeader.includes("text/csv")) {
        req.responseFormat = "csv";
      } else {
        req.responseFormat = "json"; // Default
      }

      next();
    };
  }

  // Response formatting middleware
  static formatResponse() {
    return (req, res, next) => {
      const originalJson = res.json;

      res.json = function (data) {
        const formattedData = {
          data,
          meta: {
            timestamp: new Date().toISOString(),
            version: req.apiVersion || "1.0.0",
            requestId: req.id || "unknown",
          },
        };

        return originalJson.call(this, formattedData);
      };

      next();
    };
  }

  // Security headers middleware
  static securityHeaders() {
    return (req, res, next) => {
      // Security headers
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("X-Frame-Options", "DENY");
      res.setHeader("X-XSS-Protection", "1; mode=block");
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

      // API-specific headers
      res.setHeader("X-API-Version", req.apiVersion || "1.0.0");
      res.setHeader("X-Rate-Limit-Limit", "100");
      res.setHeader("X-Rate-Limit-Remaining", "99");
      res.setHeader(
        "X-Rate-Limit-Reset",
        new Date(Date.now() + 15 * 60 * 1000).toISOString()
      );

      next();
    };
  }

  // Request logging middleware
  static requestLogger() {
    return (req, res, next) => {
      const start = Date.now();

      res.on("finish", () => {
        const duration = Date.now() - start;

        console.log({
          method: req.method,
          url: req.originalUrl,
          status: res.statusCode,
          duration: `${duration}ms`,
          ip: req.ip,
          userAgent: req.get("User-Agent"),
          apiVersion: req.apiVersion,
          timestamp: new Date().toISOString(),
        });
      });

      next();
    };
  }
}

// Usage example
import express from "express";
import Joi from "joi";

const app = express();

// Apply middleware
app.use(express.json());
app.use(APIMiddleware.requestLogger());
app.use(APIMiddleware.securityHeaders());
app.use(APIMiddleware.apiVersion(["1.0.0", "1.1.0", "2.0.0"]));
app.use(APIMiddleware.contentNegotiation());
app.use(APIMiddleware.formatResponse());

// Validation schemas
const userCreationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  profile: Joi.object({
    firstName: Joi.string().max(50),
    lastName: Joi.string().max(50),
  }).optional(),
});

// Apply validation to routes
app.post(
  "/api/users",
  APIMiddleware.validateRequest(userCreationSchema),
  APIMiddleware.rateLimit({ max: 10 }), // Lower limit for creation
  userController.createUser
);
```

## GraphQL Implementation with Apollo Server

### 1. Apollo Server Setup

```javascript
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSchema } from "type-graphql";
import cors from "cors";
import express from "express";

// GraphQL Resolvers
class UserResolver {
  // Query resolvers
  async users(parent, { filter, pagination }, context) {
    const { page = 1, limit = 20 } = pagination || {};
    const { search, role, status } = filter || {};

    // Build filter
    const where = {};
    if (search) {
      where.$or = [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (role) where.role = role;
    if (status) where.status = status;

    // Pagination
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(where).skip(skip).limit(limit),
      User.countDocuments(where),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async user(parent, { id }, context) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  // Mutation resolvers
  async createUser(parent, { input }, context) {
    const { username, email, password, profile } = input;

    // Check for existing user
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      throw new Error("Username or email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      profile,
    });

    await user.save();
    return user;
  }

  async updateUser(parent, { id, input }, context) {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: input },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async deleteUser(parent, { id }, context) {
    const result = await User.findByIdAndDelete(id);

    if (!result) {
      throw new Error("User not found");
    }

    return true;
  }

  // Field resolvers (for nested data)
  async posts(user, args, context) {
    return Post.find({ author: user.id }).sort({ createdAt: -1 }).limit(10);
  }

  async profile(user, args, context) {
    return Profile.findOne({ user: user.id });
  }
}

// GraphQL Type Definitions
const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    role: UserRole!
    status: UserStatus!
    profile: Profile
    posts: [Post!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  
  type Profile {
    id: ID!
    firstName: String
    lastName: String
    avatar: String
    bio: String
    dateOfBirth: DateTime
  }
  
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    status: PostStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  
  type UserConnection {
    users: [User!]!
    pagination: PaginationInfo!
  }
  
  type PaginationInfo {
    page: Int!
    limit: Int!
    total: Int!
    pages: Int!
  }
  
  enum UserRole {
    USER
    ADMIN
    MODERATOR
  }
  
  enum UserStatus {
    ACTIVE
    INACTIVE
    SUSPENDED
  }
  
  enum PostStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }
  
  scalar DateTime
  
  input UserFilter {
    search: String
    role: UserRole
    status: UserStatus
  }
  
  input PaginationInput {
    page: Int = 1
    limit: Int = 20
  }
  
  input CreateUserInput {
    username: String!
    email: String!
    password: String!
    profile: ProfileInput
  }
  
  input UpdateUserInput {
    username: String
    email: String
    role: UserRole
    status: UserStatus
    profile: ProfileInput
  }
  
  input ProfileInput {
    firstName: String
    lastName: String
    avatar: String
    bio: String
    dateOfBirth: DateTime
  }
  
  type Query {
    users(filter: UserFilter, pagination: PaginationInput): UserConnection!
    user(id: ID!): User
    me: User
  }
  
  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
  }
  
  type Subscription {
    userCreated: User!
    userUpdated: User!
    userDeleted: ID!
  }
`;

// Apollo Server setup
class GraphQLServer {
  constructor() {
    this.server = null;
    this.app = express();
  }

  async start() {
    // Create Apollo Server
    this.server = new ApolloServer({
      typeDefs,
      resolvers: {
        Query: {
          users: UserResolver.prototype.users,
          user: UserResolver.prototype.user,
          me: async (parent, args, context) => {
            if (!context.user) {
              throw new Error("Authentication required");
            }
            return context.user;
          },
        },
        Mutation: {
          createUser: UserResolver.prototype.createUser,
          updateUser: UserResolver.prototype.updateUser,
          deleteUser: UserResolver.prototype.deleteUser,
        },
        User: {
          posts: UserResolver.prototype.posts,
          profile: UserResolver.prototype.profile,
        },
      },

      // Context for authentication and data access
      context: async ({ req }) => {
        // Authentication logic
        const token = req.headers.authorization || "";
        let user = null;

        if (token) {
          try {
            const decoded = jwt.verify(
              token.replace("Bearer ", ""),
              process.env.JWT_SECRET
            );
            user = await User.findById(decoded.id);
          } catch (error) {
            // Invalid token
          }
        }

        return {
          user,
          req,
          // Add data sources
          userAPI: new UserAPI(),
          postAPI: new PostAPI(),
        };
      },

      // Plugins for monitoring and logging
      plugins: [
        // Logging plugin
        {
          requestDidStart() {
            return {
              didResolveOperation(requestContext) {
                console.log(
                  "GraphQL Operation:",
                  requestContext.request.operationName
                );
              },
              didEncounterErrors(requestContext) {
                console.error("GraphQL Errors:", requestContext.errors);
              },
            };
          },
        },
      ],

      // Validation rules
      validationRules: [
        // Add custom validation rules
      ],

      // Format error responses
      formatError: (error) => {
        console.error("GraphQL Error:", error);

        return {
          message: error.message,
          locations: error.locations,
          path: error.path,
          extensions: {
            code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
            exception: error.extensions?.exception,
          },
        };
      },

      // Debug mode in development
      debug: process.env.NODE_ENV === "development",
    });

    // Start server
    await this.server.start();

    // Apply middleware
    this.app.use(
      cors(),
      express.json(),
      expressMiddleware(this.server, {
        context: async ({ req }) => ({ req }),
      })
    );

    return this.app;
  }

  getApp() {
    return this.app;
  }

  getServer() {
    return this.server;
  }
}

// Usage
const graphQLServer = new GraphQLServer();

async function startGraphQLServer() {
  const app = await graphQLServer.start();

  app.listen({ port: 4000 }, () => {
    console.log("🚀 GraphQL Server ready at http://localhost:4000/graphql");
  });
}

startGraphQLServer();
```

### 2. Advanced GraphQL Features

```javascript
// DataLoader for batching and caching
import DataLoader from "dataloader";

class DataLoaderContext {
  constructor() {
    this.userLoader = new DataLoader(async (ids) => {
      const users = await User.find({ _id: { $in: ids } });

      // Map users by ID to maintain order
      const userMap = users.reduce((map, user) => {
        map[user.id] = user;
        return map;
      }, {});

      return ids.map((id) => userMap[id] || null);
    });

    this.postLoader = new DataLoader(async (ids) => {
      const posts = await Post.find({ _id: { $in: ids } });
      const postMap = posts.reduce((map, post) => {
        map[post.id] = post;
        return map;
      }, {});

      return ids.map((id) => postMap[id] || null);
    });
  }
}

// Subscriptions with GraphQL
class SubscriptionManager {
  constructor(pubsub) {
    this.pubsub = pubsub;
  }

  async publishUserCreated(user) {
    await this.pubsub.publish("USER_CREATED", {
      userCreated: user,
    });
  }

  async publishUserUpdated(user) {
    await this.pubsub.publish("USER_UPDATED", {
      userUpdated: user,
    });
  }

  async publishUserDeleted(userId) {
    await this.pubsub.publish("USER_DELETED", {
      userDeleted: userId,
    });
  }
}

// Subscription resolvers
const subscriptionResolvers = {
  Subscription: {
    userCreated: {
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator(["USER_CREATED"]);
      },
    },
    userUpdated: {
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator(["USER_UPDATED"]);
      },
    },
    userDeleted: {
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator(["USER_DELETED"]);
      },
    },
  },
};

// Query complexity analysis
class QueryComplexityAnalyzer {
  constructor(maxComplexity = 1000) {
    this.maxComplexity = maxComplexity;
  }

  analyze(query) {
    // Simple complexity calculation
    const complexity = this.calculateComplexity(query);

    if (complexity > this.maxComplexity) {
      throw new Error(
        `Query too complex: ${complexity} > ${this.maxComplexity}`
      );
    }

    return complexity;
  }

  calculateComplexity(query) {
    // Simplified complexity calculation
    let complexity = 0;

    // Count nested fields
    const fieldMatches = query.match(/\{\s*\w+/g) || [];
    complexity += fieldMatches.length * 10;

    // Count arguments
    const argMatches = query.match(/\w+:/g) || [];
    complexity += argMatches.length * 5;

    return complexity;
  }
}

// GraphQL Federation (for microservices)
const userTypeDefs = `
  extend type Query {
    me: User
  }
  
  type User @key(fields: "id") {
    id: ID! @external
    username: String!
    email: String!
  }
`;

const userResolvers = {
  User: {
    __resolveReference(user, { fetcher }) {
      return fetcher.loadUserById(user.id);
    },
  },
  Query: {
    me: (_, __, { user }) => user,
  },
};
```

## API Versioning Strategies

### 1. URI Versioning

```javascript
// URI versioning: /api/v1/users, /api/v2/users
class APIVersioning {
  static setupVersionedRoutes(app) {
    // v1 API
    const v1Router = express.Router();
    v1Router.get("/users", v1UserController.getUsers);
    v1Router.post("/users", v1UserController.createUser);

    // v2 API (with breaking changes)
    const v2Router = express.Router();
    v2Router.get("/users", v2UserController.getUsers);
    v2Router.post("/users", v2UserController.createUser);
    v2Router.get("/users/:id/profile", v2UserController.getUserProfile); // New endpoint

    app.use("/api/v1", v1Router);
    app.use("/api/v2", v2Router);

    // Default version redirect
    app.use(
      "/api",
      (req, res, next) => {
        req.url = "/v2" + req.url;
        next();
      },
      v2Router
    );
  }
}
```

### 2. Header Versioning

```javascript
// Header versioning: Accept: application/vnd.api+json;version=1
class HeaderVersioning {
  static versionMiddleware() {
    return (req, res, next) => {
      const acceptHeader = req.headers.accept || "";
      const versionMatch = acceptHeader.match(/version=(\d+)/);

      const version = versionMatch ? versionMatch[1] : "1";
      req.apiVersion = version;

      // Route to appropriate version controller
      req.versionedController = require(`../controllers/v${version}Controller`);

      next();
    };
  }
}
```

### 3. Query Parameter Versioning

```javascript
// Query parameter versioning: /api/users?version=1
class QueryVersioning {
  static versionMiddleware() {
    return (req, res, next) => {
      const version = req.query.version || "1";
      req.apiVersion = version;
      next();
    };
  }
}
```

## API Documentation with OpenAPI/Swagger

### 1. OpenAPI Specification

```javascript
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js API",
      version: "1.0.0",
      description: "A comprehensive Node.js API with REST and GraphQL",
      contact: {
        name: "API Support",
        email: "api-support@example.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development server",
      },
      {
        url: "https://api.example.com/v1",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["id", "username", "email"],
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Unique identifier for the user",
            },
            username: {
              type: "string",
              minLength: 3,
              maxLength: 30,
              pattern: "^[a-zA-Z0-9_]+$",
              description: "Unique username",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            role: {
              type: "string",
              enum: ["user", "admin", "moderator"],
              default: "user",
            },
            status: {
              type: "string",
              enum: ["active", "inactive", "suspended"],
              default: "active",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "User creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        CreateUserRequest: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            username: {
              $ref: "#/components/schemas/User/properties/username",
            },
            email: {
              $ref: "#/components/schemas/User/properties/email",
            },
            password: {
              type: "string",
              minLength: 8,
              description: "User password (min 8 characters)",
            },
            profile: {
              type: "object",
              properties: {
                firstName: {
                  type: "string",
                  maxLength: 50,
                },
                lastName: {
                  type: "string",
                  maxLength: 50,
                },
                bio: {
                  type: "string",
                  maxLength: 500,
                },
              },
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error type",
            },
            message: {
              type: "string",
              description: "Error message",
            },
            details: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                    description: "Field with error",
                  },
                  message: {
                    type: "string",
                    description: "Error message for field",
                  },
                },
              },
            },
          },
        },
        PaginatedResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/User",
              },
            },
            pagination: {
              type: "object",
              properties: {
                page: {
                  type: "integer",
                  minimum: 1,
                },
                limit: {
                  type: "integer",
                  minimum: 1,
                  maximum: 100,
                },
                total: {
                  type: "integer",
                  minimum: 0,
                },
                pages: {
                  type: "integer",
                  minimum: 0,
                },
              },
            },
            links: {
              type: "object",
              properties: {
                self: {
                  type: "string",
                  format: "uri",
                },
                first: {
                  type: "string",
                  format: "uri",
                },
                last: {
                  type: "string",
                  format: "uri",
                },
                prev: {
                  type: "string",
                  format: "uri",
                  nullable: true,
                },
                next: {
                  type: "string",
                  format: "uri",
                  nullable: true,
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

class APIDocumentation {
  static setup(app) {
    // Swagger UI
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(specs, {
        explorer: true,
        customCss: ".swagger-ui .topbar { display: none }",
        customSiteTitle: "Node.js API Documentation",
      })
    );

    // JSON specification
    app.get("/api-docs.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(specs);
    });

    // Redirect root to docs
    app.get("/", (req, res) => {
      res.redirect("/api-docs");
    });
  }
}

// Route documentation with JSDoc
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search users by username or email
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/users", authMiddleware, userController.getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: 'object'
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       format: uri
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/users",
  authMiddleware,
  validateUserInput,
  userController.createUser
);
```

## Rate Limiting Implementation

### 1. Advanced Rate Limiting

```javascript
import Redis from "ioredis";
import rateLimit from "express-rate-limit";

class AdvancedRateLimiter {
  constructor(redisClient) {
    this.redis = redisClient;
    this.windows = new Map(); // Store different time windows
  }

  // Sliding window rate limiter
  slidingWindow(options = {}) {
    const {
      windowMs = 60000, // 1 minute
      maxRequests = 100,
      keyGenerator = (req) => req.ip,
    } = options;

    return async (req, res, next) => {
      const key = `rate_limit:${keyGenerator(req)}`;
      const now = Date.now();
      const windowStart = now - windowMs;

      try {
        // Remove old entries
        await this.redis.zremrangebyscore(key, 0, windowStart);

        // Count current requests
        const count = await this.redis.zcard(key);

        if (count >= maxRequests) {
          const ttl = await this.redis.ttl(key);

          return res.status(429).json({
            error: "Too many requests",
            message: "Rate limit exceeded",
            retryAfter: Math.ceil(ttl),
            limit: maxRequests,
            windowMs,
            remaining: 0,
          });
        }

        // Add current request
        await this.redis.zadd(key, now, `${now}-${Math.random()}`);
        await this.redis.expire(key, Math.ceil(windowMs / 1000));

        // Set rate limit headers
        const remaining = Math.max(0, maxRequests - count - 1);

        res.set({
          "X-RateLimit-Limit": maxRequests,
          "X-RateLimit-Remaining": remaining,
          "X-RateLimit-Reset": new Date(now + windowMs).toISOString(),
        });

        next();
      } catch (error) {
        console.error("Rate limiting error:", error);
        next(); // Allow request if rate limiting fails
      }
    };
  }

  // Fixed window rate limiter
  fixedWindow(options = {}) {
    const {
      windowMs = 60000,
      maxRequests = 100,
      keyGenerator = (req) => req.ip,
    } = options;

    return async (req, res, next) => {
      const key = `rate_limit_fixed:${keyGenerator(req)}`;
      const window = Math.floor(Date.now() / windowMs);
      const windowKey = `${key}:${window}`;

      try {
        const count = await this.redis.incr(windowKey);

        if (count === 1) {
          await this.redis.expire(windowKey, Math.ceil(windowMs / 1000));
        }

        if (count > maxRequests) {
          const ttl = await this.redis.ttl(windowKey);

          return res.status(429).json({
            error: "Too many requests",
            message: "Rate limit exceeded",
            retryAfter: ttl,
            limit: maxRequests,
            windowMs,
            remaining: 0,
          });
        }

        const remaining = Math.max(0, maxRequests - count);

        res.set({
          "X-RateLimit-Limit": maxRequests,
          "X-RateLimit-Remaining": remaining,
          "X-RateLimit-Reset": new Date((window + 1) * windowMs).toISOString(),
        });

        next();
      } catch (error) {
        console.error("Rate limiting error:", error);
        next();
      }
    };
  }

  // Tiered rate limiting (different limits for different users)
  tiered(tiers) {
    return async (req, res, next) => {
      const user = req.user;
      let tier = "anonymous";

      if (user) {
        tier =
          user.role === "admin"
            ? "admin"
            : user.role === "premium"
            ? "premium"
            : "user";
      }

      const config = tiers[tier] || tiers.anonymous;
      const limiter = this.slidingWindow(config);

      return limiter(req, res, next);
    };
  }

  // API-specific rate limiting
  apiSpecific(configs) {
    return async (req, res, next) => {
      const path = req.route?.path || req.path;
      const config = configs[path] || configs.default;

      if (!config) {
        return next();
      }

      const limiter = this.slidingWindow(config);
      return limiter(req, res, next);
    };
  }
}

// Usage examples
const redis = new Redis();
const rateLimiter = new AdvancedRateLimiter(redis);

// Tiered rate limiting
const tieredLimits = {
  anonymous: { windowMs: 60000, maxRequests: 100 },
  user: { windowMs: 60000, maxRequests: 1000 },
  premium: { windowMs: 60000, maxRequests: 5000 },
  admin: { windowMs: 60000, maxRequests: 10000 },
};

app.use("/api/", rateLimiter.tiered(tieredLimits));

// API-specific limits
const apiLimits = {
  "/api/auth/login": { windowMs: 900000, maxRequests: 5 }, // 15 minutes, 5 attempts
  "/api/auth/register": { windowMs: 3600000, maxRequests: 3 }, // 1 hour, 3 attempts
  "/api/upload": { windowMs: 60000, maxRequests: 10 }, // 1 minute, 10 uploads
  default: { windowMs: 60000, maxRequests: 1000 },
};

app.use("/api/", rateLimiter.apiSpecific(apiLimits));
```

## API Caching Strategies

### 1. Multi-Level Caching

```javascript
class APICache {
  constructor() {
    this.memoryCache = new Map();
    this.redis = new Redis();
    this.cacheConfig = new Map();
  }

  // Configure caching for different endpoints
  configure(endpoint, config) {
    this.cacheConfig.set(endpoint, {
      ttl: config.ttl || 300, // 5 minutes default
      strategy: config.strategy || "memory-first",
      invalidateOn: config.invalidateOn || [],
      tags: config.tags || [],
    });
  }

  // Get cache key
  getCacheKey(req) {
    const keyData = {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      user: req.user?.id || "anonymous",
    };

    return `cache:${Buffer.from(JSON.stringify(keyData)).toString("base64")}`;
  }

  // Get cached response
  async get(req) {
    const endpoint = req.route?.path || req.path;
    const config = this.cacheConfig.get(endpoint);

    if (!config) {
      return null;
    }

    const key = this.getCacheKey(req);

    if (config.strategy === "memory-first") {
      // Check memory cache first
      let cached = this.memoryCache.get(key);

      if (cached && Date.now() - cached.timestamp < config.ttl * 1000) {
        return cached.data;
      }

      // Check Redis cache
      const redisCached = await this.redis.get(key);
      if (redisCached) {
        const data = JSON.parse(redisCached);

        // Store in memory cache
        this.memoryCache.set(key, {
          data,
          timestamp: Date.now(),
        });

        return data;
      }
    }

    return null;
  }

  // Set cache
  async set(req, data) {
    const endpoint = req.route?.path || req.path;
    const config = this.cacheConfig.get(endpoint);

    if (!config) {
      return;
    }

    const key = this.getCacheKey(req);

    // Store in memory cache
    this.memoryCache.set(key, {
      data,
      timestamp: Date.now(),
    });

    // Store in Redis cache
    await this.redis.setex(key, config.ttl, JSON.stringify(data));

    // Store cache tags for invalidation
    if (config.tags.length > 0) {
      for (const tag of config.tags) {
        await this.redis.sadd(`cache:tags:${tag}`, key);
        await this.redis.expire(`cache:tags:${tag}`, config.ttl);
      }
    }
  }

  // Invalidate cache by tags
  async invalidateByTag(tag) {
    const keys = await this.redis.smembers(`cache:tags:${tag}`);

    if (keys.length > 0) {
      // Remove from Redis
      await this.redis.del(...keys);

      // Remove from memory cache
      for (const key of keys) {
        this.memoryCache.delete(key);
      }

      // Remove tag set
      await this.redis.del(`cache:tags:${tag}`);
    }
  }

  // Cache middleware
  middleware() {
    return async (req, res, next) => {
      // Only cache GET requests
      if (req.method !== "GET") {
        return next();
      }

      try {
        const cached = await this.get(req);

        if (cached) {
          res.set("X-Cache", "HIT");
          res.set("X-Cache-Key", this.getCacheKey(req));
          return res.json(cached);
        }

        // Override res.json to cache response
        const originalJson = res.json;
        res.json = function (data) {
          // Cache the response
          this.set(req, data).catch(console.error);

          res.set("X-Cache", "MISS");
          res.set("X-Cache-Key", this.getCacheKey(req));

          return originalJson.call(this, data);
        }.bind(this);

        next();
      } catch (error) {
        console.error("Cache middleware error:", error);
        next();
      }
    };
  }
}

// Usage
const apiCache = new APICache();

// Configure caching for different endpoints
apiCache.configure("/api/users", {
  ttl: 300, // 5 minutes
  strategy: "memory-first",
  tags: ["users"],
});

apiCache.configure("/api/posts", {
  ttl: 600, // 10 minutes
  strategy: "memory-first",
  tags: ["posts"],
});

apiCache.configure("/api/users/:id", {
  ttl: 1800, // 30 minutes
  strategy: "memory-first",
  tags: ["users", "user"],
});

// Apply caching middleware
app.use("/api/", apiCache.middleware());

// Invalidate cache on updates
app.put("/api/users/:id", async (req, res, next) => {
  // Update user logic
  const updatedUser = await userService.update(req.params.id, req.body);

  // Invalidate relevant cache
  await apiCache.invalidateByTag("users");
  await apiCache.invalidateByTag("user");

  res.json(updatedUser);
});
```

## API Design Interview Questions

### 1. "How would you design a scalable API for a social media platform?"

```javascript
// Answer: RESTful design with pagination, caching, rate limiting,
// GraphQL for complex queries, microservices architecture,
// proper error handling, versioning, and comprehensive documentation
```

### 2. "What's the difference between REST and GraphQL? When would you use each?"

```javascript
// Answer: REST is resource-based, good for standard CRUD operations,
// simpler to implement, better caching. GraphQL is query-based,
// good for complex data requirements, reduces over-fetching,
// mobile-friendly, single endpoint.
```

### 3. "How would you handle API versioning?"

```javascript
// Answer: Multiple strategies - URI versioning (/v1/, /v2/),
// header versioning (Accept header), query parameter versioning.
// Choose based on use case and maintain backward compatibility.
```

## Key Takeaways for FAANG

### API Design Principles

- **Consistency**: Follow RESTful conventions or GraphQL best practices
- **Scalability**: Design for growth with pagination, caching, and rate limiting
- **Security**: Implement authentication, authorization, and validation
- **Documentation**: Comprehensive API docs with OpenAPI/Swagger
- **Performance**: Optimize with caching, batching, and efficient queries

### Modern API Patterns

- **REST**: Standard CRUD operations, simple and reliable
- **GraphQL**: Complex queries, mobile optimization, flexible data fetching
- **Versioning**: Multiple strategies for backward compatibility
- **Caching**: Multi-level caching for performance
- **Rate Limiting**: Protect against abuse and ensure fair usage

### External Resources

- **REST API Design Guide**: https://restfulapi.net/
- **GraphQL Documentation**: https://graphql.org/
- **Apollo Server**: https://www.apollographql.com/docs/apollo-server/
- **OpenAPI Specification**: https://swagger.io/specification/
- **API Best Practices**: https://github.com/MicrosoftApiGuidelines/ApiGuidelines
