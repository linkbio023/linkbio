import { model, Schema } from "mongoose";

const biolinkDesignSchema = new Schema(
  {
    biolink: {
      type: Schema.Types.ObjectId,
      ref: "Biolink",
      required: [true, "Biolink is required."],
      unique: true,
    },
    // Theme Design
    backgroundDesign: {
      backgroundType: {
        type: String,
        required: true,
        enum: ["image", "gradient", "solid"],
        default: "solid",
      },
      backgroundImage: {
        type: Schema.Types.ObjectId,
        ref: "Media",
        required: false,
      },
      backgroundColor: {
        type: String,
        trim: true,
        minLength: [4, "Color code must be at least 4 characters."],
        maxLength: [9, "Color code must be at most 9 characters."],
        match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color code."],
        default: "#f5f5f4",
        required: false,
      },
      backgroundGradient: {
        type: String,
        maxLength: [5000, "Gradient must be at most 5000 characters."],
        required: false,
      },
      themeTextColor: {
        type: String,
        trim: true,
        minLength: [4, "Color code must be at least 4 characters."],
        maxLength: [9, "Color code must be at most 9 characters."],
        match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color code."],
        required: false,
      },
    },
    // Button design
    buttonDesign: {
      type: {
        type: String,
        required: true,
        enum: ["gradient", "solid"],
        default: "solid",
      },
      height: {
        type: Number,
        min: [0, "Height must be at least 0rem."],
        max: [10, "Height must be at most 10rem."],
        required: false,
        default: 0.5,
      },
      backgroundColor: {
        type: String,
        trim: true,
        minLength: [4, "Color code must be at least 4 characters."],
        maxLength: [9, "Color code must be at most 9 characters."],
        match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color code."],
        required: false,
        default: "#ffffff",
      },
      borderWidth: {
        type: Number,
        min: [0, "Border width must be at least 0rem."],
        max: [10, "Border width must be at most 10rem."],
        required: false,
        default: 0.125,
      },
      borderRadius: {
        type: Number,
        min: [0, "Border radius must be at least 0rem."],
        max: [10, "Border radius must be at most 10rem."],
        required: false,
        default: 0.5,
      },
      borderColor: {
        type: String,
        trim: true,
        minLength: [4, "Color code must be at least 4 characters."],
        maxLength: [9, "Color code must be at most 9 characters."],
        match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color code."],
        required: false,
        default: "#e2e8f0",
      },
      textColor: {
        type: String,
        trim: true,
        minLength: [4, "Color code must be at least 4 characters."],
        maxLength: [9, "Color code must be at most 9 characters."],
        match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color code."],
        required: false,
        default: "#000000",
      },
      shadow: {
        type: String,
        maxLength: [500, "Shadow must be at most 500 characters."],
        required: false,
      },
      extra: {
        type: String,
        maxLength: [500, "Extra must be at most 500 characters."],
        required: false,
      },
    },
    // Dimension
    dimensionUnit: {
      type: String,
      required: true,
      enum: ["px", "rem"],
      default: "rem",
    },
  },
  {
    timestamps: true,
  }
);

export default model("BiolinkDesign", biolinkDesignSchema);
