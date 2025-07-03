import { Router } from "express";
import controllers from "../controllers/index.js";
import middlewares from "../middlewares/index.js";
import validators from "../validators/index.js";

export default (app) => {
  const router = Router();
  app.use("/administrator", router);

  // Update user role
  router.post(
    "/update",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    validators.administrator.updateAdministrator,
    middlewares.validateRequest,
    controllers.administrator.update
  );

  //  View administrator
  router.get(
    "/view/:id",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    validators.administrator.viewAdministrator,
    middlewares.validateRequest,
    controllers.administrator.view
  );

  // List all administrators
  router.get(
    "/list",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.administrator.list
  );

  // Count all administrators
  router.get(
    "/count",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.administrator.count
  );

  // Check administrator
  router.get(
    "/check",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.administrator.check
  );
};
