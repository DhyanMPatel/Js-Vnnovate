# GraphQL

- GraphQL Developed by `Facebook`.
- GraphQL is powerfull query language for `APIs` that allows you to request axactly the data you need, no more no less.
- GraphQL isn't tied to any specific database or storage engine.

- Import Things that need to know
  - It is Powerfull query language for `APIs`.
  - It is <strong>Server-side runtime</strong> for executing the query.
  - It is an <strong>Alternative to REST</strong>.
  - `!` in field indicates that it cannot be null

## Key Features of GraphQL

- GraphQL has several features that set it apart from traditional `REST APIs`.
  1. <strong>Flexible Queries</strong>: Client can fetch data axactly they need, avoid `over-fetching` and `under-fetching`.
  2. <strong>Real-time Updates</strong>: GraphQL support subscriptions for real-time data interaction.
  3. <strong>Strongly Typed</strong>: GraphQL schemas provide clear data structures and types, reducing runtime errors.
  4. <strong>Single endpoint</strong>: Unlike `REST`, GraphQL typically uses a single endpoint for all data requests.
  5. <strong>Introspection</strong>: Clients can explore the `schema's capabilities` through introspection queries.
  6. <strong>Batching</strong>: Multiple Queries can sent in single request to minimize network overhead.
  7. <strong>Efficient for Mobile</strong>: More Efficient for mobile devices by `reducing data transfer`
  8. <strong>Versioning</strong>: It eliminates the need for versioning in APIs, as changes can be made without breaking existing clients.

## Key Component of GraphQL

### 1. Schema

- It `defines the data types` that can be queried and `their relationships`. GraphQl uses it's own language that is <strong>Schema Definition Language</strong> (SDL) for writing the schema.

- It is `human readable` language and It does `not depends upon any specific language or framework`. Schemas has two main types:
  1. `Queries` (for Retrieving Data)
  2. `Mutations` (for Modifing Data)

### 2. Type

- GraphQL defines `Custom Types` to define the <strong>Structure of Data</strong>. there are main 2 types:

  1. `Scaler Type`: It represent values like `Integers`, `String`, `Boolean` and `Float`.
  2. `Object Type`: It represent complex object with fields. Fields can be scaler or another object type.

- Example:
  - A "User" object type with field like `id`, `name`, `address`, `email`.

### 3. Queries

- It is used to `retrieve data from a GraphQL server`.
- It is similar to `GET` in REST APIs.

### 4. Mutations

- It is used to `Modify data on the server`.
- It is similar to `POST`, `PUT`, `DELETE` in REST APIs.

## Example:

    type Book{
        id:ID!
        title: String!
        author: String!
    }

    type Query{
        books: [Book!]!
        book(id:ID!): Book
    }

    type Mutation{
        createBook (title: String!, author: String!): Book
        updateBook (id:ID!, title: String, author: String): Book
        deleteBook (id:ID!): Book
    }

## Subscription

- Subscription is the special type in GraphQL that define Stream of data.

- GraphQL `subscription` allows client get `real-time updates` when `specific event occurs on the server`. This Feature is most required where real-time updates needed like `Chat App`.

- It define alongside `Queries` and `Mutation`.

  ```graphql
  type Subscription {
    currentUpdate(Id: ID!): MessageAlert
  }
  ```

  - It starts with `Subscription` type and have a object that have one field `currentUpdate(id)`.

### GraphQL Over REST

- REST offers some great features such as `stateless servers` etc. But the `inflexibility` of REST somehow becomes it's down point.

- GraphQL provide solution of REST's down point like `flexibility`, avoid `under-fetching`, avoid `over-fetching`, removing the need for multiple endpoints.

## Advantanges and Disadvantanges of GraphQL

### 1. Advantages of GraphQL

1. Efficient Data Fetching
2. Declarative Data Query
3. Strongly Typed Schema
4. Gouping of Multiple Data Sources
5. Versioning and Evaluation
6. Reduced Number of Endpoints

### 2. Disadvantages of GraphQL

1. Complexity Overhead
2. Potential Over-fetching
3. Security Concerns
4. Caching Challenges
5. Schema Design Overhead
