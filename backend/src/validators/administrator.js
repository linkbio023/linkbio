import { body, query, param } from "express-validator";

const updateAdministrator = [
  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role cannot be empty")
    .isString()
    .withMessage("Role must be a string")
    .isIn(["user", "admin", "moderator"])
    .withMessage("Role must be either user, admin or moderator"),
  body("id")
    .trim()
    .notEmpty()
    .withMessage("Id cannot be empty")
    .isString()
    .withMessage("Id must be a string")
    .isMongoId()
    .withMessage("Id is not valid"),
];

const checkAdministrator = [
  query("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Email must be a valid email"),
];

const viewAdministrator = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("Id cannot be empty")
    .isString()
    .withMessage("Id must be a string")
    .isMongoId()
    .withMessage("Id is not valid"),
];

const makeAdminOnce = [
  body("id")
    .trim()
    .notEmpty()
    .withMessage("Id cannot be empty")
    .isString()
    .withMessage("Id must be a string")
    .isMongoId()
    .withMessage("Id is not valid"),
];

export default {
  updateAdministrator,
  checkAdministrator,
  viewAdministrator,
  makeAdminOnce,
};
