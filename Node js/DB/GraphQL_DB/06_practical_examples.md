# 🏆 Practical GraphQL Examples

These mirror your SQL practicals: **Student Management**, **E-commerce**, and **Blog/CMS**.

Goals:

- Connect GraphQL concepts to **real schemas**.
- Show realistic **queries + mutations**.
- Make you think about **DB operations behind resolvers**.

---

## Example 1: Student Management System

### 1.1 Schema (Simplified)

```graphql
type Department {
  id: ID!
  name: String!
  headProfessor: String
}

type Student {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  gpa: Float
  status: String!
  department: Department
  enrollments: [Enrollment!]!
}

type Course {
  id: ID!
  code: String!
  name: String!
  credits: Int!
  department: Department
}

type Enrollment {
  id: ID!
  student: Student!
  course: Course!
  semester: String!
  year: Int!
  grade: String
}

type DepartmentGpa {
  department: Department!
  totalStudents: Int!
  avgGpa: Float
  honorStudents: Int!
}

type Query {
  student(id: ID!): Student
  students(departmentId: ID): [Student!]!
  departmentGpaReport: [DepartmentGpa!]!
}

input EnrollStudentInput {
  studentId: ID!
  courseId: ID!
  semester: String!
  year: Int!
}

input UpdateGradeInput {
  enrollmentId: ID!
  grade: String!
}

type Mutation {
  enrollStudent(input: EnrollStudentInput!): Enrollment!
  updateGrade(input: UpdateGradeInput!): Enrollment!
}
```

### 1.2 Query: Department GPA Report

```graphql
query DepartmentGpaReport {
  departmentGpaReport {
    department {
      id
      name
    }
    totalStudents
    avgGpa
    honorStudents
  }
}
```

**SQL Concept** (approximate):

```sql
SELECT
  d.department_id,
  d.department_name,
  COUNT(s.student_id) AS total_students,
  AVG(s.gpa) AS avg_gpa,
  COUNT(CASE WHEN s.gpa >= 3.5 THEN 1 END) AS honor_students
FROM departments d
LEFT JOIN students s ON d.department_id = s.department_id
GROUP BY d.department_id, d.department_name;
```

Resolver would run a query like above and map each row to `DepartmentGpa`.

### 1.3 Mutation: Enroll Student

```graphql
mutation EnrollStudent($input: EnrollStudentInput!) {
  enrollStudent(input: $input) {
    id
    student {
      id
      firstName
      lastName
    }
    course {
      id
      code
      name
    }
    semester
    year
    grade
  }
}
```

Variables:

```json
{
  "input": {
    "studentId": "1",
    "courseId": "101",
    "semester": "Fall",
    "year": 2025
  }
}
```

**Backend idea:** insert row into `enrollments` table and return joined data.

---

## Example 2: E-commerce

### 2.1 Schema (Simplified)

```graphql
type Customer {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  type: String!
  orders: [Order!]!
}

type Product {
  id: ID!
  name: String!
  category: String
  price: Float!
  stockQuantity: Int!
}

type OrderItem {
  id: ID!
  product: Product!
  quantity: Int!
  unitPrice: Float!
}

type Order {
  id: ID!
  customer: Customer!
  items: [OrderItem!]!
  status: String!
  createdAt: String!
  subtotal: Float!
  total: Float!
}

type MonthlySales {
  month: String!
  totalOrders: Int!
  uniqueCustomers: Int!
  totalSales: Float!
  avgOrderValue: Float!
}

type Query {
  monthlySales: [MonthlySales!]!
  topProducts(limit: Int = 10): [Product!]!
  customerLifetimeValue(customerId: ID!): Float!
}

input OrderItemInput {
  productId: ID!
  quantity: Int!
}

input CreateOrderInput {
  customerId: ID!
  items: [OrderItemInput!]!
}

type Mutation {
  createOrder(input: CreateOrderInput!): Order!
}
```

### 2.2 Query: Monthly Sales Report

```graphql
query MonthlySalesReport {
  monthlySales {
    month
    totalOrders
    uniqueCustomers
    totalSales
    avgOrderValue
  }
}
```

**SQL Concept** (similar to your SQL example):

```sql
SELECT
  DATE_FORMAT(order_date, '%Y-%m') AS month,
  COUNT(DISTINCT o.order_id) AS total_orders,
  COUNT(DISTINCT o.customer_id) AS unique_customers,
  SUM(o.total_amount) AS total_sales,
  AVG(o.total_amount) AS avg_order_value
FROM orders o
WHERE o.status != 'cancelled'
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month DESC;
```

Resolver returns an array of `MonthlySales` objects.

### 2.3 Mutation: Create Order

```graphql
mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    id
    status
    total
    customer {
      id
      firstName
      lastName
    }
    items {
      product {
        id
        name
      }
      quantity
      unitPrice
    }
  }
}
```

Backend tasks:

1. Validate products and stock.
2. Insert into `orders` table.
3. Insert into `order_items` table.
4. Update stock quantities.
5. Return joined data.

---

## Example 3: Blog / CMS

### 3.1 Schema (Simplified)

```graphql
type User {
  id: ID!
  username: String!
  email: String!
  fullName: String
  posts: [Post!]!
}

type Tag {
  id: ID!
  name: String!
}

type Post {
  id: ID!
  title: String!
  slug: String!
  content: String!
  status: String!
  publishedAt: String
  viewCount: Int!
  likeCount: Int!
  commentCount: Int!
  author: User!
  tags: [Tag!]!
}

type PopularPost {
  post: Post!
  score: Float!
}

type Query {
  popularPosts(limit: Int = 10): [PopularPost!]!
}

input CreatePostInput {
  title: String!
  content: String!
  tags: [String!]!
}

input PublishPostInput {
  postId: ID!
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
  publishPost(input: PublishPostInput!): Post!
}
```

### 3.2 Query: Popular Posts

```graphql
query PopularPosts($limit: Int = 10) {
  popularPosts(limit: $limit) {
    score
    post {
      id
      title
      slug
      author {
        username
      }
      viewCount
      likeCount
      commentCount
      tags {
        name
      }
    }
  }
}
```

Backend idea:

- Use a scoring formula similar to your SQL (`views * 0.3 + likes * 0.4 + comments * 0.3`).
- Compute `score` in SQL or in JS after fetching data.

---

## Interview-Oriented Notes

For each domain (students, e-commerce, blog), be able to discuss:

- **Why the schema is designed that way** (types, relations, fields).
- How you’d **avoid N+1** when resolving nested fields.
- How analytics queries (like monthly sales, popular posts) map to SQL.
- What mutations you’d expose and what validations they require.

This shows you can move from **product requirements → schema → resolvers → database**.

---

## Extra Topics to Explore Later

- Handling bulk operations in GraphQL (batch mutations vs per-item mutations).
- Designing GraphQL schemas for search & filtering (complex filters, input types).
- Exposing analytics and reporting queries efficiently.

[← Performance & Security](./05_performance_security.md) | [Next: Backend Integration →](./07_backend_integration.md)
