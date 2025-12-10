# 🔗 Relationships & N+1 Problem

You already know how relational data works from SQL. GraphQL lets clients **traverse** these relationships directly in their queries.

---

## 1. Modeling Relationships in GraphQL

### One-to-Many

Example: One user has many posts.

```graphql
type User {
  id: ID!
  name: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

type Query {
  user(id: ID!): User
  posts: [Post!]!
}
```

### Many-to-Many

Example: Posts and Tags.

```graphql
type Tag {
  id: ID!
  name: String!
  posts: [Post!]!
}

# Post already defines: tags: [Tag!]!
```

Backed by a SQL junction table like `post_tags(post_id, tag_id)`.

### One-to-One

Example: User and Profile.

```graphql
type Profile {
  id: ID!
  bio: String
  avatarUrl: String
}

type User {
  id: ID!
  name: String!
  profile: Profile
}
```

---

## 2. Nested Queries

Example query:

```graphql
query GetUserWithPosts($id: ID!) {
  user(id: $id) {
    id
    name
    posts {
      id
      title
      author {
        id
        name
      }
    }
  }
}
```

Conceptually, this might trigger SQL like:

- `SELECT * FROM users WHERE id = ?` (for `user`)
- `SELECT * FROM posts WHERE author_id = ?` (for `user.posts`)
- Possibly more queries for nested `author` fields (if not careful).

---

## 3. Field Resolvers

By default, GraphQL will:

- Use the resolver defined on the parent type (e.g. `Query.user`).
- For nested fields (`user.posts`), it will look for a resolver for the `posts` field on the `User` type.

Example resolvers:

```js
const resolvers = {
  Query: {
    user: async (parent, { id }, { db }) => {
      const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0] || null;
    },
  },

  User: {
    posts: async (user, args, { db }) => {
      const [rows] = await db.execute(
        "SELECT * FROM posts WHERE author_id = ?",
        [user.id]
      );
      return rows;
    },
  },

  Post: {
    author: async (post, args, { db }) => {
      const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [
        post.author_id,
      ]);
      return rows[0] || null;
    },
  },
};
```

This is simple but can create performance issues.

---

## 4. The N+1 Problem

Imagine a query:

```graphql
query {
  posts {
    id
    title
    author {
      id
      name
    }
  }
}
```

Naive execution:

1. Query all posts:
   - `SELECT * FROM posts;` → N posts.
2. For each post, run a query for the author:
   - `SELECT * FROM users WHERE id = ?;` (N times).

Total: **1 + N** queries → **N+1 problem**.

This is exactly what FAANG-style interviews expect you to recognize and fix.

---

## 5. Fixing N+1 with DataLoader (Batching)

**Idea:**

- Collect all needed `author_id`s for the current GraphQL operation.
- Run **one** SQL query like `SELECT * FROM users WHERE id IN (...)`.
- Map results back to each request.

### Creating a DataLoader

```js
const DataLoader = require("dataloader");

function createUserLoader(db) {
  return new DataLoader(async (userIds) => {
    // userIds: ["1", "2", "1", "3", ...]
    const uniqueIds = [...new Set(userIds)];

    const [rows] = await db.execute(
      `SELECT * FROM users WHERE id IN (${uniqueIds
        .map(() => "?")
        .join(", ")})`,
      uniqueIds
    );

    const userById = new Map(rows.map((user) => [String(user.id), user]));

    return userIds.map((id) => userById.get(String(id)) || null);
  });
}
```

### Attaching DataLoader to Context

```js
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      db,
      loaders: {
        userById: createUserLoader(db),
      },
    };
  },
});
```

### Using DataLoader in Resolvers

```js
const resolvers = {
  Query: {
    posts: async (parent, args, { db }) => {
      const [rows] = await db.execute("SELECT * FROM posts");
      return rows;
    },
  },

  Post: {
    author: (post, args, { loaders }) => {
      // DataLoader batches and caches requests automatically
      return loaders.userById.load(post.author_id);
    },
  },
};
```

Now the same query may execute SQL like:

- `SELECT * FROM posts;` (1 query)
- `SELECT * FROM users WHERE id IN (1, 2, 3, ...);` (1 query)

Total: **2 queries instead of N+1**.

---

## 6. Relationship Design Tips (Schema Level)

- Model relationships from the **client’s perspective**:
  - What objects are commonly fetched together?
  - How will frontend devs traverse the graph?
- Don’t mirror DB schema blindly; sometimes you expose a simplified model.
- Normalize vs denormalize:
  - You can expose redundant fields if it makes client queries simpler, even if DB is normalized.

Example: E-commerce

```graphql
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
  total: Float!
}
```

`total` might be computed, not stored.

---

## Interview-Oriented Notes

Be able to answer:

- How do you model relationships in GraphQL?
- What is the N+1 problem in GraphQL and how do you fix it?
- How does DataLoader (or similar mechanisms) work conceptually?
- Why might your GraphQL schema differ from your database schema?

---

## Extra Topics to Explore Later

- Advanced batching strategies for multiple data sources.
- Field-level caching strategies (e.g. in-memory, Redis).
- GraphQL Federation’s approach to relationships across services.

[← CRUD with GraphQL](./02_crud_operations.md) | [Next: Advanced Features →](./04_advanced_features.md)
