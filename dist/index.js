import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql

  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    books: [Book]
  }
  
  type Query {
    books: [Book],
    authors: [Author]
  }
`;
const books = [
    {
        title: "The Awakening",
        author: "Kate Chopin",
    },
    {
        title: "City of Glass",
        author: "Paul Auster",
    },
    {
        title: "The Awakening1",
        author: "Kate Chopin",
    },
    {
        title: "City of Glass1",
        author: "Paul Auster",
    },
    {
        title: "The Awakening2",
        author: "Kate Chopin",
    },
    {
        title: "City of Glass2",
        author: "Paul Auster",
    },
    {
        title: "The Awakening4",
        author: "Kate Chopin",
    },
    {
        title: "City of Glass4",
        author: "Paul Auster",
    },
];
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
    },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
