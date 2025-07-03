import { model, Schema } from "mongoose";

const supportSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Support", supportSchema);
