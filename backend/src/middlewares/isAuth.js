import { getAuth } from "firebase-admin/auth";

function getTokenFromHeader(req) {
  const bearerToken = req?.headers?.authorization;
  const splitToken = bearerToken?.split(" ");
  if (
    (bearerToken && splitToken[0] === "Bearer") ||
    (bearerToken && splitToken[0] === "Token")
  ) {
    return splitToken[1];
  }
  return null;
}

async function isAuth(req, _res, next) {
  const token = getTokenFromHeader(req);
  if (!token) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    next(error);
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    // Attach decoded token to the request object
    req.user = decodedToken;

    return next();
  } catch (error) {
    console.log(error);
    // If token is expired, return 401 error
    if (error.code === "auth/id-token-expired") {
      const err = new Error("auth/id-token-expired");
      err.statusCode = 401;
      next(err);
    } else {
      const err = new Error("Unauthorized");
      err.statusCode = 401;
      next(err);
    }
  }
}

export default isAuth;
