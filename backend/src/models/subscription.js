import { model, Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    plan: {
      type: String,
      enum: ["basic", "pro", "premium"],
      required: [true, "Plan is required"],
      default: "basic",
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["usd", "eur", "cad", "gbp", "aud", "inr"],
      required: [true, "Currency is required"],
    },
    paymentPlatform: {
      type: String,
      enum: ["stripe", "paypal", "razorpay"],
      required: [true, "Payment platform is required"],
    },
    status: {
      type: String,
      enum: ["active", "expired", "canceled", "trial", "pending"],
      required: [true, "Status is required"],
    },
    // Transaction ID is the identifier of transactions once it is completed
    transactionId: {
      type: String,
    },
    // Payment ID is the identifier of the payment request, it is used to verify the payment. It does not necessarily indicates a completed payment.
    paymentId: {
      type: String,
    },
    currentPeriodStartDate: {
      type: Date,
      required: [true, "Current period start date is required"],
    },
    currentPeriodEndDate: {
      type: Date,
      required: [true, "Current period end date is required"],
    },
  },
  { timestamps: true }
);

export default model("Subscription", subscriptionSchema);
