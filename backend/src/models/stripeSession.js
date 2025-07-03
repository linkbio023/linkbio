import { model, Schema } from "mongoose";

// Schema to save the Stripe session details
// It will expire after 24 hours
const stripeSessionSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: [true, "Session ID is required"],
    },
  },
  { timestamps: true },
  { expireAfterSeconds: 86400 } // 24 hours = 86400 seconds
);

export default model("StripeSession", stripeSessionSchema);
