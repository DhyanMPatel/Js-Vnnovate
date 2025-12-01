# 🔧 Backend Integration Essentials

## ORMs (Object-Relational Mapping)

### Sequelize (Node.js)

```javascript
const { Sequelize, DataTypes } = require("sequelize");

// Database connection
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Model definition
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "suspended"),
      defaultValue: "active",
    },
  },
  {
    tableName: "users",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
      {
        fields: ["status"],
      },
    ],
  }
);

// Associations
const User = require("./models/User")(sequelize);
const Order = require("./models/Order")(sequelize);

User.hasMany(Order, { foreignKey: "userId", as: "orders" });
Order.belongsTo(User, { foreignKey: "userId", as: "user" });

// CRUD Operations with ORM
async function createUser(userData) {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error("Email already exists");
    }
    throw error;
  }
}

// Complex queries with associations
async function getUserWithOrders(userId) {
  return await User.findByPk(userId, {
    include: [
      {
        model: Order,
        as: "orders",
        where: { status: "completed" },
        include: ["orderItems"],
      },
    ],
    attributes: { exclude: ["password"] },
  });
}
```

### TypeORM (Node.js/TypeScript)

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./Order";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: "enum",
    enum: ["active", "inactive", "suspended"],
    default: "active",
  })
  status: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// Repository pattern
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async findById(id: number): Promise<User> {
    return this.userRepo.findOne({
      where: { id },
      relations: ["orders"],
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepo.create(userData);
    return this.userRepo.save(user);
  }
}
```

## Database Design Patterns

### Repository Pattern

```javascript
class UserRepository {
  constructor(dbConnection) {
    this.db = dbConnection;
  }

  async findById(id) {
    const query = "SELECT * FROM users WHERE id = ?";
    const [rows] = await this.db.execute(query, [id]);
    return rows[0] || null;
  }

  async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await this.db.execute(query, [email]);
    return rows[0] || null;
  }

  async create(userData) {
    const query =
      "INSERT INTO users (email, firstName, lastName) VALUES (?, ?, ?)";
    const [result] = await this.db.execute(query, [
      userData.email,
      userData.firstName,
      userData.lastName,
    ]);
    return result.insertId;
  }

  async update(id, userData) {
    const fields = [];
    const values = [];

    Object.keys(userData).forEach((key) => {
      if (userData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(userData[key]);
      }
    });

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    const [result] = await this.db.execute(query, values);
    return result.affectedRows > 0;
  }
}
```

### Unit of Work Pattern

```javascript
class UnitOfWork {
  constructor(dbConnection) {
    this.db = dbConnection;
    this.repositories = new Map();
    this.transactions = new Set();
  }

  getRepository(repositoryClass) {
    if (!this.repositories.has(repositoryClass.name)) {
      this.repositories.set(repositoryClass.name, new repositoryClass(this.db));
    }
    return this.repositories.get(repositoryClass.name);
  }

  async beginTransaction() {
    await this.db.beginTransaction();
  }

  async commit() {
    try {
      await this.db.commit();
      this.transactions.clear();
    } catch (error) {
      await this.rollback();
      throw error;
    }
  }

  async rollback() {
    await this.db.rollback();
    this.transactions.clear();
  }
}

// Usage
async function transferFunds(fromAccountId, toAccountId, amount) {
  const uow = new UnitOfWork(dbConnection);

  try {
    await uow.beginTransaction();

    const accountRepo = uow.getRepository(AccountRepository);

    // Debit source account
    await accountRepo.updateBalance(fromAccountId, -amount);

    // Credit destination account
    await accountRepo.updateBalance(toAccountId, amount);

    // Record transaction
    const transactionRepo = uow.getRepository(TransactionRepository);
    await transactionRepo.create({
      fromAccountId,
      toAccountId,
      amount,
      type: "transfer",
    });

    await uow.commit();
  } catch (error) {
    await uow.rollback();
    throw error;
  }
}
```

## Advanced Connection Management

### Connection Pool Configuration

```javascript
// MySQL2 Pool
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  maxIdle: 10,
  idleTimeout: 60000,
  acquireTimeout: 60000,
  reconnect: true,
  multipleStatements: false,
});

// Health check
async function checkDatabaseHealth() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    return { status: "healthy", timestamp: new Date() };
  } catch (error) {
    return { status: "unhealthy", error: error.message, timestamp: new Date() };
  }
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("Closing database connections...");
  await pool.end();
  process.exit(0);
});
```

### Read/Write Splitting

```javascript
class DatabaseManager {
  constructor(writePool, readPool) {
    this.writePool = writePool;
    this.readPool = readPool;
  }

  async query(sql, params = [], options = {}) {
    const pool = options.readOnly ? this.readPool : this.writePool;

    try {
      const [rows] = await pool.execute(sql, params);
      return rows;
    } catch (error) {
      console.error("Database query error:", error);
      throw new DatabaseError(error.message, sql, params);
    }
  }

  async transaction(callback) {
    const connection = await this.writePool.getConnection();

    try {
      await connection.beginTransaction();
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}
```

## Database Testing Strategies

### Test Database Setup

```javascript
// test/database.js
const { createConnection } = require("mysql2/promise");
const { execSync } = require("child_process");

class TestDatabase {
  constructor() {
    this.connection = null;
    this.testDbName = `test_${Date.now()}`;
  }

  async setup() {
    // Create test database
    const connection = await createConnection({
      host: process.env.TEST_DB_HOST,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
    });

    await connection.execute(`CREATE DATABASE ${this.testDbName}`);
    await connection.end();

    // Connect to test database
    this.connection = await createConnection({
      host: process.env.TEST_DB_HOST,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
      database: this.testDbName,
    });

    // Run migrations
    await this.runMigrations();
  }

  async teardown() {
    if (this.connection) {
      await this.connection.end();
    }

    // Drop test database
    const connection = await createConnection({
      host: process.env.TEST_DB_HOST,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
    });

    await connection.execute(`DROP DATABASE IF EXISTS ${this.testDbName}`);
    await connection.end();
  }

  async runMigrations() {
    // Run migration files
    const migrationFiles = fs.readdirSync("./migrations").sort();

    for (const file of migrationFiles) {
      if (file.endsWith(".js")) {
        const migration = require(`../migrations/${file}`);
        await migration.up(this.connection);
      }
    }
  }

  async seedData() {
    // Seed test data
    await this.connection.execute(`
      INSERT INTO users (email, firstName, lastName) VALUES
      ('test1@example.com', 'Test', 'User1'),
      ('test2@example.com', 'Test', 'User2')
    `);
  }
}

// Test example
describe("UserRepository", () => {
  let testDb;
  let userRepository;

  beforeAll(async () => {
    testDb = new TestDatabase();
    await testDb.setup();
    await testDb.seedData();
    userRepository = new UserRepository(testDb.connection);
  });

  afterAll(async () => {
    await testDb.teardown();
  });

  test("should find user by email", async () => {
    const user = await userRepository.findByEmail("test1@example.com");
    expect(user).toBeDefined();
    expect(user.firstName).toBe("Test");
  });
});
```

### Mock Database for Unit Tests

```javascript
// test/mocks/DatabaseMock.js
class DatabaseMock {
  constructor() {
    this.data = new Map();
    this.nextId = 1;
  }

  async execute(sql, params = []) {
    // Simple mock implementation
    if (sql.includes("INSERT INTO users")) {
      const id = this.nextId++;
      const [email, firstName, lastName] = params;
      this.data.set(id, { id, email, firstName, lastName });
      return [{ insertId: id }];
    }

    if (sql.includes("SELECT * FROM users WHERE email = ?")) {
      const [email] = params;
      const user = Array.from(this.data.values()).find(
        (u) => u.email === email
      );
      return user ? [user] : [];
    }

    return [];
  }
}

// Usage in tests
const mockDb = new DatabaseMock();
const userRepository = new UserRepository(mockDb);

test("should create user with mock database", async () => {
  const userId = await userRepository.create({
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
  });

  expect(userId).toBe(1);
});
```

## Database Monitoring & Observability

### Query Logging

```javascript
class QueryLogger {
  constructor(logger) {
    this.logger = logger;
  }

  logQuery(sql, params, duration, error = null) {
    const logData = {
      sql: sql.replace(/\s+/g, " ").trim(),
      params,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    };

    if (error) {
      logData.error = error.message;
      this.logger.error("Database query failed", logData);
    } else if (duration > 1000) {
      this.logger.warn("Slow database query", logData);
    } else {
      this.logger.debug("Database query", logData);
    }
  }
}

// Wrap database methods
function wrapDatabaseWithLogging(db, logger) {
  const queryLogger = new QueryLogger(logger);
  const originalExecute = db.execute;

  db.execute = async function (sql, params) {
    const start = Date.now();

    try {
      const result = await originalExecute.call(this, sql, params);
      const duration = Date.now() - start;

      queryLogger.logQuery(sql, params, duration);
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      queryLogger.logQuery(sql, params, duration, error);
      throw error;
    }
  };

  return db;
}
```

### Performance Metrics

```javascript
class DatabaseMetrics {
  constructor() {
    this.queryCount = 0;
    this.totalQueryTime = 0;
    this.slowQueries = [];
    this.errorCount = 0;
    this.connectionPoolStats = {};
  }

  recordQuery(duration, sql) {
    this.queryCount++;
    this.totalQueryTime += duration;

    if (duration > 1000) {
      this.slowQueries.push({
        sql,
        duration,
        timestamp: new Date(),
      });
    }
  }

  recordError(error) {
    this.errorCount++;
  }

  getMetrics() {
    return {
      queryCount: this.queryCount,
      averageQueryTime:
        this.queryCount > 0 ? this.totalQueryTime / this.queryCount : 0,
      slowQueriesCount: this.slowQueries.length,
      errorCount: this.errorCount,
      connectionPoolStats: this.connectionPoolStats,
    };
  }

  reset() {
    this.queryCount = 0;
    this.totalQueryTime = 0;
    this.slowQueries = [];
    this.errorCount = 0;
  }
}
```

## Database Security Best Practices

### SQL Injection Prevention

```javascript
// Input validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Parameterized queries (safe)
async function getUserByEmail(email) {
  if (!validateEmail(email)) {
    throw new Error("Invalid email format");
  }

  const query = "SELECT * FROM users WHERE email = ?";
  const [rows] = await db.execute(query, [email]);
  return rows[0];
}

// ORM-based queries (safer)
async function createUser(userData) {
  const user = await User.create({
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
  });
  return user;
}

// Whitelisting for dynamic queries
const ALLOWED_SORT_COLUMNS = [
  "id",
  "email",
  "firstName",
  "lastName",
  "createdAt",
];

function buildSortQuery(sortBy) {
  if (!ALLOWED_SORT_COLUMNS.includes(sortBy)) {
    throw new Error("Invalid sort column");
  }
  return `ORDER BY ${sortBy}`;
}
```

### Data Encryption

```javascript
const crypto = require("crypto");

class DataEncryption {
  constructor(secretKey) {
    this.algorithm = "aes-256-gcm";
    this.secretKey = crypto.scryptSync(secretKey, "salt", 32);
  }

  encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(this.algorithm, this.secretKey);
    cipher.setAAD(Buffer.from("additional-data"));

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag();

    return {
      encrypted,
      iv: iv.toString("hex"),
      authTag: authTag.toString("hex"),
    };
  }

  decrypt(encryptedData) {
    const decipher = crypto.createDecipher(this.algorithm, this.secretKey);
    decipher.setAAD(Buffer.from("additional-data"));
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, "hex"));

    let decrypted = decipher.update(encryptedData.encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }
}

// Usage in model
class SecureUserRepository {
  constructor(db, encryption) {
    this.db = db;
    this.encryption = encryption;
  }

  async create(userData) {
    const encryptedSSN = this.encryption.encrypt(userData.ssn);

    const query = `
      INSERT INTO users (email, firstName, lastName, ssn_encrypted, ssn_iv, ssn_authTag)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await this.db.execute(query, [
      userData.email,
      userData.firstName,
      userData.lastName,
      encryptedSSN.encrypted,
      encryptedSSN.iv,
      encryptedSSN.authTag,
    ]);
  }

  async getUserWithSSN(userId) {
    const [rows] = await this.db.execute(
      `
      SELECT email, firstName, lastName, ssn_encrypted, ssn_iv, ssn_authTag
      FROM users WHERE id = ?
    `,
      [userId]
    );

    if (rows.length === 0) return null;

    const user = rows[0];
    user.ssn = this.encryption.decrypt({
      encrypted: user.ssn_encrypted,
      iv: user.ssn_iv,
      authTag: user.ssn_authTag,
    });

    delete user.ssn_encrypted;
    delete user.ssn_iv;
    delete user.ssn_authTag;

    return user;
  }
}
```

## Database Backup & Recovery

### Automated Backup Script

```javascript
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

class DatabaseBackup {
  constructor(config) {
    this.config = config;
    this.backupDir = config.backupDir || "./backups";
  }

  async createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `backup_${timestamp}.sql`;
    const filepath = path.join(this.backupDir, filename);

    // Ensure backup directory exists
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }

    // Create backup
    const command = `mysqldump -h ${this.config.host} -u ${this.config.user} -p${this.config.password} ${this.config.database} > ${filepath}`;

    try {
      execSync(command);

      // Compress backup
      const compressedFile = `${filepath}.gz`;
      execSync(`gzip ${filepath}`);

      console.log(`Backup created: ${compressedFile}`);

      // Clean old backups (keep last 7 days)
      await this.cleanOldBackups();

      return compressedFile;
    } catch (error) {
      throw new Error(`Backup failed: ${error.message}`);
    }
  }

  async restoreBackup(backupFile) {
    if (!fs.existsSync(backupFile)) {
      throw new Error("Backup file not found");
    }

    // Decompress if needed
    let sqlFile = backupFile;
    if (backupFile.endsWith(".gz")) {
      sqlFile = backupFile.replace(".gz", "");
      execSync(`gunzip -c ${backupFile} > ${sqlFile}`);
    }

    // Restore database
    const command = `mysql -h ${this.config.host} -u ${this.config.user} -p${this.config.password} ${this.config.database} < ${sqlFile}`;

    try {
      execSync(command);
      console.log("Database restored successfully");

      // Clean up temporary file
      if (backupFile.endsWith(".gz")) {
        fs.unlinkSync(sqlFile);
      }
    } catch (error) {
      throw new Error(`Restore failed: ${error.message}`);
    }
  }

  async cleanOldBackups() {
    const files = fs.readdirSync(this.backupDir);
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    for (const file of files) {
      const filepath = path.join(this.backupDir, file);
      const stats = fs.statSync(filepath);

      if (stats.mtime.getTime() < sevenDaysAgo) {
        fs.unlinkSync(filepath);
        console.log(`Deleted old backup: ${file}`);
      }
    }
  }

  async scheduleBackup() {
    // Run backup every day at 2 AM
    const cron = require("node-cron");

    cron.schedule("0 2 * * *", async () => {
      try {
        await this.createBackup();
      } catch (error) {
        console.error("Scheduled backup failed:", error);
      }
    });
  }
}
```

This completes the essential backend integration topics that every backend developer should know for working with SQL databases in production environments.

[← Practical Examples](./06_practical_examples.md) | [Back to Main Index](./intro.md)
