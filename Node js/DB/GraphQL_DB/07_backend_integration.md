# 🔧 Backend Integration with GraphQL (Node.js Focus)

This mirrors your `07_backend_integration.md` for SQL: how to run GraphQL **in production**.

---

## 1. Building a GraphQL Server (Apollo + Node.js)

### 1.1 Basic Setup

```js
const { ApolloServer, gql } = require("apollo-server");
const mysql = require("mysql2/promise");

// 1) Create DB pool (similar to your SQL examples)
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "my_app_db",
  connectionLimit: 10,
});

// 2) Define schema (SDL)
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }
`;

// 3) Implement resolvers
const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      const [rows] = await context.db.execute("SELECT * FROM users");
      return rows;
    },
    user: async (parent, { id }, context) => {
      const [rows] = await context.db.execute(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );
      return rows[0] || null;
    },
  },
};

// 4) Create server with context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => ({
    db: pool,
  }),
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 GraphQL server ready at ${url}`);
});
```

Key idea: **Resolvers should be thin** and call services/repositories, not raw SQL everywhere.

---

## 2. Schema-First vs Code-First

### Schema-First

- Write SDL first (`.graphql` or template strings).
- Then write resolvers to match.
- Tools: Apollo Server, graphql-tools.

### Code-First

- Write types and resolvers in code (TypeScript decorators, builders).
- Tools: TypeGraphQL, Nexus, NestJS GraphQL.

Interview tip: mention pros/cons.

- Schema-first → clear API contract, good for cross-language teams.
- Code-first → strong TypeScript integration, easier refactoring.

---

## 3. Using ORMs / Repositories in Resolvers

### 3.1 Example with a Repository Pattern

```js
class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async findById(id) {
    const [rows] = await this.db.execute("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
    return rows[0] || null;
  }

  async findAll(limit = 50) {
    const [rows] = await this.db.execute(
      "SELECT * FROM users ORDER BY id LIMIT ?",
      [limit]
    );
    return rows;
  }
}

const resolvers = {
  Query: {
    users: (parent, args, { repositories }) => {
      return repositories.user.findAll();
    },
    user: (parent, { id }, { repositories }) => {
      return repositories.user.findById(id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    db: pool,
    repositories: {
      user: new UserRepository(pool),
    },
  }),
});
```

This keeps **business logic** out of resolvers.

### 3.2 ORM (High-Level)

With Sequelize/TypeORM, resolvers usually call ORM methods (`User.findByPk`, etc.) instead of raw SQL.

---

## 4. Testing GraphQL APIs

### 4.1 Unit Testing Resolvers

- Mock DB/repositories.
- Call resolver functions directly.

Example (conceptual):

```js
test("users resolver returns list", async () => {
  const fakeUsers = [{ id: 1, name: "Alice", email: "alice@example.com" }];

  const mockRepo = {
    findAll: jest.fn().mockResolvedValue(fakeUsers),
  };

  const result = await resolvers.Query.users(
    null,
    {},
    {
      repositories: { user: mockRepo },
    }
  );

  expect(result).toEqual(fakeUsers);
  expect(mockRepo.findAll).toHaveBeenCalled();
});
```

### 4.2 Integration Testing the GraphQL Endpoint

- Spin up test server against test DB (like your SQL `TestDatabase` pattern).
- Use `supertest` or Apollo’s testing utilities to send GraphQL operations.

---

## 5. Logging, Monitoring & Observability

You want visibility into:

- Slow resolvers
- Frequent queries
- Errors & stack traces

Concept: wrap resolvers or use Apollo plugins to track:

- `operationName`
- `duration` per field
- Error frequency

Example plugin idea (simplified):

```js
const loggingPlugin = {
  requestDidStart(requestContext) {
    const start = Date.now();
    return {
      willSendResponse(ctx) {
        const duration = Date.now() - start;
        console.log("GraphQL request", {
          operationName: ctx.operationName,
          duration,
        });
      },
    };
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [loggingPlugin],
});
```

In production, you would send this to a logging system (ELK, Datadog, etc.).

---

## 6. Production Concerns

### 6.1 Performance Hardening

- Apply **query depth/complexity limits**.
- Use **DataLoader** for batching DB calls.
- Cache hot queries (Redis, in-memory).

### 6.2 Security

- Enforce **auth** in `context`.
- Validate inputs carefully (especially file uploads, custom scalars).
- Limit query size (max bytes) and variables size.

### 6.3 Deployment

Patterns:

- GraphQL server as a standalone Node.js service behind a reverse proxy / gateway.
- Use load balancers and multiple instances.
- Sticky sessions normally not required (JWT-based auth).

---

## Interview-Oriented Notes

Be comfortable discussing:

- How you’d structure a Node.js GraphQL backend (layers: schema, resolvers, services/repos, DB).
- How to handle **test databases** and mocking for resolver tests.
- What metrics you’d collect (latency, error rates, request volume).
- How you’d deploy and scale GraphQL in a microservices environment.

---

## Extra Topics to Explore Later

- Apollo Federation for microservices.
- GraphQL gateways / API composition.
- Advanced tracing with OpenTelemetry for GraphQL.

[← Practical Examples](./06_practical_examples.md) | [Back to Main Index](./intro.md)
