import { ResponseDTO } from "../DTO/response.js";
import services from "../services/index.js";

// View subscription
async function view(req, res, next) {
  const { id } = req.params;
  const currentUser = req.currentUser;

  try {
    const subscription = await services.subscription.view(id, currentUser);

    const response = new ResponseDTO()
      .setSuccess(true)
      .setData(subscription)
      .setMessage("Subscription retrieved successfully")
      .build();

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

// List subscriptions
async function list(req, res, next) {
  const { page, limit, order, user } = req.query;
  const currentUser = req.currentUser;

  try {
    const subscriptions = await services.subscription.list(
      { page, limit, order, user },
      currentUser
    );

    const response = new ResponseDTO()
      .setSuccess(true)
      .setData(subscriptions)
      .setMessage("Subscriptions retrieved successfully")
      .build();

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

// Count subscriptions
async function count(req, res, next) {
  const currentUser = req.currentUser;

  try {
    const subscriptionsCount = await services.subscription.count(currentUser);

    res.status(200).json({
      success: true,
      data: subscriptionsCount,
    });
  } catch (error) {
    next(error);
  }
}

export default { view, list, count };
