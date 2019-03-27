require("dotenv").config();

const logger = require("./utils/logger");
const express = require("express");
const next = require("next");

const IS_PROD = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 3000;

IS_PROD
  ? logger.info("Running production server!")
  : logger.info("Running development server!");

// Next.js Client
const webClient = next({
  dev: !IS_PROD,
  dir: "./client"
});

const handle = webClient.getRequestHandler();

(async () => {
  try {
    // Prepare Next.JS
    await webClient.prepare();

    // Express Server
    const server = express();

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
      logger.info(`StayHealthy web client server is running on port ${PORT}!`);
    });
  } catch (err) {
    logger.error(err.stack);

    process.exit(1);
  }
})();
