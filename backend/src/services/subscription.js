import { roles } from "../constants/roles.js";
import {
  SubscriptionCountDTO,
  SubscriptionDTO,
  SubscriptionListDTO,
} from "../DTO/subscription.js";
import { UserDTO } from "../DTO/user.js";
import models from "../models/index.js";

// View a subscriber
async function view(id, currentUser) {
  // If the current user is not an admin, they can only view their own data
  if (currentUser.role !== roles.ADMIN && currentUser.id !== id) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const subscriber = await models.subscription
    .findById(id)
    .populate("user")
    .lean()
    .exec();

  if (!subscriber) {
    const error = new Error("Subscriber not found!");
    error.statusCode = 404;
    throw error;
  }

  const user = subscriber?.user;
  const userDTO = new UserDTO()
    .setId(user._id)
    .setName(user.name)
    .setEmail(user.email)
    .setRole(user.role)
    .build();

  const subscriptionDTO = new SubscriptionDTO()
    .setId(subscriber._id)
    .setUser(userDTO)
    .setPlan(subscriber.plan)
    .setAmount(subscriber.amount)
    .setCurrency(subscriber.currency)
    .setPaymentPlatform(subscriber.paymentPlatform)
    .setStatus(subscriber.status)
    .setTransactionId(subscriber.transactionId)
    .setPaymentId(subscriber.paymentId)
    .setCurrentPeriodStartDate(subscriber.currentPeriodStartDate)
    .setCurrentPeriodEndDate(subscriber.currentPeriodEndDate)
    .setCreatedAt(subscriber.createdAt)
    .setUpdatedAt(subscriber.updatedAt)
    .build();

  return subscriptionDTO;
}

// List all subscribers
async function list({ page = 1, limit = 10, order = "desc" }, currentUser) {
  if (currentUser.role !== roles.ADMIN) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const subscribers = await models.subscription
    .find()
    .sort({ createdAt: order })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("user")
    .select({
      user: 1,
      plan: 1,
    })
    .lean()
    .exec();

  const subscriptionList = subscribers.map((subscriber) => {
    const user = subscriber?.user;
    const userDTO = new UserDTO().setId(user._id).setName(user.name).build();

    return new SubscriptionDTO()
      .setId(subscriber._id)
      .setUser(userDTO)
      .setPlan(subscriber.plan)
      .build();
  });

  const subscriptionListDTO = new SubscriptionListDTO()
    .setSubscriptionList(subscriptionList)
    .build();

  return subscriptionListDTO;
}

// Count all subscribers
async function count(currentUser) {
  if (currentUser.role !== roles.ADMIN) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const subscribersCount = await models.subscription.countDocuments();

  const subscriptionCountDTO = new SubscriptionCountDTO()
    .setCount(subscribersCount)
    .build();

  return subscriptionCountDTO;
}
export default { view, list, count };
