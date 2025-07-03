import { model, Schema } from "mongoose";

const biolinkSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: false,
    },
    ar_name: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: Schema.Types.ObjectId,
      ref: "Media",
      required: false,
    },
    ar_bio: {
      type: String,
      required: false,
    },
    socialMediaLinks: [
      {
        icon: { type: String },
        url: { type: String },
      },
    ],
    links: [
      {
        type: Schema.Types.ObjectId,
        ref: "Link",
      },
    ],
    qrCode: {
      type: Object,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Biolink", biolinkSchema);
