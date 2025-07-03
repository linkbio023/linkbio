import { Router } from "express";
import controllers from "../controllers/index.js";
import middlewares from "../middlewares/index.js";

export default (app) => {
  const router = Router();
  app.use("/subscription", router);

  // View subscription
  router.get(
    "/view/:id",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.subscription.view
  );

  // List subscriptions
  router.get(
    "/list",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.subscription.list
  );

  // Count subscriptions
  router.get(
    "/count",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.subscription.count
  );
};
