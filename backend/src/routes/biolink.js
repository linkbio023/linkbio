import { Router } from "express";
import controllers from "../controllers/index.js";
import middlewares from "../middlewares/index.js";
import validators from "../validators/index.js";

export default (app) => {
  const router = Router();
  app.use("/biolink", router);

  // Create biolink
  router.post(
    "/create",
    validators.biolink.create,
    middlewares.validateRequest,
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.biolink.create
  );

  // Update biolink
  router.put(
    "/update",
    validators.biolink.update,
    middlewares.validateRequest,
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.biolink.update
  );

  // Delete biolink
  router.delete(
    "/delete/:id",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.biolink.remove
  );

  // View biolink
  router.get(
    "/view/:id",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.biolink.view
  );

  // View biolink
  router.get(
    "/administrators-view/:id",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.biolink.administratorsView
  );

  // Public view biolink
  router.get("/public/:username", controllers.biolink.publicView);

  // Check availability of username
  router.get("/check", middlewares.isAuth, controllers.biolink.check);

  // List of biolinks
  router.get(
    "/list",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.biolink.list
  );

  // Count biolinks by user
  router.get(
    "/count/user",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.biolink.countByUser
  );

  // Count the total number of biolinks
  router.get(
    "/count",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    middlewares.checkPermission,
    controllers.biolink.count
  );
};
