import { Router } from "express";
import controllers from "../controllers/index.js";
import middlewares from "../middlewares/index.js";
import validators from "../validators/index.js";

export default (app) => {
  const router = Router();
  app.use("/support", router);

  // Create support ticket
  router.post(
    "/create",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    validators.support.createSupportTicket,
    middlewares.validateRequest,
    controllers.support.create
  );

  // Update support ticket
  router.put(
    "/update/:id",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    validators.support.updateSupportTicket,
    middlewares.validateRequest,
    controllers.support.update
  );

  // List support tickets
  router.get(
    "/list",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.support.list
  );

  // Count support tickets
  router.get(
    "/count",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.support.count
  );

  // View support ticket
  router.get(
    "/view/:id",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.support.view
  );
};
