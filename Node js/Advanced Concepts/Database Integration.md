# Database Integration in Node.js

## Database Fundamentals for FAANG

### Why Database Skills Matter

- **Data Persistence**: Store and retrieve application data efficiently
- **Scalability**: Handle growing data volumes and user loads
- **Consistency**: Ensure data integrity across operations
- **Performance**: Optimize queries and data access patterns
- **Reliability**: Handle failures and maintain data availability

## MongoDB with Mongoose ODM

### MongoDB Connection and Configuration

```javascript
import mongoose from "mongoose";

class DatabaseManager {
  constructor() {
    this.connection = null;
    this.isConnected = false;
  }

  async connect(uri, options = {}) {
    try {
      const defaultOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        bufferCommands: false, // Disable mongoose buffering
        bufferMaxEntries: 0, // Disable mongoose buffering

        // Replica set configuration for production
        replicaSet: process.env.MONGO_REPLICA_SET,
        readPreference: "secondaryPreferred",
        writeConcern: {
          w: "majority",
          j: true,
        },
      };

      this.connection = await mongoose.connect(uri, {
        ...defaultOptions,
        ...options,
      });
      this.isConnected = true;

      console.log("MongoDB connected successfully");

      // Handle connection events
      mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
        this.isConnected = false;
      });

      mongoose.connection.on("disconnected", () => {
        console.warn("MongoDB disconnected");
        this.isConnected = false;
      });

      mongoose.connection.on("reconnected", () => {
        console.log("MongoDB reconnected");
        this.isConnected = true;
      });

      return this.connection;
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log("MongoDB disconnected");
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
      throw error;
    }
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      name: mongoose.connection.name,
    };
  }
}

// Singleton instance
const dbManager = new DatabaseManager();
export default dbManager;
```

### Mongoose Schema Design with Best Practices

```javascript
import mongoose, { Schema } from "mongoose";

// User schema with comprehensive validation
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ],
      index: true, // Add index for faster queries
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false, // Don't include password in queries by default
    },

    profile: {
      firstName: { type: String, trim: true, maxlength: 50 },
      lastName: { type: String, trim: true, maxlength: 50 },
      avatar: { type: String },
      bio: { type: String, maxlength: 500 },
      dateOfBirth: { type: Date },
      location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], default: [0, 0] }, // [longitude, latitude]
      },
    },

    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
      index: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },

    preferences: {
      theme: { type: String, enum: ["light", "dark"], default: "light" },
      language: { type: String, default: "en" },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
      },
    },

    security: {
      lastLogin: { type: Date },
      loginAttempts: { type: Number, default: 0 },
      lockUntil: { type: Date },
      passwordResetToken: { type: String },
      passwordResetExpires: { type: Date },
      twoFactorEnabled: { type: Boolean, default: false },
      twoFactorSecret: { type: String },
    },

    metadata: {
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      lastActiveAt: { type: Date },
      version: { type: Number, default: 1 },
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
    toJSON: { virtuals: true }, // Include virtuals in JSON output
    toObject: { virtuals: true },
  }
);

// Compound indexes for better query performance
userSchema.index({ "profile.location": "2dsphere" }); // Geospatial index
userSchema.index({ username: 1, status: 1 }); // Compound index
userSchema.index({ email: 1, status: 1 });
userSchema.index({ role: 1, "metadata.createdAt": -1 });

// Virtual fields
userSchema.virtual("fullName").get(function () {
  return `${this.profile.firstName} ${this.profile.lastName}`.trim();
});

userSchema.virtual("isLocked").get(function () {
  return !!(this.security.lockUntil && this.security.lockUntil > Date.now());
});

// Pre-save middleware
userSchema.pre("save", async function (next) {
  // Hash password if modified
  if (this.isModified("password")) {
    const bcrypt = await import("bcrypt");
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  // Update last active timestamp
  this.metadata.lastActiveAt = new Date();
  this.metadata.updatedAt = new Date();

  next();
});

// Post-save middleware
userSchema.post("save", function (doc) {
  console.log(`User ${doc.username} saved successfully`);
});

// Instance methods
userSchema.methods.comparePassword = async function (candidatePassword) {
  const bcrypt = await import("bcrypt");
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.incrementLoginAttempts = async function () {
  // If we have a previous lock that has expired, restart at 1
  if (this.security.lockUntil && this.security.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { "security.lockUntil": 1 },
      $set: { "security.loginAttempts": 1 },
    });
  }

  const updates = { $inc: { "security.loginAttempts": 1 } };

  // Lock account after 5 failed attempts for 2 hours
  if (this.security.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { "security.lockUntil": Date.now() + 2 * 60 * 60 * 1000 };
  }

  return this.updateOne(updates);
};

// Static methods
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email }).select("+password");
};

userSchema.statics.findActiveUsers = function (limit = 10) {
  return this.find({ status: "active" })
    .sort({ "metadata.lastActiveAt": -1 })
    .limit(limit);
};

// Aggregation helpers
userSchema.statics.getUserStats = function () {
  return this.aggregate([
    {
      $group: {
        _id: "$role",
        count: { $sum: 1 },
        avgAge: { $avg: { $subtract: [new Date(), "$profile.dateOfBirth"] } },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);
};

export const User = mongoose.model("User", userSchema);
```

### Advanced Query Patterns and Optimization

```javascript
// Repository pattern for database operations
class UserRepository {
  constructor() {
    this.model = User;
  }

  // Find with pagination and filtering
  async findUsers(options = {}) {
    const {
      page = 1,
      limit = 10,
      sort = { "metadata.createdAt": -1 },
      filter = {},
      fields = null,
    } = options;

    const skip = (page - 1) * limit;

    // Build query
    let query = this.model.find(filter);

    // Select specific fields
    if (fields) {
      query = query.select(fields);
    }

    // Apply pagination
    query = query.skip(skip).limit(limit).sort(sort);

    // Execute queries in parallel
    const [users, total] = await Promise.all([
      query.exec(),
      this.model.countDocuments(filter),
    ]);

    return {
      users,
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

  // Search with text indexing
  async searchUsers(searchTerm, options = {}) {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    // Create text index if not exists
    await this.model.createIndexes([
      {
        username: "text",
        "profile.firstName": "text",
        "profile.lastName": "text",
        "profile.bio": "text",
      },
    ]);

    const query = this.model
      .find(
        { $text: { $search: searchTerm } },
        { score: { $meta: "textScore" } }
      )
      .sort({ score: { $meta: "textScore" } });

    const [users, total] = await Promise.all([
      query.skip(skip).limit(limit).exec(),
      this.model.countDocuments({ $text: { $search: searchTerm } }),
    ]);

    return { users, total };
  }

  // Geospatial query
  async findNearbyUsers(longitude, latitude, maxDistance = 10000) {
    return this.model
      .find({
        "profile.location": {
          $near: {
            $geometry: { type: "Point", coordinates: [longitude, latitude] },
            $maxDistance: maxDistance, // meters
          },
        },
        status: "active",
      })
      .limit(50);
  }

  // Aggregation pipeline for complex analytics
  async getUserAnalytics(
    dateRange = {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      end: new Date(),
    }
  ) {
    return this.model.aggregate([
      // Match users within date range
      {
        $match: {
          "metadata.createdAt": {
            $gte: dateRange.start,
            $lte: dateRange.end,
          },
        },
      },

      // Group by date and role
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$metadata.createdAt",
              },
            },
            role: "$role",
          },
          count: { $sum: 1 },
          uniqueEmails: { $addToSet: "$email" },
        },
      },

      // Calculate unique email count
      {
        $addFields: {
          uniqueEmailCount: { $size: "$uniqueEmails" },
        },
      },

      // Remove emails array and sort
      {
        $project: {
          uniqueEmails: 0,
        },
      },

      {
        $sort: { "_id.date": 1, "_id.role": 1 },
      },

      // Group by date for summary
      {
        $group: {
          _id: "$_id.date",
          roles: {
            $push: {
              role: "$_id.role",
              count: "$count",
              uniqueEmailCount: "$uniqueEmailCount",
            },
          },
          totalUsers: { $sum: "$count" },
        },
      },
    ]);
  }

  // Bulk operations for performance
  async bulkUpdateUsers(updates) {
    const bulkOps = updates.map((update) => ({
      updateOne: {
        filter: { _id: update.id },
        update: { $set: update.data },
        upsert: false,
      },
    }));

    return this.model.bulkWrite(bulkOps);
  }

  // Transaction support
  async transferUserRole(fromUserId, toUserId, newRole) {
    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        // Update both users in a single transaction
        await this.model.findByIdAndUpdate(
          fromUserId,
          { role: "user" },
          { session }
        );

        await this.model.findByIdAndUpdate(
          toUserId,
          { role: newRole },
          { session }
        );
      });
    } finally {
      await session.endSession();
    }
  }
}
```

## SQL Databases with Sequelize/Knex

### PostgreSQL with Sequelize ORM

```javascript
import { Sequelize, DataTypes, Model, Op } from "sequelize";

// Database connection configuration
class SequelizeManager {
  constructor() {
    this.sequelize = null;
    this.isConnected = false;
  }

  async connect(config) {
    try {
      const defaultConfig = {
        dialect: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,

        // Connection pool configuration
        pool: {
          max: 20,
          min: 5,
          acquire: 30000,
          idle: 10000,
        },

        // Logging
        logging: process.env.NODE_ENV === "development" ? console.log : false,

        // SSL for production
        dialectOptions:
          process.env.NODE_ENV === "production"
            ? {
                ssl: {
                  require: true,
                  rejectUnauthorized: false,
                },
              }
            : {},
      };

      this.sequelize = new Sequelize({ ...defaultConfig, ...config });

      // Test connection
      await this.sequelize.authenticate();
      this.isConnected = true;

      console.log("PostgreSQL connected successfully");

      return this.sequelize;
    } catch (error) {
      console.error("Failed to connect to PostgreSQL:", error);
      throw error;
    }
  }

  async disconnect() {
    if (this.sequelize) {
      await this.sequelize.close();
      this.isConnected = false;
      console.log("PostgreSQL disconnected");
    }
  }
}

// User model definition
class User extends Model {
  // Instance methods
  async getFullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  async updateLastLogin() {
    this.lastLoginAt = new Date();
    await this.save();
  }

  // Class methods
  static async findActiveUsers(limit = 10) {
    return this.findAll({
      where: { isActive: true },
      limit,
      order: [["createdAt", "DESC"]],
    });
  }

  static async findByEmail(email) {
    return this.findOne({ where: { email } });
  }

  static async getUsersWithPosts() {
    return this.findAll({
      include: [
        {
          model: Post,
          as: "posts",
          include: [
            {
              model: Comment,
              as: "comments",
            },
          ],
        },
      ],
    });
  }
}

// Initialize User model
function initializeUserModel(sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 50],
          is: /^[a-zA-Z0-9_]+$/,
        },
      },

      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [8, 255],
        },
      },

      firstName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      lastName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      role: {
        type: DataTypes.ENUM("user", "admin", "moderator"),
        defaultValue: "user",
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      loginAttempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      lockedUntil: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      metadata: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      paranoid: true, // Soft deletes
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
        {
          unique: true,
          fields: ["username"],
        },
        {
          fields: ["role", "isActive"],
        },
        {
          fields: ["createdAt"],
        },
      ],
    }
  );

  // Hooks
  User.beforeCreate(async (user) => {
    if (user.password) {
      const bcrypt = await import("bcrypt");
      const saltRounds = 12;
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed("password")) {
      const bcrypt = await import("bcrypt");
      const saltRounds = 12;
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
  });

  return User;
}
```

### Advanced Query Patterns with Sequelize

```javascript
// Repository pattern for Sequelize
class UserRepository {
  constructor(UserModel) {
    this.User = UserModel;
  }

  // Complex find with conditions and includes
  async findUsersWithFilters(options = {}) {
    const {
      page = 1,
      limit = 10,
      role,
      isActive,
      search,
      dateRange,
      sortBy = "createdAt",
      sortOrder = "DESC",
    } = options;

    const where = {};
    const include = [];

    // Build where conditions
    if (role) where.role = role;
    if (isActive !== undefined) where.isActive = isActive;

    // Search functionality
    if (search) {
      where[Op.or] = [
        { username: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
      ];
    }

    // Date range filtering
    if (dateRange) {
      where.createdAt = {};
      if (dateRange.start) where.createdAt[Op.gte] = dateRange.start;
      if (dateRange.end) where.createdAt[Op.lte] = dateRange.end;
    }

    // Pagination
    const offset = (page - 1) * limit;

    // Execute query with count
    const { count, rows } = await this.User.findAndCountAll({
      where,
      include,
      limit,
      offset,
      order: [[sortBy, sortOrder]],
      distinct: true,
    });

    return {
      users: rows,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit),
      },
    };
  }

  // Raw SQL queries for complex operations
  async getUserStatistics() {
    const [results] = await this.User.sequelize.query(
      `
      SELECT 
        role,
        COUNT(*) as count,
        AVG(EXTRACT(EPOCH FROM (NOW() - created_at))/86400) as avg_days_since_creation,
        COUNT(CASE WHEN last_login_at > NOW() - INTERVAL '30 days' THEN 1 END) as active_last_30_days
      FROM users
      WHERE deleted_at IS NULL
      GROUP BY role
      ORDER BY count DESC
    `,
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    return results;
  }

  // Transaction example
  async createUserWithProfile(userData, profileData) {
    const transaction = await this.User.sequelize.transaction();

    try {
      // Create user
      const user = await this.User.create(userData, { transaction });

      // Create associated profile
      const profile = await Profile.create(
        {
          ...profileData,
          userId: user.id,
        },
        { transaction }
      );

      await transaction.commit();

      return { user, profile };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  // Bulk operations
  async bulkUpdateStatus(userIds, status) {
    return this.User.update(
      { isActive: status },
      {
        where: {
          id: { [Op.in]: userIds },
        },
      }
    );
  }

  // Aggregation with subqueries
  async getUsersWithPostCounts() {
    return this.User.findAll({
      attributes: [
        "id",
        "username",
        "email",
        [
          this.User.sequelize.literal(`(
            SELECT COUNT(*)
            FROM posts
            WHERE posts.user_id = User.id
            AND posts.deleted_at IS NULL
          )`),
          "postCount",
        ],
      ],
      include: [
        {
          model: Post,
          as: "posts",
          attributes: ["id", "title"],
          limit: 5,
        },
      ],
      order: [[this.User.sequelize.literal("postCount"), "DESC"]],
    });
  }
}
```

## Database Connection Management

### Connection Pool Best Practices

```javascript
// Universal connection pool manager
class ConnectionPoolManager {
  constructor() {
    this.pools = new Map();
    this.metrics = {
      connections: new Map(),
      queries: new Map(),
      errors: new Map(),
    };
  }

  // Create MongoDB connection pool
  createMongoPool(name, config) {
    const pool = {
      name,
      type: "mongodb",
      config,
      connections: [],
      activeConnections: 0,
      maxConnections: config.maxPoolSize || 10,
      waitingQueue: [],

      async acquire() {
        return new Promise((resolve, reject) => {
          // Check for available connection
          if (this.activeConnections < this.maxConnections) {
            this.activeConnections++;
            this.createConnection().then(resolve).catch(reject);
          } else {
            // Add to waiting queue
            this.waitingQueue.push({ resolve, reject });
          }
        });
      },

      async release(connection) {
        this.activeConnections--;

        // Process waiting queue
        if (this.waitingQueue.length > 0) {
          const { resolve } = this.waitingQueue.shift();
          this.activeConnections++;
          resolve(connection);
        } else {
          // Close connection
          await connection.close();
        }
      },

      async createConnection() {
        // Implement MongoDB connection creation
        const { MongoClient } = await import("mongodb");
        return MongoClient.connect(this.config.uri);
      },
    };

    this.pools.set(name, pool);
    return pool;
  }

  // Create SQL connection pool
  createSQLPool(name, config) {
    const pool = {
      name,
      type: "sql",
      config,
      pool: null,

      async initialize() {
        const { Pool } = await import("pg");
        this.pool = new Pool(config);

        // Pool event listeners
        this.pool.on("connect", (client) => {
          this.recordConnection("connect");
        });

        this.pool.on("error", (err, client) => {
          this.recordError("pool_error", err);
        });
      },

      async acquire() {
        if (!this.pool) await this.initialize();
        return this.pool.connect();
      },

      async release(client) {
        if (client) client.release();
      },

      async query(text, params) {
        const client = await this.acquire();
        try {
          this.recordQuery("query", { text, params });
          return await client.query(text, params);
        } finally {
          await this.release(client);
        }
      },

      async transaction(callback) {
        const client = await this.acquire();
        try {
          await client.query("BEGIN");
          const result = await callback(client);
          await client.query("COMMIT");
          return result;
        } catch (error) {
          await client.query("ROLLBACK");
          throw error;
        } finally {
          await this.release(client);
        }
      },
    };

    this.pools.set(name, pool);
    return pool;
  }

  recordConnection(event) {
    // Record connection metrics
  }

  recordQuery(type, data) {
    // Record query metrics
  }

  recordError(type, error) {
    // Record error metrics
  }

  getPoolMetrics(name) {
    const pool = this.pools.get(name);
    if (!pool) return null;

    return {
      name: pool.name,
      type: pool.type,
      activeConnections: pool.activeConnections || 0,
      maxConnections: pool.maxConnections || pool.pool?.options?.max || 0,
      waitingQueue: pool.waitingQueue?.length || 0,
    };
  }
}
```

## Database Migration and Seeding

### Database Migration System

```javascript
// Migration manager
class MigrationManager {
  constructor(dbConnection) {
    this.db = dbConnection;
    this.migrations = new Map();
  }

  // Define migration
  defineMigration(name, up, down) {
    this.migrations.set(name, { name, up, down });
  }

  // Run migrations
  async runMigrations() {
    // Create migrations table if not exists
    await this.createMigrationsTable();

    // Get executed migrations
    const executed = await this.getExecutedMigrations();

    // Run pending migrations
    for (const [name, migration] of this.migrations) {
      if (!executed.includes(name)) {
        console.log(`Running migration: ${name}`);
        await migration.up(this.db);
        await this.recordMigration(name);
        console.log(`Migration completed: ${name}`);
      }
    }
  }

  // Rollback migration
  async rollbackMigration(name) {
    const migration = this.migrations.get(name);
    if (!migration) {
      throw new Error(`Migration ${name} not found`);
    }

    console.log(`Rolling back migration: ${name}`);
    await migration.down(this.db);
    await this.removeMigrationRecord(name);
    console.log(`Rollback completed: ${name}`);
  }

  async createMigrationsTable() {
    if (this.db.constructor.name === "MongoClient") {
      // MongoDB
      const collection = this.db.collection("migrations");
      await collection.createIndex({ name: 1 }, { unique: true });
    } else {
      // SQL
      await this.db.query(`
        CREATE TABLE IF NOT EXISTS migrations (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    }
  }

  async getExecutedMigrations() {
    if (this.db.constructor.name === "MongoClient") {
      const docs = await this.db.collection("migrations").find({}).toArray();
      return docs.map((doc) => doc.name);
    } else {
      const result = await this.db.query("SELECT name FROM migrations");
      return result.rows.map((row) => row.name);
    }
  }

  async recordMigration(name) {
    if (this.db.constructor.name === "MongoClient") {
      await this.db.collection("migrations").insertOne({ name });
    } else {
      await this.db.query("INSERT INTO migrations (name) VALUES ($1)", [name]);
    }
  }

  async removeMigrationRecord(name) {
    if (this.db.constructor.name === "MongoClient") {
      await this.db.collection("migrations").deleteOne({ name });
    } else {
      await this.db.query("DELETE FROM migrations WHERE name = $1", [name]);
    }
  }
}

// Example migrations
const migrationManager = new MigrationManager(dbConnection);

// User table migration
migrationManager.defineMigration(
  "create_users_table",
  async (db) => {
    if (db.constructor.name === "MongoClient") {
      await db.createCollection("users");
      await db.collection("users").createIndex({ email: 1 }, { unique: true });
      await db
        .collection("users")
        .createIndex({ username: 1 }, { unique: true });
    } else {
      await db.query(`
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    }
  },
  async (db) => {
    if (db.constructor.name === "MongoClient") {
      await db.collection("users").drop();
    } else {
      await db.query("DROP TABLE IF EXISTS users");
    }
  }
);
```

## Database Testing and Mocking

### Database Testing Utilities

```javascript
// Test database setup
import { MongoMemoryServer } from "mongodb-memory-server";
import { Sequelize } from "sequelize";

class TestDatabaseManager {
  constructor() {
    this.mongoServer = null;
    this.sequelize = null;
  }

  async setupMongoTestDB() {
    this.mongoServer = await MongoMemoryServer.create();
    const uri = this.mongoServer.getUri();

    const { MongoClient } = await import("mongodb");
    const client = new MongoClient(uri);
    await client.connect();

    return client;
  }

  async setupSQLTestDB() {
    this.sequelize = new Sequelize("sqlite::memory:", {
      logging: false,
    });

    // Sync all models
    await this.sequelize.sync({ force: true });

    return this.sequelize;
  }

  async cleanup() {
    if (this.mongoServer) {
      await this.mongoServer.stop();
    }
    if (this.sequelize) {
      await this.sequelize.close();
    }
  }
}

// Mock database for unit tests
class MockDatabase {
  constructor() {
    this.data = new Map();
    this.collections = new Map();
  }

  collection(name) {
    if (!this.collections.has(name)) {
      this.collections.set(name, new MockCollection());
    }
    return this.collections.get(name);
  }
}

class MockCollection {
  constructor() {
    this.documents = [];
  }

  async insertOne(doc) {
    doc._id = this.generateId();
    this.documents.push(doc);
    return { insertedId: doc._id };
  }

  async findOne(query) {
    return this.documents.find((doc) => this.matches(doc, query));
  }

  async find(query) {
    return this.documents.filter((doc) => this.matches(doc, query));
  }

  async updateOne(query, update) {
    const doc = this.documents.find((d) => this.matches(d, query));
    if (doc) {
      Object.assign(doc, update.$set);
      return { modifiedCount: 1 };
    }
    return { modifiedCount: 0 };
  }

  matches(doc, query) {
    // Simple query matching logic
    for (const [key, value] of Object.entries(query)) {
      if (doc[key] !== value) return false;
    }
    return true;
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
}
```

## Key Database Takeaways for FAANG

### MongoDB Best Practices

- Use appropriate schema design and indexing
- Implement proper connection pooling
- Use aggregation pipelines for complex queries
- Handle transactions properly
- Monitor performance with explain() plans

### SQL Best Practices

- Use proper foreign key relationships
- Implement proper indexing strategies
- Use transactions for data consistency
- Optimize queries with EXPLAIN ANALYZE
- Handle connection pooling efficiently

### General Database Principles

- Choose the right database for your use case
- Implement proper backup and recovery strategies
- Use caching to reduce database load
- Monitor database performance metrics
- Design for scalability from the start

## External Database Resources

- **MongoDB Documentation**: https://docs.mongodb.com/manual/
- **Mongoose Guide**: https://mongoosejs.com/docs/guide.html
- **Sequelize Documentation**: https://sequelize.org/docs/v6/
- **PostgreSQL Performance Guide**: https://wiki.postgresql.org/wiki/Performance_Optimization
- **Database Design Principles**: https://www.databasestar.com/database-design/
