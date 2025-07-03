import { ResponseDTO } from "../DTO/response.js";
import services from "../services/index.js";
// Create, Update, Delete, List, View user

// Create user
async function create(req, res, next) {
  const data = req.user;
  try {
    const user = await services.user.create(data);

    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(user)
      .setMessage("User created successfully")
      .build();

    res.status(201).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Update user
async function update(req, res, next) {
  const data = req.body;
  const currentUser = req.currentUser;

  try {
    const user = await services.user.update(data, currentUser);
    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(user)
      .setMessage("User updated successfully")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Update users Name
async function updateName(req, res, next) {
  const data = req.body;
  const currentUser = req.currentUser;

  try {
    const user = await services.user.updateName(data, currentUser);
    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(user)
      .setMessage("Name updated successfully")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Update users Email
async function updateEmail(req, res, next) {
  const data = req.body;
  const currentUser = req.currentUser;

  try {
    const user = await services.user.updateEmail(data, currentUser);
    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(user)
      .setMessage("Email updated successfully")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Update users Email
async function updatePassword(req, res, next) {
  const data = req.body;
  const currentUser = req.currentUser;

  try {
    const user = await services.user.updatePassword(data, currentUser);
    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(user)
      .setMessage("Password updated successfully")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Delete user
async function remove(req, res, next) {
  const { id } = req.params;
  try {
    await services.user.remove(id);

    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setMessage("User deleted successfully")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// List of users
async function list(req, res, next) {
  const { page, limit, order, role, subscription } = req.query;
  try {
    const users = await services.user.list({
      page,
      limit,
      order,
      role,
      subscription,
    });
    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(users)
      .setMessage("User list")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Count of users
async function count(req, res, next) {
  const { role, subscription } = req.query;
  try {
    const count = await services.user.count({ role, subscription });
    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(count)
      .setMessage("User count")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// View user
async function view(req, res, next) {
  const { id } = req.params;
  const currentUser = req.currentUser;
  try {
    const user = await services.user.view(id, currentUser);
    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(user)
      .setMessage("User details")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// View user
async function viewProfile(req, res, next) {
  const currentUser = req.currentUser;
  try {
    const user = await services.user.viewProfile(currentUser);
    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(user)
      .setMessage("User details")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  update,
  remove,
  list,
  count,
  view,
  viewProfile,
  updateName,
  updateEmail,
  updatePassword,
};
