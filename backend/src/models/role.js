import { model, Schema } from "mongoose";
// Model for user roles

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Role", roleSchema);
