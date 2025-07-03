import { body, header } from "express-validator";

const createStripeSubscriptionSession = [
  body("platform")
    .trim()
    .notEmpty()
    .withMessage("Platform cannot be empty")
    .isString()
    .withMessage("Platform must be a string")
    .isIn(["stripe"])
    .withMessage("Platform must be stripe"),
  body("plan")
    .trim()
    .notEmpty()
    .withMessage("Plan cannot be empty")
    .isString()
    .withMessage("Plan must be a string")
    .isIn(["pro", "premium"])
    .withMessage("Plan must be either pro or premium"),
  body("billingPeriod")
    .trim()
    .notEmpty()
    .withMessage("Billing period cannot be empty")
    .isString()
    .withMessage("Billing period must be a string")
    .isIn(["monthly", "yearly"])
    .withMessage("Billing period must be either month or year"),
];

const handleStripeClientWebhook = [
  body("sessionId")
    .trim()
    .notEmpty()
    .withMessage("Session ID cannot be empty")
    .isString()
    .withMessage("Session ID must be a string"),
];

const handleStripeServerWebhook = [
  header("stripe-signature")
    .notEmpty()
    .withMessage("Stripe signature is required")
    .isString()
    .withMessage("Stripe signature must be a string"),
];

export default {
  createStripeSubscriptionSession,
  handleStripeClientWebhook,
  handleStripeServerWebhook,
};
