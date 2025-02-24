# Type System

- The GraphQL `type system` describes what data can be queried from the API.

  ```
    // Operation
    {
        hero {
            name
            appearsIn
        }
    }

    // Response
    {
        "data": {
            "hero": {
                "name": "R2-D2",
                "appearsIn": [
                    "NEWHOPE",
                    "EMPIRE",
                    "JEDI"
                ]
            }
        }
    }
  ```

# Object Types and fields

- The most basic components of a GraphQL schema are `Object types`.

  ```graphql
  type Character {
    name: String!
    appearsIn: [Episode!]!
  }
  ```

  - `Character`: GraphQL Object type
  - `name`, `appearsIn`: field of Charcter type
  - `String!`: Not-null String `Scaler Type`.

# Arguments

- Every field on a GraphQL Object type can have zero or more `arguments`.

  ```graphql
  type Starship {
    id: ID!
    name: String!
    length(unit: LengthUnit = METER): Float
  }
  ```

  - `unit`: is an argument of length field. In this example if unit argument will not passed then by default it will take `METER`.

# The Query, Mutation and Subscription types

- Every GraphQL schema must support `query`, `Mutation` and `Subscription` operations.
- Also we can name our root operation types differently too;

  ```graphql
  schema {
    query: MyQueryType
    mutation: MyMutationType
    subscription: MySubscriptionType
  }
  ```

# Scaler Type

- Scaler Type represent Leaf values of the query.
- There are Some `default scaler types`:

  1. `Int`
  2. `Float`
  3. `String`
  4. `Boolean`
  5. `ID`: A unique identifier.

- There is also possible to define custom scaler type. like,

  ```graphql
      scaler Date
  ```

# Enum Type

- `Enum types`, also known as enumeration types, are a special kind of scalar that is restricted to a particular set of allowed values. This allows you to:
  1. Validate that any arguments of this type are one of the allowed values
  2. Communicate through the type system that a field will always be one of a finite set of values

# Type Modifiers

- Types are assumed to be `nullable` and `singular` by default in GraphQL.
- There are 2 types of Type Modifiers,
  1. Not-Null(`!`)
  2. List(`[...]`)
- Example,

  ```graphql
  type Character {
    name: String!
    appearsIn: [Episode]!
  }
  ```

- If `myField: [Episode!]`. then,

  ```graphql
    myField: null // valid
    myField: [] // valid
    myField: ["a", "b"] // valid
    myField: ["a", null, "b"] // error
  ```

- If `myField: [Episode]!`. then,

  ```graphql
      myField: null // error
      myField: [] // valid
      myField: ["a", "b"] // valid
      myField: ["a", null, "b"] // valid
  ```

- If `myField: [Episode!]!`. then,
  ```graphql
    myField: null // error
    myField: [] // valid
    myField: ["a", "b"] // valid
    myField: ["a", null, "b"] // error
  ```

# Interface Types

- `Interface Type` defines a certain `set of fields` that a concrete Object type or other Interface type must also include to implement it.

  ```graphql
  // Interface Type
  interface Char{
    id: ID!
    name: String!
    friends: [Character]
    appearsIn: [Episode]!
  }

  // Other Implements Type
    type Human Implements Char{
        id: ID!
        name: String!
        friends: [Character]
        appearsIn: [Episode]!
        totalCradits: Int
    }
  ```
