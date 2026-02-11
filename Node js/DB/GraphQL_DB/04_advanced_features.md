# 🎯 Advanced GraphQL Features

These are the features that often come up in deeper interviews and real projects.

---

## 1. Fragments

Fragments let you **reuse field selections**.

Without fragments:

```graphql
query GetUserList {
  users {
    id
    name
    email
  }
}

query GetUserDetail($id: ID!) {
  user(id: $id) {
    id
    name
    email
    # more fields...
  }
}
```

With fragments:

```graphql
fragment UserBasicInfo on User {
  id
  name
  email
}

query GetUserList {
  users {
    ...UserBasicInfo
  }
}

query GetUserDetail($id: ID!) {
  user(id: $id) {
    ...UserBasicInfo
    # more fields...
  }
}
```

Benefits:

- DRY (don’t repeat yourself).
- If you change what `UserBasicInfo` means, all queries using it stay consistent.

---

## 2. Interfaces

Interfaces define **common fields** shared by multiple types.

Example: A `Node` interface for globally identifiable objects.

```graphql
interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  name: String!
}

type Post implements Node {
  id: ID!
  title: String!
}

type Query {
  node(id: ID!): Node
}
```

Query:

```graphql
query GetNode($id: ID!) {
  node(id: $id) {
    id
    ... on User {
      name
    }
    ... on Post {
      title
    }
  }
}
```

Resolver (simplified):

```js
const resolvers = {
  Query: {
    node: async (parent, { id }, { db }) => {
      // decode id, decide type, fetch appropriate record
      // return an object with a `__typename` field set
    },
  },
  Node: {
    __resolveType(obj, context, info) {
      if (obj.title) return "Post";
      if (obj.name) return "User";
      return null;
    },
  },
};
```

Interfaces are useful for:

- Shared contracts across entity types.
- Relay-style `Node` interface and global IDs.

---

## 3. Unions

Unions are for fields that can return **one of several types** without shared fields.

Example: Search result could be a `User` or a `Post`.

```graphql
union SearchResult = User | Post

type Query {
  search(term: String!): [SearchResult!]!
}
```

Query:

```graphql
query Search($term: String!) {
  search(term: $term) {
    ... on User {
      id
      name
    }
    ... on Post {
      id
      title
    }
  }
}
```

Resolve type:

```js
const resolvers = {
  SearchResult: {
    __resolveType(obj) {
      if (obj.username) return "User";
      if (obj.title) return "Post";
      return null;
    },
  },
};
```

---

## 4. Directives

Directives modify execution behavior.

### Built-in Directives

- `@include(if: Boolean!)` – include field only if condition is true.
- `@skip(if: Boolean!)` – skip field if condition is true.
- `@deprecated(reason: String)` – mark a field as deprecated.

Example:

```graphql
query UserProfile($id: ID!, $withEmail: Boolean!) {
  user(id: $id) {
    id
    name
    email @include(if: $withEmail)
  }
}
```

Deprecation:

```graphql
type User {
  id: ID!
  name: String!
  username: String! @deprecated(reason: "Use handle instead")
  handle: String!
}
```

This is how GraphQL handles **versioning** instead of `/v1` and `/v2` endpoints.

---

## 5. Custom Scalars

Sometimes built-in scalars are not enough.

Example: `DateTime` scalar.

Schema:

```graphql
scalar DateTime

type Post {
  id: ID!
  title: String!
  createdAt: DateTime!
}
```

Resolver (conceptual):

```js
const { GraphQLScalarType, Kind } = require("graphql");

const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "ISO-8601 date-time scalar",
  serialize(value) {
    // value from server → client
    return value instanceof Date ? value.toISOString() : value;
  },
  parseValue(value) {
    // value from client → server variables
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

const resolvers = {
  DateTime,
  // ...other resolvers
};
```

Other examples: `Email`, `URL`, `JSON`, `BigInt`.

---

## 6. Subscriptions (Real-Time GraphQL)

Subscriptions are long-lived operations to receive real-time updates.

Schema:

```graphql
type Message {
  id: ID!
  text: String!
  createdAt: DateTime!
}

type Subscription {
  messageAdded: Message!
}

type Mutation {
  addMessage(text: String!): Message!
}
```

Conceptual behavior:

- Client subscribes with `subscription { messageAdded { id text } }`.
- Server keeps WebSocket connection open.
- When a message is added (via mutation or external event), server pushes data to all subscribers.

This is used for:

- Chats
- Notifications
- Live dashboards

---

## 7. Federation (Conceptual)

Large companies split schemas across many services.

High-level: **GraphQL Federation** (Apollo Federation) lets you:

- Have multiple subgraphs (e.g. Users service, Products service).
- Compose them into a single **supergraph** schema.
- Query across services as if it were one graph.

You don’t need to implement federation now, but you should know:

- It exists to solve **schema at scale**.
- It uses directives like `@key`, `@extends` to define ownership of fields.

---

## Interview-Oriented Notes

You should be able to talk about:

- Why fragments are useful for large frontend apps.
- When to use interfaces vs unions.
- How deprecation works in GraphQL and why it’s preferred over versioned endpoints.
- What custom scalars are and give an example (`DateTime`).
- The high-level idea of subscriptions and federation.

---

## Extra Topics to Explore Later

- Apollo Federation (@key, @extends, @provides, @requires).
- Live queries and deferred/streamed results (e.g. `@defer`, `@stream`).
- Schema stitching and GraphQL Mesh.

[← Relationships & N+1](./03_relationships_n_plus_one.md) | [Next: Performance & Security →](./05_performance_security.md)
