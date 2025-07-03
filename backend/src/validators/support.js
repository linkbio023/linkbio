import { body } from "express-validator";

const createSupportTicket = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3, max: 120 })
    .withMessage("Title must be between 3 to 120 characters"),
  body("details")
    .trim()
    .notEmpty()
    .withMessage("Details cannot be empty")
    .isString()
    .withMessage("Details must be a string")
    .isLength({ min: 3, max: 3000 })
    .withMessage("Details must be between 3 to 3000 characters"),
];

const updateSupportTicket = [
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status cannot be empty")
    .isString()
    .withMessage("Status must be a string")
    .isIn(["open", "closed"])
    .withMessage("Status must be either open or closed"),
];

export default { createSupportTicket, updateSupportTicket };
