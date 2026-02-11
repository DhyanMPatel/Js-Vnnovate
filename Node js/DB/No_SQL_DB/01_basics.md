# 🏗️ NoSQL Fundamentals

## What is NoSQL?

NoSQL ("Not Only SQL") databases provide a mechanism for storage and retrieval of data that is modeled in means other than the tabular relations used in relational databases. They're designed for:

- **Horizontal scaling** across multiple servers
- **Flexible data models** that evolve with applications
- **High availability** and fault tolerance
- **Big data** and real-time applications

## CAP Theorem

A distributed system can only guarantee two of the following three properties:

| Property                | Description                                         | Trade-off                                         |
| ----------------------- | --------------------------------------------------- | ------------------------------------------------- |
| **Consistency**         | All nodes see the same data at the same time        | Sacrifices availability during network partitions |
| **Availability**        | Every request receives a response (no errors)       | May return stale data during network partitions   |
| **Partition Tolerance** | System continues operating despite network failures | Must sacrifice either consistency or availability |

### Consistency Models

**Strong Consistency**

- All reads return the most recent write
- Example: Traditional SQL databases
- Higher latency, lower availability

**Eventual Consistency**

- Reads may return stale data temporarily
- Data converges to consistency over time
- Lower latency, higher availability

## Types of NoSQL Databases

### 1. Document Databases

**Examples**: MongoDB, CouchDB, Amazon DocumentDB

```javascript
// MongoDB document example
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  },
  "hobbies": ["reading", "swimming", "coding"],
  "createdAt": ISODate("2025-12-01T10:00:00Z")
}
```

**Use Cases**:

- Content management systems
- User profiles
- Catalog management
- Mobile applications

### 2. Key-Value Stores

**Examples**: Redis, Amazon DynamoDB, Riak

```javascript
// Redis example
SET user:1001 "John Doe"
GET user:1001
// Returns: "John Doe"

// Complex value
SET user:1001 '{"name":"John","age":30,"city":"NYC"}'
```

**Use Cases**:

- Caching layers
- Session management
- Real-time leaderboards
- Message queues

### 3. Column-Family Stores

**Examples**: Apache Cassandra, HBase, Amazon DynamoDB

```javascript
// Cassandra column family example
Row Key: user123
Columns:
  name: "John Doe"
  email: "john@example.com"
  age: 30
  last_login: 2025-12-01 10:00:00
```

**Use Cases**:

- Time-series data
- Analytics platforms
- Logging systems
- IoT data storage

### 4. Graph Databases

**Examples**: Neo4j, Amazon Neptune, ArangoDB

```javascript
// Neo4j example
CREATE (john:Person {name: "John"})
CREATE (jane:Person {name: "Jane"})
CREATE (john)-[:FRIENDS_WITH]->(jane)
```

**Use Cases**:

- Social networks
- Recommendation engines
- Fraud detection
- Knowledge graphs

## When to Choose NoSQL

### Choose NoSQL When:

**Large Scale Data**

- Terabytes to petabytes of data
- High write throughput requirements
- Need for horizontal scaling

**Flexible Schema**

- Rapid application development
- Evolving data structures
- Unstructured or semi-structured data

**High Availability**

- 24/7 operation requirements
- Geographic distribution
- Fault tolerance needs

**Specific Use Cases**

- Real-time analytics
- Content management
- Mobile/IoT applications

### Stick with SQL When:

**ACID Requirements**

- Financial transactions
- Inventory management
- Systems requiring strong consistency

**Complex Queries**

- Multi-table joins
- Complex aggregations
- Reporting and analytics

**Mature Ecosystem**

- Existing SQL expertise
- Established tooling
- Regulatory compliance

## NoSQL vs SQL Comparison

| Aspect             | NoSQL                     | SQL                       |
| ------------------ | ------------------------- | ------------------------- |
| **Schema**         | Flexible/Dynamic          | Fixed/Predefined          |
| **Scalability**    | Horizontal (easy)         | Vertical (traditional)    |
| **Consistency**    | Eventual                  | Strong                    |
| **Data Model**     | Documents/Key-Value/Graph | Tables/Relations          |
| **Query Language** | Various APIs              | Standard SQL              |
| **Joins**          | Limited/Client-side       | Powerful/Server-side      |
| **Transactions**   | Limited                   | Full ACID                 |
| **Use Cases**      | Big Data, Real-time       | Transactional, Analytical |

## Core NoSQL Concepts

### Documents

- Self-contained units of data
- Can contain nested structures
- Schema-less or schema-on-read
- JSON/BSON format (MongoDB)

### Collections

- Groups of related documents
- Equivalent to tables in SQL
- Can contain documents with different structures
- No predefined schema

### Indexing

- Critical for query performance
- Can index on any field
- Compound indexes for complex queries
- Text indexes for search

### Sharding

- Horizontal partitioning
- Distributes data across multiple servers
- Enables massive scale
- Requires careful shard key selection

## MongoDB as Primary Example

We'll focus on MongoDB in this guide because:

- **Most Popular**: Widely adopted in industry
- **Document-Based**: Easy to understand for developers
- **Rich Features**: Aggregation, indexing, transactions
- **Cloud Options**: MongoDB Atlas, Atlas Search
- **Good Learning Path**: Concepts transfer to other NoSQL databases

---

## Getting Started with MongoDB

### Installation Options

**Local Development**

```bash
# Install MongoDB Community Server
# Download from mongodb.com

# Or use Docker
docker run --name mongodb -p 27017:27017 -d mongo
```

**Cloud Development**

- MongoDB Atlas (free tier available)
- MLab (legacy, still available)
- AWS DocumentDB
- Azure Cosmos DB

### Basic Connection

```javascript
// Node.js with MongoDB driver
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("myapp");
    const collection = db.collection("users");

    // Your operations here
  } finally {
    await client.close();
  }
}
```

[Back to Main Index](./intro.md) | [Next: Document Databases →](./02_document_databases.md)
