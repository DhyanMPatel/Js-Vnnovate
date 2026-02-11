# 🏆 Practical Examples

## Example 1: E-commerce Platform

### Database Schema

#### Products Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Wireless Bluetooth Headphones",
  sku: "WBH-001",
  description: "Premium noise-cancelling wireless headphones",
  price: NumberDecimal("199.99"),
  category: "Electronics",
  subcategory: "Audio",
  brand: "TechSound",
  images: [
    "/images/headphones/front.jpg",
    "/images/headphones/side.jpg",
    "/images/headphones/back.jpg"
  ],
  specifications: {
    color: "Black",
    weight: "250g",
    batteryLife: "30 hours",
    connectivity: ["Bluetooth 5.0", "3.5mm jack"],
    features: ["Noise Cancelling", "Voice Assistant", "Touch Controls"]
  },
  inventory: {
    stock: 150,
    reserved: 10,
    available: 140,
    reorderLevel: 25,
    lastRestock: ISODate("2025-11-15T00:00:00Z")
  },
  pricing: {
    basePrice: NumberDecimal("199.99"),
    salePrice: NumberDecimal("179.99"),
    saleEnds: ISODate("2025-12-31T23:59:59Z"),
    cost: NumberDecimal("85.00")
  },
  seo: {
    title: "Premium Wireless Headphones - TechSound WBH-001",
    description: "Experience premium sound with our noise-cancelling wireless headphones",
    keywords: ["wireless", "headphones", "bluetooth", "noise-cancelling", "audio"],
    slug: "wireless-bluetooth-headphones-techsound-wbh-001"
  },
  ratings: {
    average: 4.5,
    count: 234,
    distribution: {
      5: 120,
      4: 80,
      3: 25,
      2: 7,
      1: 2
    }
  },
  status: "active",
  createdAt: ISODate("2025-01-01T00:00:00Z"),
  updatedAt: ISODate("2025-12-01T10:00:00Z")
}
```

#### Customers Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1-555-0123",
  password: "$2b$10$...", // Hashed password
  addresses: [
    {
      type: "billing",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      isDefault: true
    },
    {
      type: "shipping",
      street: "456 Oak Ave",
      city: "Boston",
      state: "MA",
      zipCode: "02101",
      country: "USA",
      isDefault: false
    }
  ],
  preferences: {
    newsletter: true,
    smsNotifications: false,
    shippingMethod: "standard",
    paymentMethods: [
      {
        type: "credit_card",
        last4: "1234",
        brand: "visa",
        expiresMonth: 12,
        expiresYear: 2025,
        isDefault: true
      }
    ]
  },
  loyalty: {
    tier: "gold",
    points: 2500,
    memberSince: ISODate("2020-03-15T00:00:00Z"),
    lifetimeValue: NumberDecimal("3456.78")
  },
  activity: {
    lastLogin: ISODate("2025-12-01T09:30:00Z"),
    lastPurchase: ISODate("2025-11-28T14:20:00Z"),
    totalOrders: 23,
    totalSpent: NumberDecimal("3456.78"),
    averageOrderValue: NumberDecimal("150.30")
  },
  status: "active",
  createdAt: ISODate("2020-03-15T00:00:00Z"),
  updatedAt: ISODate("2025-12-01T09:30:00Z")
}
```

#### Orders Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439013"),
  customerId: ObjectId("507f1f77bcf86cd799439012"),
  orderNumber: "ORD-2025-1201-001",
  status: "shipped",
  items: [
    {
      productId: ObjectId("507f1f77bcf86cd799439011"),
      sku: "WBH-001",
      name: "Wireless Bluetooth Headphones",
      quantity: 2,
      unitPrice: NumberDecimal("179.99"),
      totalPrice: NumberDecimal("359.98"),
      // Cached product info for display
      product: {
        name: "Wireless Bluetooth Headphones",
        image: "/images/headphones/front.jpg",
        specifications: {
          color: "Black",
          weight: "250g"
        }
      }
    },
    {
      productId: ObjectId("507f1f77bcf86cd799439014"),
      sku: "USB-C-001",
      name: "USB-C Cable",
      quantity: 1,
      unitPrice: NumberDecimal("19.99"),
      totalPrice: NumberDecimal("19.99")
    }
  ],
  pricing: {
    subtotal: NumberDecimal("379.97"),
    tax: NumberDecimal("30.40"),
    shipping: NumberDecimal("9.99"),
    discount: NumberDecimal("20.00"),
    total: NumberDecimal("400.36")
  },
  shipping: {
    method: "express",
    carrier: "FedEx",
    trackingNumber: "1234567890",
    estimatedDelivery: ISODate("2025-12-03T18:00:00Z"),
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    }
  },
  payment: {
    method: "credit_card",
    status: "completed",
    transactionId: "txn_1234567890",
    processedAt: ISODate("2025-12-01T10:15:00Z")
  },
  timestamps: {
    createdAt: ISODate("2025-12-01T10:00:00Z"),
    confirmedAt: ISODate("2025-12-01T10:05:00Z"),
    shippedAt: ISODate("2025-12-01T14:30:00Z"),
    deliveredAt: null
  },
  notes: "Gift wrap requested"
}
```

#### Reviews Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439015"),
  productId: ObjectId("507f1f77bcf86cd799439011"),
  customerId: ObjectId("507f1f77bcf86cd799439012"),
  orderId: ObjectId("507f1f77bcf86cd799439013"),
  rating: 5,
  title: "Excellent headphones!",
  content: "Great sound quality and comfortable to wear for long periods.",
  verified: true,
  helpful: 12,
  images: ["/reviews/user123/image1.jpg"],
  createdAt: ISODate("2025-12-01T15:00:00Z"),
  updatedAt: ISODate("2025-12-01T15:00:00Z")
}
```

### Common Queries

#### Product Search with Facets

```javascript
db.products.aggregate([
  // Text search
  { $match: { $text: { $search: "wireless headphones bluetooth" } } },

  // Filter by price range
  { $match: { "pricing.salePrice": { $gte: 50, $lte: 300 } } },

  // Filter by availability
  { $match: { "inventory.available": { $gt: 0 } } },

  // Faceted search
  {
    $facet: {
      products: [
        { $sort: { "ratings.average": -1, "pricing.salePrice": 1 } },
        { $skip: 0 },
        { $limit: 20 },
        {
          $project: {
            name: 1,
            sku: 1,
            "pricing.salePrice": 1,
            "pricing.basePrice": 1,
            "ratings.average": 1,
            "ratings.count": 1,
            images: { $slice: ["$images", 1] },
            "specifications.color": 1,
            "inventory.available": 1,
            seo: 1,
          },
        },
      ],
      categories: [
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ],
      brands: [
        { $group: { _id: "$brand", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ],
      priceRanges: [
        {
          $bucket: {
            groupBy: "$pricing.salePrice",
            boundaries: [0, 50, 100, 200, 300, 500],
            default: "500+",
            output: { count: { $sum: 1 } },
          },
        },
      ],
      ratings: [
        {
          $bucket: {
            groupBy: "$ratings.average",
            boundaries: [1, 2, 3, 4, 5],
            output: { count: { $sum: 1 } },
          },
        },
      ],
    },
  },
]);
```

#### Customer Order History

```javascript
db.orders.aggregate([
  { $match: { customerId: ObjectId("507f1f77bcf86cd799439012") } },
  { $sort: { "timestamps.createdAt": -1 } },
  {
    $project: {
      orderNumber: 1,
      status: 1,
      "timestamps.createdAt": 1,
      "timestamps.deliveredAt": 1,
      "pricing.total": 1,
      itemCount: { $size: "$items" },
      items: {
        $map: {
          input: "$items",
          as: "item",
          in: {
            name: "$$item.name",
            quantity: "$$item.quantity",
            totalPrice: "$$item.totalPrice",
            image: "$$item.product.image",
          },
        },
      },
    },
  },
]);
```

#### Sales Analytics Dashboard

```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  {
    $group: {
      _id: {
        year: { $year: "$timestamps.createdAt" },
        month: { $month: "$timestamps.createdAt" },
        day: { $dayOfMonth: "$timestamps.createdAt" },
      },
      totalOrders: { $sum: 1 },
      totalRevenue: { $sum: "$pricing.total" },
      averageOrderValue: { $avg: "$pricing.total" },
      uniqueCustomers: { $addToSet: "$customerId" },
    },
  },
  {
    $project: {
      date: {
        $dateFromParts: {
          year: "$_id.year",
          month: "$_id.month",
          day: "$_id.day",
        },
      },
      totalOrders: 1,
      totalRevenue: 1,
      averageOrderValue: 1,
      uniqueCustomers: { $size: "$uniqueCustomers" },
      _id: 0,
    },
  },
  { $sort: { date: -1 } },
  { $limit: 30 },
]);
```

## Example 2: Social Media Application

### Database Schema

#### Users Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439016"),
  username: "johndoe",
  email: "john@example.com",
  profile: {
    firstName: "John",
    lastName: "Doe",
    bio: "Software developer, tech enthusiast, coffee lover ☕",
    avatar: "/avatars/johndoe.jpg",
    cover: "/covers/johndoe-cover.jpg",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    birthday: ISODate("1990-05-15T00:00:00Z"),
    gender: "male"
  },
  social: {
    followers: 1250,
    following: 485,
    posts: 342,
    isVerified: true,
    verificationBadge: "developer"
  },
  privacy: {
    isPrivate: false,
    allowMessages: "followers",
    showOnlineStatus: true
  },
  notifications: {
    push: true,
    email: true,
    mentions: true,
    likes: true,
    comments: true,
    followers: true
  },
  stats: {
    joinedAt: ISODate("2020-01-15T00:00:00Z"),
    lastActive: ISODate("2025-12-01T10:30:00Z"),
    loginCount: 847,
    deviceInfo: {
      lastDevice: "iPhone 14 Pro",
      lastIP: "192.168.1.100",
      lastLocation: "San Francisco, CA"
    }
  },
  status: "active",
  createdAt: ISODate("2020-01-15T00:00:00Z"),
  updatedAt: ISODate("2025-12-01T10:30:00Z")
}
```

#### Posts Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439017"),
  userId: ObjectId("507f1f77bcf86cd799439016"),
  content: {
    text: "Just deployed my new Node.js application! 🚀 The performance improvements are amazing. #nodejs #webdev #performance",
    images: [
      "/posts/johndoe/2025-12-01/deployment-screenshot.png"
    ],
    videos: [],
    links: [
      {
        url: "https://github.com/johndoe/myapp",
        title: "GitHub Repository",
        description: "Source code for my Node.js application"
      }
    ],
    mentions: ["@techguru", "@webdev"],
    hashtags: ["nodejs", "webdev", "performance"]
  },
  engagement: {
    likes: 45,
    comments: 12,
    shares: 8,
    views: 523,
    clicks: 67
  },
  metadata: {
    location: {
      name: "San Francisco, CA",
      coordinates: [ -122.4194, 37.7749 ]
    },
    device: "iPhone 14 Pro",
    client: "Twitter iOS App v8.2"
  },
  visibility: "public",
  isPinned: false,
  isEdited: false,
  createdAt: ISODate("2025-12-01T10:00:00Z"),
  updatedAt: ISODate("2025-12-01T10:00:00Z")
}
```

#### Comments Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439018"),
  postId: ObjectId("507f1f77bcf86cd799439017"),
  userId: ObjectId("507f1f77bcf86cd799439019"),
  content: "Great work! What kind of performance improvements did you see?",
  parentId: null, // For threaded comments
  replies: [
    ObjectId("507f1f77bcf86cd799439020"),
    ObjectId("507f1f77bcf86cd799439021")
  ],
  engagement: {
    likes: 5,
    replies: 2
  },
  metadata: {
    device: "Web Browser",
    client: "Twitter Web"
  },
  createdAt: ISODate("2025-12-01T10:15:00Z"),
  updatedAt: ISODate("2025-12-01T10:15:00Z")
}
```

#### Follows Collection (Junction Table)

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439022"),
  followerId: ObjectId("507f1f77bcf86cd799439016"), // who follows
  followingId: ObjectId("507f1f77bcf86cd799439019"), // who is being followed
  createdAt: ISODate("2025-11-01T15:30:00Z"),
  status: "active"
}
```

### Common Queries

#### Feed Generation

```javascript
// Get posts from users that current user follows
db.posts.aggregate([
  // Get users that current user follows
  {
    $lookup: {
      from: "follows",
      localField: "userId",
      foreignField: "followingId",
      as: "followInfo",
      pipeline: [
        { $match: { followerId: ObjectId("507f1f77bcf86cd799439016") } },
      ],
    },
  },
  { $match: { "followInfo.0": { $exists: true } } },
  { $sort: { createdAt: -1 } },
  { $limit: 50 },
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user",
      pipeline: [
        {
          $project: {
            username: 1,
            "profile.firstName": 1,
            "profile.lastName": 1,
            "profile.avatar": 1,
            "social.isVerified": 1,
            "social.verificationBadge": 1,
          },
        },
      ],
    },
  },
  { $unwind: "$user" },
  {
    $project: {
      _id: 1,
      "content.text": 1,
      "content.images": 1,
      "content.links": 1,
      engagement: 1,
      createdAt: 1,
      user: 1,
    },
  },
]);
```

#### User Profile with Stats

```javascript
db.users.aggregate([
  { $match: { _id: ObjectId("507f1f77bcf86cd799439016") } },
  {
    $lookup: {
      from: "follows",
      let: { userId: "$_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$followingId", "$$userId"] } } },
        { $count: "followers" },
      ],
      as: "followerCount",
    },
  },
  {
    $lookup: {
      from: "follows",
      let: { userId: "$_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$followerId", "$$userId"] } } },
        { $count: "following" },
      ],
      as: "followingCount",
    },
  },
  {
    $lookup: {
      from: "posts",
      let: { userId: "$_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$userId", "$$userId"] } } },
        { $count: "posts" },
      ],
      as: "postCount",
    },
  },
  {
    $project: {
      username: 1,
      profile: 1,
      privacy: 1,
      followers: {
        $ifNull: [{ $arrayElemAt: ["$followerCount.followers", 0] }, 0],
      },
      following: {
        $ifNull: [{ $arrayElemAt: ["$followingCount.following", 0] }, 0],
      },
      posts: { $ifNull: [{ $arrayElemAt: ["$postCount.posts", 0] }, 0] },
      stats: 1,
      createdAt: 1,
    },
  },
]);
```

## Example 3: IoT Data Pipeline

### Database Schema

#### Devices Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439023"),
  deviceId: "TEMP-001",
  name: "Office Temperature Sensor",
  type: "temperature",
  location: {
    building: "Main Office",
    floor: 3,
    room: "301",
    coordinates: [ -122.4194, 37.7749 ]
  },
  configuration: {
    samplingInterval: 60, // seconds
    alertThresholds: {
      min: 18.0,
      max: 28.0
    },
    calibration: {
      offset: 0.5,
      lastCalibrated: ISODate("2025-11-01T00:00:00Z")
    }
  },
  status: "active",
  lastSeen: ISODate("2025-12-01T10:30:00Z"),
  firmware: "v2.1.3",
  createdAt: ISODate("2025-01-01T00:00:00Z")
}
```

#### Sensor Readings Collection (Bucket Pattern)

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439024"),
  deviceId: "TEMP-001",
  hour: ISODate("2025-12-01T10:00:00Z"),
  readings: [
    { timestamp: ISODate("2025-12-01T10:01:00Z"), value: 22.5 },
    { timestamp: ISODate("2025-12-01T10:02:00Z"), value: 22.7 },
    { timestamp: ISODate("2025-12-01T10:03:00Z"), value: 22.6 },
    // ... up to 60 readings
  ],
  statistics: {
    count: 60,
    average: 22.65,
    min: 22.1,
    max: 23.2,
    standardDeviation: 0.23
  },
  alerts: [
    {
      type: "threshold_exceeded",
      value: 28.5,
      timestamp: ISODate("2025-12-01T10:15:00Z"),
      severity: "warning"
    }
  ],
  processedAt: ISODate("2025-12-01T10:59:00Z")
}
```

### Common Queries

#### Time Series Analysis

```javascript
db.sensorReadings.aggregate([
  {
    $match: {
      deviceId: "TEMP-001",
      hour: { $gte: ISODate("2025-11-01T00:00:00Z") },
    },
  },
  {
    $group: {
      _id: {
        year: { $year: "$hour" },
        month: { $month: "$hour" },
        day: { $dayOfMonth: "$hour" },
      },
      avgTemperature: { $avg: "$statistics.average" },
      minTemperature: { $min: "$statistics.min" },
      maxTemperature: { $max: "$statistics.max" },
      readingCount: { $sum: "$statistics.count" },
      alertCount: { $sum: { $size: "$alerts" } },
    },
  },
  { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
  { $limit: 30 },
]);
```

#### Real-time Alert Monitoring

```javascript
db.sensorReadings.aggregate([
  { $match: { hour: { $gte: ISODate("2025-12-01T00:00:00Z") } } },
  { $unwind: "$alerts" },
  {
    $group: {
      _id: {
        deviceId: "$deviceId",
        alertType: "$alerts.type",
        severity: "$alerts.severity",
      },
      count: { $sum: 1 },
      latestAlert: { $max: "$alerts.timestamp" },
      devices: { $addToSet: "$deviceId" },
    },
  },
  { $match: { count: { $gt: 0 } } },
  { $sort: { latestAlert: -1 } },
]);
```

## Example 4: Content Management System

### Database Schema

#### Content Types Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439025"),
  name: "blog_post",
  displayName: "Blog Post",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      maxLength: 200
    },
    {
      name: "content",
      type: "rich_text",
      required: true
    },
    {
      name: "excerpt",
      type: "text",
      maxLength: 500
    },
    {
      name: "featured_image",
      type: "media",
      required: false
    },
    {
      name: "category",
      type: "reference",
      reference: "categories",
      required: true
    },
    {
      name: "tags",
      type: "array",
      items: { type: "reference", reference: "tags" }
    },
    {
      name: "published_at",
      type: "datetime",
      required: false
    }
  ],
  settings: {
    enableDrafts: true,
    enableScheduling: true,
    enableVersioning: true,
    seoFields: ["title", "excerpt"]
  },
  createdAt: ISODate("2025-01-01T00:00:00Z")
}
```

#### Content Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439026"),
  contentType: "blog_post",
  title: "Getting Started with MongoDB",
  slug: "getting-started-with-mongodb",
  fields: {
    title: "Getting Started with MongoDB",
    content: "<h2>Introduction</h2><p>MongoDB is a powerful NoSQL database...</p>",
    excerpt: "Learn the basics of MongoDB and how to get started with this popular NoSQL database.",
    featured_image: {
      url: "/images/mongodb-intro.jpg",
      alt: "MongoDB logo and database diagram",
      caption: "MongoDB - The Modern Database"
    },
    category: ObjectId("507f1f77bcf86cd799439027"),
    tags: [
      ObjectId("507f1f77bcf86cd799439028"),
      ObjectId("507f1f77bcf86cd799439029")
    ],
    published_at: ISODate("2025-12-01T09:00:00Z")
  },
  metadata: {
    author: ObjectId("507f1f77bcf86cd799439016"),
    status: "published",
    version: 3,
    seo: {
      metaTitle: "Getting Started with MongoDB - Complete Guide",
      metaDescription: "Learn MongoDB basics, setup, and common operations in this comprehensive tutorial.",
      keywords: ["mongodb", "nosql", "database", "tutorial"]
    }
  },
  analytics: {
    views: 1250,
    uniqueViews: 890,
    averageTimeOnPage: 245, // seconds
    bounceRate: 0.35,
    shares: 45
  },
  createdAt: ISODate("2025-11-15T10:00:00Z"),
  updatedAt: ISODate("2025-12-01T09:00:00Z"),
  publishedAt: ISODate("2025-12-01T09:00:00Z")
}
```

### Common Queries

#### Dynamic Content Query

```javascript
// Query content by type with field filtering
db.content.aggregate([
  { $match: { contentType: "blog_post", "metadata.status": "published" } },
  { $sort: { "fields.published_at": -1 } },
  { $limit: 10 },
  {
    $lookup: {
      from: "content",
      localField: "fields.category",
      foreignField: "_id",
      as: "category",
      pipeline: [{ $project: { name: 1, slug: 1 } }],
    },
  },
  {
    $lookup: {
      from: "content",
      localField: "fields.tags",
      foreignField: "_id",
      as: "tags",
      pipeline: [{ $project: { name: 1, slug: 1 } }],
    },
  },
  {
    $project: {
      title: "$fields.title",
      slug: 1,
      excerpt: "$fields.excerpt",
      featuredImage: "$fields.featured_image",
      publishedAt: "$fields.published_at",
      category: { $arrayElemAt: ["$category", 0] },
      tags: 1,
      analytics: 1,
      seo: "$metadata.seo",
    },
  },
]);
```

#### Content Search

```javascript
db.content.aggregate([
  {
    $match: {
      contentType: "blog_post",
      "metadata.status": "published",
      $text: { $search: "mongodb tutorial database" },
    },
  },
  { $sort: { score: { $meta: "textScore" } } },
  {
    $project: {
      title: "$fields.title",
      slug: 1,
      excerpt: "$fields.excerpt",
      score: { $meta: "textScore" },
      publishedAt: "$fields.published_at",
    },
  },
]);
```

These practical examples demonstrate real-world NoSQL database designs and queries that you can adapt for your own applications. Each example shows different aspects of NoSQL design patterns, from e-commerce to social media to IoT and content management.

[← Performance & Scaling](./05_performance.md) | [Back to Main Index](./intro.md)
