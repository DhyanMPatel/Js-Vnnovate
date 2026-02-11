# Database Fundamentals for Backend Developers

## 1. SQL vs NoSQL

### SQL (Relational) Databases

- **Structured data with predefined schema**
- Example: MySQL, PostgreSQL, SQLite

```sql
-- Creating a users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserting data
INSERT INTO users (username, email)
VALUES ('johndoe', 'john@example.com');

-- Querying data
SELECT * FROM users WHERE username = 'johndoe';
```

### NoSQL Databases

- **Flexible schema for unstructured data**
- Example: MongoDB, Redis, Cassandra

```javascript
// MongoDB example with Mongoose (Node.js)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Creating a new user
const newUser = await User.create({
  username: "johndoe",
  email: "john@example.com",
});
```

## 2. Basic CRUD Operations

### SQL (Using Node.js with mysql2)

```javascript
const mysql = require("mysql2/promise");

async function main() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test",
    password: "password",
  });

  // Create
  const [results] = await connection.execute(
    "INSERT INTO users (username, email) VALUES (?, ?)",
    ["alice", "alice@example.com"]
  );

  // Read
  const [users] = await connection.execute("SELECT * FROM users");

  // Update
  await connection.execute("UPDATE users SET email = ? WHERE username = ?", [
    "alice.smith@example.com",
    "alice",
  ]);

  // Delete
  await connection.execute("DELETE FROM users WHERE username = ?", ["alice"]);
}
```

### NoSQL (Using MongoDB with Mongoose)

```javascript
// Create
const user = await User.create({
  username: "bob",
  email: "bob@example.com",
});

// Read
const foundUser = await User.findOne({ username: "bob" });
const allUsers = await User.find();

// Update
const updatedUser = await User.findOneAndUpdate(
  { username: "bob" },
  { email: "bob.smith@example.com" },
  { new: true }
);

// Delete
await User.deleteOne({ username: "bob" });
```

## 3. Indexing for Performance

```sql
-- Creating an index
CREATE INDEX idx_username ON users(username);

-- Composite index
CREATE INDEX idx_name_email ON users(last_name, first_name);
```

## 4. Transactions

### SQL Transaction Example

```javascript
try {
  await connection.beginTransaction();

  await connection.execute(
    "UPDATE accounts SET balance = balance - ? WHERE id = ?",
    [100, "account1"]
  );

  await connection.execute(
    "UPDATE accounts SET balance = balance + ? WHERE id = ?",
    [100, "account2"]
  );

  await connection.commit();
} catch (err) {
  await connection.rollback();
  throw err;
}
```

## 5. Connection Pooling

```javascript
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  database: "test",
  password: "password",
});

// Using the pool
const [rows] = await pool.query("SELECT * FROM users");
```

## 6. Security Best Practices

```javascript
// BAD: Vulnerable to SQL injection
const query = `SELECT * FROM users WHERE username = '${username}'`;

// GOOD: Use parameterized queries
const [users] = await connection.execute(
  "SELECT * FROM users WHERE username = ?",
  [username]
);

// Using ORM (Sequelize example)
const user = await User.findOne({
  where: { username },
});
```

## 7. Database Migrations

Example using Knex.js:

```javascript
// migrations/20231130_create_users_table.js
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.string("username").unique().notNullable();
    table.string("email").unique().notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
```

## 8. Caching with Redis

```javascript
const redis = require("redis");
const client = redis.createClient();

// Caching user data
async function getUser(userId) {
  const cacheKey = `user:${userId}`;

  // Try to get from cache
  const cachedUser = await client.get(cacheKey);
  if (cachedUser) return JSON.parse(cachedUser);

  // If not in cache, get from database
  const user = await User.findById(userId);

  // Store in cache for future requests (expires in 1 hour)
  if (user) {
    await client.setEx(cacheKey, 3600, JSON.stringify(user));
  }

  return user;
}
```

## 9. Error Handling

```javascript
async function getUserById(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    // Handle specific error types
    if (error.code === "ECONNREFUSED") {
      throw new Error("Database connection failed");
    }
    throw error;
  }
}
```

## 10. Environment Configuration

Use environment variables for database configuration:

```env
DB_HOST=localhost
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=mydatabase
DB_PORT=3306
```

```javascript
// config/database.js
require("dotenv").config();

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
    },
    migrations: {
      directory: "./migrations",
    },
  },
};
```


# Note : Now know MySQL in Depth

[MySQL in Depth](./SQL_DB/intro.md)