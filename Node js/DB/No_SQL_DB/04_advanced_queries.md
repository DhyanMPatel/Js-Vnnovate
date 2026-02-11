# 🎯 Advanced Queries & Aggregation

## Aggregation Pipeline

The aggregation pipeline processes documents through a series of stages, transforming documents at each stage.

### Basic Pipeline Stages

#### $match - Filter Documents

```javascript
db.orders.aggregate([
  { $match: { status: "completed", total: { $gt: 100 } } },
  { $group: { _id: "$customerId", totalSpent: { $sum: "$total" } } },
]);
```

#### $group - Aggregate Documents

```javascript
// Sales by category
db.products.aggregate([
  { $unwind: "$categories" },
  {
    $group: {
      _id: "$categories",
      totalProducts: { $sum: 1 },
      avgPrice: { $avg: "$price" },
      maxPrice: { $max: "$price" },
      minPrice: { $min: "$price" },
    },
  },
  { $sort: { totalProducts: -1 } },
]);

// Daily sales report
db.orders.aggregate([
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
      totalOrders: { $sum: 1 },
      totalRevenue: { $sum: "$total" },
      avgOrderValue: { $avg: "$total" },
    },
  },
  { $sort: { _id: 1 } },
]);
```

#### $project - Reshape Documents

```javascript
db.users.aggregate([
  {
    $project: {
      fullName: { $concat: ["$firstName", " ", "$lastName"] },
      email: 1,
      age: { $subtract: [2025, { $year: "$birthDate" }] },
      isAdult: { $gte: [{ $subtract: [2025, { $year: "$birthDate" }] }, 18] },
      address: {
        city: "$address.city",
        state: "$address.state",
      },
      _id: 0,
    },
  },
]);
```

#### $lookup - Join Collections

```javascript
// Orders with customer and product details
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customer",
    },
  },
  { $unwind: "$customer" },
  {
    $lookup: {
      from: "products",
      localField: "items.productId",
      foreignField: "_id",
      as: "productDetails",
    },
  },
  {
    $project: {
      orderDate: 1,
      total: 1,
      customerName: "$customer.name",
      customerEmail: "$customer.email",
      products: {
        $map: {
          input: "$items",
          as: "item",
          in: {
            name: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: "$productDetails",
                    cond: { $eq: ["$$this._id", "$$item.productId"] },
                  },
                },
                0,
              ],
            }.name,
            quantity: "$$item.quantity",
            price: "$$item.price",
          },
        },
      },
    },
  },
]);
```

### Advanced Aggregation Operators

#### $unwind - Deconstruct Arrays

```javascript
// Product categories analysis
db.products.aggregate([
  { $unwind: "$categories" },
  {
    $group: {
      _id: "$categories",
      products: { $push: "$name" },
      avgPrice: { $avg: "$price" },
    },
  },
  { $sort: { avgPrice: -1 } },
]);

// Order items analysis
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.productId",
      totalSold: { $sum: "$items.quantity" },
      totalRevenue: {
        $sum: { $multiply: ["$items.quantity", "$items.price"] },
      },
    },
  },
  { $sort: { totalRevenue: -1 } },
  { $limit: 10 },
]);
```

#### $facet - Multiple Aggregation Pipelines

```javascript
// Comprehensive product analytics
db.products.aggregate([
  {
    $facet: {
      categoryStats: [
        { $unwind: "$categories" },
        {
          $group: {
            _id: "$categories",
            count: { $sum: 1 },
            avgPrice: { $avg: "$price" },
          },
        },
      ],
      priceDistribution: [
        {
          $bucket: {
            groupBy: "$price",
            boundaries: [0, 25, 50, 100, 200, 500],
            default: "expensive",
            output: {
              count: { $sum: 1 },
              products: { $push: "$name" },
            },
          },
        },
      ],
      brandStats: [
        {
          $group: {
            _id: "$brand",
            count: { $sum: 1 },
            avgRating: { $avg: "$rating" },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ],
      totalStats: [
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            avgPrice: { $avg: "$price" },
            totalValue: { $sum: "$price" },
          },
        },
      ],
    },
  },
]);
```

#### $graphLookup - Graph Traversal

```javascript
// Employee hierarchy
db.employees.aggregate([
  {
    $graphLookup: {
      from: "employees",
      startWith: "$reportsTo",
      connectFromField: "reportsTo",
      connectToField: "_id",
      as: "hierarchy",
    },
  },
  {
    $project: {
      name: 1,
      title: 1,
      level: { $size: "$hierarchy" },
      reports: {
        $size: {
          $filter: {
            input: "$hierarchy",
            cond: { $eq: ["$$this.level", "direct"] },
          },
        },
      },
    },
  },
]);

// Social network friends of friends
db.users.aggregate([
  { $match: { _id: ObjectId("507f1f77bcf86cd799439011") } },
  {
    $graphLookup: {
      from: "users",
      startWith: "$friends",
      connectFromField: "friends",
      connectToField: "_id",
      maxDepth: 2,
      as: "friendNetwork",
    },
  },
  {
    $project: {
      name: 1,
      directFriends: { $size: "$friends" },
      totalNetwork: { $size: "$friendNetwork" },
    },
  },
]);
```

## Map-Reduce Operations

### Basic Map-Reduce

```javascript
// Word count example
db.articles.mapReduce(
  function () {
    // Map function
    var words = this.content.split(/\s+/);
    words.forEach(function (word) {
      emit(word.toLowerCase(), 1);
    });
  },
  function (key, values) {
    // Reduce function
    return Array.sum(values);
  },
  {
    out: { replace: "word_counts" },
    query: { published: true },
  }
);

// Sales by region
db.orders.mapReduce(
  function () {
    emit(this.region, this.total);
  },
  function (key, values) {
    return Array.sum(values);
  },
  {
    out: { inline: 1 }, // Return results directly
    query: { status: "completed" },
  }
);
```

### Advanced Map-Reduce

```javascript
// Customer lifetime value
db.orders.mapReduce(
  function () {
    emit(this.customerId, {
      totalSpent: this.total,
      orderCount: 1,
      firstOrder: this.orderDate,
      lastOrder: this.orderDate,
    });
  },
  function (key, values) {
    var reduced = {
      totalSpent: 0,
      orderCount: 0,
      firstOrder: new Date(),
      lastOrder: new Date(0),
    };

    values.forEach(function (value) {
      reduced.totalSpent += value.totalSpent;
      reduced.orderCount += value.orderCount;
      if (value.firstOrder < reduced.firstOrder) {
        reduced.firstOrder = value.firstOrder;
      }
      if (value.lastOrder > reduced.lastOrder) {
        reduced.lastOrder = value.lastOrder;
      }
    });

    return reduced;
  },
  {
    out: { replace: "customer_ltv" },
    finalize: function (key, reduced) {
      reduced.avgOrderValue = reduced.totalSpent / reduced.orderCount;
      reduced.customerLifetimeMonths =
        (reduced.lastOrder.getFullYear() - reduced.firstOrder.getFullYear()) *
          12 +
        (reduced.lastOrder.getMonth() - reduced.firstOrder.getMonth());
      return reduced;
    },
  }
);
```

## Text Search

### Create Text Index

```javascript
// Single field text index
db.articles.createIndex({ content: "text" });

// Compound text index
db.articles.createIndex({ title: "text", content: "text", tags: "text" });

// Text index with weights
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
    name: "article_text_index",
  }
);
```

### Text Search Queries

```javascript
// Basic text search
db.articles.find({ $text: { $search: "mongodb tutorial" } });

// Text search with scoring
db.articles
  .find(
    { $text: { $search: "mongodb tutorial" } },
    { score: { $meta: "textScore" } }
  )
  .sort({ score: { $meta: "textScore" } });

// Phrase search
db.articles.find({ $text: { $search: '"database design"' } });

// Exclude terms
db.articles.find({ $text: { $search: "mongodb -mysql" } });

// Text search with other filters
db.articles.find({
  $text: { $search: "mongodb tutorial" },
  published: true,
  author: "John Doe",
});
```

## Geospatial Queries

### 2D Geospatial Index

```javascript
// Create 2D index
db.places.createIndex({ location: "2d" });

// Query within radius
db.places.find({
  location: {
    $near: [-73.98, 40.76], // longitude, latitude
    $maxDistance: 1000, // meters
  },
});

// Query within bounding box
db.places.find({
  location: {
    $geoWithin: {
      $box: [
        [-74.0, 40.7], // bottom left
        [-73.9, 40.8], // top right
      ],
    },
  },
});
```

### 2DSphere Geospatial Index

```javascript
// Create 2dsphere index for GeoJSON
db.places.createIndex({ location: "2dsphere" });

// GeoJSON point
{
  location: {
    type: "Point",
    coordinates: [ -73.98, 40.76 ] // longitude, latitude
  }
}

// Query near point
db.places.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [ -73.98, 40.76 ]
      },
      $maxDistance: 1000
    }
  }
});

// Query within polygon
db.places.find({
  location: {
    $geoWithin: {
      $geometry: {
        type: "Polygon",
        coordinates: [[
          [ -74.0, 40.7 ],
          [ -73.9, 40.7 ],
          [ -73.9, 40.8 ],
          [ -74.0, 40.8 ],
          [ -74.0, 40.7 ]
        ]]
      }
    }
  }
});
```

## Advanced Query Patterns

### Conditional Aggregation

```javascript
// Sales with conditional grouping
db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",
      totalOrders: { $sum: 1 },
      totalSpent: { $sum: "$total" },
      largeOrders: {
        $sum: {
          $cond: [{ $gt: ["$total", 100] }, 1, 0],
        },
      },
      avgOrderValue: { $avg: "$total" },
      customerTier: {
        $switch: {
          branches: [
            { case: { $gte: ["$total", 1000] }, then: "Platinum" },
            { case: { $gte: ["$total", 500] }, then: "Gold" },
            { case: { $gte: ["$total", 100] }, then: "Silver" },
          ],
          default: "Bronze",
        },
      },
    },
  },
]);
```

### Date-based Analysis

```javascript
// Time series analysis
db.sensorReadings.aggregate([
  {
    $group: {
      _id: {
        year: { $year: "$timestamp" },
        month: { $month: "$timestamp" },
        day: { $dayOfMonth: "$timestamp" },
        hour: { $hour: "$timestamp" },
      },
      avgTemp: { $avg: "$temperature" },
      maxTemp: { $max: "$temperature" },
      minTemp: { $min: "$temperature" },
      readings: { $sum: 1 },
    },
  },
  { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.hour": 1 } },
]);

// Growth analysis
db.users.aggregate([
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
      newUsers: { $sum: 1 },
      cumulativeUsers: { $sum: 1 },
    },
  },
  {
    $group: {
      _id: null,
      months: { $push: { month: "$_id", users: "$newUsers" } },
      totalUsers: { $sum: "$newUsers" },
    },
  },
  {
    $project: {
      months: {
        $reduce: {
          input: "$months",
          initialValue: [],
          in: {
            $concatArrays: [
              "$$value",
              [
                {
                  month: "$$this.month",
                  newUsers: "$$this.users",
                  cumulativeUsers: {
                    $sum: {
                      $filter: {
                        input: "$months",
                        cond: { $lte: ["$$this.month", "$$this.month"] },
                      },
                    },
                  },
                },
              ],
            ],
          },
        },
      },
    },
  },
]);
```

### Performance Optimization

#### Pipeline Optimization

```javascript
// Use $match early to reduce documents
db.orders.aggregate([
  {
    $match: { status: "completed", orderDate: { $gte: ISODate("2025-01-01") } },
  },
  { $group: { _id: "$customerId", total: { $sum: "$total" } } },
]);

// Limit fields early with $project
db.orders.aggregate([
  { $project: { customerId: 1, total: 1, orderDate: 1 } },
  { $match: { status: "completed" } },
  { $group: { _id: "$customerId", total: { $sum: "$total" } } },
]);

// Use indexes for $match stages
db.orders.createIndex({ status: 1, orderDate: 1 });
db.orders.createIndex({ customerId: 1 });
```

#### Memory Management

```javascript
// Use allowDiskUse for large datasets
db.largeCollection.aggregate(
  [
    // Complex pipeline
  ],
  { allowDiskUse: true }
);

// Batch processing for very large datasets
var cursor = db.hugeCollection.aggregate(
  [
    {
      $match: {
        /* criteria */
      },
    },
    {
      $group: {
        /* grouping */
      },
    },
  ],
  { cursor: { batchSize: 1000 } }
);

cursor.forEach(function (document) {
  // Process each document
});
```

[← Data Modeling](./03_data_modeling.md) | [Next: Performance & Scaling →](./05_performance.md)
