import { model, Schema } from "mongoose";

const mediaSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    url: {
      type: String,
      minLength: [3, "URL must be at least 3 character long."],
      maxLength: [2048, "URL must be at most 2048 characters long."],
      required: true,
    },
    publicId: {
      type: String,
      minLength: [3, "Public ID must be at least 3 character long."],
      maxLength: [2048, "Public ID must be at most 2048 characters long."],
      required: true,
    },
    alt: {
      type: String,
      minLength: [1, "Alt must be at least 1 character long."],
      maxLength: [50, "Alt must be at most 50 characters long."],
      required: true,
    },
    title: {
      type: String,
      minLength: [1, "Title must be at least 1 character long."],
      maxLength: [50, "Title must be at most 50 characters long."],
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Media", mediaSchema);
