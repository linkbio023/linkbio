import { Router } from "express";
import controllers from "../controllers/index.js";
import middlewares from "../middlewares/index.js";
import validators from "../validators/index.js";

export default (app) => {
  const router = Router();
  app.use("/stats", router);

  // Create biolink analytics
  router.post(
    "/create/biolink",
    validators.analytics.createBiolinkAnalytics,
    middlewares.validateRequest,
    controllers.analytics.createBiolinkAnalytics
  );

  // View biolink analytics
  router.get(
    "/view/biolink/:id",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.analytics.viewBiolinkAnalytics
  );

  // Create link analytics
  router.post("/create/link/:id", controllers.analytics.createLinkAnalytics);

  // View link analytics
  router.get(
    "/view/link/:id",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.analytics.viewLinkAnalytics
  );
};
