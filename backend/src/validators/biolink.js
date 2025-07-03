import { body } from "express-validator";

const create = [
  body("biolink.username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 2, max: 20 })
    .withMessage("Username must be between 2 and 20 characters")
    .matches(/^[a-z0-9_]+$/)
    .withMessage(
      "Username can contain only lowercase letters, numbers and underscores."
    ),
];

const update = [
  // BioLink
  body("biolink.ar_name")
    .optional({ values: "falsy" })
    .trim()
    .isString()
    .withMessage("Arabic Name must be a string")
    .isLength({ max: 50 })
    .withMessage("Arabic Name must be less than 50 characters"),
  body("biolink.name")
    .optional({ values: "falsy" })
    .trim()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  body("biolink.profilePicture")
    .optional({ values: "falsy" })
    .trim()
    .isString()
    .withMessage("Profile picture must be a string"),
  body("biolink.ar_bio")
    .optional({ values: "falsy" })
    .trim()
    .isString()
    .withMessage("Bio must be a string")
    .isLength({ max: 160 })
    .withMessage("Bio must be less than 160 characters"),
  body("biolink.bio")
    .optional({ values: "falsy" })
    .trim()
    .isString()
    .withMessage("Bio must be a string")
    .isLength({ max: 160 })
    .withMessage("Bio must be less than 160 characters"),
  body("biolink.links")
    .optional({ values: "falsy" })
    .isArray()
    .withMessage("Links provided in wrong format"),
  body("biolink.links.*.title")
    .optional({ values: "falsy" })
    .trim()
    .notEmpty()
    .withMessage("Link title cannot be empty")
    .isString()
    .withMessage("Link title must be a string")
    .isLength({ max: 50 })
    .withMessage("Link title must be less than 50 characters"),
  body("biolink.links.*.description")
    .optional({ values: "falsy" })
    .trim()
    .isString()
    .withMessage("Link description must be a string")
    .isLength({ max: 160 })
    .withMessage("Link description must be less than 160 characters"),
  body("biolink.links.*.url")
    .optional({ values: "falsy" })
    .trim()
    .notEmpty()
    .withMessage("Link URL cannot be empty")
    .isURL()
    .withMessage("Link URL must be a valid URL"),
  body("biolink.links.*.image")
    .optional({ values: "falsy" })
    .trim()
    .isURL()
    .withMessage("Link image must be a valid URL"),
  body("biolink.links.*.design")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("Link design must be a string"),
  body("biolink.links.*.layout")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("Link layout must be a string"),
  body("biolink.links.*.schedule.enabled")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage("Link schedule enabled must be a boolean"),
  body("biolink.links.*.schedule.startDate")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage("Link schedule start date must be a valid date"),
  body("biolink.links.*.schedule.endDate")
    .optional()
    .isISO8601()
    .withMessage("Link schedule end date must be a valid date"),
  body("biolink.links.*.protected.enabled")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage("Link protected enabled must be a boolean"),
  body("biolink.links.*.protected.password")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("Link protected password must be a string"),
  body("biolink.qrCode")
    .optional({ values: "falsy" })
    .isObject()
    .withMessage("QR Code must be an object"),

  // Design
  body("design.backgroundType")
    .optional({ values: "falsy" })
    .isString()
    .trim()
    .withMessage("Background type must be a string")
    .isIn(["image", "gradient", "solid"])
    .withMessage("Background type must be either image, gradient or solid"),
  body("design.backgroundImage")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("Background image must be a valid URL")
    .isLength({ max: 2048 })
    .withMessage("Background image URL must be at most 2048 characters long"),
  body("design.backgroundColor")
    .optional({ values: "falsy" })
    .isHexColor()
    .trim()
    .withMessage("Background color must be a valid hex color")
    .isLength({ min: 4, max: 9 })
    .withMessage("Background color code must be between 4 and 9 characters"),
  body("design.backgroundGradient")
    .optional({ values: "falsy" })
    .isString()
    .trim()
    .withMessage("Background gradient must be a string")
    .isLength({ max: 5000 })
    .withMessage("Background gradient must be at most 5000 characters long"),
  body("design.themeTextColor")
    .optional({ values: "falsy" })
    .isHexColor()
    .trim()
    .withMessage("Theme text color must be a valid hex color")
    .isLength({ min: 4, max: 9 })
    .withMessage("Theme text color code must be between 4 and 9 characters"),
  body("design.buttonDesign.type")
    .optional({ values: "falsy" })
    .isString()
    .trim()
    .withMessage("Button type must be a string")
    .isIn(["gradient", "solid"])
    .withMessage("Button type must be either gradient or solid"),
  body("design.buttonDesign.height")
    .optional({ values: "falsy" })
    .isNumeric()
    .withMessage("Button height must be a number")
    .isFloat({ min: 0, max: 10 })
    .withMessage("Button height must be between 0 and 10"),
  body("design.buttonDesign.backgroundColor")
    .optional({ values: "falsy" })
    .isHexColor()
    .trim()
    .withMessage("Button background color must be a valid hex color")
    .isLength({ min: 4, max: 9 })
    .withMessage(
      "Button background color code must be between 4 and 9 characters"
    ),
  body("design.buttonDesign.borderWidth")
    .optional({ values: "falsy" })
    .isNumeric()
    .withMessage("Button border width must be a number")
    .isFloat({ min: 0, max: 10 })
    .withMessage("Button border width must be between 0 and 10"),
  body("design.buttonDesign.borderRadius")
    .optional({ values: "falsy" })
    .isNumeric()
    .withMessage("Button border radius must be a number")
    .isFloat({ min: 0, max: 10 })
    .withMessage("Button border radius must be between 0 and 10"),
  body("design.buttonDesign.borderColor")
    .optional({ values: "falsy" })
    .isHexColor()
    .trim()
    .withMessage("Button border color must be a valid hex color")
    .isLength({ min: 4, max: 9 })
    .withMessage("Button border color code must be between 4 and 9 characters"),
  body("design.buttonDesign.textColor")
    .optional({ values: "falsy" })
    .isHexColor()
    .trim()
    .withMessage("Button text color must be a valid hex color")
    .isLength({ min: 4, max: 9 })
    .withMessage("Button text color code must be between 4 and 9 characters"),
  body("design.buttonDesign.shadow")
    .optional({ values: "falsy" })
    .isString()
    .trim()
    .withMessage("Button shadow must be a string")
    .isLength({ max: 500 })
    .withMessage("Button shadow must be at most 500 characters long"),
  body("design.buttonDesign.extra")
    .optional({ values: "falsy" })
    .isString()
    .trim()
    .withMessage("Button extra must be a string")
    .isLength({ max: 500 })
    .withMessage("Button extra must be at most 500 characters long"),
  // Dimension unit
  body("dimensionUnit")
    .optional({ values: "falsy" })
    .isString()
    .trim()
    .withMessage("Dimension unit must be a string")
    .isIn(["rem", "px"])
    .withMessage("Dimension unit must be either rem or px"),
];

export default { create, update };
