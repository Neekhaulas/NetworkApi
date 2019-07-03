import * as express from "express";
import * as fs from "fs";
import { ApolloServer } from "apollo-server-express";
import { prisma } from "./generated/prisma-client";
import * as session from "express-session";
import { key, cert, origin } from '../config';
import { onUpdate } from './update';

import typeDefs from "./schema";
import resolvers from "./resolvers";
import onUpload from "./upload";
import cors = require("cors");

const PORT = process.env.NODE_ENV === 'development' ? 3000 : 443;
const PUBLIC_DIR = "./public";

const app = express();

app.use(cors({
  origin: origin,
  credentials: true
}));

app.use(express.static(PUBLIC_DIR));

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000000 }, resave: true, saveUninitialized: true }));

app.all("/upload", onUpload);

app.post("/update", onUpdate);

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

const ssl = process.env.NODE_ENV === 'development' ? {} : { key: fs.readFileSync(key), cert: fs.readFileSync(cert) }
const http = process.env.NODE_ENV === 'development' ? require('http') : require('https');

const httpServer = http.createServer(
  ssl,
  app
);

apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(
    `🚀 Server ready at https://localhost:${PORT}/graphql`,
  );
});