import { config } from "dotenv";
config();
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { prisma } from "./generated/prisma-client";
import * as session from "express-session";
import {createServer} from "http";
import { origin } from '../config';

import typeDefs from "./schema";
import resolvers from "./resolvers";
import onUpload from "./upload";
import cors = require("cors");

const PORT = 3000;
const PUBLIC_DIR = "./public";

const app = express();

app.use(cors({
  origin: origin,
  credentials: true
}));

app.use(express.static(PUBLIC_DIR));

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000000 }, resave: true, saveUninitialized: true }));

app.all("/upload", onUpload);

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

apolloServer.applyMiddleware({
  app, cors: {
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    origin: origin
  }
});

const httpServer = createServer(
  app
);

apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}/graphql`,
  );
});