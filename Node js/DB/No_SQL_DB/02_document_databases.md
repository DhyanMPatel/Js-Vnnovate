# 📝 Document Databases (MongoDB)

## MongoDB Architecture

### Hierarchy

```
Database
├── Collection (like a table)
│   ├── Document (like a row)
│   ├── Document
│   └── Document
└── Collection
    ├── Document
    └── Document
```

### BSON Format

MongoDB stores data in BSON (Binary JSON), which extends JSON with additional types:

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "John Doe",
  "age": 30,
  "isActive": true,
  "balance": NumberDecimal("1234.56"),
  "registered": ISODate("2025-01-01T00:00:00Z"),
  "tags": ["developer", "javascript", "mongodb"],
  "metadata": {
    "source": "web",
    "campaign": "newsletter"
  }
}
```

## CRUD Operations

### 1. Create (INSERT)

#### Insert Single Document

```javascript
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  interests: ["coding", "music"],
  createdAt: new Date()
});

// Result
{
  "acknowledged": true,
  "insertedId": ObjectId("507f1f77bcf86cd799439011")
}
```

#### Insert Multiple Documents

```javascript
db.users.insertMany([
  {
    name: "Jane Smith",
    email: "jane@example.com",
    age: 25,
    interests: ["design", "art"]
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    age: 35,
    interests: ["business", "marketing"]
  }
]);

// Result
{
  "acknowledged": true,
  "insertedIds": {
    "0": ObjectId("507f1f77bcf86cd799439012"),
    "1": ObjectId("507f1f77bcf86cd799439013")
  }
}
```

### 2. Read (SELECT/FIND)

#### Basic Find

```javascript
// Find all documents
db.users.find();

// Find with criteria
db.users.find({ age: { $gt: 25 } });

// Find specific fields
db.users.find({ age: { $gt: 25 } }, { name: 1, email: 1, _id: 0 });

// Find one document
db.users.findOne({ email: "john@example.com" });
```

#### Query Operators

```javascript
// Comparison operators
db.users.find({ age: { $gt: 25 } }); // greater than
db.users.find({ age: { $gte: 25 } }); // greater than or equal
db.users.find({ age: { $lt: 30 } }); // less than
db.users.find({ age: { $lte: 30 } }); // less than or equal
db.users.find({ age: { $ne: 25 } }); // not equal
db.users.find({ age: { $in: [25, 30, 35] } }); // in array
db.users.find({ age: { $nin: [25, 30] } }); // not in array

// Logical operators
db.users.find({ $and: [{ age: { $gt: 25 } }, { isActive: true }] });
db.users.find({ $or: [{ age: { $lt: 25 } }, { isActive: false }] });
db.users.find({ age: { $not: { $gt: 25 } } });

// Element operators
db.users.find({ email: { $exists: true } });
db.users.find({ age: { $type: "number" } });

// Array operators
db.users.find({ interests: "coding" }); // array contains value
db.users.find({ interests: { $all: ["coding", "music"] } }); // contains all
db.users.find({ interests: { $size: 2 } }); // array size
db.users.find({ "interests.0": "coding" }); // first element

// Regular expression
db.users.find({ name: /^John/i }); // starts with John (case insensitive)
```

#### Sorting and Limiting

```javascript
// Sort results
db.users.find().sort({ age: 1 }); // ascending
db.users.find().sort({ age: -1 }); // descending
db.users.find().sort({ name: 1, age: -1 }); // multi-field sort

// Limit and skip (pagination)
db.users.find().limit(10); // first 10
db.users.find().skip(20).limit(10); // skip 20, get next 10
```

### 3. Update

#### Update Single Document

```javascript
// Update specific fields
db.users.updateOne(
  { email: "john@example.com" },
  { $set: { age: 31, lastLogin: new Date() } }
);

// Increment numeric field
db.users.updateOne({ email: "john@example.com" }, { $inc: { loginCount: 1 } });

// Add to array
db.users.updateOne(
  { email: "john@example.com" },
  { $push: { interests: "mongodb" } }
);

// Remove from array
db.users.updateOne(
  { email: "john@example.com" },
  { $pull: { interests: "music" } }
);
```

#### Update Multiple Documents

```javascript
// Update all matching documents
db.users.updateMany({ age: { $lt: 30 } }, { $set: { status: "young" } });
```

#### Update Operators

```javascript
// $set - Set field value
db.users.updateOne({ _id: 1 }, { $set: { name: "John Updated" } });

// $unset - Remove field
db.users.updateOne({ _id: 1 }, { $unset: { temporaryField: 1 } });

// $inc - Increment numeric field
db.users.updateOne({ _id: 1 }, { $inc: { age: 1 } });

// $mul - Multiply numeric field
db.users.updateOne({ _id: 1 }, { $mul: { score: 2 } });

// $min - Only update if value is smaller
db.users.updateOne({ _id: 1 }, { $min: { age: 25 } });

// $max - Only update if value is larger
db.users.updateOne({ _id: 1 }, { $max: { age: 35 } });

// Array operators
db.users.updateOne({ _id: 1 }, { $push: { tags: "newTag" } });
db.users.updateOne({ _id: 1 }, { $addToSet: { tags: "uniqueTag" } });
db.users.updateOne({ _id: 1 }, { $pop: { tags: 1 } }); // Remove last
db.users.updateOne({ _id: 1 }, { $pull: { tags: "removeThis" } });
```

### 4. Delete

#### Delete Documents

```javascript
// Delete one document
db.users.deleteOne({ email: "john@example.com" });

// Delete multiple documents
db.users.deleteMany({ age: { $lt: 18 } });

// Delete all documents (be careful!)
db.users.deleteMany({});
```

## Schema Design Patterns

### 1. Embedding (Denormalization)

```javascript
// Blog post with embedded comments
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  title: "MongoDB Guide",
  content: "Learning MongoDB...",
  author: {
    name: "John Doe",
    email: "john@example.com"
  },
  comments: [
    {
      text: "Great article!",
      author: "Jane Smith",
      createdAt: ISODate("2025-12-01T10:00:00Z")
    },
    {
      text: "Very helpful",
      author: "Bob Johnson",
      createdAt: ISODate("2025-12-01T11:00:00Z")
    }
  ],
  tags: ["mongodb", "database", "tutorial"]
}
```

**Use when:**

- Data is accessed together
- One-to-one or one-to-few relationships
- Data doesn't change frequently

### 2. Referencing (Normalization)

```javascript
// Users collection
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@example.com"
}

// Orders collection
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  userId: ObjectId("507f1f77bcf86cd799439011"),
  orderDate: ISODate("2025-12-01T10:00:00Z"),
  total: 99.99,
  items: [
    { productId: ObjectId("..."), quantity: 2, price: 49.99 }
  ]
}
```

**Use when:**

- Many-to-many relationships
- Large datasets
- Data accessed separately

## Indexing

### Create Indexes

```javascript
// Single field index
db.users.createIndex({ email: 1 });

// Compound index
db.users.createIndex({ name: 1, age: -1 });

// Unique index
db.users.createIndex({ email: 1 }, { unique: true });

// Text index for search
db.users.createIndex({ name: "text", bio: "text" });

// TTL index (auto-delete)
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
```

### View Indexes

```javascript
// List all indexes
db.users.getIndexes();

// Explain query execution
db.users.find({ email: "john@example.com" }).explain("executionStats");
```

## Aggregation Framework

### Basic Aggregation

```javascript
// Count users by age group
db.users.aggregate([
  {
    $group: {
      _id: { $gt: ["$age", 30] }, // true/false for age > 30
      count: { $sum: 1 },
      avgAge: { $avg: "$age" },
    },
  },
  {
    $project: {
      ageGroup: { $cond: ["$_id", "over30", "under30"] },
      count: 1,
      avgAge: 1,
      _id: 0,
    },
  },
]);

// Unwind array
db.users.aggregate([
  { $unwind: "$interests" },
  { $group: { _id: "$interests", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
]);
```

### Advanced Aggregation

```javascript
// Lookup (similar to SQL JOIN)
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user",
    },
  },
  { $unwind: "$user" },
  {
    $project: {
      orderDate: 1,
      total: 1,
      userName: "$user.name",
      userEmail: "$user.email",
    },
  },
]);

// Faceted search
db.products.aggregate([
  {
    $facet: {
      categories: [{ $group: { _id: "$category", count: { $sum: 1 } } }],
      priceRanges: [
        {
          $bucket: {
            groupBy: "$price",
            boundaries: [0, 25, 50, 100, 200],
            default: "other",
            output: { count: { $sum: 1 } },
          },
        },
      ],
      brands: [{ $group: { _id: "$brand", count: { $sum: 1 } } }],
    },
  },
]);
```

## Transactions (MongoDB 4.0+)

```javascript
// Transaction example
const session = client.startSession();

try {
  await session.withTransaction(async () => {
    const ordersCollection = client.db("mydb").collection("orders");
    const inventoryCollection = client.db("mydb").collection("inventory");

    // Create order
    await ordersCollection.insertOne(
      {
        productId: "product123",
        quantity: 2,
        total: 199.98,
      },
      { session }
    );

    // Update inventory
    await inventoryCollection.updateOne(
      { productId: "product123" },
      { $inc: { stock: -2 } },
      { session }
    );
  });
} finally {
  await session.endSession();
}
```

[← Back to Basics](./01_basics.md) | [Next: Data Modeling →](./03_data_modeling.md)
