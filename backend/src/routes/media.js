import { Router } from "express";
import controllers from "../controllers/index.js";
import middlewares from "../middlewares/index.js";
import multer from "../loaders/multer.js";
// import validators from "../validators/index.js";

export default (app) => {
  const router = Router();
  app.use("/media", router);

  // Create media
  router.post(
    "/create",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    multer.multerUpload.single("image"),
    controllers.media.create
  );

  // Update media
  router.put(
    "/update",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.media.update
  );

  // Delete media
  router.delete(
    "/delete",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.media.remove
  );

  // List media
  router.get(
    "/list",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.media.list
  );

  // Count
  router.get(
    "/count",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.media.count
  );

  // Get media
  router.get(
    "/:mediaId",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    controllers.media.view
  );
};
