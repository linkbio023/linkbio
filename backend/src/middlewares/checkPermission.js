import { roles } from "../constants/roles.js";

async function checkPermission(req, _res, next) {
  try {
    // Only an admin or moderator can access this route
    if (
      req.currentUser.role !== roles.ADMIN &&
      req.currentUser.role !== roles.MODERATOR
    ) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
}

export default checkPermission;
