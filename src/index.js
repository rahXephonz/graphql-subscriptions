const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const { PrismaClient } = require("@prisma/client");
const { getUserId } = require("./utils");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Vote = require("./resolvers/Vote");
const fs = require("fs");
const path = require("path");

const pubsub = new PubSub();
const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, "graphql", "schema.graphql"),
    "utf8"
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
  introspection: true,
  subscriptions: {
    onConnect: (connectionParams) => {
      if (connectionParams.authToken) {
        return {
          prisma,
          userId: getUserId(null, connectionParams.authToken),
        };
      } else {
        return {
          prisma,
        };
      }
    },
  },
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) =>
    console.log(`🚀 Yaaay.. Server is running on localhost://${url}`)
  );
