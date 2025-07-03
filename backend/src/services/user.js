import { getAuth } from "firebase-admin/auth";
import { roles } from "../constants/roles.js";
import { UserDTO, UserCountDTO, UserListDTO } from "../DTO/user.js";
import models from "../models/index.js";
import { SubscriptionDTO } from "../DTO/subscription.js";
import config from "../config/index.js";

// Create an user
async function create(data) {
  const { name, email, uid } = data;

  // Set custom claims for the user
  // Default role is user
  // Default subscription is free

  await getAuth().setCustomUserClaims(uid, {
    role: roles.USER,
    subscription: {
      plan: "free",
      status: "active",
      expires: null,
    },
  });

  const user = await models.user.create({ name, email, uid });

  if (!user) {
    const error = new Error("Failed to create user!");
    error.statusCode = 400;
    throw error;
  }

  const userDTO = new UserDTO()
    .setId(user._id)
    .setName(user.name)
    .setEmail(user.email)
    .setRole(user.role)
    .setCreatedAt(user.createdAt)
    .setUpdatedAt(user.updatedAt)
    .build();

  return userDTO;
}

// Update an user data
async function update(data, currentUser) {
  const { id, name, email } = data;

  // If the current user is not an admin, they can only update their own data
  if (currentUser.role !== roles.ADMIN && currentUser.id !== id) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }
  // If the current user is an admin, they can update any user's data
  // If the current user is not an admin, they can only update their own data
  // Only the admin can update the users role and subscription
  const dataToUpadte =
    currentUser.role === roles.ADMIN ? { name, email } : { name, email };

  const user = await models.user.findByIdAndUpdate({ _id: id }, dataToUpadte, {
    new: true,
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const userDTO = new UserDTO()
    .setId(user._id)
    .setName(user.name)
    .setEmail(user.email)
    .setRole(user.role)
    .setCreatedAt(user.createdAt)
    .setUpdatedAt(user.updatedAt)
    .build();

  return userDTO;
}

// Delete an user
async function remove(id) {
  const user = await models.user.findByIdAndDelete({ _id: id });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const userDTO = new UserDTO()
    .setId(user._id)
    .setName(user.name)
    .setEmail(user.email)
    .setRole(user.role)
    .setCreatedAt(user.createdAt)
    .setUpdatedAt(user.updatedAt)
    .build();

  return userDTO;
}

// List of users
async function list({ page = 1, limit = 10, order = "asc" } = {}) {
  const users = await models.user
    .find()
    .select({
      name: 1,
      email: 1,
    })
    .sort({ createdAt: order === "asc" ? 1 : -1 })
    .lean()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const userListDTO = new UserListDTO().setUsers(users).build();

  // const count = await models.user.countDocuments(query);
  // const totalPages = Math.ceil(count / limit);

  return userListDTO;
}

// Count of users
async function count() {
  const count = await models.user.countDocuments();

  const userCountDTO = new UserCountDTO().setCount(count).build();

  return userCountDTO;
}

// Details of an user
async function view(id, currentUser) {
  // If the current user is not an admin, they can only view their own data
  if (currentUser.role !== roles.ADMIN && currentUser.id !== id) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const user = await models.user
    .findById({ _id: id })
    .select({
      name: 1,
      email: 1,
      role: 1,
      createdAt: 1,
    })
    .lean()
    .exec();

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const userDTO = new UserDTO()
    .setId(user._id)
    .setName(user.name)
    .setEmail(user.email)
    .setRole(user.role)
    .setCreatedAt(user.createdAt)
    .setUpdatedAt(user.updatedAt)
    .build();

  return userDTO;
}

// Details of an user
async function viewProfile(currentUser) {
  // Get subscription information
  const subscription = await models.subscription
    .findOne({ user: currentUser.id })
    .lean()
    .exec();

  const subscriptionDTO = new SubscriptionDTO()
    .setId(subscription?._id)
    .setPlan(subscription?.plan)
    .setAmount(subscription?.amount)
    .setCurrency(subscription?.currency)
    .setPaymentPlatform(subscription?.paymentPlatform)
    .setStatus(subscription?.status)
    .setCurrentPeriodStartDate(subscription?.currentPeriodStartDate)
    .setCurrentPeriodEndDate(subscription?.currentPeriodEndDate)
    .setCreatedAt(subscription?.createdAt)
    .setUpdatedAt(subscription?.updatedAt)
    .build();

  const userDTO = new UserDTO()
    .setId(currentUser?.id)
    .setName(currentUser?.name)
    .setEmail(currentUser?.email)
    .setCreatedAt(currentUser?.createdAt)
    .setUpdatedAt(currentUser?.updatedAt)
    .build();

  return { user: userDTO, subscription: subscriptionDTO };
}

async function createAdminIfNoneExists() {
  // It run's only once
  // If user count is zero, only then it runs
  // Creates user in firebase with admin role
  // Creates user in database with admin role

  const userCount = await models.user.countDocuments();
  if (userCount > 0) {
    return;
  }

  // Check if admin user exists with this email on firebase

  const defaultAdminCredentials = config.defaultAdmin;
  const displayName = defaultAdminCredentials.name;
  const userEmail = defaultAdminCredentials.email;
  const userPassword = defaultAdminCredentials.password;

  let adminUser;
  let uid;
  try {
    adminUser = await getAuth().getUserByEmail(userEmail);
    uid = adminUser.uid;
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      // User does not exist, create the user
      const newUser = await getAuth().createUser({
        email: userEmail,
        displayName: displayName,
        password: userPassword,
      });
      uid = newUser.uid;
    } else {
      // Some other error occurred
      throw error;
    }
  }

  await getAuth().setCustomUserClaims(uid, {
    role: roles.ADMIN,
    subscription: {
      plan: "premium",
      status: "active",
      expires: null,
    },
  });

  const user = await models.user.create({
    name: displayName,
    email: userEmail,
    uid: uid,
    role: roles.ADMIN,
  });

  if (user) {
    console.log("Admin user created successfully!");
  } else {
    console.log("Failed to create admin user!");
  }
}

// Update users name
async function updateName(data, currentUser) {
  const { name } = data;
  // Update in firebase
  await getAuth().updateUser(currentUser?.uid, {
    displayName: name,
  });
  // Update in database
  const user = await models.user
    .findByIdAndUpdate({ _id: currentUser?.id }, { name: name }, { new: true })
    .lean()
    .exec();

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const userDTO = new UserDTO()
    .setId(user._id)
    .setName(user.name)
    .setEmail(user.email)
    .setRole(user.role)
    .setCreatedAt(user.createdAt)
    .setUpdatedAt(user.updatedAt)
    .build();

  return userDTO;
}

// Update users email
async function updateEmail(data, currentUser) {
  const { email } = data;
  // Update in database
  const user = await models.user
    .findByIdAndUpdate(
      { _id: currentUser?.id },
      { email: email },
      { new: true }
    )
    .lean()
    .exec();

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  // Update in firebase
  await getAuth().updateUser(currentUser?.uid, {
    email: email,
  });

  const userDTO = new UserDTO()
    .setId(user._id)
    .setName(user.name)
    .setEmail(user.email)
    .setRole(user.role)
    .setCreatedAt(user.createdAt)
    .setUpdatedAt(user.updatedAt)
    .build();

  return userDTO;
}

// Update users password
async function updatePassword(data, currentUser) {
  const { password } = data;
  // Update in firebase
  await getAuth().updateUser(currentUser?.uid, {
    password: password,
  });

  const user = await models.user
    .findById({ _id: currentUser?.id })
    .lean()
    .exec();

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const userDTO = new UserDTO()
    .setId(user._id)
    .setName(user.name)
    .setEmail(user.email)
    .setRole(user.role)
    .setCreatedAt(user.createdAt)
    .setUpdatedAt(user.updatedAt)
    .build();

  return userDTO;
}

export default {
  create,
  update,
  remove,
  list,
  count,
  view,
  viewProfile,
  createAdminIfNoneExists,
  updateName,
  updatePassword,
  updateEmail,
};
