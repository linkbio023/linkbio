import { model, Schema } from "mongoose";

const linkSchema = new Schema(
  {
    biolink: {
      type: Schema.Types.ObjectId,
      ref: "Biolink",
      required: true,
    },
    title: {
      type: String,
      minLength: [1, "Title must be at least 1 character long."],
      maxLength: [50, "Title must be at most 50 characters long."],
      required: true,
    },
    description: {
      type: String,
      maxLength: [160, "Description must be at most 160 characters long."],
      required: false,
    },
    url: {
      type: String,
      minLength: [3, "URL must be at least 3 character long."],
      maxLength: [2048, "URL must be at most 2048 characters long."],
      required: true,
    },
    image: {
      type: String,
      maxLength: [2048, "Image URL must be at most 2048 characters long."],
      required: false,
    },
    design: {
      type: String,
      enum: ["primary", "secondary"],
      required: false,
    },
    layout: {
      type: String,
      enum: ["classic", "featured"],
      required: false,
    },
    schedule: {
      enabled: {
        type: Boolean,
        required: false,
      },
      startDate: {
        type: Date,
        required: false,
      },
      endDate: {
        type: Date,
        required: false,
      },
    },
    protected: {
      enabled: {
        type: Boolean,
        required: false,
      },
      password: {
        type: String,
        minLength: [1, "Password must be at least 1 character long."],
        maxLength: [50, "Password must be at most 50 characters long."],
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default model("Link", linkSchema);
