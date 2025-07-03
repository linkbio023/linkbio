import { body } from "express-validator";

const updateName = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 to 50 characters"),
];

const updateEmail = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .isLength({ max: 254 })
    .withMessage("Email must be at most 254 characters long"),
];

const updatePassword = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6, max: 25 })
    .withMessage("Password must be between 8 to 128 characters"),
];

export default { updateName, updateEmail, updatePassword };
