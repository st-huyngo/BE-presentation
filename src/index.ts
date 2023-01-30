import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./graphql/resolver";
import { typeDefs } from "./graphql/schema";

interface MyContext {
  token?: String;
}

const server = new ApolloServer<MyContext>({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);