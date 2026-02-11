# 🏗️ GraphQL Basics

## What is GraphQL?

- A **query language** for APIs plus a **runtime** that executes those queries.
- Created at Facebook to solve problems with REST (over-fetching, under-fetching, many endpoints).
- You define a **schema** that describes:
  - What data types exist
  - What operations (queries/mutations/subscriptions) are possible

Instead of `GET /users/1`, `GET /users/1/posts`, etc., you send **one** GraphQL query and describe the shape of the data you want.

---

## Core Building Blocks

### 1. Schema Definition Language (SDL)

GraphQL schemas are usually written in SDL, a human-readable syntax.

```graphql
# schema.graphql

type User {
  id: ID!
  name: String!
  email: String!
  age: Int
}

type Query {
  user(id: ID!): User
  users: [User!]!
}

# Mutations will be defined later
```

Concept mapping with SQL:

- `User` type ≈ `users` table (but not exactly; types are API shapes, not necessarily 1:1 with tables).
- Fields like `id`, `name`, `email` ≈ columns.
- `Query.user` ≈ `SELECT * FROM users WHERE id = ?`.

### 2. Scalars

Built-in scalar types:

- `Int` – 32-bit integer
- `Float` – Double-precision floating point
- `String` – UTF-8 string
- `Boolean` – `true` or `false`
- `ID` – String or number, used as unique identifier (serialized as string)

Examples:

```graphql
type Product {
  id: ID!
  name: String!
  price: Float!
  inStock: Boolean!
}
```

### 3. Non-Null and Lists

Modifiers:

- `Type!` – cannot be `null`.
- `[Type]` – list of `Type` (items may be null, list may be null).
- `[Type!]!` – list is non-null and items are non-null.

Examples:

```graphql
type User {
  id: ID! # always present
  name: String! # always present
  email: String! # always present
  age: Int # can be null
  roles: [String!]! # non-null list of non-null roles
}
```

Design guideline (FAANG-style thinking):

- Use `!` for fields that are **required for your API contract**.
- Avoid marking everything non-null until you’re sure; non-null is a promise you must always keep.

### 4. Object Types

Object types are the main way to model entities.

```graphql
type Post {
  id: ID!
  title: String!
  content: String!
  author: User! # relationship
  tags: [String!]!
}
```

This does **not** say where data comes from (SQL/NoSQL/REST); that’s handled by **resolvers**.

---

## Root Types: Query, Mutation, Subscription

### Query

- Read-only operations (think **SELECT** in SQL).

```graphql
type Query {
  me: User
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
}
```

Example query:

```graphql
query GetUserAndFriends($id: ID!) {
  user(id: $id) {
    id
    name
    friends {
      id
      name
    }
  }
}
```

### Mutation

- Write operations (think **INSERT/UPDATE/DELETE**).

```graphql
type Mutation {
  createUser(name: String!, email: String!): User!
  updateUserEmail(id: ID!, email: String!): User!
  deleteUser(id: ID!): Boolean!
}
```

We will refine this later with **input types** and more realistic patterns.

### Subscription

- Real-time operations (e.g. via WebSockets).
- Not always required for interviews, but knowing the concept is valuable.

```graphql
type Subscription {
  userCreated: User!
}
```

---

## Resolvers: Connecting Schema to Data

A **resolver** is a function that tells GraphQL how to fetch the value for a field.

Resolver signature in Node.js:

```js
(fieldParent, args, context, info) => value;
```

Basic example:

```js
const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
];

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, args) => users.find((u) => u.id === args.id) || null,
  },
};
```

How this compares to SQL:

- `Query.user` resolver ≈ `SELECT * FROM users WHERE id = ?`.
- But you can **also** call REST APIs, microservices, or in-memory caches inside resolvers.

---

## End-to-End: Small Working Example

### Schema

```graphql
type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  users: [User!]!
}
```

### Node.js Setup (Apollo Server-style)

```js
const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }
`;

const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
];

const resolvers = {
  Query: {
    users: () => users,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

### Example Query

```graphql
query {
  users {
    id
    name
    email
  }
}
```

### Example Response

```json
{
  "data": {
    "users": [
      {
        "id": "1",
        "name": "Alice",
        "email": "alice@example.com"
      },
      {
        "id": "2",
        "name": "Bob",
        "email": "bob@example.com"
      }
    ]
  }
}
```

---

## Interview-Oriented Notes

- **Key idea**: GraphQL is **schema-first** and **client-driven**.
- You should be able to explain:
  - What the schema is and why it matters.
  - How resolvers map fields to data sources.
  - How GraphQL differs from REST.

When answering interview questions, always bring it back to:

- **Strong typing**
- **Single endpoint**
- **Client-controlled shape of data**
- **Efficient fetching over slow networks (mobile)**

---

## Extra Topics to Explore Later

If you need to go beyond this file:

- Schema-first vs code-first GraphQL development.
- Remote schema stitching and GraphQL federation.
- GraphQL over gRPC or message queues.

[← Back to Intro](./intro.md) | [Next: CRUD with GraphQL →](./02_crud_operations.md)
