import config from "../config/index.js";
import models from "../models/index.js";
import getStripe from "../loaders/stripe.js";
import { getAuth } from "firebase-admin/auth";

async function createStripeSubscriptionSession(data, currentUser) {
  const { plan, billingPeriod } = data;

  const stripePlans = config.stripe.plans;

  let priceId;

  if (plan == "pro") {
    if (billingPeriod == "monthly") {
      priceId = stripePlans.pro.monthlyPriceId;
    } else {
      priceId = stripePlans.pro.yearlyPriceId;
    }
  } else if (plan == "premium") {
    if (billingPeriod == "monthly") {
      priceId = stripePlans.premium.monthlyPriceId;
    } else {
      priceId = stripePlans.premium.yearlyPriceId;
    }
  }

  const userId = currentUser.id.toString();

  const stripe = await getStripe();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    client_reference_id: userId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    metadata: {
      plan: plan,
      billingPeriod: billingPeriod,
    },
    customer_email: currentUser?.email,
    success_url: `${config.frontendURL}/dashboard/upgrade/success?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.frontendURL}/dashboard/upgrade/canceled?canceled=true`,
  });

  return { url: session.url };
}

// Stripe Fulfill checkout session
async function fulfillCheckout(sessionId) {
  // Check if session Id exist in database
  // If it exist that means the session is alredy performed
  const session = await models.stripeSession.findOne({ sessionId }).lean();

  if (session) {
    return;
  }

  const stripe = await getStripe();
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  if (checkoutSession.payment_status !== "unpaid") {
    const userId = checkoutSession?.client_reference_id;
    const plan = checkoutSession?.metadata?.plan;

    const user = await models.user
      .findById(userId)
      .lean()
      .select({ uid: 1 })
      .exec();

    if (!user) {
      throw new Error("User not found");
    }

    // Subscription start date and end date
    const subscriptionSession = await stripe.subscriptions.retrieve(
      checkoutSession.subscription
    );
    const currentPeriodStartDate = new Date(
      subscriptionSession.current_period_start * 1000
    );
    const currentPeriodEndDate = new Date(
      subscriptionSession.current_period_end * 1000
    );

    // Provide access to paid resources
    const userUid = user?.uid;
    const userData = await getAuth().getUser(userUid);
    const previousUserClaims = userData?.customClaims || {};
    const updatedUserClaims = {
      ...previousUserClaims,
      subscription: {
        plan: plan,
        status: "active",
        expires: currentPeriodEndDate.getTime(),
      },
    };

    await getAuth().setCustomUserClaims(userUid, updatedUserClaims);

    // Create subscription in database
    await models.subscription.create({
      user: userId,
      plan: plan,
      amount: checkoutSession.amount_total,
      currency: checkoutSession.currency,
      paymentPlatform: "stripe",
      status: "active",
      transactionId: checkoutSession.payment_intent,
      paymentId: checkoutSession.payment_intent,
      currentPeriodStartDate: currentPeriodStartDate,
      currentPeriodEndDate: currentPeriodEndDate,
    });

    // Save sessionId in database
    await models.stripeSession.create({ sessionId });
  }
}

// when a customer’s stripe subscription ends
async function handleSubscriptionEnds(userId) {
  // Remove access to paid resources
  const user = await models.user
    .findById(userId)
    .lean()
    .select({ uid: 1 })
    .exec();

  if (!user) {
    throw new Error("User not found");
  }

  const userUid = user?.uid;
  const userData = await getAuth().getUser(userUid);
  const previousUserClaims = userData?.customClaims || {};
  const updatedUserClaims = {
    ...previousUserClaims,
    subscription: {
      plan: "free",
      status: "inactive",
      expires: null,
    },
  };

  await getAuth().setCustomUserClaims(userUid, updatedUserClaims);

  // Update subscription status in database
  await models.subscription.updateOne({ user: userId }, { status: "inactive" });
}

// when a customer’s stripe subscription renews

// Stripe Server Fullfilment Webhook Handler
async function handleStripeServerWebhook(req) {
  const stripe = await getStripe();

  const payload = req.body;
  const sig = req.headers["stripe-signature"];
  const webhookEndpointSecret = config.stripe.webhookSecret;

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookEndpointSecret);
  } catch (err) {
    console.log("Stripe Server Webhook Error:", err);
    throw new Error(err.message);
  }

  const { type } = event;

  switch (type) {
    // Handle the event when a checkout session is completed or async payment is succeeded
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const sessionId = event.data.object.id;
      await fulfillCheckout(sessionId);
      break;
    }
    // Handle the event when a customer subscription is ends
    case "customer.subscription.deleted": {
      const userId = event.data.object.customer;
      await handleSubscriptionEnds(userId);
      break;
    }
    default:
      console.log(`Unhandled event type ${type}`);
  }
}

// Stripe Client Webhook Handler
async function handleStripeClientWebhook(sessionId) {
  await fulfillCheckout(sessionId);
}

export default {
  createStripeSubscriptionSession,
  handleStripeServerWebhook,
  handleStripeClientWebhook,
};
