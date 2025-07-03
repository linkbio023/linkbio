import { ResponseDTO } from "../DTO/response.js";
import services from "../services/index.js";

async function createStripeSubscriptionSession(req, res, next) {
  const data = req.body;
  const currentUser = req?.currentUser;
  try {
    const session = await services.stripe.createStripeSubscriptionSession(
      data,
      currentUser
    );

    const response = new ResponseDTO()
      .setSuccess(true)
      .setData(session)
      .setMessage("Stripe subscription session created successfully")
      .build();

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

// Handle Stripe Webhook from Stripe Server
async function handleStripeServerWebhook(req, res, next) {
  try {
    await services.stripe.handleStripeServerWebhook(req);

    return res.status(200).end();
  } catch (error) {
    next(error);
  }
}

// Handle Stripe Webhook from client
async function handleStripeClientWebhook(req, res, next) {
  try {
    const { sessionId } = req.body;
    await services.stripe.handleStripeClientWebhook(sessionId);

    const response = new ResponseDTO()
      .setSuccess(true)
      .setMessage("Stripe client webhook handled successfully")
      .build();

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export default {
  createStripeSubscriptionSession,
  handleStripeServerWebhook,
  handleStripeClientWebhook,
};
