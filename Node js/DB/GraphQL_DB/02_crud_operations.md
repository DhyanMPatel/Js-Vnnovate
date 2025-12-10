# 📝 CRUD with GraphQL

In SQL you think in **INSERT / SELECT / UPDATE / DELETE**. In GraphQL we use:

- **Queries** for reading (R of CRUD).
- **Mutations** for creating, updating, deleting (CUD of CRUD).

---

## 1. Read (Queries)

### Basic Selection

Schema excerpt:

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
}

type Query {
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
}
```

Example query to fetch one user:

```graphql
query GetUser {
  user(id: "1") {
    id
    name
    email
  }
}
```

Example query to fetch multiple users with pagination:

```graphql
query GetUsers {
  users(limit: 10, offset: 0) {
    id
    name
    email
  }
}
```

Concept mapping:

- `user(id: "1")` ≈ `SELECT * FROM users WHERE id = 1`.
- `users(limit: 10, offset: 0)` ≈ `SELECT * FROM users LIMIT 10 OFFSET 0`.

### Using Variables

Instead of hardcoding arguments, we use **variables**:

```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
  }
}
```

Variables JSON:

```json
{
  "id": "1"
}
```

This is how frontends (React, Next.js, etc.) send dynamic values.

---

## 2. Create (Mutations)

### Simple Mutation

Schema excerpt:

```graphql
input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

type Mutation {
  createUser(input: CreateUserInput!): User!
}
```

Resolver (conceptual):

```js
const resolvers = {
  Mutation: {
    createUser: async (parent, { input }, { db }) => {
      // Example using SQL
      const { name, email, age } = input;
      const [result] = await db.execute(
        "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
        [name, email, age]
      );

      const insertedId = result.insertId;
      const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [
        insertedId,
      ]);

      return rows[0];
    },
  },
};
```

Mutation query:

```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
    age
  }
}
```

Variables:

```json
{
  "input": {
    "name": "Alice",
    "email": "alice@example.com",
    "age": 25
  }
}
```

---

## 3. Update (Mutations)

Schema excerpt:

```graphql
input UpdateUserInput {
  name: String
  email: String
  age: Int
}

type Mutation {
  updateUser(id: ID!, input: UpdateUserInput!): User!
}
```

Resolver (conceptual):

```js
const resolvers = {
  Mutation: {
    updateUser: async (parent, { id, input }, { db }) => {
      // Build dynamic SQL depending on provided fields
      const fields = [];
      const values = [];

      if (input.name !== undefined) {
        fields.push("name = ?");
        values.push(input.name);
      }
      if (input.email !== undefined) {
        fields.push("email = ?");
        values.push(input.email);
      }
      if (input.age !== undefined) {
        fields.push("age = ?");
        values.push(input.age);
      }

      if (fields.length === 0) {
        throw new Error("No fields to update");
      }

      values.push(id);

      await db.execute(
        `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
        values
      );

      const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0];
    },
  },
};
```

Mutation query:

```graphql
mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    name
    email
    age
  }
}
```

---

## 4. Delete (Mutations)

Schema excerpt:

```graphql
type Mutation {
  deleteUser(id: ID!): Boolean!
}
```

Resolver:

```js
const resolvers = {
  Mutation: {
    deleteUser: async (parent, { id }, { db }) => {
      const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);
      return result.affectedRows > 0;
    },
  },
};
```

Mutation query:

```graphql
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)
}
```

Response example:

```json
{
  "data": {
    "deleteUser": true
  }
}
```

---

## 5. Pagination

### Offset-Based Pagination

Schema excerpt:

```graphql
type Query {
  users(limit: Int = 10, offset: Int = 0): [User!]!
}
```

Resolver (SQL-style):

```js
const resolvers = {
  Query: {
    users: async (parent, { limit = 10, offset = 0 }, { db }) => {
      const [rows] = await db.execute(
        "SELECT * FROM users ORDER BY id LIMIT ? OFFSET ?",
        [limit, offset]
      );
      return rows;
    },
  },
};
```

Query:

```graphql
query PaginatedUsers($limit: Int!, $offset: Int!) {
  users(limit: $limit, offset: $offset) {
    id
    name
    email
  }
}
```

### Cursor-Based Pagination (Relay-Style)

This approach is more robust for large datasets and changing data.

Schema idea:

```graphql
type UserEdge {
  cursor: String!
  node: User!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}

type UserConnection {
  edges: [UserEdge!]!
  pageInfo: PageInfo!
}

type Query {
  usersConnection(first: Int!, after: String): UserConnection!
}
```

Query example:

```graphql
query GetUsersConnection($first: Int!, $after: String) {
  usersConnection(first: $first, after: $after) {
    edges {
      cursor
      node {
        id
        name
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

Concept (high level):

- `cursor` is usually an encoded primary key or timestamp.
- Backend returns `endCursor` for the last item; client sends it in `after` to get the next page.

---

## 6. Error Handling Patterns

GraphQL response has two top-level fields:

- `data`
- `errors`

Example error response:

```json
{
  "data": {
    "createUser": null
  },
  "errors": [
    {
      "message": "Email already exists",
      "path": ["createUser"],
      "extensions": {
        "code": "BAD_USER_INPUT"
      }
    }
  ]
}
```

Many teams also use a **domain error** pattern:

```graphql
type UserError {
  message: String!
  field: String
}

type CreateUserPayload {
  user: User
  errors: [UserError!]!
}

type Mutation {
  createUser(input: CreateUserInput!): CreateUserPayload!
}
```

This keeps `errors` in `data` instead of relying only on top-level GraphQL errors.

---

## Interview-Oriented Notes

Be ready to explain:

- How CRUD is represented via **queries** and **mutations**.
- Why mutations often return the updated object (not just `Boolean`).
- Differences between offset and cursor pagination and trade-offs.
- How you’d handle validation and domain errors in a mutation.

---

## Extra Topics to Explore Later

- Relay specification and full connection model.
- Error codes and global error handling strategies (e.g. Apollo `formatError`).
- Optimistic UI updates on the client side (Apollo/Relay specifics).

[← Back to Basics](./01_basics.md) | [Next: Relationships & N+1 →](./03_relationships_n_plus_one.md)
