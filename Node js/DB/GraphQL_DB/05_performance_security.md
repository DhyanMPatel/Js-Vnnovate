# ⚡ Performance & Security in GraphQL

GraphQL makes it easy for clients to ask for **a lot** of data. As a backend engineer (especially for FAANG-style roles), you must control **performance**, **cost**, and **security**.

---

## 1. Query Depth & Complexity Limits

Problem: Clients can send deeply nested queries that explode in cost.

Example dangerous query:

```graphql
query {
  user(id: "1") {
    friends {
      friends {
        friends {
          friends {
            # ...deep nesting
          }
        }
      }
    }
  }
}
```

### Depth Limiting (Concept)

- Before executing a query, analyze its AST.
- If depth > allowed max (e.g. 5), reject it.

Pseudocode:

```js
function getDepth(field, currentDepth = 0) {
  if (!field.selectionSet) return currentDepth;
  return Math.max(
    ...field.selectionSet.selections.map((child) =>
      getDepth(child, currentDepth + 1)
    )
  );
}

// if (depth > MAX_DEPTH) throw error
```

### Complexity Scoring (Concept)

- Assign cost to each field (e.g. `1` for simple, `10` for heavy aggregations).
- Sum up costs based on query structure.
- Reject queries above a threshold.

---

## 2. Batching & Caching

### DataLoader (Again, but from a Performance Angle)

- Solves N+1 problem.
- Reduces DB/network round-trips.

### Response Caching

- Cache results of read-only queries.
- Can use:
  - HTTP caching (if using persisted queries).
  - Redis / in-memory cache for hot data.

Conceptual pattern:

```js
async function cachedQuery(cacheKey, ttlMs, fetchFn) {
  const cached = await cache.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const result = await fetchFn();
  await cache.set(cacheKey, JSON.stringify(result), "PX", ttlMs);
  return result;
}
```

Use in resolver:

```js
Query: {
  topPosts: (parent, args, { db, cache }) =>
    cachedQuery("topPosts", 60_000, async () => {
      const [rows] = await db.execute("SELECT * FROM posts ORDER BY score DESC LIMIT 10");
      return rows;
    }),
}
```

---

## 3. Pagination Strategies

### Offset-Based

- Simple: `limit`, `offset`.
- Works well for small datasets.
- Problems:
  - Data shifting between pages when new rows are inserted.
  - Performance on large offsets.

### Cursor-Based

- Use stable cursors (e.g. `id`, timestamp).
- No `OFFSET`; use `WHERE id > lastId` etc.

SQL example:

```sql
SELECT *
FROM users
WHERE id > ?
ORDER BY id
LIMIT ?;
```

This is more efficient on large tables and stable under inserts.

---

## 4. Authentication & Authorization

### Authentication (Who are you?)

- Common approach: JWT or session-based auth.
- Decode token in a middleware, inject `user` into `context`.

Conceptual context setup:

```js
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const user = verifyTokenOrNull(token);
    return { user, db };
  },
});
```

### Authorization (What can you do?)

Resolver-level checks:

```js
const resolvers = {
  Query: {
    me: (parent, args, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return user;
    },
  },
  Mutation: {
    deleteUser: async (parent, { id }, { user, db }) => {
      if (!user || !user.isAdmin) {
        throw new Error("Not authorized");
      }
      // perform delete
    },
  },
};
```

You can also implement **field-level auth** with custom directives.

---

## 5. Rate Limiting & Abuse Protection

Even with depth/complexity limits, someone can:

- Send many small but expensive queries.

Approach:

- Track requests per user/IP per time window.
- Reject or throttle when limits are exceeded.

Conceptual example with in-memory map (for understanding only):

```js
const buckets = new Map();

function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  const bucket = buckets.get(key) || { count: 0, expiresAt: now + windowMs };

  if (now > bucket.expiresAt) {
    bucket.count = 0;
    bucket.expiresAt = now + windowMs;
  }

  bucket.count++;
  buckets.set(key, bucket);

  if (bucket.count > limit) {
    throw new Error("Too many requests");
  }
}

// in context / middleware
rateLimit(userOrIp, 100, 60_000); // 100 req/min
```

In real systems you’d use Redis or a dedicated rate-limiter.

---

## 6. Versioning & Deprecation

In REST, you might have `/api/v1` and `/api/v2`.

In GraphQL:

- You keep **one schema**.
- Mark fields as deprecated with `@deprecated`.
- Add new fields/types; keep old ones for a while.

Example:

```graphql
type User {
  id: ID!
  fullName: String! @deprecated(reason: "Use firstName + lastName")
  firstName: String!
  lastName: String!
}
```

Clients can gradually migrate, and tooling can show warnings.

---

## 7. Error Handling & Observability

### Error Categories

- **User errors** (validation, not found) → return within data payload.
- **System errors** (DB down, unexpected exception) → GraphQL `errors` array, logs, alerts.

### Logging

Log:

- Query string (or operation name + hash for security).
- Variables (sanitized).
- Execution time.
- Error stack traces (on server only).

Conceptual wrapper:

```js
async function executeResolver(resolver, parent, args, context, info, logger) {
  const start = Date.now();
  try {
    const result = await resolver(parent, args, context, info);
    const duration = Date.now() - start;
    logger.debug("GraphQL resolver", {
      fieldName: info.fieldName,
      duration,
    });
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    logger.error("GraphQL resolver error", {
      fieldName: info.fieldName,
      duration,
      message: error.message,
    });
    throw error;
  }
}
```

---

## Interview-Oriented Notes

Be able to:

- Explain why GraphQL servers need **depth/complexity limits**.
- Describe the **N+1 problem** and **DataLoader** as a solution.
- Talk through **auth** and **authorization** in GraphQL with `context`.
- Mention **rate limiting** and **caching** strategies.
- Describe how **versioning via deprecation** works.

---

## Extra Topics to Explore Later

- Persisted queries (hash-based) for improved caching and security.
- Operation whitelisting and safelists.
- Distributed tracing (OpenTelemetry) for GraphQL resolvers.

[← Advanced Features](./04_advanced_features.md) | [Next: Practical Examples →](./06_practical_examples.md)
