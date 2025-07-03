import { Router } from "express";
import controllers from "../controllers/index.js";
import middlewares from "../middlewares/index.js";
import validators from "../validators/index.js";

export default (app) => {
  // Stripe services
  const router = Router();
  app.use("/stripe", router);

  // Create a Stripe subscription session
  router.post(
    "/create-subscription-session",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    validators.stripe.createStripeSubscriptionSession,
    middlewares.validateRequest,
    controllers.stripe.createStripeSubscriptionSession
  );

  // Handle Stripe client webhook request
  router.post(
    "/webhook",
    middlewares.isAuth,
    validators.stripe.handleStripeClientWebhook,
    middlewares.validateRequest,
    controllers.stripe.handleStripeClientWebhook
  );

  // Handle Stripe server webhook

  // Server webhook should be a raw body
  // That's why it's managed inside the express loader file
};
