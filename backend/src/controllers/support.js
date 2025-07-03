import { ResponseDTO } from "../DTO/response.js";
import services from "../services/index.js";

// Create support ticket
async function create(req, res, next) {
  const data = req.body;
  const currentUser = req.currentUser;

  try {
    const supportTicket = await services.support.create(data, currentUser);

    const response = new ResponseDTO()
      .setSuccess(true)
      .setData(supportTicket)
      .setMessage("Support ticket created successfully")
      .build();

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

// Update support ticket
async function update(req, res, next) {
  const { id } = req.params;
  const data = req.body;
  const currentUser = req.currentUser;

  try {
    const supportTicket = await services.support.update(id, data, currentUser);

    const response = new ResponseDTO()
      .setSuccess(true)
      .setData(supportTicket)
      .setMessage("Support ticket updated successfully")
      .build();

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

// List support tickets
async function list(req, res, next) {
  const { page, limit, order, user } = req.query;
  const currentUser = req.currentUser;

  try {
    const supportTickets = await services.support.list(
      { page, limit, order, user },
      currentUser
    );

    const response = new ResponseDTO()
      .setSuccess(true)
      .setData(supportTickets)
      .setMessage("Support tickets retrieved successfully")
      .build();

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

// Count support tickets
async function count(req, res, next) {
  const currentUser = req.currentUser;

  try {
    const supportTicketsCount = await services.support.count(currentUser);

    res.status(200).json({
      success: true,
      data: supportTicketsCount,
    });
  } catch (error) {
    next(error);
  }
}

// View support ticket
async function view(req, res, next) {
  const { id } = req.params;
  const currentUser = req.currentUser;

  try {
    const supportTicket = await services.support.view(id, currentUser);

    res.status(200).json({
      success: true,
      data: supportTicket,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  update,
  list,
  count,
  view,
};
