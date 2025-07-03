import { Router } from "express";
import controllers from "../controllers/index.js";
import middlewares from "../middlewares/index.js";
import validators from "../validators/index.js";

export default (app) => {
  const router = Router();
  app.use("/user", router);

  // Create user
  router.post("/create", middlewares.isAuth, controllers.user.create);

  // Update users Name
  router.put(
    "/update-name",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    validators.user.updateName,
    middlewares.validateRequest,
    controllers.user.updateName
  );

  // Update users Email
  router.put(
    "/update-email",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    validators.user.updateEmail,
    middlewares.validateRequest,
    controllers.user.updateEmail
  );

  // Update users Password
  router.put(
    "/update-password",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    validators.user.updatePassword,
    middlewares.validateRequest,
    controllers.user.updatePassword
  );

  // Update user
  router.put(
    "/update",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.user.update
  );

  // Delete user
  router.delete(
    "/delete/:id",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    middlewares.checkPermission,
    controllers.user.remove
  );

  // View user
  router.get(
    "/profile",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.user.viewProfile
  );

  // View user
  router.get(
    "/view/:id",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.user.view
  );

  // List of users
  router.get(
    "/list",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    middlewares.checkPermission,
    controllers.user.list
  );

  // Count of users
  router.get(
    "/count",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    middlewares.checkPermission,
    controllers.user.count
  );
};
