# ⚡ Performance & Scaling

## Indexing Strategies

### Index Types

#### Single Field Index

```javascript
// Basic index
db.users.createIndex({ email: 1 });

// Descending index
db.users.createIndex({ createdAt: -1 });
```

#### Compound Index

```javascript
// Multi-field index
db.orders.createIndex({ customerId: 1, orderDate: -1 });

// Index for sorting and filtering
db.products.createIndex({ category: 1, price: -1, rating: -1 });
```

#### Unique Index

```javascript
db.users.createIndex({ username: 1 }, { unique: true });
db.products.createIndex({ sku: 1 }, { unique: true });
```

#### Sparse Index

```javascript
// Index only documents that have the field
db.users.createIndex({ profileId: 1 }, { sparse: true });

// Partial index (MongoDB 3.2+)
db.orders.createIndex(
  { total: 1 },
  { partialFilterExpression: { status: "completed" } }
);
```

#### TTL (Time-To-Live) Index

```javascript
// Auto-delete documents after expiration
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 }); // 1 hour

// Auto-delete logs after 30 days
db.logs.createIndex({ timestamp: 1 }, { expireAfterSeconds: 2592000 }); // 30 days
```

#### Text Index

```javascript
db.articles.createIndex({ title: "text", content: "text" });

// With weights
db.articles.createIndex(
  {
    title: "text",
    content: "text",
    tags: "text",
  },
  {
    weights: {
      title: 10,
      content: 5,
      tags: 8,
    },
  }
);
```

#### Geospatial Index

```javascript
// 2D index for legacy coordinates
db.places.createIndex({ location: "2d" });

// 2dsphere for GeoJSON
db.places.createIndex({ location: "2dsphere" });
```

### Index Analysis

#### Covering Queries

```javascript
// Index covers the query (no need to fetch documents)
db.orders.createIndex({ customerId: 1, status: 1, total: 1 });

// This query is covered by the index
db.orders.find(
  { customerId: ObjectId("..."), status: "completed" },
  { total: 1, _id: 0 }
);
```

#### Query Execution Analysis

```javascript
// Basic explain
db.orders.find({ customerId: 1 }).explain();

// Detailed execution stats
db.orders.find({ customerId: 1 }).explain("executionStats");

// Winning plan analysis
db.orders.find({ customerId: 1 }).explain("queryPlanner");
```

#### Index Usage Statistics

```javascript
// Check index usage (MongoDB 3.2+)
db.orders.aggregate([{ $indexStats: {} }]);

// Collection statistics
db.orders.stats();

// Index details
db.orders.getIndexes();
```

## Sharding

### Sharding Concepts

#### Shard Key Selection

```javascript
// Enable sharding on database
sh.enableSharding("myapp");

// Shard collection with hashed shard key
sh.shardCollection("myapp.users", { _id: "hashed" });

// Shard collection with ranged shard key
sh.shardCollection("myapp.orders", { customerId: 1, orderDate: 1 });
```

#### Shard Key Patterns

**Hashed Shard Key**

- Even distribution
- Good for high cardinality fields
- Cannot support range queries

**Ranged Shard Key**

- Supports range queries
- Can lead to hot spots
- Good for time-series data

**Compound Shard Key**

- Combines benefits
- More complex to manage
- Better for complex queries

#### Sharding Example

```javascript
// Shard users by region and user ID
sh.shardCollection("myapp.users", { region: 1, _id: 1 });

// Shard orders by customer and date
sh.shardCollection("myapp.orders", { customerId: 1, orderDate: 1 });

// Shard logs by date and hour
sh.shardCollection("myapp.logs", { timestamp: 1, hour: 1 });
```

### Shard Management

#### Check Sharding Status

```javascript
// List sharded collections
sh.status();

// Check shard distribution
db.runCommand({ listShards: 1 });

// Collection sharding info
db.orders.getShardDistribution();
```

#### Balancer Management

```javascript
// Check balancer status
sh.getBalancerState();

// Start/stop balancer
sh.startBalancer();
sh.stopBalancer();

// Configure balancer window
sh.setBalancerState(true);
sh.configureBalancerChunkSize(64); // MB
```

## Replication

### Replica Set Configuration

#### Basic Replica Set

```javascript
// Initialize replica set
rs.initiate({
  _id: "myReplicaSet",
  members: [
    { _id: 0, host: "mongo1:27017" },
    { _id: 1, host: "mongo2:27017" },
    { _id: 2, host: "mongo3:27017" },
  ],
});

// Add member to existing set
rs.add("mongo4:27017");

// Add arbiter
rs.addArb("mongo5:27017");
```

#### Read Preferences

```javascript
// Primary only (default)
db.collection.find().readPreference("primary");

// Primary preferred
db.collection.find().readPreference("primaryPreferred");

// Secondary only
db.collection.find().readPreference("secondary");

// Secondary preferred
db.collection.find().readPreference("secondaryPreferred");

// Nearest (lowest latency)
db.collection.find().readPreference("nearest");
```

#### Write Concerns

```javascript
// Acknowledged (default)
db.collection.insertOne({ data: "test" }, { writeConcern: { w: 1 } });

// Majority acknowledgment
db.collection.insertOne({ data: "test" }, { writeConcern: { w: "majority" } });

// Specific number of nodes
db.collection.insertOne({ data: "test" }, { writeConcern: { w: 2 } });

// Journal acknowledgment
db.collection.insertOne({ data: "test" }, { writeConcern: { j: true } });

// Timeout
db.collection.insertOne({ data: "test" }, { writeConcern: { wtimeout: 5000 } });
```

### Replication Monitoring

#### Replica Set Status

```javascript
// Check replica set status
rs.status();

// Check configuration
rs.conf();

// Print replication info
db.printReplicationInfo();
db.printSlaveReplicationInfo();
```

## Performance Monitoring

### Database Profiling

#### Enable Profiling

```javascript
// Set profiling level
db.setProfilingLevel(1); // Slow operations
db.setProfilingLevel(2); // All operations

// Set slow operation threshold (ms)
db.setProfilingLevel(1, { slowms: 100 });

// Check profiling level
db.getProfilingLevel();
```

#### Analyze Profile Data

```javascript
// Find slow queries
db.system.profile.find().sort({ millis: -1 }).limit(5);

// Profile by collection
db.system.profile.aggregate([
  { $group: { _id: "$ns", count: { $sum: 1 }, avgTime: { $avg: "$millis" } } },
  { $sort: { avgTime: -1 } },
]);

// Profile by operation type
db.system.profile.aggregate([
  { $group: { _id: "$op", count: { $sum: 1 }, avgTime: { $avg: "$millis" } } },
  { $sort: { count: -1 } },
]);
```

### Server Metrics

#### Server Status

```javascript
// Overall server status
db.serverStatus();

// Connections
db.serverStatus().connections;

// Memory usage
db.serverStatus().mem;

// Network metrics
db.serverStatus().network;

// Operations counters
db.serverStatus().opcounters;
```

#### Collection Statistics

```javascript
// Collection stats
db.users.stats();

// Index usage
db.users.aggregate([{ $indexStats: {} }]);

// Collection size
db.users.dataSize();
db.users.storageSize();
db.users.totalIndexSize();
```

## Caching Strategies

### Application-Level Caching

#### Redis Integration

```javascript
const redis = require("redis");
const client = redis.createClient();

// Cache MongoDB queries
async function getUserById(userId) {
  const cacheKey = `user:${userId}`;

  // Try cache first
  const cached = await client.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // Query MongoDB
  const user = await db.collection("users").findOne({ _id: userId });

  // Cache result (expire after 1 hour)
  if (user) {
    await client.setex(cacheKey, 3600, JSON.stringify(user));
  }

  return user;
}

// Invalidate cache on update
async function updateUser(userId, update) {
  const result = await db
    .collection("users")
    .updateOne({ _id: userId }, update);

  // Clear cache
  await client.del(`user:${userId}`);

  return result;
}
```

#### MongoDB as Cache

```javascript
// TTL collections for caching
db.createCollection("cache", { capped: true, size: 100000000 });

// Cache with TTL
db.cache.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });

// Cache function
async function cacheResult(key, data, ttl = 3600) {
  await db.cache.insertOne(
    {
      _id: key,
      data: data,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + ttl * 1000),
    },
    { upsert: true }
  );
}

// Get cached result
async function getCachedResult(key) {
  const cached = await db.cache.findOne({ _id: key });
  return cached ? cached.data : null;
}
```

## Optimization Best Practices

### Query Optimization

#### Use Indexes Effectively

```javascript
// Create indexes for common queries
db.orders.createIndex({ customerId: 1, orderDate: -1 });
db.products.createIndex({ category: 1, price: 1 });

// Use covered queries
db.orders.find(
  { customerId: 1, status: "completed" },
  { total: 1, orderDate: 1, _id: 0 }
);

// Avoid expensive operations
// BAD: $regex with leading wildcard
db.users.find({ name: /ohn/ }); // Can't use index

// GOOD: Anchored regex
db.users.find({ name: /^John/ }); // Can use index
```

#### Projection and Limiting

```javascript
// Only return needed fields
db.users.find({ age: { $gt: 25 } }, { name: 1, email: 1, _id: 0 });

// Use limit for large result sets
db.products.find({ category: "electronics" }).limit(100);

// Pagination with skip and limit
db.products.find().skip(20).limit(10);
```

### Schema Design Optimization

#### Document Size Management

```javascript
// Keep documents under 100KB for optimal performance
// Use references for large arrays
{
  _id: "user123",
  name: "John Doe",
  recentPosts: [/* last 10 posts */],
  postCount: 1500 // Total count stored separately
}

// Use bucket pattern for time series
{
  sensorId: "temp001",
  hour: ISODate("2025-12-01T10:00:00Z"),
  readings: [/* 60 readings */],
  avg: 23.5,
  min: 22.1,
  max: 24.8
}
```

#### Index Strategy

```javascript
// Index for read-heavy workloads
db.products.createIndex({ category: 1, price: -1 });

// Index for write-heavy workloads
db.logs.createIndex({ timestamp: 1 }); // Simple index

// Sparse indexes for optional fields
db.users.createIndex({ lastLogin: 1 }, { sparse: true });
```

### Connection Management

#### Connection Pooling

```javascript
const { MongoClient } = require("mongodb");

// Configure connection pool
const client = new MongoClient(uri, {
  maxPoolSize: 10, // Maximum connections
  minPoolSize: 2, // Minimum connections
  maxIdleTimeMS: 30000, // Close idle connections after 30s
  serverSelectionTimeoutMS: 5000, // How long to try selecting a server
  socketTimeoutMS: 45000, // How long a send or receive on a socket can take
});
```

#### Bulk Operations

```javascript
// Bulk insert for better performance
const bulkOps = [];
for (let i = 0; i < 10000; i++) {
  bulkOps.push({
    insertOne: {
      document: { name: `user${i}`, age: Math.floor(Math.random() * 50) },
    },
  });
}

await db.collection("users").bulkWrite(bulkOps);
```

## Performance Testing

### Benchmarking Tools

#### MongoPerf

```javascript
// Custom performance test
const { MongoClient } = require("mongodb");

async function benchmarkQueries() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("test");

  const iterations = 1000;

  // Benchmark find operation
  const start = Date.now();
  for (let i = 0; i < iterations; i++) {
    await db.collection("users").findOne({ _id: i });
  }
  const findTime = Date.now() - start;

  console.log(`Find operation: ${findTime}ms for ${iterations} ops`);
  console.log(`Average: ${(findTime / iterations).toFixed(2)}ms per op`);

  await client.close();
}
```

#### Load Testing

```javascript
// Concurrent load test
const { MongoClient } = require("mongodb");

async function loadTest() {
  const concurrency = 10;
  const operations = 100;

  const promises = [];

  for (let i = 0; i < concurrency; i++) {
    promises.push(workerThread(operations));
  }

  const results = await Promise.all(promises);
  const totalTime = Math.max(...results);

  console.log(`Completed ${concurrency * operations} ops in ${totalTime}ms`);
}

async function workerThread(operations) {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("test");

  const start = Date.now();

  for (let i = 0; i < operations; i++) {
    await db.collection("users").insertOne({
      name: `user${Date.now()}_${i}`,
      timestamp: new Date(),
    });
  }

  await client.close();
  return Date.now() - start;
}
```

[← Advanced Queries](./04_advanced_queries.md) | [Next: Practical Examples →](./06_practical_examples.md)
