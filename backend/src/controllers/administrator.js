import { ResponseDTO } from "../DTO/response.js";
import services from "../services/index.js";

// Update Administrator
async function update(req, res, next) {
  const data = req.body;
  const currentUser = req.currentUser;

  try {
    const updatedAdministrator = await services.administrator.update(
      data,
      currentUser
    );

    const response = new ResponseDTO()
      .setSuccess(true)
      .setData(updatedAdministrator)
      .setMessage("Administrator updated successfully")
      .build();

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

// List Administrators
async function list(req, res, next) {
  const { page, limit, order, user } = req.query;
  const currentUser = req.currentUser;

  try {
    const administrators = await services.administrator.list(
      { page, limit, order, user },
      currentUser
    );

    const response = new ResponseDTO()
      .setSuccess(true)
      .setData(administrators)
      .setMessage("Administrators retrieved successfully")
      .build();

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

// Count Administrator
async function count(req, res, next) {
  const currentUser = req.currentUser;

  try {
    const administratorsCount = await services.administrator.count(currentUser);

    const response = new ResponseDTO()
      .setSuccess(true)
      .setData(administratorsCount)
      .setMessage("Administrators count retrieved successfully")
      .build();

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

// View Administrator
async function view(req, res, next) {
  const { id } = req.params;
  const currentUser = req.currentUser;

  try {
    const administrator = await services.administrator.view(id, currentUser);

    const response = new ResponseDTO()
      .setSuccess(true)
      .setData(administrator)
      .setMessage("Administrator retrieved successfully")
      .build();

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

// Check if user is an administrator
async function check(req, res, next) {
  const { email } = req.query;
  const currentUser = req.currentUser;

  try {
    const administrator = await services.administrator.check(
      email,
      currentUser
    );

    const response = new ResponseDTO()
      .setSuccess(true)
      .setData(administrator)
      .setMessage("Administrator retrieved successfully")
      .build();

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export default { update, view, list, count, check };
