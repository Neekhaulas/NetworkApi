import * as express from "express";
//import * as fs from "fs";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import { prisma } from "./generated/prisma-client";
import * as session from "express-session";

import typeDefs from "./schema";
import resolvers from "./resolvers";

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = "./public";

const app = express();

app.use(express.static(PUBLIC_DIR));

app.use(session({
  secret: '123456',
  name: 'sessionId',
  resave: true,
  saveUninitialized: true
}));

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      prisma,
      req
    }
  },
  introspection: true,
  playground: true,
  debug: true,
  engine: {
    apiKey: 'service:Neekhaulas-8667:Zhhei-STODNPNfJeVS2QpQ'
  }
});

apolloServer.applyMiddleware({ app, cors: {
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
  methods: "GET, POST, PUT, DELETE",
  origin: "http://localhost:9090"
} });

const httpServer = createServer(
  /*{
    key: fs.readFileSync(`server.key`),
    cert: fs.readFileSync(`server.cert`)
  },*/
  app
);

apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}/graphql`,
  );
});