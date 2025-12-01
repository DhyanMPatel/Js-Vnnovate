# 🔧 Backend Integration Essentials

## MongoDB Drivers & ODMs

### Native MongoDB Driver

```javascript
const { MongoClient, ObjectId } = require("mongodb");

class MongoDBConnection {
  constructor(uri, options = {}) {
    this.uri = uri;
    this.options = {
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30000,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      heartbeatFrequencyMS: 10000,
      retryWrites: true,
      retryReads: true,
      ...options,
    };
    this.client = null;
    this.db = null;
  }

  async connect() {
    try {
      this.client = new MongoClient(this.uri, this.options);
      await this.client.connect();
      this.db = this.client.db();

      // Set up event listeners
      this.client.on("connectionPoolCreated", (event) => {
        console.log("Connection pool created");
      });

      this.client.on("connectionCreated", (event) => {
        console.log("New connection created");
      });

      this.client.on("connectionReady", (event) => {
        console.log("Connection ready");
      });

      this.client.on("connectionClosed", (event) => {
        console.log("Connection closed");
      });

      this.client.on("connectionPoolCleared", (event) => {
        console.log("Connection pool cleared");
      });

      console.log("Connected to MongoDB");
      return this.db;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log("Disconnected from MongoDB");
    }
  }

  getDatabase() {
    if (!this.db) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.db;
  }

  async ping() {
    try {
      await this.db.admin().ping();
      return { status: "healthy", timestamp: new Date() };
    } catch (error) {
      return {
        status: "unhealthy",
        error: error.message,
        timestamp: new Date(),
      };
    }
  }
}

// Usage
const mongoConnection = new MongoDBConnection(process.env.MONGODB_URI);

async function initializeApp() {
  try {
    await mongoConnection.connect();
    const db = mongoConnection.getDatabase();

    // Start your application
    console.log("Application started successfully");
  } catch (error) {
    console.error("Failed to initialize application:", error);
    process.exit(1);
  }
}

process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully...");
  await mongoConnection.disconnect();
  process.exit(0);
});
```

### Mongoose ODM

```javascript
const mongoose = require("mongoose");

// Schema definition with validation
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    profile: {
      bio: {
        type: String,
        maxlength: [500, "Bio cannot exceed 500 characters"],
      },
      avatar: {
        type: String,
        validate: {
          validator: function (v) {
            return !v || /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(v);
          },
          message: "Please enter a valid image URL",
        },
      },
      preferences: {
        theme: {
          type: String,
          enum: ["light", "dark"],
          default: "light",
        },
        notifications: {
          email: { type: Boolean, default: true },
          push: { type: Boolean, default: true },
          sms: { type: Boolean, default: false },
        },
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    lastLogin: Date,
    loginCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtuals
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual("isActive").get(function () {
  return this.status === "active";
});

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ status: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ "profile.preferences.notifications.email": 1 });

// Instance methods
userSchema.methods.updateLogin = function () {
  this.lastLogin = new Date();
  this.loginCount += 1;
  return this.save();
};

userSchema.methods.toSafeObject = function () {
  const user = this.toObject();
  delete user.__v;
  return user;
};

// Static methods
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.findActive = function () {
  return this.find({ status: "active" });
};

// Pre-save middleware
userSchema.pre("save", function (next) {
  if (this.isModified("email")) {
    this.email = this.email.toLowerCase();
  }
  next();
});

// Post-save middleware
userSchema.post("save", function (doc) {
  console.log(`User ${doc._id} saved successfully`);
});

const User = mongoose.model("User", userSchema);

// Connection with retry logic
async function connectWithRetry() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferMaxEntries: 0,
      bufferCommands: false,
    });

    console.log("Connected to MongoDB with Mongoose");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    console.log("Retrying in 5 seconds...");
    setTimeout(connectWithRetry, 5000);
  }
}

// Usage in service layer
class UserService {
  async createUser(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user.toSafeObject();
    } catch (error) {
      if (error.code === 11000) {
        throw new Error("Email already exists");
      }
      throw error;
    }
  }

  async getUserById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID");
    }

    const user = await User.findById(id);
    return user ? user.toSafeObject() : null;
  }

  async updateUser(id, updateData) {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.toSafeObject();
  }

  async getUserStats() {
    const stats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          activeUsers: {
            $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] },
          },
          averageLoginCount: { $avg: "$loginCount" },
        },
      },
    ]);

    return stats[0] || { totalUsers: 0, activeUsers: 0, averageLoginCount: 0 };
  }
}
```

## Advanced Data Access Patterns

### Repository Pattern for MongoDB

```javascript
class BaseRepository {
  constructor(collection, model) {
    this.collection = collection;
    this.model = model;
  }

  async create(data) {
    try {
      const document = new this.model(data);
      await document.save();
      return document.toObject();
    } catch (error) {
      if (error.code === 11000) {
        throw new Error("Duplicate key error");
      }
      throw error;
    }
  }

  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    const document = await this.model.findById(id);
    return document ? document.toObject() : null;
  }

  async findOne(filter = {}) {
    const document = await this.model.findOne(filter);
    return document ? document.toObject() : null;
  }

  async find(filter = {}, options = {}) {
    const {
      sort = { _id: -1 },
      limit = 50,
      skip = 0,
      projection = {},
    } = options;

    const documents = await this.model
      .find(filter)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .select(projection);

    return documents.map((doc) => doc.toObject());
  }

  async findWithPagination(filter = {}, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [documents, total] = await Promise.all([
      this.model.find(filter).skip(skip).limit(limit),
      this.model.countDocuments(filter),
    ]);

    return {
      data: documents.map((doc) => doc.toObject()),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  }

  async update(id, data) {
    const document = await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return document ? document.toObject() : null;
  }

  async updateOne(filter, data) {
    const document = await this.model.findOneAndUpdate(filter, data, {
      new: true,
      runValidators: true,
    });

    return document ? document.toObject() : null;
  }

  async updateMany(filter, data) {
    const result = await this.model.updateMany(filter, data);
    return result;
  }

  async delete(id) {
    const result = await this.model.findByIdAndDelete(id);
    return result ? result.toObject() : null;
  }

  async deleteMany(filter = {}) {
    const result = await this.model.deleteMany(filter);
    return result;
  }

  async count(filter = {}) {
    return await this.model.countDocuments(filter);
  }

  async aggregate(pipeline) {
    return await this.model.aggregate(pipeline);
  }
}

// Specific repository implementation
class UserRepository extends BaseRepository {
  constructor() {
    super("users", User);
  }

  async findByEmail(email) {
    return await this.findOne({ email: email.toLowerCase() });
  }

  async findActiveUsers() {
    return await this.find({ status: "active" });
  }

  async updateLastLogin(id) {
    return await this.update(id, {
      lastLogin: new Date(),
      $inc: { loginCount: 1 },
    });
  }

  async getUserWithOrders(userId) {
    const pipeline = [
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "userId",
          as: "orders",
        },
      },
      {
        $project: {
          email: 1,
          firstName: 1,
          lastName: 1,
          status: 1,
          "orders._id": 1,
          "orders.total": 1,
          "orders.status": 1,
          "orders.createdAt": 1,
        },
      },
    ];

    const results = await this.aggregate(pipeline);
    return results[0] || null;
  }

  async getUserStats() {
    const pipeline = [
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          activeUsers: {
            $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] },
          },
          newUsersThisMonth: {
            $sum: {
              $cond: [
                {
                  $gte: [
                    "$createdAt",
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      1
                    ),
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ];

    const results = await this.aggregate(pipeline);
    return (
      results[0] || {
        totalUsers: 0,
        activeUsers: 0,
        newUsersThisMonth: 0,
      }
    );
  }
}
```

### Service Layer Pattern

```javascript
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();
    this.cacheService = new CacheService();
  }

  async createUser(userData) {
    // Validate input
    this.validateUserData(userData);

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Create user
    const user = await this.userRepository.createUser(userData);

    // Send welcome email
    try {
      await this.emailService.sendWelcomeEmail(user.email, user.firstName);
    } catch (error) {
      console.error("Failed to send welcome email:", error);
      // Don't fail the user creation if email fails
    }

    // Cache user data
    await this.cacheService.set(`user:${user._id}`, user, 3600);

    return user;
  }

  async getUserById(id) {
    // Try cache first
    const cachedUser = await this.cacheService.get(`user:${id}`);
    if (cachedUser) {
      return cachedUser;
    }

    // Get from database
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }

    // Cache result
    await this.cacheService.set(`user:${id}`, user, 3600);

    return user;
  }

  async updateUser(id, updateData) {
    // Validate update data
    this.validateUpdateData(updateData);

    // Update user
    const user = await this.userRepository.updateUser(id, updateData);
    if (!user) {
      throw new Error("User not found");
    }

    // Update cache
    await this.cacheService.set(`user:${id}`, user, 3600);

    return user;
  }

  async deleteUser(id) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }

    // Delete from database
    await this.userRepository.delete(id);

    // Remove from cache
    await this.cacheService.del(`user:${id}`);

    return user;
  }

  async getUserWithOrders(userId) {
    const userWithOrders = await this.userRepository.getUserWithOrders(userId);
    if (!userWithOrders) {
      throw new Error("User not found");
    }

    return userWithOrders;
  }

  async searchUsers(query, filters = {}) {
    const searchFilter = {
      $and: [
        {
          $or: [
            { firstName: { $regex: query, $options: "i" } },
            { lastName: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
          ],
        },
        filters,
      ],
    };

    return await this.userRepository.findWithPagination(searchFilter);
  }

  validateUserData(userData) {
    if (!userData.email || !userData.firstName || !userData.lastName) {
      throw new Error("Email, first name, and last name are required");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      throw new Error("Invalid email format");
    }
  }

  validateUpdateData(updateData) {
    if (
      updateData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updateData.email)
    ) {
      throw new Error("Invalid email format");
    }
  }
}
```

## Database Testing for NoSQL

### Test Database Setup

```javascript
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

class TestDatabase {
  constructor() {
    this.mongoServer = null;
    this.connection = null;
  }

  async setup() {
    this.mongoServer = await MongoMemoryServer.create();
    const mongoUri = this.mongoServer.getUri();

    await mongoose.connect(mongoUri);

    // Run migrations/seeds if needed
    await this.seedData();
  }

  async teardown() {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
    }

    if (this.mongoServer) {
      await this.mongoServer.stop();
    }
  }

  async seedData() {
    const User = mongoose.model("User");

    await User.create([
      {
        email: "test1@example.com",
        firstName: "Test",
        lastName: "User1",
        status: "active",
      },
      {
        email: "test2@example.com",
        firstName: "Test",
        lastName: "User2",
        status: "active",
      },
    ]);
  }

  async clearDatabase() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  }
}

// Test example
describe("UserService", () => {
  let testDb;
  let userService;

  beforeAll(async () => {
    testDb = new TestDatabase();
    await testDb.setup();
    userService = new UserService();
  });

  afterAll(async () => {
    await testDb.teardown();
  });

  beforeEach(async () => {
    await testDb.clearDatabase();
  });

  test("should create user successfully", async () => {
    const userData = {
      email: "newuser@example.com",
      firstName: "New",
      lastName: "User",
    };

    const user = await userService.createUser(userData);

    expect(user.email).toBe(userData.email);
    expect(user.firstName).toBe(userData.firstName);
    expect(user.status).toBe("active");
  });

  test("should throw error for duplicate email", async () => {
    const userData = {
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
    };

    await userService.createUser(userData);

    await expect(userService.createUser(userData)).rejects.toThrow(
      "User with this email already exists"
    );
  });
});
```

### Mock MongoDB for Unit Tests

```javascript
const sinon = require("sinon");

class MockUserRepository {
  constructor() {
    this.users = new Map();
    this.nextId = 1;
  }

  async create(userData) {
    const id = this.nextId++;
    const user = { _id: id.toString(), ...userData };
    this.users.set(id, user);
    return user;
  }

  async findByEmail(email) {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async getUserById(id) {
    return this.users.get(parseInt(id)) || null;
  }

  async update(id, data) {
    const user = this.users.get(parseInt(id));
    if (user) {
      Object.assign(user, data);
      return user;
    }
    return null;
  }

  async delete(id) {
    const user = this.users.get(parseInt(id));
    if (user) {
      this.users.delete(parseInt(id));
      return user;
    }
    return null;
  }
}

// Test with mocks
describe("UserService (Unit Tests)", () => {
  let userService;
  let userRepository;
  let emailService;
  let cacheService;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    emailService = { sendWelcomeEmail: sinon.stub().resolves() };
    cacheService = {
      get: sinon.stub().resolves(null),
      set: sinon.stub().resolves(),
      del: sinon.stub().resolves(),
    };

    userService = new UserService();
    userService.userRepository = userRepository;
    userService.emailService = emailService;
    userService.cacheService = cacheService;
  });

  test("should create user and send welcome email", async () => {
    const userData = {
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
    };

    const user = await userService.createUser(userData);

    expect(user.email).toBe(userData.email);
    expect(emailService.sendWelcomeEmail.calledOnce).toBe(true);
    expect(cacheService.set.calledOnce).toBe(true);
  });
});
```

## Performance Monitoring & Observability

### MongoDB Performance Monitoring

```javascript
class MongoDBMonitor {
  constructor(db) {
    this.db = db;
    this.metrics = {
      queryCount: 0,
      totalQueryTime: 0,
      slowQueries: [],
      errorCount: 0,
    };
  }

  wrapCollection(collection) {
    const originalMethods = {};

    // Wrap find method
    originalMethods.find = collection.find;
    collection.find = (...args) => {
      return this.monitorQuery("find", args, () =>
        originalMethods.find.apply(collection, args)
      );
    };

    // Wrap aggregate method
    originalMethods.aggregate = collection.aggregate;
    collection.aggregate = (...args) => {
      return this.monitorQuery("aggregate", args, () =>
        originalMethods.aggregate.apply(collection, args)
      );
    };

    // Wrap insertOne method
    originalMethods.insertOne = collection.insertOne;
    collection.insertOne = (...args) => {
      return this.monitorQuery("insertOne", args, () =>
        originalMethods.insertOne.apply(collection, args)
      );
    };

    return collection;
  }

  async monitorQuery(operation, args, queryFunction) {
    const start = Date.now();

    try {
      const result = await queryFunction();
      const duration = Date.now() - start;

      this.recordQuery(operation, duration, args);

      return result;
    } catch (error) {
      const duration = Date.now() - start;
      this.recordError(operation, duration, args, error);
      throw error;
    }
  }

  recordQuery(operation, duration, args) {
    this.metrics.queryCount++;
    this.metrics.totalQueryTime += duration;

    if (duration > 1000) {
      this.metrics.slowQueries.push({
        operation,
        duration,
        args: this.sanitizeArgs(args),
        timestamp: new Date(),
      });
    }
  }

  recordError(operation, duration, args, error) {
    this.metrics.errorCount++;
    console.error(`MongoDB ${operation} error:`, {
      error: error.message,
      duration,
      args: this.sanitizeArgs(args),
    });
  }

  sanitizeArgs(args) {
    return args.map((arg) => {
      if (typeof arg === "object" && arg !== null) {
        // Remove sensitive data
        const sanitized = { ...arg };
        delete sanitized.password;
        delete sanitized.token;
        return sanitized;
      }
      return arg;
    });
  }

  getMetrics() {
    return {
      ...this.metrics,
      averageQueryTime:
        this.metrics.queryCount > 0
          ? this.metrics.totalQueryTime / this.metrics.queryCount
          : 0,
    };
  }

  async getDatabaseStats() {
    try {
      const stats = await this.db.stats();
      return {
        collections: stats.collections,
        dataSize: stats.dataSize,
        storageSize: stats.storageSize,
        indexes: stats.indexes,
        indexSize: stats.indexSize,
      };
    } catch (error) {
      console.error("Failed to get database stats:", error);
      return null;
    }
  }

  async getCollectionStats(collectionName) {
    try {
      const stats = await this.db.collection(collectionName).stats();
      return {
        count: stats.count,
        size: stats.size,
        avgObjSize: stats.avgObjSize,
        indexSizes: stats.indexSizes,
      };
    } catch (error) {
      console.error(
        `Failed to get collection stats for ${collectionName}:`,
        error
      );
      return null;
    }
  }
}

// Usage
const monitor = new MongoDBMonitor(db);
const usersCollection = monitor.wrapCollection(db.collection("users"));
```

### Health Check Endpoint

```javascript
class HealthCheckService {
  constructor(mongoConnection, redisConnection) {
    this.mongoConnection = mongoConnection;
    this.redisConnection = redisConnection;
  }

  async checkHealth() {
    const health = {
      status: "healthy",
      timestamp: new Date(),
      services: {},
    };

    // Check MongoDB
    try {
      const mongoHealth = await this.mongoConnection.ping();
      health.services.mongodb = mongoHealth;
    } catch (error) {
      health.services.mongodb = {
        status: "unhealthy",
        error: error.message,
      };
      health.status = "degraded";
    }

    // Check Redis
    try {
      await this.redisConnection.ping();
      health.services.redis = { status: "healthy" };
    } catch (error) {
      health.services.redis = {
        status: "unhealthy",
        error: error.message,
      };
      health.status = "degraded";
    }

    return health;
  }

  async checkDatabaseHealth() {
    const checks = {
      connection: await this.mongoConnection.ping(),
      collections: await this.checkCollections(),
      indexes: await this.checkIndexes(),
      replication: await this.checkReplication(),
    };

    const overallStatus = Object.values(checks).every(
      (check) => check.status === "healthy"
    )
      ? "healthy"
      : "unhealthy";

    return {
      status: overallStatus,
      timestamp: new Date(),
      checks,
    };
  }

  async checkCollections() {
    try {
      const db = this.mongoConnection.getDatabase();
      const collections = await db.listCollections().toArray();

      const results = [];
      for (const collection of collections) {
        const stats = await db.collection(collection.name).stats();
        results.push({
          name: collection.name,
          count: stats.count,
          size: stats.size,
          status: "healthy",
        });
      }

      return { status: "healthy", collections: results };
    } catch (error) {
      return { status: "unhealthy", error: error.message };
    }
  }

  async checkIndexes() {
    try {
      const db = this.mongoConnection.getDatabase();
      const collections = await db.listCollections().toArray();

      const results = [];
      for (const collection of collections) {
        const indexes = await db.collection(collection.name).indexInformation();
        results.push({
          collection: collection.name,
          indexCount: Object.keys(indexes).length,
          status: "healthy",
        });
      }

      return { status: "healthy", indexes: results };
    } catch (error) {
      return { status: "unhealthy", error: error.message };
    }
  }

  async checkReplication() {
    try {
      const db = this.mongoConnection.getDatabase();
      const status = await db.admin().replSetGetStatus();

      return {
        status: "healthy",
        members: status.members.map((member) => ({
          name: member.name,
          health: member.health,
          state: member.stateStr,
        })),
      };
    } catch (error) {
      // Not a replica set
      return { status: "healthy", message: "Not a replica set" };
    }
  }
}
```

## Security Best Practices

### Input Validation & Sanitization

```javascript
const Joi = require('joi');
const mongoSanitize = require('express-mongo-sanitize');

// Validation schemas
const userSchemas = {
  create: Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    profile: Joi.object({
      bio: Joi.string().max(500),
      avatar: Joi.string().uri(),
      preferences: Joi.object({
        theme: Joi.string().valid('light', 'dark'),
        notifications: Joi.object({
          email: Joi.boolean(),
          push: Joi.boolean(),
          sms: Joi.boolean()
        })
      })
  }).unknown(false),

  update: Joi.object({
    firstName: Joi.string().min(1).max(50),
    lastName: Joi.string().min(1).max(50),
    profile: Joi.object({
      bio: Joi.string().max(500),
      avatar: Joi.string().uri(),
      preferences: Joi.object({
        theme: Joi.string().valid('light', 'dark'),
        notifications: Joi.object({
          email: Joi.boolean(),
          push: Joi.boolean(),
          sms: Joi.boolean()
        })
      })
    }).unknown(false)
  }).unknown(false)
};

// Middleware for validation
function validateRequest(schema) {
  return (req, res, next) => {
    // Sanitize request body against NoSQL injection
    mongoSanitize()(req, res, () => {});

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }

    req.body = value;
    next();
  };
}

// Usage in Express
app.post('/users', validateRequest(userSchemas.create), async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### Data Encryption & Security

```javascript
const crypto = require("crypto");

class MongoSecurityService {
  constructor(secretKey) {
    this.algorithm = "aes-256-gcm";
    this.secretKey = crypto.scryptSync(secretKey, "salt", 32);
  }

  encryptSensitiveData(data) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(this.algorithm, this.secretKey);

    let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag();

    return {
      encrypted,
      iv: iv.toString("hex"),
      authTag: authTag.toString("hex"),
    };
  }

  decryptSensitiveData(encryptedData) {
    const decipher = crypto.createDecipher(this.algorithm, this.secretKey);
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, "hex"));

    let decrypted = decipher.update(encryptedData.encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return JSON.parse(decrypted);
  }

  // Middleware to encrypt sensitive fields before saving
  encryptSensitiveFields(schema) {
    schema.pre("save", function (next) {
      const sensitiveFields = ["ssn", "creditCard", "bankAccount"];

      sensitiveFields.forEach((field) => {
        if (this[field]) {
          this[`${field}_encrypted`] = this.encryptSensitiveData(this[field]);
          delete this[field];
        }
      });

      next();
    });

    // Add virtual fields for decrypted data
    sensitiveFields.forEach((field) => {
      schema.virtual(field).get(function () {
        if (this[`${field}_encrypted`]) {
          return this.decryptSensitiveData(this[`${field}_encrypted`]);
        }
        return null;
      });
    });
  }
}

// Rate limiting for database operations
const rateLimit = require("express-rate-limit");

const dbRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many database requests, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip + ":" + (req.user?.id || "anonymous");
  },
});

// Apply to database-intensive routes
app.use("/api/users/search", dbRateLimit);
app.use("/api/reports", dbRateLimit);
```

This completes the essential backend integration topics for NoSQL databases, covering everything from drivers and ODMs to testing, monitoring, and security.

[← Practical Examples](./06_practical_examples.md) | [Back to Main Index](./intro.md)
