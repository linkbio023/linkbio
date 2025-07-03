import { validationResult } from "express-validator";

export default async function validateRequest(req, _res, next) {
  try {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    } else {
      const errorsArray = errors.array();
      const firstErrorMesage = errorsArray[0]?.msg;
      const error = new Error(firstErrorMesage);
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}
