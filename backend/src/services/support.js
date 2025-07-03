import models from "../models/index.js";
import { roles } from "../constants/roles.js";
import { SupportCountDTO, SupportDTO, SupportListDTO } from "../DTO/support.js";
import { UserDTO } from "../DTO/user.js";

// Create support ticket
// Send an email to the support team from the user's email
async function create(data, currentUser) {
  const { title, details } = data;

  const supportTicket = await models.support.create({
    user: currentUser.id,
    title: title,
    details: details,
  });

  const supportDTO = new SupportDTO()
    .setId(supportTicket._id)
    .setTitle(supportTicket.title)
    .setDetails(supportTicket.details)
    .setStatus(supportTicket.status)
    .setCreatedAt(supportTicket.createdAt)
    .setUpdatedAt(supportTicket.updatedAt)
    .build();

  return supportDTO;
}

// List support tickets
// Admin can view all support tickets
// Users can only view their own support tickets
async function list({ page = 1, limit = 10, order = "desc" }, currentUser) {
  const skip = (page - 1) * limit;

  const query =
    currentUser.role === roles.ADMIN ? {} : { user: currentUser.id };

  const supportTickets = await models.support
    .find(query)
    .sort({ createdAt: order == "desc" ? -1 : 1 })
    .skip(skip)
    .limit(limit)
    .select({ title: 1, status: 1, createdAt: 1, updatedAt: 1 })
    .lean();

  const supportList = supportTickets.map((support) => {
    return new SupportDTO()
      .setId(support._id)
      .setTitle(support.title)
      .setStatus(support.status)
      .setCreatedAt(support.createdAt)
      .setUpdatedAt(support.updatedAt)
      .build();
  });

  return new SupportListDTO().setSupportList(supportList).build();
}

// Count support tickets
// Admin can count all support tickets
// Users can only count their own support tickets
async function count(currentUser) {
  const query =
    currentUser.role === roles.ADMIN ? {} : { user: currentUser.id };

  const supportTicketsCount = await models.support.countDocuments(query);

  return new SupportCountDTO().setCount(supportTicketsCount).build();
}

// Update support ticket
// Only Admin can update any support ticket
// Users cannot update support tickets
async function update(id, data, currentUser) {
  if (currentUser.role !== roles.ADMIN) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const { status } = data;
  const updatedSupportTicket = await models.support.findByIdAndUpdate(
    id,
    { status: status },
    { new: true }
  );

  if (!updatedSupportTicket) {
    const error = new Error("Support ticket not found");
    error.statusCode = 404;
    throw error;
  }

  return updatedSupportTicket;
}

// View support ticket
// Admin can view any support ticket
// Users can only view their own support tickets
async function view(id, currentUser) {
  const query =
    currentUser.role === roles.ADMIN
      ? { _id: id }
      : { _id: id, user: currentUser.id };

  const support = await models.support
    .findOne(query)
    .populate("user")
    .populate("user.subscription")
    .lean();

  if (!support) {
    const error = new Error("Support ticket not found");
    error.statusCode = 404;
    throw error;
  }

  const userData = support?.user;
  const userDTO = new UserDTO()
    .setId(userData?._id)
    .setName(userData?.name)
    .setEmail(userData?.email)
    .setCreatedAt(userData?.createdAt)
    .setSubscription(userData?.subscription)
    .build();

  const supportDTO = new SupportDTO()
    .setId(support._id)
    .setUser(userDTO)
    .setTitle(support.title)
    .setDetails(support.details)
    .setStatus(support.status)
    .setCreatedAt(support.createdAt)
    .setUpdatedAt(support.updatedAt)
    .build();

  return supportDTO;
}

export default { create, update, view, list, count };
