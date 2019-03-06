require("dotenv").config();

const { ApolloServer } = require("apollo-server-express");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const next = require("next");

const IS_PROD = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 3000;

IS_PROD
  ? logger.info("Running production server!")
  : logger.info("Running development server!");

const resolvers = require("./gql/resolvers");
const typeDefs = require("./gql/definitions");

// Next.js Client
const webClient = next({
  dev: !IS_PROD,
  dir: "./client"
});

const handle = webClient.getRequestHandler();

webClient
  .prepare()
  .then(() => {
    // Express Server
    const server = express();

    // Third Party Middleware
    server.use(cors());
    server.use(helmet());
    server.use(compression());
    server.use(bodyParser.json({ limit: "10mb" }));
    server.use(bodyParser.urlencoded({ extended: true }));

    // GraphQL Endpoint
    const graphqlServer = new ApolloServer({
      typeDefs,
      resolvers,
      playground: !IS_PROD,
      introspection: true,
      tracing: true
    });

    // Apply Express Middleware
    graphqlServer.applyMiddleware({ app: server });

    // Next.js Route Handling
    server.get("/thing", (req, res) => {
      const actualPage = "/about";
      webClient.render(req, res, actualPage, {});
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    // Start listening!
    server.listen(PORT, () => {
      logger.info(`StayHealthy server is running on port ${PORT}!`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);

    process.exit(1);
  });
