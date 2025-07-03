import { body } from "express-validator";

const createBiolinkAnalytics = [
  body("biolinkId")
    .trim()
    .notEmpty()
    .withMessage("BioLink ID cannot be empty")
    .isString()
    .withMessage("BioLink ID must be a string")
    .isMongoId()
    .withMessage("BioLink ID format is invalid"),
  body("referrer")
    .trim()
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("Referrer must be a valid URL")
    .isLength({ min: 3, max: 2048 })
    .withMessage("Referrer must be between 3 to 2048 characters"),
];

const createLinkAnalytics = [
  body("link")
    .trim()
    .notEmpty()
    .withMessage("Link cannot be empty")
    .isString()
    .withMessage("Link must be a string")
    .isURL()
    .withMessage("Link must be a valid URL"),
];

export default { createBiolinkAnalytics, createLinkAnalytics };
