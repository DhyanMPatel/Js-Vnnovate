const { graphql, buildSchema } = require("graphql");
const http = require("http");

// Sample Data
const users = [
  { id: "1", name: "Avinash", email: "alinash@test.com" },
  { id: "2", name: "Brijesh", email: "brijesh@test.com" },
  { id: "3", name: "Raju", email: "raju@test.com" },
  { id: "4", name: "Rajesh", email: "rajesh@test.com" },
];

// Define Schema
const schema = buildSchema(`
    type User {
        id:ID!
        name: String!
        email: String!
    }

    type Query {
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        addUser(name: String!, email: String!): User
    }
`);

// Define Resolvers
const root = {
  users: () => users,
  user: ({ id }) => users.find((user) => user.id === id),
  addUser: ({ name, email }) => {
    const newUser = { id: String(users.length + 1), name, email };
    users.push(newUser);
    return newUser;
  },
};

// Create HTTP Server
const server = http.createServer(async (req, res) => {
  if (req.url === "/graphql" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const { query, variables } = JSON.parse(body);
      const result = await graphql(schema, query, root, null, variables);
      res.end(JSON.stringify(result));
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(4000, () =>
  console.log("GraphQL Server running at http://localhost:4000/")
);
