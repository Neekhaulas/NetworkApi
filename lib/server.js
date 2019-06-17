"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fs = require("fs");
const https_1 = require("https");
const apollo_server_express_1 = require("apollo-server-express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/network", { useNewUrlParser: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, '❌ Cannot connect to MongoDB server'));
db.on("open", function () {
    console.log('✅ Succesfully connected to MongoDB server');
});
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
const PORT = process.env.PORT || 3000;
const app = express();
const apolloServer = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default,
    context: { db },
    introspection: true,
    playground: true,
    debug: true,
    engine: {
        apiKey: 'service:Neekhaulas-8667:Zhhei-STODNPNfJeVS2QpQ'
    }
});
apolloServer.applyMiddleware({ app });
const httpsServer = https_1.createServer({
    key: fs.readFileSync(`server.key`),
    cert: fs.readFileSync(`server.cert`)
}, app);
apolloServer.installSubscriptionHandlers(httpsServer);
httpsServer.listen({ port: PORT }, () => {
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map