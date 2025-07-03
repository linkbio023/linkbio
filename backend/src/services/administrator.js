import models from "../models/index.js";
import { roles } from "../constants/roles.js";
import { getAuth } from "firebase-admin/auth";
import {
  AdministratorCountDTO,
  AdministratorDTO,
  AdministratorListDTO,
} from "../DTO/administrator.js";

// Update Administrator
async function update(data, currentUser) {
  // Only an admin can update a user's role
  if (currentUser.role !== roles.ADMIN) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const { id, role } = data;

  // Update user role to admin, moderator or user
  // Replace any previous role

  // Update user role in the database
  const updatedAdministrator = await models.user
    .findByIdAndUpdate({ _id: id }, { role: role }, { new: true })
    .select({ name: 1, email: 1, uid: 1, role: 1, createdAt: 1, updatedAt: 1 })
    .lean();

  if (!updatedAdministrator) {
    const error = new Error("Administrator not found");
    error.statusCode = 404;
    throw error;
  }

  // Update user role in Firebase
  const userUid = updatedAdministrator?.uid;
  const user = await getAuth().getUser(userUid);
  const previousUserClaims = user?.customClaims || {};
  const updatedUserClaims = {
    ...previousUserClaims,
    role: role,
  };
  await getAuth().setCustomUserClaims(userUid, updatedUserClaims);

  const administratorDTO = new AdministratorDTO()
    .setId(updatedAdministrator._id)
    .setName(updatedAdministrator.name)
    .setEmail(updatedAdministrator.email)
    .setRole(updatedAdministrator.role)
    .setCreatedAt(updatedAdministrator.createdAt)
    .setUpdatedAt(updatedAdministrator.updatedAt)
    .build();

  return administratorDTO;
}

// list administrator
async function list({ page = 1, limit = 10, order = "desc" }, currentUser) {
  // Only an admin can see the list of administrators
  if (currentUser.role !== roles.ADMIN) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  // Show the list of usres who are admin or moderator
  const administrators = await models.user
    .find({ role: { $in: [roles.ADMIN, roles.MODERATOR] } })
    .select({ name: 1, email: 1, role: 1, createdAt: 1, updatedAt: 1 })
    .sort({ createdAt: order === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(limit * 1)
    .lean()
    .exec();

  const administratorsDTO = administrators.map((administrator) => {
    return new AdministratorDTO()
      .setId(administrator?._id)
      .setName(administrator?.name)
      .setEmail(administrator?.email)
      .setRole(administrator?.role)
      .setCreatedAt(administrator?.createdAt)
      .setUpdatedAt(administrator?.updatedAt)
      .build();
  });

  const administratorListDTO = new AdministratorListDTO()
    .setAdministratorList(administratorsDTO)
    .build();

  return administratorListDTO;
}

// Count Administrators
async function count(currentUser) {
  // Only an admin can see the count of administrators
  if (currentUser.role !== roles.ADMIN) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  // Count the number of users who are admin or moderator
  const administratorsCount = await models.user
    .countDocuments({ role: { $in: [roles.ADMIN, roles.MODERATOR] } })
    .lean();

  const administratorCountDTO = new AdministratorCountDTO()
    .setCount(administratorsCount)
    .build();

  return administratorCountDTO;
}

// View Administrator
async function view(id, currentUser) {
  // Only an admin can view the details of an administrator
  if (currentUser.role !== roles.ADMIN) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  // Get the details of an administrator
  const administrator = await models.user
    .findById({ _id: id })
    .select({ name: 1, email: 1, role: 1, createdAt: 1, updatedAt: 1 })
    .lean();

  if (!administrator) {
    const error = new Error("Administrator not found");
    error.statusCode = 404;
    throw error;
  }

  const administratorDTO = new AdministratorDTO()
    .setId(administrator._id)
    .setName(administrator.name)
    .setEmail(administrator.email)
    .setRole(administrator.role)
    .setCreatedAt(administrator.createdAt)
    .setUpdatedAt(administrator.updatedAt)
    .build();

  return administratorDTO;
}

// Check Administrator
async function check(email, currentUser) {
  // Only an admin can check if a user is an administrator
  if (currentUser.role !== roles.ADMIN) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const administrator = await models.user
    .findOne({ email: email })
    .select({ name: 1, email: 1, role: 1, createdAt: 1, updatedAt: 1 })
    .lean();

  if (!administrator) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const administratorDTO = new AdministratorDTO()
    .setId(administrator._id)
    .setName(administrator.name)
    .setEmail(administrator.email)
    .setRole(administrator.role)
    .setCreatedAt(administrator.createdAt)
    .setUpdatedAt(administrator.updatedAt)
    .build();

  return administratorDTO;
}

export default { update, view, list, count, check };
