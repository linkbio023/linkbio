import express from "express";
import config from "./config/index.js";
import loaders from "./loaders/index.js";
import services from "./services/index.js";

// Start the server
async function startServer() {
  const app = express();

  await loaders({ app });

  // Create admin user if non exist
  await services.user.createAdminIfNoneExists();

  app
    .listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    })
    .on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
}

startServer();
