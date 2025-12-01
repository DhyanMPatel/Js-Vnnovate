# 🔗 Data Modeling & Relationships

## Data Modeling Principles

### Rule of Thumb: "Data that is accessed together should be stored together"

Unlike SQL databases where you normalize and join, NoSQL encourages denormalization for performance.

## Relationship Patterns

### 1. One-to-One Relationships

#### Embedding Pattern

```javascript
// User with embedded profile
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@example.com",
  profile: {
    bio: "Software Developer",
    location: "New York",
    website: "https://johndoe.com",
    social: {
      twitter: "@johndoe",
      github: "johndoe"
    }
  }
}
```

**Use when:**

- Data is always accessed together
- Embedded data is small
- No need to query embedded data independently

#### Referencing Pattern

```javascript
// Users collection
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@example.com",
  profileId: ObjectId("507f1f77bcf86cd799439012")
}

// Profiles collection
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  bio: "Software Developer",
  location: "New York",
  website: "https://johndoe.com"
}
```

**Use when:**

- Data is large
- Need to query profile independently
- Profile may be shared across multiple users

### 2. One-to-Few Relationships

#### Embedding Pattern (Preferred)

```javascript
// Author with embedded books
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Jane Smith",
  email: "jane@example.com",
  books: [
    {
      title: "MongoDB Guide",
      published: 2025,
      isbn: "123-456-789",
      pages: 250
    },
    {
      title: "NoSQL Patterns",
      published: 2024,
      isbn: "987-654-321",
      pages: 180
    }
  ]
}
```

**Use when:**

- Few related items (typically < 100)
- Items are always accessed with parent
- Items don't need independent queries

#### Referencing Pattern

```javascript
// Authors collection
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Jane Smith",
  email: "jane@example.com"
}

// Books collection
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  title: "MongoDB Guide",
  authorId: ObjectId("507f1f77bcf86cd799439011"),
  published: 2025,
  isbn: "123-456-789"
}
```

### 3. One-to-Many Relationships

#### Referencing Pattern (Required)

```javascript
// Blog post
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  title: "Understanding NoSQL",
  content: "Long blog post content...",
  author: "John Doe",
  createdAt: ISODate("2025-12-01T10:00:00Z")
}

// Comments collection
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  postId: ObjectId("507f1f77bcf86cd799439011"),
  author: "Jane Smith",
  content: "Great article!",
  createdAt: ISODate("2025-12-01T11:00:00Z")
}

// Query with comments
db.posts.aggregate([
  { $match: { _id: ObjectId("507f1f77bcf86cd799439011") } },
  {
    $lookup: {
      from: "comments",
      localField: "_id",
      foreignField: "postId",
      as: "comments"
    }
  }
]);
```

#### Hybrid Pattern (Recent Comments Embedded)

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  title: "Understanding NoSQL",
  content: "Long blog post content...",
  recentComments: [
    {
      author: "Jane Smith",
      content: "Great article!",
      createdAt: ISODate("2025-12-01T11:00:00Z")
    },
    {
      author: "Bob Johnson",
      content: "Very helpful!",
      createdAt: ISODate("2025-12-01T12:00:00Z")
    }
  ],
  commentCount: 150
}
```

### 4. Many-to-Many Relationships

#### Two-Way Referencing

```javascript
// Students collection
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  courses: [
    ObjectId("507f1f77bcf86cd799439012"),
    ObjectId("507f1f77bcf86cd799439013")
  ]
}

// Courses collection
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  name: "Database Design",
  students: [
    ObjectId("507f1f77bcf86cd799439011"),
    ObjectId("507f1f77bcf86cd799439014")
  ]
}
```

#### Junction Collection (Recommended)

```javascript
// Students collection
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@example.com"
}

// Courses collection
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  name: "Database Design",
  credits: 3
}

// Enrollments collection (junction table)
{
  _id: ObjectId("507f1f77bcf86cd799439013"),
  studentId: ObjectId("507f1f77bcf86cd799439011"),
  courseId: ObjectId("507f1f77bcf86cd799439012"),
  enrollmentDate: ISODate("2025-09-01T00:00:00Z"),
  grade: "A",
  semester: "Fall 2025"
}

// Query: Get student's courses
db.enrollments.aggregate([
  { $match: { studentId: ObjectId("507f1f77bcf86cd799439011") } },
  {
    $lookup: {
      from: "courses",
      localField: "courseId",
      foreignField: "_id",
      as: "course"
    }
  },
  { $unwind: "$course" },
  {
    $project: {
      courseName: "$course.name",
      credits: "$course.credits",
      grade: 1,
      enrollmentDate: 1
    }
  }
]);
```

## Schema Design Patterns

### 1. Attribute Pattern

```javascript
// Products with varying attributes
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Laptop",
  basePrice: 999.99,
  attributes: [
    { name: "color", value: "silver", type: "string" },
    { name: "ram", value: 16, type: "number" },
    { name: "storage", value: "512GB SSD", type: "string" },
    { name: "weight", value: 1.5, type: "number" }
  ]
}

// Query by attribute
db.products.find({
  "attributes": {
    $elemMatch: { name: "ram", value: { $gte: 8 } }
  }
});
```

**Use when:**

- Products have different attributes
- Need to query by specific attributes
- Attributes vary widely between items

### 2. Bucket Pattern

```javascript
// IoT sensor data bucketed by hour
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  sensorId: "temp-sensor-001",
  hour: ISODate("2025-12-01T10:00:00Z"),
  measurements: [
    { timestamp: ISODate("2025-12-01T10:01:00Z"), value: 23.5 },
    { timestamp: ISODate("2025-12-01T10:02:00Z"), value: 23.7 },
    { timestamp: ISODate("2025-12-01T10:03:00Z"), value: 23.6 }
  ],
  count: 3,
  avg: 23.6,
  min: 23.5,
  max: 23.7
}
```

**Use when:**

- Time-series data
- High write volume
- Need pre-computed aggregates

### 3. Extended Reference Pattern

```javascript
// Order with extended product info
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  customerId: ObjectId("507f1f77bcf86cd799439012"),
  orderDate: ISODate("2025-12-01T10:00:00Z"),
  items: [
    {
      productId: ObjectId("507f1f77bcf86cd799439013"),
      quantity: 2,
      price: 49.99,
      // Extended reference - cached product info
      product: {
        name: "Wireless Mouse",
        sku: "WM-001",
        imageUrl: "/images/wireless-mouse.jpg"
      }
    }
  ]
}
```

**Use when:**

- Need to display product info without extra queries
- Product info changes infrequently
- Want to reduce read operations

### 4. Subset Pattern

```javascript
// User with recent activity (subset)
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@example.com",
  recentActivity: [
    {
      type: "login",
      timestamp: ISODate("2025-12-01T10:00:00Z"),
      ip: "192.168.1.1"
    },
    {
      type: "purchase",
      timestamp: ISODate("2025-12-01T09:30:00Z"),
      orderId: ObjectId("507f1f77bcf86cd799439012")
    }
  ]
}

// Full activity log in separate collection
{
  _id: ObjectId("507f1f77bcf86cd799439013"),
  userId: ObjectId("507f1f77bcf86cd799439011"),
  type: "login",
  timestamp: ISODate("2025-12-01T08:00:00Z"),
  ip: "192.168.1.1",
  userAgent: "Mozilla/5.0..."
}
```

## Schema Evolution Strategies

### 1. Schema Versioning

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@example.com",
  schemaVersion: 2,
  // Version 2 fields
  profile: {
    bio: "Developer",
    preferences: {
      theme: "dark",
      notifications: true
    }
  }
  // Legacy fields (for backward compatibility)
  // bio: "Developer" // Version 1 field
}
```

### 2. Migration Strategy

```javascript
// Gradual migration script
db.users.find({ schemaVersion: { $lt: 2 } }).forEach(function (user) {
  db.users.updateOne(
    { _id: user._id },
    {
      $set: {
        schemaVersion: 2,
        profile: {
          bio: user.bio || "",
          preferences: {
            theme: "light",
            notifications: true,
          },
        },
      },
      $unset: { bio: 1 }, // Remove old field
    }
  );
});
```

## Performance Considerations

### Document Size Limits

- **Maximum document size**: 16MB
- **Recommended size**: < 100KB for optimal performance
- **Array limits**: Avoid arrays with > 1000 elements

### Indexing Strategy

```javascript
// Compound index for common query patterns
db.orders.createIndex({ customerId: 1, orderDate: -1 });

// Index on array fields
db.products.createIndex({ "attributes.name": 1, "attributes.value": 1 });

// Sparse index for optional fields
db.users.createIndex({ profileId: 1 }, { sparse: true });
```

### Read/Write Patterns

```javascript
// Write pattern: Batch operations
db.orders.insertMany([
  { customerId: 1, total: 99.99, items: [...] },
  { customerId: 2, total: 149.99, items: [...] }
]);

// Read pattern: Projection to limit data
db.orders.find(
  { customerId: 1 },
  { total: 1, orderDate: 1, "items.name": 1 }
);
```

## Anti-Patterns to Avoid

### 1. Unbounded Arrays

```javascript
// BAD: Comments array can grow infinitely
{
  title: "Blog Post",
  comments: [
    // ... thousands of comments
  ]
}

// GOOD: Separate comments collection
db.comments.find({ postId: postId });
```

### 2. Large Documents

```javascript
// BAD: Document approaches 16MB limit
{
  userId: "user123",
  activities: [
    // ... millions of activities
  ]
}

// GOOD: Bucket or separate collection
{
  userId: "user123",
  date: ISODate("2025-12-01"),
  activities: [/* limited number */],
  count: 1000
}
```

### 3. Inconsistent Schema

```javascript
// BAD: Same data in different formats
{ name: "John", age: 30 }
{ fullName: "Jane", years: 25 }

// GOOD: Consistent field names and types
{ name: "John", age: 30 }
{ name: "Jane", age: 25 }
```

[← Document Databases](./02_document_databases.md) | [Next: Advanced Queries →](./04_advanced_queries.md)
