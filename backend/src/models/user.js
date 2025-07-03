import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
